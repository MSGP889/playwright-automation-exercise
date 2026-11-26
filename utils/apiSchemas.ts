import { z } from 'zod';

export const productSchema = z.object({
    id: z.number(),
    name: z.string(),
    price: z.string(),
    brand: z.string(),
    category: z.object({
        usertype: z.object({ usertype: z.string() }),
        category: z.string(),
    }),
});

export const productsListSchema = z.object({
    responseCode: z.literal(200),
    products: z.array(productSchema).min(1),
});