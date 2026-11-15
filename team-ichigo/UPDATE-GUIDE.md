# Team ICHIGO ホームページ 更新マニュアル

活動日程・クラス・料金・会場・お知らせ・大会実績・写真・Instagram は、
**`assets/data/site-data.js` の1ファイルを書き換えるだけ**で全ページに反映されます。
HTML を編集する必要はありません。

---

## 1. 編集のしかた（GitHub の画面から）

1. GitHub でリポジトリを開き、`team-ichigo/assets/data/site-data.js` をクリック
2. 右上の鉛筆マーク（Edit this file）をクリック
3. 内容を書き換える
4. 下の「Commit changes」を押す → 数十秒〜1分ほどでホームページに反映されます

> **注意（よくあるミス）**
> - 文字は `" "`（半角ダブルクォーテーション）で囲みます
> - 1項目の終わりには `,`（半角カンマ）を付けます
> - 全角の `”` や `，` を使うと表示されなくなります
> - 反映後に表示が崩れたら、直前の変更を見直してください（GitHub の History から元に戻せます）

---

## 2. よくある更新

### お知らせを追加する
`news:` の `[` のすぐ下に、1行追加します（新しいものを一番上に）。

```js
news: [
  { date: "2026-12-01", category: "お知らせ", title: "冬季の練習時間について", body: "12月〜2月は…", url: "" },
  …（既存のお知らせ）
```

- `category` は「お知らせ／大会結果／大会情報／練習・活動／走り方・かけっこ」のどれか（新しい名前を書くと、絞り込みボタンも自動で増えます）
- `url` に Instagram 投稿の URL を入れると、タイトルからその投稿へリンクします

### 大会実績を追加する
```js
results: [
  { date: "2026-12", title: "〇〇大会", body: "100m 優勝（中学2年）" },
```

### 料金を変える
`classes:` の各クラスにある `courses` の `price` を書き換えます。
入会金・年会費は `fees:` の `joining` を書き換えます。

### 曜日・時間・会場を変える
- クラスの開催日：各クラスの `schedule`（`day`, `time`, `venue`）
  - `venue` には会場の id（`suizenji` / `egao` / `matsubase` / `mashiki`）を書きます
  - 「水前寺・えがお」のように複数会場を表示したいときは `venueText` に表示文を書きます
- 活動場所ページの会場ごとの日時：`venues` の `days`
- 施設の都合による注意書き：`site.scheduleNote`

### 写真を変える・追加する
1. GitHub で `team-ichigo/assets/phots/` を開き「Add file → Upload files」で写真をアップロード
   （横幅 1600px 程度・1枚 500KB 以下が目安。ファイル名は半角英数字）
2. `gallery:` に `{ src: "/assets/phots/ファイル名.jpg", alt: "写真の説明" },` を追加

### Instagram の投稿・リールを紹介する
Instagram で投稿を開き「…」→「リンクをコピー」で URL を取得し、`instagramPosts` に貼り付けます。

```js
instagramPosts: [
  "https://www.instagram.com/reel/XXXXXXXXXXX/",
  "https://www.instagram.com/p/YYYYYYYYYYY/"
]
```

3件程度がおすすめです。空のときは練習写真と「Instagramを見る」ボタンが表示されます。

---

## 3. 本番公開時の作業（制作側）

- [ ] 全ページの `<meta name="robots" content="noindex, …">` の行を削除（デモ公開中は検索に出ないようにしています）
- [ ] 独自ドメイン（www.teamichigo.website）を Vercel に設定
- [ ] Google Search Console に登録し、`/sitemap.xml` を送信
- [ ] Google ビジネスプロフィールの登録（「熊本 陸上クラブ」などの地図検索対策に有効）
