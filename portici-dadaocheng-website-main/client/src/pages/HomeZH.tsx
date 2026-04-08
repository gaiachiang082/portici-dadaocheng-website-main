import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { useLang, useLocalizedHref } from "@/contexts/LangContext";
import { ArticleCard, ArticleCardSkeleton, type ArticlePreview } from "@/components/ArticlePreviewCard";
import { ARTICLES_LATEST_THREE_QUERY } from "@/sanity/articleQueries";
import heroImage from "@/assets/images/hero_zh_54_bologna.png";
import iconInsights from "@/assets/images/zh_service_1_insights.png";
import iconTradeShow from "@/assets/images/zh_service_2_tradeshow.png";
import iconDiscovery from "@/assets/images/zh_service_3_discovery.png";
import { client } from "../SanityClient";

function HeroSection() {
  const localizedHref = useLocalizedHref();

  return (
    <section className="pt-[7.75rem] pb-16 md:pt-[8.5rem] md:pb-20 px-6 md:px-10 bg-background border-b border-border">
      <div className="container max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
          <div>
            <p
              className="text-[12px] uppercase tracking-[0.2em] text-muted-foreground mb-5"
              style={{ fontFamily: "var(--font-ui)" }}
            >
              Taiwan × Italy Market Entry
            </p>
            <h1
              className="font-medium text-foreground leading-tight mb-5"
              style={{
                fontFamily: "'Spectral', Georgia, serif",
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                fontWeight: 500,
              }}
            >
              在義大利推廣台灣品牌的專業夥伴
            </h1>
            <p
              className="text-[1.05rem] md:text-[1.2rem] text-foreground/90 leading-relaxed mb-4"
              style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
            >
              為台灣品牌量身打造的跨文化商務轉譯與推進——我們能將大型展會與公單位的名單，轉化為真正能往前走的商務推進。
            </p>
            <p
              className="text-[16px] text-muted-foreground leading-[1.75] mb-8 max-w-2xl"
              style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
            >
              結合在地深耕與台灣文化基因，協助品牌把產品敘事轉成當地買家聽得懂的邏輯，並在展會與採購節奏之間補上文化落差，讓洽談從「拿到聯絡方式」一路推進到可執行的下一步。
            </p>
            <Link
              href={localizedHref("/contatti")}
              className="inline-flex items-center gap-2 rounded-sm bg-foreground text-background px-5 py-3 text-[14px] md:text-[15px] font-medium hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
              style={{ fontFamily: "var(--font-ui)" }}
            >
              想把品牌帶進義大利？從這裡開始
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>

          <div className="border border-border bg-[var(--paper-warm)] p-6 md:p-8">
            <div className="aspect-[5/4] w-full">
              <img
                src={heroImage}
                alt="台灣顧問與義大利買家於波隆納 Due Torri 露台握手簽約"
                className="w-full h-full object-cover rounded-sm border border-border"
              />
            </div>
            <ul className="mt-6 space-y-3">
              {[
                "市場情報與文化轉譯，對齊義大利買家思維",
                "展會策展與現場跨文化溝通支援",
                "買家探索與商務推進，從洽談到樣品／試單節奏",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-[14px] text-foreground/90">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary" aria-hidden />
                  <span style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSnapshotSection() {
  return (
    <section className="py-16 md:py-20 px-6 md:px-10 bg-background border-b border-border/60" aria-labelledby="zh-home-services-heading">
      <div className="container max-w-6xl mx-auto">
        <h2
          id="zh-home-services-heading"
          className="font-medium text-foreground mb-8 md:mb-10"
          style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
        >
          核心服務快覽
        </h2>
        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {[
            {
              title: "市場情報與諮詢",
              desc: "為台灣品牌進行義大利市場 briefing，將你的產品優勢翻譯成當地買家聽得懂的商業邏輯。",
            },
            {
              title: "品牌進場與展會對接",
              desc: "帶領台灣企業前進歐洲，從行程設計、暖場介紹到展會現場的跨文化溝通支援。",
            },
            {
              title: "代理與長期經營",
              desc: "從前期名單篩選到會後追蹤，解決文化誤差，協助將初步洽談推進至樣品或試單階段。",
            },
          ].map(({ title, desc }) => {
            const iconSrc =
              title === "市場情報與諮詢"
                ? iconInsights
                : title === "品牌進場與展會對接"
                  ? iconTradeShow
                  : iconDiscovery;
            const iconAlt =
              title === "市場情報與諮詢"
                ? "市場情報與文化轉譯圖示"
                : title === "品牌進場與展會對接"
                  ? "展會策展與商務交流圖示"
                  : "買家探索與商務推進圖示";

            return (
            <article key={title} className="border border-border bg-[var(--paper-warm)]/55 p-6 md:p-7 min-h-[220px] flex flex-col">
              <div className="mb-6 flex justify-center">
                <img src={iconSrc} alt={iconAlt} className="w-16 h-16 object-contain" />
              </div>
              <h3
                className="text-[1.2rem] text-foreground leading-snug mb-4"
                style={{ fontFamily: "'Spectral', Georgia, serif" }}
              >
                {title}
              </h3>
              <p className="text-[15px] text-muted-foreground leading-[1.7] flex-1" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                {desc}
              </p>
              <a href="#" className="mt-6 inline-flex items-center gap-1.5 text-[14px] text-primary hover:opacity-80 transition-opacity" style={{ fontFamily: "var(--font-ui)" }}>
                了解更多 <ArrowRight size={14} aria-hidden />
              </a>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TrustWallSection() {
  return (
    <section className="py-14 md:py-16 px-6 md:px-10 bg-muted/35 border-b border-border/60" aria-labelledby="zh-home-trust-heading">
      <div className="container max-w-6xl mx-auto">
        <h2
          id="zh-home-trust-heading"
          className="font-medium text-foreground mb-7"
          style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)" }}
        >
          信任我們的品牌與夥伴
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-5">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="aspect-square rounded-full border border-border bg-muted/70 flex items-center justify-center">
              <span className="text-[12px] text-muted-foreground" style={{ fontFamily: "var(--font-ui)" }}>
                Logo {i + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCaseStudySection() {
  const localizedHref = useLocalizedHref();

  return (
    <section className="py-16 md:py-20 px-6 md:px-10 bg-background border-b border-border/60" aria-labelledby="zh-home-case-heading">
      <div className="container max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-10 items-start">
        <div className="aspect-[4/3] w-full border border-border bg-muted/50 flex items-center justify-center">
          <span className="text-sm text-muted-foreground" style={{ fontFamily: "var(--font-ui)" }}>
            精選案例主圖（佔位）
          </span>
        </div>
        <div>
          <h2
            id="zh-home-case-heading"
            className="font-medium text-foreground mb-5"
            style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "clamp(1.5rem, 2.8vw, 2rem)" }}
          >
            協助 [某台灣品牌] 成功進軍米蘭
          </h2>
          <ul className="space-y-3 text-[15px] text-foreground/90 leading-[1.75]" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
            <li>
              <span className="font-semibold text-foreground">挑戰：</span>品牌在地認知低、通路資源分散，進場策略不清晰。
            </li>
            <li>
              <span className="font-semibold text-foreground">我們的行動：</span>建立市場定位、媒合展會與通路夥伴，設計分階段推廣計畫。
            </li>
            <li>
              <span className="font-semibold text-foreground">成果：</span>完成首波曝光與商務洽談，啟動穩定的義大利市場拓展節奏。
            </li>
          </ul>
          <Link
            href={localizedHref("/articoli")}
            className="mt-7 inline-flex items-center gap-1.5 text-[15px] font-medium text-primary hover:opacity-80 transition-opacity"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            觀看完整案例 <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

function MarketInsightsSection() {
  const lang = useLang();
  const localizedHref = useLocalizedHref();
  const [articles, setArticles] = useState<ArticlePreview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        const data = await client.fetch<ArticlePreview[]>(ARTICLES_LATEST_THREE_QUERY, { lang });
        if (!cancelled) {
          setArticles(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("MarketInsightsSection fetch error:", err);
        if (!cancelled) {
          setArticles([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [lang]);

  if (!loading && articles.length === 0) return null;

  return (
    <section className="py-16 md:py-20 px-6 md:px-10 bg-muted/40 border-b border-border/60" aria-labelledby="zh-home-insights-heading">
      <div className="container max-w-7xl mx-auto">
        <h2
          id="zh-home-insights-heading"
          className="font-medium text-foreground mb-8"
          style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
        >
          義大利市場最新情報
        </h2>
        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3 lg:gap-8">
          {loading
            ? Array.from({ length: 3 }, (_, i) => <ArticleCardSkeleton key={i} />)
            : articles.map((article) => <ArticleCard key={article._id} article={article} />)}
        </div>
        <div className="mt-10">
          <Link
            href={localizedHref("/articoli")}
            className="inline-flex items-center gap-1.5 text-[15px] font-medium text-primary hover:opacity-80 transition-opacity"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            查看更多市場洞察
            <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  const localizedHref = useLocalizedHref();

  return (
    <section className="py-16 md:py-20 px-6 md:px-10 bg-forest text-[var(--paper)]">
      <div className="container max-w-5xl mx-auto text-center">
        <h2
          className="font-medium mb-6"
          style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "clamp(1.8rem, 3.8vw, 2.6rem)" }}
        >
          準備好讓世界看見你的品牌了嗎？
        </h2>
        <Link
          href={localizedHref("/contatti")}
          className="inline-flex items-center gap-2 rounded-sm bg-[var(--paper)] text-forest px-6 py-3 text-[15px] font-medium hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--paper)]"
          style={{ fontFamily: "var(--font-ui)" }}
        >
          免費預約諮詢
          <ArrowRight size={16} aria-hidden />
        </Link>
      </div>
    </section>
  );
}

export default function HomeZH() {
  return (
    <main>
      <HeroSection />
      <ServicesSnapshotSection />
      <TrustWallSection />
      <FeaturedCaseStudySection />
      <MarketInsightsSection />
      <FinalCtaSection />
    </main>
  );
}
