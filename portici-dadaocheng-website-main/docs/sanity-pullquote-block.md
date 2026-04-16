# Sanity: `pullQuote` breakout block

A **breakout block** for the article body. Rendered by
`client/src/components/PortableTextComponents.tsx` — it breaks out of
the narrow 2xl reading column, centers against the viewport, and gives
the page a magazine cadence (oversized serif quotation mark, italic
display text, optional attribution).

This document captures the schema so editors can drop the block into
`content_it` / `content_en` Portable Text arrays. The Studio code lives
in a separate repo — copy this object into the `of: [...]` array of
your `content_it` / `content_en` (or shared body) Portable Text field.

## Block definition

```ts
// schemas/objects/pullQuote.ts
import { defineType, defineField } from "sanity";

export const pullQuote = defineType({
  name: "pullQuote",
  title: "Pull Quote (breakout)",
  type: "object",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().min(1).max(280),
      description:
        "The highlighted sentence. Keep it short — this block is sized for 1–3 lines.",
    }),
    defineField({
      name: "attribution",
      title: "Attribution (optional)",
      type: "string",
      description:
        'Who said / wrote it. Rendered as a small uppercase line under the quote, e.g. "— Lin Hwai-min".',
    }),
  ],
  preview: {
    select: { title: "quote", subtitle: "attribution" },
    prepare({ title, subtitle }) {
      return {
        title: title ? `"${title}"` : "Pull quote",
        subtitle: subtitle ? `— ${subtitle}` : "breakout block",
      };
    },
  },
});
```

## Wire it into the body field

Inside the article schema, wherever the Portable Text arrays are
defined (typically `content_it` and `content_en`):

```ts
defineField({
  name: "content_it",
  type: "array",
  of: [
    { type: "block" },
    { type: "image", options: { hotspot: true } },
    { type: "pullQuote" }, // ← add this
  ],
}),
```

…and import / register the `pullQuote` type in your `schemaTypes`
array.

## Frontend contract

The React renderer expects the following shape in the serialized
document:

```json
{
  "_type": "pullQuote",
  "_key": "...",
  "quote": "The city teaches you to listen before it lets you speak.",
  "attribution": "Lin Hwai-min"
}
```

`quote` is required. `attribution` is optional — if missing, only the
quote is rendered.

Legacy aliases (`text`, `cite`) are also accepted for forward
compatibility, but new content should use `quote` / `attribution`.
