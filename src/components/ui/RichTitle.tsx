import { Fragment } from 'react'

/** Renders 'A window *above* the clouds' with the starred words in the italic display face. */
export function RichTitle({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/g).map((part, i) =>
        part.startsWith('*') && part.endsWith('*') ? (
          <em key={i} className="italic">
            {part.slice(1, -1)}
          </em>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}
