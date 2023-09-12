import * as z from 'zod';

export type CompatibleZodIssue = {
  message: string;
  path: (string | number)[];
};
export type CompatibleZodType = Pick<
  z.ZodType<unknown>,
  '_input' | '_output'
> & {
  parse: (...args) => unknown;
  safeParse: (...args) =>
    | {
        success: true;
        data: unknown;
      }
    | {
        success: false;
        error: {
          issues: CompatibleZodIssue[];
          errors: CompatibleZodIssue[];
        };
      };
};
export type CompatibleZodInfer<T extends CompatibleZodType> = T['_output'];

export type ZodDtoStatic<T> = {
  new (): T;
  zodSchema: CompatibleZodType;
  create(input: unknown): T;
};

export const createZodDto = <T extends CompatibleZodType>(
  zodSchema: T,
): ZodDtoStatic<CompatibleZodInfer<T>> => {
  class SchemaHolderClass {
    public static zodSchema = zodSchema;

    public static create(input: unknown): T {
      return this.zodSchema.parse(input) as T;
    }
  }

  return SchemaHolderClass;
};
