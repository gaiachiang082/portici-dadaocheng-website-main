import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useLocalizedHref } from "@/contexts/LangContext";

const strengths = [
  {
    title: "義大利在地背景",
    description:
      "長期深耕義大利市場，熟悉在地商業節奏、展會資源與合作網絡，能把品牌需求快速對接到可執行的在地場景。",
    imageLabel: "在地資源與人脈（佔位圖）",
  },
  {
    title: "台灣文化基因",
    description:
      "理解台灣品牌在出海時常見的痛點與優勢，能把品牌語言、文化敘事與商業價值轉譯成義大利市場聽得懂的內容。",
    imageLabel: "台灣品牌洞察（佔位圖）",
  },
] as const;

const metrics = [
  {
    label: "累積合作品牌",
    value: "0",
    caption: "與台灣品牌並肩進場義大利市場的累積數（持續更新中）。",
  },
  {
    label: "策劃展會場次",
    value: "0",
    caption: "從文化日到商業展會的策劃與現場支援次數（持續累積）。",
  },
  {
    label: "在地媒體觸及",
    value: "0",
    caption: "透過在地曝光與社群擴散的品牌觸及（數據將隨專案補登）。",
  },
] as const;

export default function FondatriciZH() {
  const localizedHref = useLocalizedHref();

  return (
    <main className="bg-background">
      <section className="pt-32 pb-16 md:pb-20 px-6 md:px-10 border-b border-border">
        <div className="container max-w-5xl mx-auto text-center">
          <h1
            className="font-medium text-foreground mb-5"
            style={{
              fontFamily: "'Spectral', Georgia, serif",
              fontSize: "clamp(2rem, 4.6vw, 3rem)",
              fontWeight: 500,
              lineHeight: 1.15,
            }}
          >
            為什麼我們懂義大利，也懂台灣品牌
          </h1>
          <p
            className="text-[1.05rem] md:text-[1.2rem] text-muted-foreground leading-[1.8] max-w-3xl mx-auto"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            跨越 9000 公里的文化轉譯與商業對接
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6 md:px-10 bg-background border-b border-border/60">
        <div className="container max-w-6xl mx-auto space-y-12 md:space-y-16">
          {strengths.map((item, idx) => (
            <div
              key={item.title}
              className={`grid lg:grid-cols-2 gap-8 md:gap-10 items-center ${idx % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
            >
              <div className="aspect-[4/3] rounded-xl border border-border bg-muted/40 flex items-center justify-center">
                <span className="text-sm text-muted-foreground">{item.imageLabel}</span>
              </div>
              <div>
                <p className="text-[12px] uppercase tracking-[0.2em] text-muted-foreground mb-3" style={{ fontFamily: "var(--font-ui)" }}>
                  核心優勢
                </p>
                <h2
                  className="font-medium text-foreground mb-4"
                  style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "clamp(1.45rem,2.8vw,2rem)" }}
                >
                  {item.title}
                </h2>
                <p className="text-[16px] text-muted-foreground leading-[1.8]" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 md:py-16 px-6 md:px-10 bg-muted/30 border-b border-border/60">
        <div className="container max-w-5xl mx-auto grid md:grid-cols-3 gap-4 md:gap-5">
          {metrics.map((item) => (
            <div key={item.label} className="rounded-xl border border-border bg-card px-6 py-6 text-center flex flex-col">
              <p className="text-[2rem] font-medium text-foreground mb-1" style={{ fontFamily: "'Spectral', Georgia, serif" }}>
                {item.value}
              </p>
              <p className="text-sm font-medium text-foreground mb-2">{item.label}</p>
              <p className="text-xs text-muted-foreground leading-relaxed mt-auto">{item.caption}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-20 px-6 md:px-10 bg-forest text-[var(--paper)]">
        <div className="container max-w-4xl mx-auto text-center">
          <h2
            className="font-medium mb-6"
            style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "clamp(1.6rem,3.2vw,2.2rem)" }}
          >
            準備好邁出第一步了嗎？
          </h2>
          <Link
            href={localizedHref("/contatti")}
            className="inline-flex items-center gap-2 rounded-sm bg-[var(--paper)] text-forest px-5 py-3 text-[14px] font-medium hover:opacity-90 transition-opacity"
          >
            與我們聊聊
            <ArrowRight size={15} aria-hidden />
          </Link>
        </div>
      </section>
    </main>
  );
}
