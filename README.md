# Peter's Projects

> 近一個月公開上線、附 GitHub Pages 的個人專案，依主題分類的入口頁。

這是一個純靜態的作品集入口頁，把我最近公開的幾個 GitHub Pages 專案，依「科技活動 / AI 產業趨勢 / 創業商業 / AI 技術應用」四大主題分類整理，點卡片即可前往各專案。所有資料都集中在 `data/projects.js`，新增專案只要改這一個檔。

---

## 🔗 線上版 / Live

| | |
|---|---|
| 🌐 網站 | <https://www.peteraim.com/> |

> 直接點進去就能用，無需安裝。每張卡片會在新分頁開啟對應專案的 GitHub Pages 網站。

---

## ✨ 功能特色

- 🌏 **雙語切換** — 中文 / English 一鍵全頁切換（卡片、導航、介面文案皆切換）
- 🌗 **深色 / 淺色模式** — 手動切換並以 localStorage 記憶
- 🧭 **分類區段導航** — 置頂膠囊導航 + scrollspy，捲動時自動高亮目前分類
- 🎨 **分類主題色** — 四大分類各有 accent 色，卡片 hover 浮起並顯示色條
- 🔗 **外連卡片** — 每張卡片直接連到該專案的 GitHub Pages 站（新分頁開啟）
- 📊 **數字動畫** — hero 統計（專案數 / 分類數）捲入畫面時 count-up
- 📱 **響應式設計** — 手機、平板、桌機皆適配（375px 無水平溢出）
- ⚡ **純靜態** — 無後端、無建置步驟、載入快、可離線瀏覽

---

## 📂 內容結構 / 資料來源

本站收錄的是**我自己**最近一個月公開、且已啟用 GitHub Pages 的專案連結。

```
peter-projects/
├── index.html          # 入口頁
├── data/
│   └── projects.js      # 資料層：SITE_META / SITE_CATEGORIES / SITE_DATA
├── assets/
│   ├── styles.css       # 樣式（高級設計感 + MD3 雙主題）
│   └── app.js           # 前端邏輯：扁平資料 → hero + 分類卡片區段
├── .nojekyll            # 讓 GitHub Pages 直接服務靜態檔
└── README.md
```

> ⚠️ **非官方**：本站連結到的各專案，多為個人整理之非官方資源（例如 Stanford AI Index、
> a16z、Google Cloud、Anthropic、OpenAI 等內容的摘要彙整），如有錯誤或出入，請以各官方來源為準。

---

## 🛠 本機使用

```bash
# 1. clone 專案
git clone https://github.com/tingwei161803/peter-projects.git
cd peter-projects

# 2a. 最簡單：直接開啟 index.html
open index.html

# 2b. 或啟動本機伺服器（建議）
uv run python -m http.server 4173
# 然後瀏覽 http://localhost:4173
```

> 本專案為純靜態網站，不需安裝任何依賴。若要跑本機伺服器，一律使用 `uv`。

### 新增 / 修改專案

打開 `data/projects.js`：

- 要新增一個專案 → 在 `SITE_DATA` 對應分類區塊加一筆 `{ id, category, title:{zh,en}, desc:{zh,en}, created, url }`。
- 要新增 / 改分類 → 改 `SITE_CATEGORIES`（含 `key` / 名稱 / 圖示 / accent 色）。
- `category` 必須等於某個分類的 `key`；每個顯示字串都要同時有 `zh` 與 `en`。

---

## 📝 聲明 / License

- 本站連結之各專案內容著作權歸其原始來源所有；本入口頁僅彙整連結。
- 程式碼以 `MIT` 授權釋出。
- 如為權利人且希望調整或移除內容，請開 issue 聯絡。
