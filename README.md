# 株式会社アクセルラボ 採用サイト

IoT・スマートホーム企業「株式会社アクセルラボ」の採用ブランディングサイト。
「未来の『あたりまえ』をつくる」という世界観を、動きとインパクトのあるデザインで表現しています。

## 公開URL

https://marimo2856.github.io/accellab-recruit-site-claudecode/

## ページ構成

| ページ | ファイル | 内容 |
|---|---|---|
| TOP | `index.html` | FV（IoTノードネットワークのCanvasアニメーション）/ クイックナビ / WE ARE / OUR FUTURE / 事業 / 環境 / 採用CTA |
| 私たちについて | `about.html` | MESSAGE / MISSION / VISION / VALUE（6項目）/ 会社説明資料 |
| 事業内容 | `business.html` | 3サービス（SpaceCore / alie+ / instatech）/ フロー図 / メンバー紹介 |
| 働く環境 | `environment.html` | 働き方 / メンバー構成データ / 技術スタック / ギャラリー |
| 採用情報 | `recruit.html` | 採用プロセス / 募集職種 / FAQ / 入社お祝い金 |

## 技術

- 静的HTML / CSS / Vanilla JS（フレームワーク不使用）
- CSS変数によるデザインシステム、`clamp()` によるレスポンシブ対応
- IntersectionObserver によるスクロールリビール、Canvas によるノードネットワーク
- `prefers-reduced-motion` 対応

## デプロイ

`main` ブランチへのプッシュで GitHub Actions が自動的に GitHub Pages へデプロイします
（`.github/workflows/deploy-pages.yml`）。

---

Designed & built with [Claude Code](https://claude.com/claude-code).
