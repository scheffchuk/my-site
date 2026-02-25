import { v } from "convex/values";
import {
  mutation,
  query,
  internalMutation,
  internalQuery,
} from "./_generated/server";

export const getApprovedEntries = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db
      .query("guestbook")
      .withIndex("by_approved", (q) => q.eq("approved", true))
      .collect();
    const shuffled = all.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 30);
  },
});

export const createEntry = internalMutation({
  args: {
    name: v.string(),
    message: v.string(),
    signature: v.optional(v.string()),
    localEntryId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("guestbook", {
      name: args.name,
      message: args.message,
      signature: args.signature,
      approved: false,
      localEntryId: args.localEntryId,
    });
  },
});

export const approveEntry = mutation({
  args: { id: v.id("guestbook") },
  handler: async (ctx, args) => {
    const entry = await ctx.db.get(args.id);
    if (!entry) return;
    await ctx.db.patch(args.id, { approved: true });
  },
});
