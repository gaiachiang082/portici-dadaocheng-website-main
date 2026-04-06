import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ArrowRight, MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { useLocalizedHref } from "@/contexts/LangContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const formFieldClass =
  "w-full px-4 py-3 text-sm bg-background border border-input text-foreground placeholder:text-muted-foreground rounded-xl resize-none transition-all duration-300 focus:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20";

const SERVICE_OPTIONS = [
  "市場情報與文化轉譯",
  "展會策展與商務交流",
  "買家探索與商務推進",
  "還不確定",
] as const;

const contactZhSchema = z.object({
  brandName: z.string().min(1, "請填寫品牌名稱").max(256, "品牌名稱過長"),
  name: z.string().min(1, "請填寫聯絡人姓名").max(256, "姓名過長"),
  email: z.string().email("請填寫有效 Email"),
  websiteOrIg: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),
  interestedService: z
    .string()
    .refine((value): value is (typeof SERVICE_OPTIONS)[number] => SERVICE_OPTIONS.includes(value as (typeof SERVICE_OPTIONS)[number]), {
      message: "請選擇最感興趣的服務",
    }),
  brief: z.string().max(4000, "說明內容過長").optional().or(z.literal("")),
});

type ContactZhFormValues = z.infer<typeof contactZhSchema>;

function buildMessagePayload(values: ContactZhFormValues): string {
  const websiteOrIg = values.websiteOrIg?.trim() || "未提供";
  const brief = values.brief?.trim() || "未提供";

  return [
    "【中文 B2B 聯絡表單】",
    `品牌名稱：${values.brandName.trim()}`,
    `品牌網站/IG：${websiteOrIg}`,
    `感興趣服務：${values.interestedService}`,
    `簡短說明：${brief}`,
  ].join("\n");
}

