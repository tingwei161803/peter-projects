/**
 * ============================================================
 *  專案資料層 — 最近一個月公開、有 GitHub Pages 的作品
 * ============================================================
 *
 *  這個檔案是「入口網頁」的唯一資料來源。app.js 會在執行時依
 *  SITE_CATEGORIES 的順序，把 SITE_DATA 自動分組成一個個卡片區段。
 *
 *  怎麼調整：
 *    1. 改分類順序 / 名稱 / 圖示 / 顏色：改 SITE_CATEGORIES。
 *    2. 換某專案的分類：改該筆的 category，要等於某個分類的 key。
 *    3. 改標題 / 說明：title、desc 都是 { zh, en } 雙語物件，兩個都改。
 *    4. 排除某筆：整個 { ... } 刪掉或前面加 //。
 *    5. 調某分類內的卡片順序：調整該筆在陣列中的位置。
 *
 *  ⚠️ category 必須等於 SITE_CATEGORIES 其中一個 key（字串完全相同）。
 *  ⚠️ 每個顯示字串都要有 zh 與 en 兩種，語言切換才不會殘留。
 * ------------------------------------------------------------
 */

// 網站整體資訊（hero 大標 / 瀏覽器標題 / 分享描述）。
window.SITE_META = {
  title: { zh: "Peter's Projects", en: "Peter's Projects" },
  subtitle: {
    zh: "Peter 公開上線的專案，依主題分類整理。",
    en: "Peter's public projects, sorted by theme.",
  },
  url: "https://tingwei161803.github.io/side-projects/",
  github: "https://github.com/tingwei161803",
  linkedin: "https://www.linkedin.com/in/ai-med/",
};

// 分類（顯示順序 = 這個陣列的順序）。
//   key    : SITE_DATA 用來歸類的字串
//   zh/en  : 區段標題（雙語）
//   icon   : Material Symbols 圖示名稱
//   accent : 該分類的主題色（卡片 hover、標題標記會用到）
window.SITE_CATEGORIES = [
  { key: "tech-event", zh: "科技活動", en: "Tech Events", icon: "festival", accent: "#2563EB" },
  { key: "ai-trend", zh: "AI 產業趨勢 / 報告", en: "AI Industry Trends & Reports", icon: "trending_up", accent: "#7C3AED" },
  { key: "startup", zh: "創業 / 商業", en: "Startup & Business", icon: "rocket_launch", accent: "#EA580C" },
  { key: "ai-app", zh: "AI 技術 / 應用", en: "AI Tech & Applications", icon: "smart_toy", accent: "#0D9488" },
  { key: "security", zh: "AI 安全 / 治理", en: "AI Security & Governance", icon: "security", accent: "#DC2626" },
  { key: "tools", zh: "工具 / 作品", en: "Tools & Works", icon: "build", accent: "#DB2777" },
];

