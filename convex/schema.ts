import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  guestbook: defineTable({
    name: v.string(),
    message: v.string(),
    signature: v.optional(v.string()),
    approved: v.boolean(),
    localEntryId: v.optional(v.string()),
  }).index("by_approved", ["approved"]),
});
