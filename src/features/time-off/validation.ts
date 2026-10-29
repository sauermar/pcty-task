import { z } from 'zod';

export const requestFormSchema = z
  .object({
    type: z.enum(['vacation', 'sick', 'personal'] as const, {
      message: 'Please select a leave category',
    }),
    startDate: z
      .string()
      .min(1, 'Start date is required')
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be in YYYY-MM-DD format'),
    endDate: z
      .string()
      .min(1, 'End date is required')
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be in YYYY-MM-DD format'),
    notes: z.string().max(250, 'Notes cannot exceed 250 characters').optional(),
  })
  .refine(
    (data) => {
      if (!data.startDate || !data.endDate) return true;
      return new Date(data.endDate) >= new Date(data.startDate);
    },
    {
      message: 'End date cannot be prior to start date',
      path: ['endDate'],
    }
  );

export type RequestFormValues = z.infer<typeof requestFormSchema>;