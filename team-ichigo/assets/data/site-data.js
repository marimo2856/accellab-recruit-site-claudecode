/* =====================================================================
   Team ICHIGO  サイト更新用データ
   ---------------------------------------------------------------------
   活動日程・クラス・料金・会場・お知らせ・大会実績・写真・Instagram は
   すべてこのファイルを書き換えるだけで、全ページに反映されます。
   HTML を触る必要はありません。

   ▼ 書き換えのルール（詳しくは /UPDATE-GUIDE.md）
   ・文字は " " （半角ダブルクォーテーション）で囲みます
   ・項目の終わりには , （半角カンマ）を付けます
   ・お知らせ／大会実績は、いちばん上に新しいものを追加してください
   ===================================================================== */
window.TEAM_ICHIGO_DATA = {

  /* ---------- 基本情報 ---------- */
  site: {
    name: "Team ICHIGO",
    catch: "楽しいからもっと速くなる",
    subCatch: "仲間と挑戦し、できることが増える。その楽しさが、成長する力になる。",
    trialFormUrl: "https://forms.gle/VRGrnDHdWiqvBGsM6",
    lineUrl: "https://line.me/R/ti/p/@878usekx",
    lineId: "@878usekx",
    instagramUrl: "https://www.instagram.com/team_ichigo_kumamoto",
    instagramId: "@team_ichigo_kumamoto",
    // 施設の都合による変更の注意書き（全ページ共通）
    scheduleNote: "※施設の利用状況によって活動場所・時間が変更になる場合があります。"
  },

  /* ---------- 料金（入会金・年会費は月会費とは別に表示） ---------- */
  fees: {
    taxNote: "料金はすべて税込表示です。",
    joining: [
      { label: "入会金", price: "12,000円", note: "保険料・登録費・Tシャツ代 含む" },
      { label: "年会費", price: "7,000円", note: "毎年4月にお支払い" }
    ]
  },

  /* ---------- クラス ----------
     id は変更しないでください（ページとの紐付けに使用）
     schedule の venue は、下の venues の id を指定します */
  classes: [
    {
      id: "elementary",
      name: "小学生クラス",
      label: "ELEMENTARY",
      target: "小学1年生以上",
      photo: "/assets/phots/cls-elementary.jpg",
      url: "/classes/elementary",
      summary: "走ることの楽しさから。かけっこの基本と、身体を思いどおりに動かす力を、遊びの延長で身につけます。",
      schedule: [
        { day: "木", time: "17:40〜18:55", venue: "suizenji" }
      ],
      courses: [
        { name: "月会費", price: "5,000", unit: "円 / 月（税込）" }
      ]
    },
    {
      id: "junior",
      name: "ジュニアクラス",
      label: "JUNIOR",
      target: "中学生・高校生",
      photo: "/assets/phots/cls-junior.jpg",
      url: "/classes/junior",
      summary: "週2回コース。松橋・益城を含む4つの開催日から、通いやすい日を選んで参加できます。",
      scheduleLead: "週2回コースでは、松橋・益城を含む開催日から選択可能です。",
      schedule: [
        { day: "火", time: "18:00〜20:00", venue: "matsubase" },
        { day: "水", time: "18:00〜20:00", venue: "suizenji", venueText: "水前寺・えがお健康スタジアム" },
        { day: "金", time: "18:00〜20:00", venue: "mashiki" },
        { day: "日", time: "9:30〜11:30", venue: "suizenji", venueText: "水前寺・えがお健康スタジアム等" }
      ],
      courses: [
        { name: "週2回コース", price: "6,500", unit: "円 / 月（税込）" }
      ]
    },
    {
      id: "matsubase",
      name: "松橋クラス",
      label: "MATSUBASE",
      target: "中学生・高校生",
      photo: "/assets/phots/cls-newclass-2.jpg",
      photoPos: "center 70%",
      url: "/classes/matsubase",
      summary: "宇城市・松橋で週1回。部活や他の習い事と両立しながら、走りの基礎から専門的な技術まで学べます。",
      schedule: [
        { day: "火", time: "18:00〜20:00", venue: "matsubase" }
      ],
      courses: [
        { name: "週1回コース", price: "4,500", unit: "円 / 月（税込）" }
      ]
    },
    {
      id: "mashiki",
      name: "益城クラス",
      label: "MASHIKI",
      target: "中学生・高校生",
      photo: "/assets/phots/gallery-08.jpg",
      url: "/classes/mashiki",
      summary: "益城町陸上競技場で週1回。益城町・上益城エリアから通いやすい、中高生向けのクラスです。",
      schedule: [
        { day: "金", time: "18:00〜20:00", venue: "mashiki" }
      ],
      courses: [
        { name: "週1回コース", price: "4,500", unit: "円 / 月（税込）" }
      ]
    }
  ],

  /* ---------- 活動場所 ----------
     mapQuery：Googleマップで検索する語（住所 or 施設名） */
  venues: [
    {
      id: "suizenji",
      name: "水前寺競技場",
      area: "熊本市中央区",
      address: "熊本県熊本市中央区水前寺5丁目23-3",
      mapQuery: "熊本市水前寺競技場",
      photo: "/assets/phots/venue-suizenji.jpg",
      days: [
        { day: "木", time: "17:40〜18:55", cls: "小学生クラス" },
        { day: "水", time: "18:00〜20:00", cls: "ジュニアクラス（えがお健康スタジアムの場合あり）" },
        { day: "日", time: "9:30〜11:30", cls: "ジュニアクラス（えがお健康スタジアム等の場合あり）" }
      ]
    },
    {
      id: "egao",
      name: "えがお健康スタジアム",
      area: "熊本市東区（熊本県民総合運動公園）",
      address: "熊本県熊本市東区平山町2776",
      mapQuery: "えがお健康スタジアム",
      photo: "/assets/phots/venue-egao.jpg",
      days: [
        { day: "水", time: "18:00〜20:00", cls: "ジュニアクラス（水前寺の場合あり）" },
        { day: "日", time: "9:30〜11:30", cls: "ジュニアクラス（水前寺等の場合あり）" }
      ]
    },
    {
      id: "matsubase",
      name: "宇城市ボランティアセンターグラウンド",
      area: "宇城市松橋",
      address: "熊本県宇城市松橋町（詳細住所は確認中）",
      mapQuery: "宇城市ボランティアセンター 松橋",
      photo: "/assets/phots/cls-newclass-2.jpg",
      photoPos: "center 70%",
      days: [
        { day: "火", time: "18:00〜20:00", cls: "松橋クラス／ジュニアクラス" }
      ]
    },
    {
      id: "mashiki",
      name: "益城町陸上競技場",
      area: "上益城郡益城町（益城町総合運動公園内）",
      address: "熊本県上益城郡益城町木山236",
      mapQuery: "益城町陸上競技場",
      photo: "/assets/phots/venue-mashiki.webp",
      days: [
        { day: "金", time: "18:00〜20:00", cls: "益城クラス／ジュニアクラス" }
      ]
    }
  ],

  /* ---------- お知らせ（新しいものを一番上に） ----------
     category：お知らせ ／ 大会結果 ／ 大会情報 ／ 練習・活動 ／ 走り方・かけっこ
     url：詳しい記事や Instagram 投稿へのリンク（無ければ "" ） */
  news: [
    { date: "2026-11-15", category: "お知らせ", title: "ホームページをリニューアルしました", body: "クラス案内・活動場所・Team ICHIGOの名前の由来などを掲載しています。", url: "" },
    { date: "2026-10-05", category: "お知らせ", title: "体験練習の受付を開始しました", body: "小学生クラス・ジュニアクラス・松橋クラス・益城クラスで体験を受け付けています。", url: "/trial" },
    { date: "2026-10-01", category: "お知らせ", title: "松橋クラス・益城クラスを開設しました", body: "火曜日は松橋、金曜日は益城で、中学生・高校生向けの週1回コースがスタートしました。", url: "/classes" },
    { date: "2026-09-28", category: "大会結果", title: "熊本県高校新人大会に選手が出場しました", body: "短距離・跳躍種目に選手が出場しました。", url: "" },
    { date: "2026-09-15", category: "練習・活動", title: "秋シーズンの練習スケジュールを更新しました", body: "", url: "/access" }
  ],

  /* ---------- 大会実績（新しいものを一番上に） ---------- */
  results: [
    { date: "2026-09", title: "熊本県高校新人陸上競技大会 2026", body: "短距離・跳躍種目に選手が出場。" },
    { date: "2026-08", title: "ジュニアオリンピック 2026", body: "ジュニア世代の全国大会へ選手が挑戦。" },
    { date: "2026-07", title: "熊本県中体連陸上競技大会 2026", body: "中学生選手が県大会に出場。" }
  ],

  /* ---------- 写真ギャラリー（トップページで横に流れる写真） ----------
     写真ファイルは /assets/phots/ に入れて、ファイル名を指定します */
  gallery: [
    { src: "/assets/phots/gallery-01.jpg", alt: "ジュニアクラスの集合写真" },
    { src: "/assets/phots/gallery-02.jpg", alt: "スタート練習" },
    { src: "/assets/phots/gallery-03.jpg", alt: "小学生クラスの仲間たち" },
    { src: "/assets/phots/gallery-04.jpg", alt: "ダッシュ練習" },
    { src: "/assets/phots/gallery-05.jpg", alt: "ジュニアクラスの集合写真" },
    { src: "/assets/phots/gallery-06.jpg", alt: "小学生クラスの練習後" },
    { src: "/assets/phots/gallery-07.jpg", alt: "スタートダッシュの練習" },
    { src: "/assets/phots/gallery-08.jpg", alt: "ジュニアクラスの仲間たち" },
    { src: "/assets/phots/gallery-09.jpg", alt: "大会に出場する小学生クラス" },
    { src: "/assets/phots/gallery-10.jpg", alt: "大会後の集合写真" }
  ],

  /* ---------- Instagram ----------
     紹介したい投稿・リールの URL を貼るだけで、ホームページ内に埋め込み表示されます。
     例） "https://www.instagram.com/reel/XXXXXXXXXXX/"
     空のときは、練習写真＋「Instagramを見る」ボタンが表示されます。 */
  instagramPosts: [
  ]
};
