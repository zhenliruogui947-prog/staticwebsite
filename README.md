# hair salon URU by charmant

美容室 URU by charmant の公式サイト。Vite + React で構築。

## ローカル開発

```
npm install
npm run dev
```

## ビルド

```
npm run build
```

## 構成

- `src/pages/` - ページ単位のコンポーネント(Home, OwnerPage, PrivacyPage)
- `src/sections/` - トップページの各セクション
- `src/components/` - Header, Footer など共通パーツ
- `src/lib/bookings.js` - 予約データ(localStorage)の共通ロジック
- `public/assets/` - 画像アセット

`/owner` はオーナー専用の予約管理ページ(簡易パスコード)。`docs/` には移行前の静的HTML版が参考として残されている。
