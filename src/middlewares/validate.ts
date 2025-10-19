import { ZodSchema } from "zod";
import { Context, Next } from "koa";

export function validate(schema: ZodSchema<any>) {
  return async (ctx: Context, next: Next) => {
    const parsed = schema.safeParse((ctx.request as any).body);

    if (!parsed.success) {
      ctx.status = 422;
      ctx.body = { issues: parsed.error.format() };
      return;
    }

    (ctx.request as any).validatedBody = parsed.data;

    await next();
  };
}
