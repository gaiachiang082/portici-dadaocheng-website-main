// schemas/article.js
export default {
  name: 'article',
  title: 'Article (文章)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title (文章標題)',
      type: 'localeString',
      description: '義大利文、英文標題可視需要填寫；前台依網站語系讀取對應欄位。',
    },
    {
      name: 'slug',
      title: '網址路徑 (Slug)',
      type: 'slug',
      options: {
        source: (doc) => {
          const t = doc?.title;
          if (!t || typeof t !== 'object') return 'untitled';
          return t.it || t.en || 'untitled';
        },
        maxLength: 96,
      },
    },
    {
      name: 'mainImage',
      title: '封面照片',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'content_it',
      title: 'Content (義大利文內容)',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    },
    {
      name: 'content_en',
      title: 'Content (英文內容)',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
    prepare(selection) {
      const { title, media } = selection ?? {};
      const loc =
        title && typeof title === 'object' && !Array.isArray(title) ? title : {};
      const it = typeof loc.it === 'string' ? loc.it.trim() : '';
      const en = typeof loc.en === 'string' ? loc.en.trim() : '';
      const headline = it || en || 'Untitled';
      const locales = [];
      if (it) locales.push('IT');
      if (en) locales.push('EN');
      return {
        title: headline,
        subtitle: locales.length ? locales.join(' · ') : undefined,
        media,
      };
    },
  },
};
