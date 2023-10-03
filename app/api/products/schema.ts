import { z } from "zod";

export const postSchema = z.object({
    name: z.string().min(3),
    description: z.string().optional(),
    price: z.number().min(0.5),
});

export const putSchema = z.object({
    name: z.string().min(3).optional(),
    description: z.string().optional(),
    price: z.number().min(0.5).optional(),
});
