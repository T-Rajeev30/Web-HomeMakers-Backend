import { z } from "zod";

export const createOrderSchema = z.object({
  cookId: z.string().min(1),
  items: z
    .array(
      z.object({ dishId: z.string().min(1), qty: z.number().int().min(1) }),
    )
    .min(1),
  deliveryAddress: z.object({
    building: z.string().trim().min(1),
    locality: z.string().trim().min(1),
    pincode: z.string().regex(/^\d{6}$/),
  }),
  customerName: z.string().trim().max(100).optional(),
  notes: z.string().trim().max(300).optional().default(""),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(["preparing", "ready", "completed", "rejected"]),
});

export const listOrdersSchema = z.object({
  status: z
    .enum(["pending", "preparing", "ready", "completed", "rejected"])
    .optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});
