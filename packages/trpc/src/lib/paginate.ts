import z from 'zod';

export const paginateSchema = z
   .object({
      page: z.number(),
      per: z.number().optional(),
   })
   .strict();

export const paginatePer = 20;

export function calculatePaginate(total: number, per: number, page: number) {
   return {
      pages: Math.ceil(total / per) || 1,
      currentPage: page,
      per,
      nextPage: total - per * page > 0,
   };
}
