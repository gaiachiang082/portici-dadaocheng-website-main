import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useLocalizedHref } from "@/contexts/LangContext";

const serviceTiers = [
  {
    title: "市場情報與文化轉譯",
    subtitle: "適合需要義大利市場 briefing 與敘事對齊的品牌",
    description:
      "為台灣品牌進行義大利市場 briefing，將你的產品優勢翻譯成當地買家聽得懂的商業邏輯。",
    cta: "預約免費諮詢",
    tone: "bg-background",
  },
  {
    title: "展會策展與商務交流",
    subtitle: "適合即將參與歐洲展會或商務行程的團隊",
    description:
      "帶領台灣企業前進歐洲，從行程設計、暖場介紹到展會現場的跨文化溝通支援。",
    cta: "了解進場方案",
    tone: "bg-muted/35",
  },
  {
    title: "買家探索與商務推進",
    subtitle: "適合已有名單或洽談線索、需要推進節奏的品牌",
    description:
      "從前期名單篩選到會後追蹤，解決文化誤差，協助將初步洽談推進至樣品或試單階段。我們不只是提供公司名單，我們協助你安排會議、修飾說法、處理跟進，填補台灣製造與義大利採購之間的文化與節奏落差。",
    cta: "討論商務推進",
    tone: "bg-background",
  },
] as const;

export default function ServiziZH() {
  const localizedHref = useLocalizedHref();

  return (
    <main className="bg-background">
      <section className="pt-32 pb-18 md:pb-20 px-6 md:px-10 border-b border-border">
        <div className="container max-w-5xl mx-auto text-center">
          <h1
            className="font-medium text-foreground mb-5"
            style={{
              fontFamily: "'Spectral', Georgia, serif",
              fontSize: "clamp(2rem, 4.6vw, 3.1rem)",
              fontWeight: 500,
              lineHeight: 1.15,
            }}
          >
            為你的品牌，量身打造進入義大利的每一步
          </h1>
          <p
            className="text-[1.05rem] md:text-[1.2rem] text-muted-foreground leading-[1.8] max-w-3xl mx-auto"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            無論你是剛開始探索，還是準備全力進場，我們都有對應的服務方案
          </p>
        </div>
      </section>

      {serviceTiers.map((tier) => (
        <section key={tier.title} className={`${tier.tone} py-16 md:py-20 px-6 md:px-10 border-b border-border/60`}>
          <div className="container max-w-5xl mx-auto">
            <div className="grid md:grid-cols-[1fr_auto] gap-8 items-end">
              <div>
                <p className="text-[12px] uppercase tracking-[0.2em] text-muted-foreground mb-3" style={{ fontFamily: "var(--font-ui)" }}>
                  服務方案
                </p>
                <h2
                  className="font-medium text-foreground mb-3"
                  style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "clamp(1.55rem,3vw,2.1rem)" }}
                >
                  {tier.title}
                </h2>
                <p className="text-[15px] text-foreground/85 mb-4" style={{ fontFamily: "var(--font-ui)" }}>
                  {tier.subtitle}
                </p>
                <p
                  className="text-[16px] text-muted-foreground leading-[1.8] max-w-3xl"
                  style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
                >
                  {tier.description}
                </p>
              </div>
              <Link
                href={localizedHref("/contatti")}
                className="inline-flex items-center gap-2 rounded-sm bg-foreground text-background px-5 py-3 text-[14px] font-medium hover:opacity-90 transition-opacity"
              >
                {tier.cta}
                <ArrowRight size={15} aria-hidden />
              </Link>
            </div>
          </div>
        </section>
      ))}

      <section className="py-16 md:py-20 px-6 md:px-10 bg-forest text-[var(--paper)]">
        <div className="container max-w-4xl mx-auto text-center">
          <h2
            className="font-medium mb-4"
            style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "clamp(1.6rem,3.3vw,2.2rem)" }}
          >
            不確定哪個方案適合你？
          </h2>
          <p className="text-[16px] md:text-[17px] text-[color-mix(in_srgb,var(--paper)_85%,transparent)] mb-7 leading-[1.8]">
            我們提供免費 30 分鐘諮詢，幫你找到最適合的起點。
          </p>
          <Link
            href={localizedHref("/contatti")}
            className="inline-flex items-center gap-2 rounded-sm bg-[var(--paper)] text-forest px-5 py-3 text-[14px] font-medium hover:opacity-90 transition-opacity"
          >
            預約免費諮詢
            <ArrowRight size={15} aria-hidden />
          </Link>
        </div>
      </section>
    </main>
  );
}
