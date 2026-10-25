import type { ReactNode } from 'react'
import { useWatch, type UseFormReturn } from 'react-hook-form'
import { enquire } from '@/data/site'
import type { EnquiryValues } from '@/lib/enquirySchema'
import { cn } from '@/lib/cn'

const { fields } = enquire

const field =
  'w-full rounded-xl border bg-pine-950/40 px-4 py-3 text-cream placeholder:text-cream/40 focus:border-ember-400 focus:outline-none'
const ok = 'border-cream/25'
const bad = 'border-error'

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string
  htmlFor: string
  error?: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="label text-muted">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="text-[0.85rem] text-error-soft">
          {error}
        </p>
      )}
    </div>
  )
}

const aria = (id: string, error?: string) => ({
  'aria-invalid': error ? true : undefined,
  'aria-describedby': error ? `${id}-error` : undefined,
})

interface EnquiryFormProps {
  form: UseFormReturn<EnquiryValues>
  onSubmit: () => void
  failed: boolean
}

/** The enquiry card's fields (EKJAP_PLAN.md §9.12). Validation runs on blur, then live. */
export function EnquiryForm({ form, onSubmit, failed }: EnquiryFormProps) {
  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = form
  const wantsDate = useWatch({ control, name: 'visit' }) === 'date'
  const today = new Date().toISOString().slice(0, 10)

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-5 rounded-card-lg p-6 glass md:p-10"
    >
      <Field label={fields.name.label} htmlFor="enq-name" error={errors.name?.message}>
        <input
          id="enq-name"
          type="text"
          autoComplete="name"
          className={cn(field, errors.name ? bad : ok)}
          {...aria('enq-name', errors.name?.message)}
          {...register('name')}
        />
      </Field>

      <Field label={fields.mobile.label} htmlFor="enq-mobile" error={errors.mobile?.message}>
        <div className="flex">
          <span className="flex items-center rounded-l-xl border border-r-0 border-cream/25 bg-pine-950/60 px-4 text-cream/80">
            {fields.mobile.prefix}
          </span>
          <input
            id="enq-mobile"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            maxLength={10}
            className={cn(field, 'rounded-l-none', errors.mobile ? bad : ok)}
            {...aria('enq-mobile', errors.mobile?.message)}
            {...register('mobile', {
              setValueAs: (value: string) => String(value ?? '').replace(/\D/g, ''),
            })}
          />
        </div>
      </Field>

      <Field label={fields.visit.label} htmlFor="enq-visit">
        <select id="enq-visit" className={cn(field, ok)} {...register('visit')}>
          {fields.visit.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Field>

      {wantsDate && (
        <Field label={fields.visit.dateLabel} htmlFor="enq-date" error={errors.date?.message}>
          <input
            id="enq-date"
            type="date"
            min={today}
            className={cn(field, 'scheme-dark', errors.date ? bad : ok)}
            {...aria('enq-date', errors.date?.message)}
            {...register('date')}
          />
        </Field>
      )}

      <label className="flex items-start gap-3 text-[0.95rem] text-cream/85">
        <input type="checkbox" className="mt-1 size-4 accent-ember-400" {...register('brochure')} />
        {fields.brochure.label}
      </label>

      {failed && (
        <p
          role="alert"
          className="rounded-xl border border-error/60 px-4 py-3 text-[0.95rem] text-error-soft"
        >
          {enquire.failure}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 inline-flex items-center justify-center rounded-full bg-ember-400 px-6 py-3.5 font-medium text-pine-950 shadow-ember transition-colors hover:bg-ember-600 disabled:opacity-60"
      >
        {isSubmitting ? enquire.sending : enquire.submit}
      </button>
    </form>
  )
}
