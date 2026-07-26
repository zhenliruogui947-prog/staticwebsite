# CLAUDE.md

## プロジェクト概要
- hair salon URU by charmant の公式サイト。Vite + React (SPA) で構築する。
- 20代〜50代の自立した女性、トレンドや自己表現に感度の高い男性・女性に刺さる、上品で信頼感のある印象を目指す。
- 外部サイトの閲覧制限部分は考慮せず、独自の情報設計でサイトを作る。
- もともとは静的HTML/CSSのみで作られていたが、2026年7月にVite + Reactへ移行した。移行前の静的版は `docs/` に参考として残している(現行サイトではない)。

## 主要ファイル
- `src/main.jsx`: エントリーポイント。`BrowserRouter` でラップ。
- `src/App.jsx`: ルーティング定義(`/`, `/owner`, `/privacy`)。
- `src/pages/`: ページ単位のコンポーネント(Home, OwnerPage, PrivacyPage)。
- `src/sections/`: トップページの各セクション(Hero, Concept, Service, Location, Menu, Gallery, Booking, Contact)。
- `src/components/`: Header, Footer など複数ページで共通のパーツ。
- `src/lib/bookings.js`: 予約データ(`localStorage`)の読み書き共通ロジック。`Booking`(客向け予約フォーム)と`OwnerPage`(オーナー向け一覧)の両方から参照される。
- `src/index.css`: 全ページ共通スタイル。CSS変数(`--bg`, `--accent` 等)とクラスベースの構成。
- `public/assets/`: 画像アセット。
- `public/robots.txt`: `/owner` をクローラーから除外。

## 開発ルール
- 依存関係は必要最小限に留める(現状 `react-router-dom` のみ追加)。新しいライブラリを追加する前に、本当に必要か検討する。
- 日本語表現は自然で、サロンの丁寧さと上質感を前面に出す。
- 予約機能(`/` の予約セクションと `/owner`)は `localStorage` を使ったデモ実装であり、実際には端末間でデータは共有されない。本番運用には別途サーバー・データベースが必要である旨を、機能追加時も維持すること。
- `/owner` の合言葉によるロックは簡易的なものであり、本物の認証ではない。実運用前に本物の認証基盤への置き換えを検討する。
- 画像を追加する際は、ライセンス(CC0/CC BY等)と出典を確認し、必要であれば `Service.jsx` / `Gallery.jsx` 内のクレジット表記に追記する。

## ローカル確認方法
- `npm install`
- `npm run dev`(Viteの開発サーバー、既定は http://localhost:5173 )
- `npm run build` でビルド確認、`npm run lint` でoxlintによる静的解析。

## 次の展開候補
- 予約機能の本格的なバックエンド化(サーバー・データベース・認証)
- お客様の口コミセクション
- InstagramやSNS連携
- 画像・店舗情報の追加
