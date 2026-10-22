import type { FieldErrors, FieldValues, Resolver } from 'react-hook-form'
import type { z } from 'zod'

/**
 * A small zod -> react-hook-form resolver. (@hookform/resolvers is not in the
 * stack and its optional peers clash on install, so this does the one job needed.)
 * Only the first message per field is kept.
 */
export function zodResolver<S extends z.ZodType<FieldValues>>(schema: S): Resolver<z.infer<S>> {
  return async (values) => {
    const result = schema.safeParse(values)
    if (result.success) return { values: result.data, errors: {} }

    const errors: Record<string, { type: string; message: string }> = {}
    for (const issue of result.error.issues) {
      const name = issue.path.join('.')
      if (!errors[name]) errors[name] = { type: issue.code, message: issue.message }
    }
    return { values: {}, errors: errors as FieldErrors<z.infer<S>> }
  }
}
