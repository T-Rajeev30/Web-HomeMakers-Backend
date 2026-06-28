import { z } from "zod";

export const listSchema = z.object({
  status: z
    .enum([
      "draft",
      "verification_pending",
      "manual_review",
      "approved",
      "rejected",
    ])
    .optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const decisionSchema = z.object({
  decision: z.enum(["approved", "rejected"]),
  note: z.string().max(500).optional().default(""),
});
