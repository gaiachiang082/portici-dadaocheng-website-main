import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useLocalizedHref } from "@/contexts/LangContext";

type CaseStudy = {
  brand: string;
  industry: string;
  challenge: string;
  result: string;
};

const CASE_STUDIES: CaseStudy[] = [
  {
    brand: "台灣文化日參與品牌 A",
    industry: "工藝",
    challenge: "如何在米蘭讓當地認識台灣品牌",
    result: "獲得超過 500 次品牌接觸",
  },
  {
    brand: "台灣文化日參與品牌 B",
    industry: "設計",
    challenge: "缺乏義大利在地資源",
    result: "成功建立在地社群媒體曝光",
  },
];

export default function CasiStudioZH() {
  const localizedHref = useLocalizedHref();

  return (
    <main className="bg-background">
      <section className="pt-32 pb-16 md:pb-20 px-6 md:px-10 border-b border-border">
        <div className="container max-w-5xl mx-auto text-center">
          <h1
            className="font-medium text-foreground mb-5"
            style={{
              fontFamily: "'Spectral', Georgia, serif",
              fontSize: "clamp(2rem, 4.5vw, 3rem)",
              fontWeight: 500,
              lineHeight: 1.15,
            }}
          >
            他們選擇了義大利，我們陪他們走每一步
          </h1>
          <p
            className="text-[1.05rem] md:text-[1.2rem] text-muted-foreground leading-[1.8] max-w-3xl mx-auto"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            從台灣到歐洲，這些品牌的故事或許就是你的下一章
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6 md:px-10 bg-background">
        <div className="container max-w-5xl mx-auto space-y-6">
          {CASE_STUDIES.map((item) => (
            <article key={item.brand} className="border border-border rounded-2xl bg-card p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <h2 className="text-[1.35rem] text-foreground" style={{ fontFamily: "'Spectral', Georgia, serif" }}>
                  {item.brand}
                </h2>
                <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                  {item.industry}
                </span>
              </div>
              <div className="space-y-3 text-[15px] leading-[1.75]" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                <p className="text-foreground/90">
                  <span className="font-semibold text-foreground">挑戰：</span>
                  {item.challenge}
                </p>
                <p className="text-foreground/90">
                  <span className="font-semibold text-foreground">成果：</span>
                  {item.result}
                </p>
              </div>
              <a
                href="#"
                className="mt-6 inline-flex items-center gap-2 text-[14px] text-primary font-medium hover:opacity-80 transition-opacity"
              >
                閱讀完整故事
                <ArrowRight size={14} aria-hidden />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-16 md:pb-20 px-6 md:px-10 bg-background">
        <div className="container max-w-5xl mx-auto">
          <div className="rounded-2xl bg-forest text-[var(--paper)] px-7 py-10 md:px-10 md:py-12 text-center">
            <h2
              className="font-medium mb-6"
              style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "clamp(1.5rem,3vw,2rem)" }}
            >
              你的品牌故事，想從哪裡開始？
            </h2>
            <Link
              href={localizedHref("/contatti")}
              className="inline-flex items-center gap-2 rounded-sm bg-[var(--paper)] text-forest px-5 py-3 text-[14px] font-medium hover:opacity-90 transition-opacity"
            >
              與我們討論
              <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
