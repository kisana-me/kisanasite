# 個人用ウェブサイト

個人用ウェブサイトです。
Home, About, Works, Postsのページがあります。
Works, Postsの子ページは、マークダウンを使用して作成することが出来ます。
ライト・ダークモード、テーマカラーの変更に対応しています。

## 開発

- `cd src`
- `npm install`
- `npm run dev`

## ビルド（静的出力）

このプロジェクトは Cloudflare Pages での静的配信を想定しており、`next build` により `src/out/` に静的ファイルを出力します。

- `cd src`
- `npm run build`
- ローカル確認: `npm run start`（`out/` を静的サーブ）

## Cloudflare Pages デプロイ

Cloudflare Pages のプロジェクト設定で以下を指定してください。

- **Root directory**: `src`
- **Build command**: `npm ci && npm run build`
- **Build output directory**: `out`
