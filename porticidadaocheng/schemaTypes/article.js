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
      description: '義大利文、英文、繁體中文標題可視需要填寫；前台依網站語系讀取對應欄位。',
    },
    {
      name: 'slug',
      title: '網址路徑 (Slug)',
      type: 'slug',
      options: {
        source: (doc) => doc.title?.it || doc.title?.en || doc.title?.zh || 'untitled',
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
    {
      name: 'content_zh',
      title: 'Content (繁體中文)',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    },
  ],
  preview: {
    select: {
      titleIt: 'title.it',
      titleEn: 'title.en',
      titleZh: 'title.zh',
      media: 'mainImage',
    },
    prepare({ titleIt, titleEn, titleZh, media }) {
      const headline = titleIt || titleEn || titleZh || '（無標題）';
      const locales = [];
      if (titleIt) locales.push('IT');
      if (titleEn) locales.push('EN');
      if (titleZh) locales.push('ZH');
      return {
        title: headline,
        subtitle: locales.length ? locales.join(' · ') : undefined,
        media,
      };
    },
  },
};
