# Portici DaDaocheng — Project TODO

## 品牌視覺系統 (Brand Visual System)
- [x] 設定全域 CSS 變數（色彩、字體、間距）
- [x] 引入 Google Fonts：Spectral、Source Serif Pro、Inter
- [x] 建立 Navigation 元件（桌機 top nav + 手機 hamburger menu）
- [x] 建立 Footer 元件

## 主要頁面 (Core Pages)
- [x] Homepage：Hero、Featured Workshop、Featured Articles、Newsletter Signup 區塊
- [x] Chi Siamo（關於我們）頁面
- [x] Workshop（工作坊）列表頁
- [ ] Workshop 單一活動詳細頁（含報名流程）
- [x] Articoli（線上文章）列表頁
- [ ] Articolo 單篇文章詳細頁
- [x] Spazio（快閃空間）資訊頁
- [x] Contatti（聯絡）頁面
- [ ] 404 Not Found 頁面

## 工作坊報名系統 (Workshop Booking)
- [ ] 資料庫 Schema：workshops、bookings、points
- [ ] 後端 tRPC：工作坊 CRUD、報名、取消、點數邏輯
- [ ] Stripe 整合：線上付 50% 訂金
- [ ] 取消政策：前一日免費取消，或轉為點數
- [ ] 點數系統：點數餘額查詢、用點數報名
- [ ] 現場付清尾款：後台手動標記已付清
- [ ] 報名確認 Email 通知

## 線上文章系統 (Articles / Blog)
- [ ] 資料庫 Schema：articles、categories
- [ ] 後端 tRPC：文章 CRUD、分類篩選
- [ ] 前端：文章列表、單篇閱讀頁

## 電子報訂閱 (Newsletter)
- [ ] 資料庫 Schema：newsletter_subscribers
- [ ] 後端 tRPC：訂閱 / 取消訂閱
- [ ] 前端：Homepage Newsletter Signup 區塊

## 管理員後台 (Admin Dashboard)
- [ ] 工作坊管理（新增、編輯、下架）
- [ ] 報名名單管理（查看、標記尾款已付）
- [ ] 文章管理（新增、編輯、發布）
- [ ] 電子報訂閱者管理

## 商城（暫緩，稍後開放）
- [ ] 資料庫 Schema：products、orders、order_items（預建，前端暫隱藏）
- [ ] 商品管理後台
- [ ] 商城前端頁面
- [ ] 取貨 / 配送邏輯
- [ ] 商城 Stripe 金流

## SEO 與效能
- [ ] Meta tags、OG image 設定
- [ ] 響應式設計（手機、平板、桌機）
- [ ] 圖片最佳化

