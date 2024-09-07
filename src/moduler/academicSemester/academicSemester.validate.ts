import { z } from 'zod';
import {
  academicSemesterCode,
  acedemicSemesterName,
  Months,
} from './academicSemeser.const';

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...acedemicSemesterName] as [string, ...string[]]),
    year: z.string(),
    code: z.enum([...academicSemesterCode] as [string, ...[]]),
    startMonth: z.enum([...Months] as [string, ...[]]),
    endMonth: z.enum([...Months] as [string, ...[]]),
  }),
});

export const AcademicSemesterValidateSchema = {
  createAcademicSemesterValidationSchema,
};
