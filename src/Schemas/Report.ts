import { z } from 'zod';
import { CreateReportSchema } from './CreateReport';
import { createZodDto } from 'src/server/dtos/createZodDto';

export enum ReportTypeEnum {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export const ReportTypeEnumSchema = z.nativeEnum(ReportTypeEnum);

export const ReportSchema = CreateReportSchema.extend({
  id: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
  type: ReportTypeEnumSchema,
});

export type ReportInterface = z.infer<typeof ReportSchema>;
export class ReportDto extends createZodDto(ReportSchema) {}

export type ReportType = z.infer<typeof ReportTypeEnumSchema>;