## 品牌規範修正 (Brand Compliance Fixes)
- [x] 視覺：Hero 背景改為純 Ink Grey (#3D3D3D)，移除裝飾紋理背景（指南要求 30-40% 空白，不使用裝飾紋理）
- [ ] 視覺：色彩比例修正為 75% Moon White / 20% Ink Grey / 5% Ochre，避免 Ochre 過度使用
- [x] 視覺：字體尺寸修正 — H1 Homepage 應為 48px，H2 應為 32px，H3 改用 Inter 24px SemiBold，Body 18px Source Serif Pro
- [x] 視覺：Navigation 字體改為 Inter 15px Regular（指南明確規定）
- [x] 視覺：Button 字體改為 Inter 16px SemiBold
- [ ] 視覺：Ochre Brown 不應作為大面積背景（Hero 按鈕 OK，但不能用於整個 section 背景）
- [x] Brand Voice：移除所有「✓」「✗」等符號列表（指南明確說明不使用 emoji 和符號）
- [ ] Brand Voice：Homepage Hero tagline 應完全符合指南原文："Dove culture diverse interpretano la stessa cosa in modi sorprendentemente diversi"（已符合）
- [x] Brand Voice：Workshop 頁面的 CTA 文案改為 Explorer 語氣，不使用『ISCRIVITI ORA!』等強迫推銷語氣
- [ ] Brand Voice：Newsletter section 的 copy 應完全符合指南原文（已大致符合，需細校）
- [ ] 視覺：Homepage Newsletter section 背景應為 Mulberry Paper (#E8DCC6)（已符合）
- [ ] 視覺：Hero section 需要 full-width image 佔位，而非純色背景（指南要求 Full-width image 1920×1080px）
- [ ] 視覺：Spacing system 需基於 8px 倍數（8, 16, 24, 32, 48, 64, 96, 128px）
- [x] Brand Voice：Chi Siamo 頁面的五個 Values 改為段落描述，不用 bullet points
- [ ] 視覺：Logo 區域需加入 clear space（指南要求 25% 高度的安全距離）
- [ ] Brand Voice：Contatti 頁面 Subject 下拉選單選項文案改為 Brand Voice 語氣

## 動態風格優化 (Animation & Motion — 競品分析後)
- [x] Hero：加入 Parallax 滾動效果（背景 0.35x 速度）
- [x] Hero：H1 標題文字分行 staggered 漸入動畫
- [x] Hero：右側加入直式漢字裝飾元素（垂直排列：異同門茶道）
- [x] Hero：加入全幅暗色漸層佔位（等待真實攝影）
- [x] Scroll Reveal：各 Section 元素進入視窗時 fade-in + translateY（useScrollReveal hook）
- [x] BrandStory：加入水墨質感漸層背景
- [x] 工作坊卡片：hover 時圖片輕微放大 + 陰影加深
- [x] Navigation：頁面載入時從上方滑入動畫
- [x] CTA 按鈕：hover 微動畫（gap 擴展 + opacity）
- [x] 文章卡片：hover 時上移 -1.5 + 陰影加深 + ArrowRight 位移

## 圓拱門造型 & 真實照片整合
- [x] 上傳四張照片至 CDN，取得公開 URL
- [x] Hero：以茶道工作坊照片（戶外草地）作為全幅背景，加深色遮罩
- [x] Hero：加入圓拱門 SVG 框架作為裝飾元素
- [x] FeaturedWorkshop：以竹盤茶具靜物照置入圖片區
- [x] BrandStory：以茶點靜物照置入，套用 ArchImage 圓拱門造型
- [x] 建立可重複使用的 ArchFrame 元件（ArchFrame / ArchImage / ArchDecor / ArchDivider）
- [x] 新增 Arch Gallery Strip 區塊：三個圓拱門圖片排列，展示品牌核心意象
- [x] Footer：加入 ArchDecor 圓拱門裝飾元素

## 輪播動畫 & 拱門尺寸調整
- [x] 上傳 11 張新照片至 CDN
- [x] 主頁加入全幅自動左滑輪播（含所有照片，含淡入標籤文字）
- [x] Arch Gallery Strip：拱門放大（max-w 從 220px 改為 300px/340px），gap 縮減
- [x] Arch Gallery Strip：中間拱門更高，左右拱門略矮，視覺節奏更明顯

## Hero 雙城背景 & 照片排版重設計
- [x] 上傳 10 張新照片（書法工作坊、水墨畫、大稻埕建築、波隆那 Portici）至 CDN
- [x] Hero 背景改為大稻埕亭仔腳（左）+ 波隆那 Portici（右）雙圖分割，中間金色分隔線
- [x] Hero 加入雙城標籤（大稻埕 / Bologna）
- [x] 新增 WorkshopSection：三個 alternating text/photo 排版（書法、水墨、飲食文化）
- [x] 新增 DualCitySection：大稻埕 vs Bologna 全幅雙欄對比
- [x] Workshop 輪播：10 張書法/水墨/茶道工作坊照片
- [x] Gallery 輪播更新至 15 張（含新建築與工作坊照片）
- [x] Arch Gallery Strip 改用大稻埕亭仔腳、波隆那 Portici、廟宇屋頂三張建築照片

## Hero 修正 & 新功能
- [x] Hero 左側圖片修正為大稻埕亭仔腳（紅磚拱廊），右側為波隆那 Portici
- [x] Hero 改為自動輪播淡出淡入效果（多張背景圖自動切換）
- [x] 飲食文化區塊下方新增可點擊展開的詳細菜單內容（accordion）——已依用戶要求刪除
- [x] 書法水墨工作坊新增「查看所有課程照片」按鈕，點擊後進入課程圖片展示頁面
- [x] 新增 /workshop/calligraphy 課程圖片頁面

## 工作坊報名系統 & Hero 修正
- [x] Hero 城市標籤移至左右圖片正中央上方，避免與主文字重疊
- [x] 資料庫 Schema：workshops、bookings 表
- [x] 後端 tRPC：工作坊列表、建立報名、查詢報名
- [x] 前端報名流程：選日期 → 填資料 → 確認
- [x] Stripe 整合：付 50% 訂金
- [x] 報名確認頁面

## Bug 修正 (2026-02-22)
- [x] 刪除 Hero 左右城市標籤（大稻埕 / Bologna 標籤與主文字重疊）
- [x] 修復 /workshops 頁面：移除「Sistema di prenotazione in arrivo!」佔位文字，接通真實後端資料（問題根源：連結到舊的 /workshop 佔位頁，已全面修正為 /workshops）
- [x] 確認 tRPC workshopsRouter 正確掛載於 appRouter

## 視覺編輯套用 (2026-02-22 第二批)
- [ ] 遮罩修正：右側 Bologna 遮罩延展覆蓋亮色底圖（移除固定寬高，改用正確 inset 遮罩）
- [ ] 字體放大：「Momenti dai Workshop」標籤從 12px 改為合理大小（約 13-14px，31px 過大）
- [ ] 字體放大：「Vedi tutti i workshop」連結從 15px 改為 25px
- [ ] 移除圖片：第 723 行的 img src 清空（移除該圖片）
- [x] Section 移至 Spazio 分頁：GalleryCarousel 已移至 Spazio 頁面（PhotoCarousel 共用元件）
- [x] DualCitySection 移至 Chi Siamo 分頁：已移至 Chi Siamo 頁面
- [ ] padding 修正：DualCitySection container 的 paddingTop 改為 32px，paddingBottom 改為 0

## 工作坊系統修復 & Stripe Webhook (2026-02-22)
- [x] 修復 /workshop 頁面「Prenota il tuo posto」按鈕：改為連接真實資料庫並導向報名流程
- [x] 工作坊報名系統加入篩選器：按日期（月份）與課程類型篩選
- [x] 新增 Stripe Webhook Express 路由 /api/stripe/webhook
- [x] Webhook 處理 checkout.session.completed 事件：更新 booking paymentStatus 為 deposit_paid、status 為 confirmed、更新 spotsBooked
- [x] 新增 STRIPE_WEBHOOK_SECRET 環境變數用於驗證 Webhook 簽名（已自動注入）

## 品牌色彩/字型更新 & Calendario 修復 (2026-02-22 v2)
- [x] 確認 Calendario 頁面路由：導覽列「Workshop」已修復指向 /workshop（Calendario + 篩選器頁面）
- [x] 依品牌手冊 v2.0 更新全站主色：Rengairo #a2482b 為主角（H1、CTA、hero section）
- [x] Ochre Brown #A67C52 降為支援色（H2/H3、次要元素）
- [x] 字型系統：Ojuju Bold 用於大標題、Noto Sans SemiBold 用於 UI 標籤、Source Serif 4 用於內文
- [x] 更新 Navigation.tsx：active tab 用 Rengairo、hover 用 Rengairo（主要 CTA 按鈕改為 Rengairo）
- [x] 更新首頁 Hero Section：標題用 Rengairo（符合品牌「H1 always Rengairo」原則）
- [x] 更新 CTA 按鈕：主要 CTA 改為 Rengairo 底色

## Logo 整合 (2026-02-22 v4)
- [x] AI 生成高品質 Logo：圓拱門圖騰 + PORTICI DADAOCHENG 文字，透明背景
- [x] 生成白色版本（深色背景用）與圖騰圖標版本
- [x] 上傳至 CDN，整合至 Navigation（圖騰 + 文字組合）
- [x] 整合至 Footer（白色版本，深色背景）
- [x] 整合至 Hero 右側裝飾區塊（半透明圖騰）

## 全站品牌色彩 v2.0 完整更新 + 後台 + Newsletter + Email (2026-02-22 v3)
- [x] 全面更新 ChiSiamo.tsx 至品牌色彩 v2.0（Rengairo CTA、Ochre 標籤）
- [x] 全面更新 Articoli.tsx 至品牌色彩 v2.0
- [x] 全面更新 Spazio.tsx 至品牌色彩 v2.0
- [x] 全面更新 Contatti.tsx 至品牌色彩 v2.0
- [x] 全面更新 Workshops.tsx 至品牌色彩 v2.0
- [x] 建立管理員後台 /admin：報名記錄列表（含付款狀態篩選）
- [x] /admin：手動標記現場尾款已付清（fully_paid）
- [x] /admin：新增/停用工作坊場次
- [x] /admin：角色保護（adminProcedure，只有 admin 可存取）
- [x] Newsletter schema 新增 subscribers 資料表
- [x] Newsletter tRPC subscribe/unsubscribe procedure
- [x] Newsletter 首頁與 Footer 表單接通後端
- [x] Newsletter 整合 Resend 發送歡迎信
- [x] Stripe Webhook 加入 Resend Email 確認信（含工作坊日期、地點、確認碼）

## Logo Hero 整合 (2026-02-23)
- [x] 上傳白色完整版 Logo（含文字）至 CDN
- [x] Hero 區塊加入白色完整版 Logo 大圖（非透明），對齊背景拱廊
- [x] Navigation 改用白色完整版 Logo（含文字）在深色背景時
