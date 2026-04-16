# Sanity: `sidenote` marginalia block

A **sidenote** (magazine-style marginalia) for the article body.
Rendered by `client/src/components/PortableTextComponents.tsx`:

- **Inline on mobile**: shown as a subtle accent card inside the
  prose flow, with an eyebrow label and italic body.
- **Right gutter on xl+**: the same content is mirrored (via
  `extractSidenotes`) into the dedicated right gutter alongside the
  chapter illustration, and the inline copy is auto-hidden with
  `xl:hidden` — single source of truth in Sanity, two rendering
  contexts.

The Studio lives in a separate repo. Copy this object into the
`of: [...]` array of the Portable Text body field (`content_it` /
`content_en` or your shared body field).

## Block definition

```ts
// schemas/objects/sidenote.ts
import { defineType, defineField } from "sanity";

export const sidenote = defineType({
  name: "sidenote",
  title: "Sidenote (marginalia)",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label / eyebrow",
      type: "string",
      description:
        'Short label rendered in uppercase above the body, e.g. "Nota", "Margine", "Fonte". Optional.',
      validation: (Rule) => Rule.max(24),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().min(1).max(500),
      description:
        "Short paragraph — context, citation, or aside. Keep it under ~3 lines for the gutter layout to breathe.",
    }),
  ],
  preview: {
    select: { title: "body", subtitle: "label" },
    prepare({ title, subtitle }) {
      return {
        title: title ? `◦ ${String(title).slice(0, 60)}` : "Sidenote",
        subtitle: subtitle ? subtitle.toUpperCase() : "marginalia",
      };
    },
  },
});
```

## Wire it into the body field

Inside the article schema, add to the Portable Text arrays:

```ts
defineField({
  name: "content_it",
  type: "array",
  of: [
    { type: "block" },
    { type: "image", options: { hotspot: true } },
    { type: "pullQuote" },
    { type: "sidenote" }, // ← add this
  ],
}),
```

…and register the `sidenote` type in your `schemaTypes` array.

## Frontend contract

The React renderer expects the following shape:

```json
{
  "_type": "sidenote",
  "_key": "...",
  "label": "Nota",
  "body": "Lin Hwai-min fondò Cloud Gate Dance Theatre nel 1973…"
}
```

`body` is required. `label` is optional — if missing, only the body is
rendered. The legacy alias `text` is accepted for forward
compatibility, but new content should use `body`.

## Authoring guidance

- Sidenotes should be **short** (1–3 sentences). The gutter column is
  ~15rem wide on xl+ and anything longer overflows the aesthetic.
- Place a sidenote in the body **after** the paragraph it annotates —
  the gutter list preserves document order, which roughly aligns
  notes with their reference paragraph on large screens.
- Don't use sidenotes for primary narrative content; they should
  enrich, not compete with, the main column.
