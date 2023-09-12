import { createZodDto } from 'src/server/dtos/createZodDto';
import { z } from 'zod';

export const CreateReportSchema = z.object({
  source: z.string(),
  amount: z.number(),
});

export type CreateReport = z.infer<typeof CreateReportSchema>;
export class CreateReportDto extends createZodDto(CreateReportSchema) {}