// 21 個專案（已移除 colm-info、10-Job-Search-Rules、appwork-analysis、career-choice）。
// title / desc 已依各站「實際頁面內容」校正（非 repo 名推測）。
window.SITE_DATA = [
  // ── 科技活動 ──────────────────────────────────────────
  {
    id: "COMPUTEX-2026",
    category: "tech-event",
    title: { zh: "Computex + Innovex 2026", en: "Computex + Innovex 2026" },
    desc: {
      zh: "2026 台北國際電腦展 COMPUTEX 與新創特展 InnoVEX 重點整理，聚焦 AI 整合應用的產業趨勢與看點。",
      en: "Highlights from COMPUTEX 2026 and the InnoVEX startup expo, focused on AI integration trends across the industry.",
    },
    created: "2026-06-01",
    url: "https://tingwei161803.github.io/COMPUTEX-2026/",
  },
  {
    id: "medicaltaiwan-expo-2026",
    category: "tech-event",
    title: { zh: "Medical Taiwan 2026 醫療照護展", en: "Medical Taiwan 2026 Expo" },
    desc: {
      zh: "台灣國際醫療暨健康照護展第 20 屆（6/25–27 台北世貿一館）非官方雙語參觀導覽，聚焦創新長照、智慧醫療、醫材廊道三大主軸，約 330 家參展商。",
      en: "An unofficial bilingual visitor's guide to the 20th Medical Taiwan expo (Jun 25–27, TWTC Hall 1): innovative elder care, smart healthcare and a medical-device corridor, with ~330 exhibitors.",
    },
    created: "2026-06-08",
    url: "https://tingwei161803.github.io/medicaltaiwan-expo-2026/",
  },
  {
    id: "semicon-2026",
    category: "tech-event",
    title: { zh: "SEMICON Taiwan 2026", en: "SEMICON Taiwan 2026" },
    desc: {
      zh: "SEMICON Taiwan 2026「Transform Tomorrow」非官方雙語導覽（9/2–4 南港 TaiNEX 1 & 2）：1,300+ 參展商、4,300+ 攤位、200+ 講者與 25+ 國際論壇。",
      en: "An independent bilingual guide to SEMICON Taiwan 2026 — Transform Tomorrow (Sept 2–4, Taipei Nangang): 1,300+ exhibitors, 4,300+ booths, 200+ leaders and 25+ international forums.",
    },
    created: "2026-06-08",
    url: "https://tingwei161803.github.io/semicon-2026/",
  },

  // ── AI 產業趨勢 / 報告 ────────────────────────────────
  {
    id: "ai-index-report-2026",
    category: "ai-trend",
    title: { zh: "AI 指數報告 2026", en: "AI Index Report 2026" },
    desc: {
      zh: "史丹佛 AI Index 年度報告整理，追蹤全球 AI 發展的關鍵數據與趨勢。",
      en: "A digest of Stanford's annual AI Index, tracking the key data and trends in global AI.",
    },
    created: "2026-06-03",
    url: "https://tingwei161803.github.io/ai-index-report-2026/",
  },
  {
    id: "anthropic-agentic-coding-trend-2026",
    category: "ai-trend",
    title: { zh: "2026 代理式編程趨勢", en: "2026 Agentic Coding Trends" },
    desc: {
      zh: "拆解 2026 年 coding agent 如何重塑軟體開發的流程與工作方式。",
      en: "How coding agents are reshaping software development workflows in 2026.",
    },
    created: "2026-06-01",
    url: "https://tingwei161803.github.io/anthropic-agentic-coding-trend-2026/",
  },
  {
    id: "google-ai-agent-trends-2026",
    category: "ai-trend",
    title: { zh: "Google AI Agent 趨勢 2026", en: "Google AI Agent Trends 2026" },
    desc: {
      zh: "Google Cloud 報告的雙語摘要，整理 2026 年 AI agent 的五大關鍵轉變。",
      en: "A bilingual summary of Google Cloud's report on the five key shifts in AI agents for 2026.",
    },
    created: "2026-06-01",
    url: "https://tingwei161803.github.io/google-ai-agent-trends-2026/",
  },
  {
    id: "a16z-big-ideas",
    category: "ai-trend",
    title: { zh: "a16z 科技大點子圖鑑", en: "a16z Big Ideas" },
    desc: {
      zh: "匯整 a16z 對 2025–2026 年的 96 項科技預測，可分類查閱與現況驗證。",
      en: "96 tech predictions from a16z for 2025–2026, browsable by category with reality checks.",
    },
    created: "2026-05-26",
    url: "https://tingwei161803.github.io/a16z-big-ideas/",
  },

  // ── 創業 / 商業 ───────────────────────────────────────
  {
    id: "anthropic-the-founder-playbook",
    category: "startup",
    title: { zh: "Anthropic 創辦人手冊（導讀版）", en: "The Founder's Playbook · Reader's Edition" },
    desc: {
      zh: "AI 時代從構想 → MVP → 上線 → 規模化的四階段科技創業心法。",
      en: "A four-stage playbook for tech founders in the AI era: idea → MVP → launch → scale.",
    },
    created: "2026-05-19",
    url: "https://tingwei161803.github.io/anthropic-the-founder-playbook/",
  },
  {
    id: "startup-asvda-org",
    category: "startup",
    title: { zh: "創業綻放・創業大聯盟競賽", en: "Startup Bloom · Grand Alliance Contest" },
    desc: {
      zh: "非官方整理「創業綻放・創業大聯盟競賽」的百強入選企業與得獎名單。",
      en: "An unofficial roundup of the Top 100 finalists and winners of the Startup Bloom Grand Alliance Contest.",
    },
    created: "2026-05-31",
    url: "https://tingwei161803.github.io/startup-asvda-org/",
  },

  // ── AI 技術 / 應用 ────────────────────────────────────
  {
    id: "real-world-genai-use-cases",
    category: "ai-app",
    title: { zh: "全世界都在用 Gen AI 做的事", en: "What the World Is Doing with Gen AI" },
    desc: {
      zh: "數百家企業真實 GenAI 應用案例圖鑑，可依產業與 Agent 類型雙軸篩選。",
      en: "A gallery of real GenAI use cases from hundreds of companies, filterable by industry and agent type.",
    },
    created: "2026-05-21",
    url: "https://tingwei161803.github.io/real-world-genai-use-cases/",
  },
  {
    id: "codex-use-cases",
    category: "ai-app",
    title: { zh: "用 Codex 能做的每一件事", en: "Everything You Can Do with Codex" },
    desc: {
      zh: "OpenAI Codex 的 52 個使用情境中英對照圖鑑，含應用範例與提示詞。",
      en: "A bilingual gallery of 52 OpenAI Codex use cases, with examples and prompts.",
    },
    created: "2026-05-21",
    url: "https://tingwei161803.github.io/codex-use-cases/",
  },
  {
    id: "claude-small-business",
    category: "ai-app",
    title: { zh: "Claude for Small Business · 老闆白話導讀", en: "Claude for Small Business · Plain-Talk Guide" },
    desc: {
      zh: "為無 IT 小企業設計，用 15 個現成工作流自動化對帳、行銷、追款等行政工作。",
      en: "Built for IT-free small businesses: 15 ready-made workflows to automate reconciliation, marketing, collections and more.",
    },
    created: "2026-05-21",
    url: "https://tingwei161803.github.io/claude-small-business/",
  },
  {
    id: "Self-Improving-Company-with-AI",
    category: "ai-app",
    title: { zh: "用 AI 打造會自己進化的公司", en: "Building a Self-Improving Company with AI" },
    desc: {
      zh: "示範如何運用 AI 讓公司具備自動優化與持續進化的能力。",
      en: "How to use AI to give a company the ability to optimize and continuously improve itself.",
    },
    created: "2026-05-24",
    url: "https://tingwei161803.github.io/Self-Improving-Company-with-AI/",
  },
  {
    id: "dreaming-chatgpt-better-memory",
    category: "ai-app",
    title: { zh: "ChatGPT 做夢記憶系統", en: "ChatGPT's Dreaming Memory" },
    desc: {
      zh: "OpenAI 2026/6/4 推出的 ChatGPT「做夢（Dreaming）」記憶系統非官方雙語整理：背景同步、三代演進、效能、控制與隱私。",
      en: "An unofficial bilingual breakdown of ChatGPT's Dreaming memory system (launched Jun 4, 2026): background sync, three generations, performance, controls and privacy.",
    },
    created: "2026-06-05",
    url: "https://tingwei161803.github.io/dreaming-chatgpt-better-memory/",
  },
  {
    id: "agent-workflow-design",
    category: "ai-app",
    title: { zh: "Agent 工作流模式 · 六種 LLM 系統設計", en: "Agent Workflow Patterns · 6 LLM System Designs" },
    desc: {
      zh: "建構有效 LLM 系統的六種工作流／代理設計模式，佐證自 Anthropic、OpenAI、Google 等一手權威來源。",
      en: "Six workflow and agent patterns for building effective LLM systems, grounded in primary sources from Anthropic, OpenAI and Google.",
    },
    created: "2026-06-06",
    url: "https://tingwei161803.github.io/agent-workflow-design/",
  },
  {
    id: "ai-sandbox-system-design",
    category: "ai-app",
    title: { zh: "AI 安全沙盒架構", en: "AI Sandbox Architecture" },
    desc: {
      zh: "安全執行 AI 產生之不可信程式碼的沙盒系統架構：Linux Namespace、Seccomp-BPF、Cgroup 與 Timeout，含互動式元件、資料流與隔離機制總覽。",
      en: "A sandbox architecture for safely running untrusted, AI-generated code — Linux namespaces, seccomp-BPF, cgroups and timeouts — with an interactive tour of components, data flow and isolation.",
    },
    created: "2026-06-06",
    url: "https://tingwei161803.github.io/ai-sandbox-system-design/",
  },
  {
    id: "vibevoice-intro",
    category: "ai-app",
    title: { zh: "VibeVoice · 微軟開源長語音模型", en: "VibeVoice · Microsoft's Open Long-Form Speech Model" },
    desc: {
      zh: "微軟開源的長語音 AI 模型家族介紹：7.5Hz 連續語音 tokenizer、單次最長 90 分鐘、最多 4 位語者，含 TTS / ASR / Realtime 三個版本。",
      en: "An intro to Microsoft's open-source long-form speech model family: a 7.5Hz continuous-speech tokenizer, up to 90 minutes and 4 speakers in one pass, across TTS / ASR / Realtime editions.",
    },
    created: "2026-06-07",
    url: "https://tingwei161803.github.io/vibevoice-intro/",
  },

  // ── AI 安全 / 治理 ────────────────────────────────────
  {
    id: "ai-governance",
    category: "security",
    title: { zh: "AI 治理百科", en: "AI Governance Encyclopedia" },
    desc: {
      zh: "從全球法規、國際標準、倫理安全到台灣在地的 AI 治理全景中文百科，含可搜尋術語表、互動時間軸與案例研究。",
      en: "A panoramic encyclopedia of AI governance — from global regulation and standards to ethics and Taiwan-local context, with a searchable glossary, timeline and case studies.",
    },
    created: "2026-06-06",
    url: "https://tingwei161803.github.io/ai-governance/",
  },
  {
    id: "owasp",
    category: "security",
    title: { zh: "OWASP 旗艦專案導覽", en: "OWASP Flagship Projects" },
    desc: {
      zh: "11 個定義現代應用程式安全的 OWASP 旗艦專案，可搜尋或分類篩選，逐張卡片附中英雙語解說。",
      en: "Eleven OWASP flagship projects that define modern application security — searchable and filterable, each with a bilingual breakdown.",
    },
    created: "2026-06-05",
    url: "https://tingwei161803.github.io/owasp/",
  },
  {
    id: "owasp-top-10-llm",
    category: "security",
    title: { zh: "OWASP LLM 應用十大風險 2025", en: "OWASP Top 10 for LLM Apps 2025" },
    desc: {
      zh: "官方《OWASP Top 10 for LLM Applications 2025》中英雙語導讀，整理生成式 AI 應用最關鍵的十大安全風險。",
      en: "A bilingual reader of the official OWASP Top 10 for LLM Applications 2025 — the ten most critical risks for generative-AI apps.",
    },
    created: "2026-06-05",
    url: "https://tingwei161803.github.io/owasp-top-10-llm/",
  },

  // ── 工具 / 作品 ───────────────────────────────────────
  {
    id: "lazy-html",
    category: "tools",
    title: { zh: "lazy-html · 把資料變成網頁", en: "lazy-html · Data into Web Pages" },
    desc: {
      zh: "給 Claude 用的小工具：丟給它文字、清單、檔案或一個主題，就能生出漂亮、可互動的網頁，不用寫程式。",
      en: "A Claude tool that turns text, lists, files or a topic into a polished, interactive web page — no coding required.",
    },
    created: "2026-06-06",
    url: "https://tingwei161803.github.io/lazy-html/",
  },
];
