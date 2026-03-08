import React, { useState, useEffect } from 'react';
import { client } from './SanityClient';

// 1. 定義文章的資料格式 (這就是 TypeScript 的魔法，讓系統知道資料長怎樣)
interface Article {
  _id: string;
  title: {
    it: string;
    en: string;
  };
  content_it: any[];
  content_en: any[];
}

const ArticleList = () => {
  // 2. 幫狀態加上型別
  const [articles, setArticles] = useState<Article[]>([]);
  const [language, setLanguage] = useState<'it' | 'en'>('it');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await client.fetch(`*[_type == "article"]{
          _id,
          title,
          content_it,
          content_en
        }`);
        setArticles(data);
      } catch (error) {
        console.error("抓取文章失敗:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 flex items-center justify-center min-h-[200px]">
        <p className="text-neutral-500 text-sm">文章載入中...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-neutral-800 mb-6">我的雙語部落格</h2>

      {/* 語系切換按鈕 - 藥丸形狀 */}
      <div className="inline-flex p-1 rounded-full bg-neutral-200/80 mb-8 gap-0.5">
        <button
          type="button"
          onClick={() => setLanguage('it')}
          className={`
            px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
            ${language === 'it'
              ? 'bg-white text-neutral-900 shadow-sm'
              : 'text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100/80'
            }
          `}
        >
          🇮🇹 Italiano
        </button>
        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={`
            px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
            ${language === 'en'
              ? 'bg-white text-neutral-900 shadow-sm'
              : 'text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100/80'
            }
          `}
        >
          🇬🇧 English
        </button>
      </div>

      {/* 文章列表 - 卡片排版 */}
      <div className="flex flex-col gap-4">
        {articles.map((article) => (
          <article
            key={article._id}
            className="
              rounded-2xl bg-white border border-neutral-100 shadow-sm
              p-6
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-md hover:border-neutral-200/80
            "
          >
            <h3 className="text-lg font-semibold text-neutral-800 mb-2">
              {article.title?.[language] || '這篇文章尚未設定此語言標題'}
            </h3>
            <p className="text-neutral-500 text-sm">
              {language === 'it' ? '義大利文內容區塊' : '英文內容區塊'}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
