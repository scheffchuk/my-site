"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { internal } from "./_generated/api";
import { z } from "zod";

const GuestbookEntrySchema = z.object({
  name: z.string().min(1, "pls fill out all fields").max(50, "ur name is too long"),
  message: z
    .string()
    .min(1, "pls fill out all fields")
    .max(200, "love ur long entry, but can u make it shorter?"),
  signature: z.string().optional(),
  localEntryId: z.string().optional(),
});

export const moderateAndCreate = action({
  args: {
    name: v.string(),
    message: v.string(),
    signature: v.optional(v.string()),
    localEntryId: v.optional(v.string()),
    validateOnly: v.optional(v.boolean()),
  },
  handler: async (ctx, args): Promise<{ success: true } | { success: false; errors: Record<string, string[]> }> => {
    const parsed = GuestbookEntrySchema.safeParse(args);
    if (!parsed.success) {
      const fieldErrors: Record<string, string[]> = {};
      for (const [key, val] of Object.entries(parsed.error.flatten().fieldErrors)) {
        if (val) fieldErrors[key] = val as string[];
      }
      return { success: false, errors: fieldErrors };
    }

    const openaiKey = process.env.OPENAI_API_KEY;
    if (openaiKey) {
      const res = await fetch("https://api.openai.com/v1/moderations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({ input: args.message }),
      });
      const data = (await res.json()) as { results?: { flagged?: boolean }[] };
      if (data.results?.[0]?.flagged) {
        return { success: false, errors: { message: ["let's keep it clean"] } };
      }
    }

    if (args.validateOnly) {
      return { success: true };
    }

    await ctx.runMutation(internal.guestbook.createEntry, {
      name: parsed.data.name,
      message: parsed.data.message,
      signature: parsed.data.signature,
      localEntryId: parsed.data.localEntryId,
    });
    return { success: true };
  },
});