export default function ContattiZH() {
  const localizedHref = useLocalizedHref();
  const form = useForm<ContactZhFormValues>({
    resolver: zodResolver(contactZhSchema),
    defaultValues: {
      brandName: "",
      name: "",
      email: "",
      websiteOrIg: "",
      interestedService: undefined,
      brief: "",
    },
  });

  const submit = trpc.contact.submit.useMutation({
    onSuccess: () => {
      toast.success("訊息已送出", {
        description: "我們將在 3 個工作天內與你聯絡。",
      });
      form.reset();
    },
    onError: (err) => {
      toast.error(err.message || "送出失敗，請稍後再試。");
    },
  });

  const onSubmit = (values: ContactZhFormValues) => {
    const message = buildMessagePayload(values);

    submit.mutate({
      name: values.name.trim(),
      email: values.email.trim(),
      subject: "collaboration",
      message,
    });
  };

  const isSubmitting = submit.isPending;

  return (
    <main className="bg-background">
      <section className="pt-32 pb-14 px-6 md:px-10 border-b border-border bg-background">
        <div className="container max-w-5xl mx-auto">
          <p className="text-[12px] uppercase tracking-[0.22em] text-muted-foreground mb-4" style={{ fontFamily: "var(--font-ui)" }}>
            Contact
          </p>
          <h1
            className="font-medium text-foreground mb-5"
            style={{
              fontFamily: "'Spectral', Georgia, serif",
              fontSize: "clamp(2rem, 4.2vw, 3rem)",
              fontWeight: 500,
              lineHeight: 1.15,
            }}
          >
            讓我們聊聊你的品牌
          </h1>
          <p className="text-[17px] text-muted-foreground leading-[1.8] max-w-3xl" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
            填寫以下表單，我們將在 3 個工作天內與你聯絡，安排一次免費的 30 分鐘初步諮詢。
          </p>
        </div>
      </section>

      <section className="py-10 md:py-12 px-6 md:px-10 border-b border-border/60 bg-muted/25">
        <div className="container max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {["1. 填寫表單", "2. 需求確認", "3. 免費初步諮詢", "4. 客製化提案"].map((step, idx) => (
              <div key={step} className="rounded-xl border border-border bg-card px-4 py-4 text-center">
                <p className="text-xs text-muted-foreground mb-1" style={{ fontFamily: "var(--font-ui)" }}>
                  STEP {idx + 1}
                </p>
                <p className="text-sm text-foreground" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                  {step.replace(/^\d+\.\s/, "")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 px-6 md:px-10 bg-background">
        <div className="container max-w-5xl mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-10">
          <div className="bg-card rounded-2xl border border-border shadow-sm p-6 md:p-8">
            <h2
              className="font-medium text-foreground mb-7"
              style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "clamp(1.45rem,2.6vw,1.9rem)" }}
            >
              聯絡表單
            </h2>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2 tracking-wide">品牌名稱 *</label>
                <input
                  {...form.register("brandName")}
                  type="text"
                  autoComplete="organization"
                  placeholder="例如：某某茶飲 / 某某設計工作室"
                  className={formFieldClass}
                />
                {form.formState.errors.brandName && (
                  <p className="mt-1.5 text-xs text-destructive">{form.formState.errors.brandName.message}</p>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-2 tracking-wide">聯絡人姓名 *</label>
                  <input {...form.register("name")} type="text" autoComplete="name" placeholder="你的姓名" className={formFieldClass} />
                  {form.formState.errors.name && (
                    <p className="mt-1.5 text-xs text-destructive">{form.formState.errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-2 tracking-wide">Email *</label>
                  <input {...form.register("email")} type="email" autoComplete="email" placeholder="you@brand.com" className={formFieldClass} />
                  {form.formState.errors.email && (
                    <p className="mt-1.5 text-xs text-destructive">{form.formState.errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2 tracking-wide">品牌網站或 IG 連結</label>
                <input
                  {...form.register("websiteOrIg")}
                  type="text"
                  placeholder="https://... 或 instagram.com/..."
                  className={formFieldClass}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2 tracking-wide">目前最感興趣的服務 *</label>
                <select {...form.register("interestedService")} className={formFieldClass} defaultValue="">
                  <option value="" disabled>
                    請選擇一項
                  </option>
                  {SERVICE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {form.formState.errors.interestedService && (
                  <p className="mt-1.5 text-xs text-destructive">{form.formState.errors.interestedService.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2 tracking-wide">簡短說明品牌和需求</label>
                <textarea
                  {...form.register("brief")}
                  rows={5}
                  placeholder="目前的品牌定位、預計進場的產品線、希望我們協助的方向..."
                  className={formFieldClass}
                />
                {form.formState.errors.brief && (
                  <p className="mt-1.5 text-xs text-destructive">{form.formState.errors.brief.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="relative px-7 py-3.5 text-[15px] font-semibold bg-brand-cta text-brand-cta-foreground rounded-xl hover:opacity-90 transition-opacity disabled:opacity-75 disabled:cursor-not-allowed overflow-hidden"
              >
                {isSubmitting && (
                  <span className="absolute inset-0 flex items-center justify-center bg-brand-cta">
                    <Loader2 size={20} className="animate-spin text-brand-cta-foreground" />
                  </span>
                )}
                <span className={isSubmitting ? "invisible" : ""}>送出需求，預約免費諮詢</span>
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-[var(--paper-warm)] p-6 md:p-7">
              <h3 className="text-[1.1rem] font-medium text-foreground mb-3" style={{ fontFamily: "'Spectral', Georgia, serif" }}>
                你會收到什麼？
              </h3>
              <ul className="space-y-2 text-[14px] text-muted-foreground leading-[1.7]" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                <li>- 初步市場可行性判讀</li>
                <li>- 進場路徑建議（展會、通路、合作）</li>
                <li>- 下一步執行優先順序</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 md:p-7">
              <p className="text-sm text-muted-foreground mb-2">也可以直接聯絡</p>
              <a href="mailto:puchia.bologna@gmail.com" className="text-sm text-foreground hover:underline block">
                puchia.bologna@gmail.com
              </a>
              <a href="https://instagram.com/portici.dadaocheng" target="_blank" rel="noopener noreferrer" className="text-sm text-foreground hover:underline block mt-1">
                @portici.dadaocheng
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-14 px-6 md:px-10 bg-muted/30 border-y border-border/70">
        <div className="container max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--forest-deep)_18%,var(--border))] bg-gradient-to-br from-[#06C755]/[0.08] via-[var(--paper-warm)]/60 to-background p-6 md:p-8 shadow-sm">
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#06C755]/15 blur-2xl pointer-events-none" aria-hidden />
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-2" style={{ fontFamily: "var(--font-ui)" }}>
              LINE · B2B
            </p>
            <h2
              className="font-medium text-foreground mb-3 max-w-2xl"
              style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "clamp(1.35rem,2.4vw,1.75rem)" }}
            >
              習慣用 LINE 討論？加入我們的 B2B 商務交流專號
            </h2>
            <p className="text-[15px] md:text-[16px] text-muted-foreground leading-[1.8] max-w-2xl mb-6" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
              獲得第一手義大利展會情報、採購文化解析，或直接與我們進行快速的初步對焦。
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-xl bg-[#06C755] text-white px-5 py-3 text-[14px] font-semibold hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              style={{ fontFamily: "var(--font-ui)" }}
            >
              <MessageCircle size={18} aria-hidden className="shrink-0" />
              加入 LINE 官方帳號
            </a>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20 px-6 md:px-10 bg-background">
        <div className="container max-w-5xl mx-auto">
          <h2
            className="font-medium text-foreground mb-6"
            style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "clamp(1.35rem,2.5vw,1.7rem)" }}
          >
            常見問題
          </h2>
          <Accordion type="single" collapsible className="rounded-xl border border-border px-5 bg-card">
            <AccordionItem value="q1">
              <AccordionTrigger className="text-[15px]">我的品牌還很小，也適合找你們嗎？</AccordionTrigger>
              <AccordionContent className="text-[14px] text-muted-foreground leading-[1.75]">
                我們服務各種規模的品牌，從剛起步到已有規模都歡迎。重要的是你對義大利市場的熱情和準備。
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger className="text-[15px]">費用大概是多少？</AccordionTrigger>
              <AccordionContent className="text-[14px] text-muted-foreground leading-[1.75]">
                每個品牌的需求不同，初步諮詢完全免費，之後我們會根據你的需求提供客製化報價。
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger className="text-[15px]">你們在義大利有實體據點嗎？</AccordionTrigger>
              <AccordionContent className="text-[14px] text-muted-foreground leading-[1.75]">
                目前我們以線上服務為主，實體店鋪預計兩年後設立。線上模式讓我們能更靈活地服務各地品牌。
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-10 rounded-2xl bg-forest text-[var(--paper)] p-7 md:p-9 text-center">
            <h3 className="font-medium mb-4" style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "clamp(1.4rem,2.8vw,1.8rem)" }}>
              準備好開始了嗎？
            </h3>
            <a
              href={localizedHref("/contatti")}
              className="inline-flex items-center gap-2 rounded-sm bg-[var(--paper)] text-forest px-5 py-2.5 text-[14px] font-medium hover:opacity-90 transition-opacity"
            >
              回到表單頂部送出需求
              <ArrowRight size={15} aria-hidden />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
