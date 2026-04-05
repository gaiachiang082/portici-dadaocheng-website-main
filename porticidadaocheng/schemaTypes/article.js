// schemas/article.js
export default {
    name: 'article',
    title: 'Article (文章)',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title (文章標題)',
        type: 'localeString', // 這裡直接套用我們剛剛寫的雙語字串！
        description: '請輸入義大利文、英文與繁體中文標題（依文章語系填寫即可）'
      },
      {
        name: 'language',
        title: 'Language (文章語系)',
        type: 'string',
        options: {
          list: [
            { title: 'Italiano (義大利文)', value: 'it' },
            { title: '繁體中文', value: 'zh' },
            { title: 'English', value: 'en' },
          ],
          layout: 'dropdown',
        },
        initialValue: 'it',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'slug',
        title: '網址路徑 (Slug)',
        type: 'slug',
        options: {
          source: 'title.en', // 根據英文標題自動產生網址
          maxLength: 96,
        },
      },
      {
        name: 'mainImage',
        title: '封面照片',
        type: 'image',
        options: {
          hotspot: true, // 允許你在後台裁切圖片重點部位！
        },
      },
      {
        name: 'content_it',
        title: 'Content (義大利文內容)',
        type: 'array',
        of: [{type: 'block'}] // 這是 Sanity 的強大文字編輯器格式
      },
      {
        name: 'content_en',
        title: 'Content (英文內容)',
        type: 'array',
        of: [{type: 'block'}]
      }
    ],
    // 這個設定可以讓你在後台列表看到封面圖和標題
    preview: {
      select: {
        titleIt: 'title.it',
        titleEn: 'title.en',
        titleZh: 'title.zh',
        media: 'mainImage',
        language: 'language',
      },
      prepare({ titleIt, titleEn, titleZh, media, language }) {
        const langTag =
          language === 'zh' ? '[ZH]' : language === 'en' ? '[EN]' : '[IT]';
        const headline =
          (language === 'zh'
            ? titleZh || titleIt || titleEn
            : language === 'en'
              ? titleEn || titleIt || titleZh
              : titleIt || titleEn || titleZh) || '（無標題）';
        return {
          title: `${langTag} ${headline}`,
          media,
        };
      },
    },
  }
