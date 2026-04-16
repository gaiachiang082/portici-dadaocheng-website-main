// schemas/sidenote.js
//
// Sidenote (旁註 / Marginalia) — 雜誌風格的輔助註記區塊。前台會在：
//   - 手機版：以內文中一張含左側強調色邊的小卡片顯示 (inline)。
//   - 桌機版 (xl+)：inline 會自動隱藏，改於文章右側 gutter 重新排版，
//     與 ArticleIllustration 並列呈現，讓主文維持乾淨的閱讀節奏。
// 實際渲染邏輯見 client/src/components/PortableTextComponents.tsx 的
// `sidenote` type 與 `Sidenote` 元件。
export default {
  name: 'sidenote',
  title: 'Sidenote (旁註)',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: '標題 / Eyebrow (選填)',
      type: 'string',
      description:
        '顯示在旁註上方的小標籤，全大寫字距樣式，例如「NOTA」、「MARGINE」、「FONTE」。可留空。',
      validation: (Rule) => Rule.max(24),
    },
    {
      name: 'body',
      title: '內文 (Body)',
      type: 'text',
      rows: 4,
      description:
        '簡短段落（1–3 句為佳）。桌機版 gutter 欄位寬度約 15rem，過長會破壞視覺排版。',
      validation: (Rule) => Rule.required().min(1).max(500),
    },
  ],
  preview: {
    select: { title: 'body', subtitle: 'label' },
    prepare(selection) {
      const { title, subtitle } = selection || {}
      const t = typeof title === 'string' ? title.trim() : ''
      const s = typeof subtitle === 'string' ? subtitle.trim() : ''
      return {
        title: t ? `◦ ${t.slice(0, 60)}${t.length > 60 ? '…' : ''}` : 'Sidenote',
        subtitle: s ? s.toUpperCase() : 'Marginalia',
      }
    },
  },
}
