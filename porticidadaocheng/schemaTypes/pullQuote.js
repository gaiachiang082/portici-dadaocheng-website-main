// schemas/pullQuote.js
//
// Pull Quote (破格引言) — 雜誌風格的「breakout」區塊。前台由
// client/src/components/PortableTextComponents.tsx 負責渲染：
// 會突破主文 2xl 閱讀欄位寬度，以大字 serif + 超大引號顯示，
// 適合用來在長篇段落之間加入視覺喘息。
export default {
  name: 'pullQuote',
  title: 'Pull Quote (破格引言)',
  type: 'object',
  fields: [
    {
      name: 'quote',
      title: '引言 (Quote)',
      type: 'text',
      rows: 3,
      description:
        '會以放大的 serif 字體、置中顯示。建議控制在 1–3 行，過長會破壞視覺節奏。',
      validation: (Rule) => Rule.required().min(1).max(280),
    },
    {
      name: 'attribution',
      title: '署名 / 出處 (選填)',
      type: 'string',
      description: '例如「Lin Hwai-min」。會以小字、全大寫字距顯示於引言下方；留空則不顯示。',
    },
  ],
  preview: {
    select: { title: 'quote', subtitle: 'attribution' },
    prepare(selection) {
      const { title, subtitle } = selection || {}
      const t = typeof title === 'string' ? title.trim() : ''
      const s = typeof subtitle === 'string' ? subtitle.trim() : ''
      return {
        title: t ? `"${t.slice(0, 60)}${t.length > 60 ? '…' : ''}"` : 'Pull quote',
        subtitle: s ? `— ${s}` : 'Breakout block',
      }
    },
  },
}
