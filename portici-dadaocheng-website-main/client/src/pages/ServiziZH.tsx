import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useLocalizedHref } from "@/contexts/LangContext";

const serviceTiers = [
  {
    title: "市場探索與諮詢",
    subtitle: "適合剛開始了解的品牌",
    description:
      "從市場可行性分析、競品研究到品牌切入建議，協助你快速判斷義大利市場的機會與風險。",
    cta: "預約免費諮詢",
    tone: "bg-background",
  },
  {
    title: "品牌進場與展會對接",
    subtitle: "適合準備參與展會的品牌",
    description:
      "規劃展會參與策略、現場敘事與媒體曝光節奏，讓品牌在關鍵場域中被看見、被記住。",
    cta: "了解進場方案",
    tone: "bg-muted/35",
  },
  {
    title: "代理與長期經營",
    subtitle: "適合想深耕的品牌",
    description:
      "從通路對接到長期推廣佈局，建立可持續的在地合作關係，推進品牌在義大利的穩定成長。",
    cta: "討論長期合作",
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
