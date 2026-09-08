# 個人用ウェブサイト

個人用ウェブサイトです。
Home, About, Works, Postsのページがあります。

**記事・作品・固定ページの正本はヘッドレスCMS**
（[kisana-me/headless-cms](https://github.com/kisana-me/headless-cms)）にあり、
このリポジトリはビルド時に `GET /export/build.json` を1回叩いて静的サイトを吐きます。
つなぐ契約は
[blog17 の docs/data-contract.md](https://github.com/kisana-me/blog17/blob/main/docs/data-contract.md)
が正本です。

ライト・ダークモード、テーマカラーの変更に対応しています。

## 構成

| パス | 中身 |
|---|---|
| `/` | Home。`data/home/*.json` から作る（CMS 管理ではない）|
| `/about` `/terms-of-service` `/privacy-policy` | 固定ページ。CMS の `status = 'specific'` |
| `/contact` | 固定ページ + お問い合わせフォーム。送り先は CMS の `POST /api/inquiries` |
| `/works` `/works/:slug` | 作品。CMS の公開記事のうち `works` タグが付いているもの |
| `/posts` `/posts/:slug` | 記事。CMS の公開記事のうち `works` タグが付いていないもの |
| `/tags` | タグ一覧。記事が付けているタグだけ出る |
| `/sitemap.xml` `/feed.xml` | 検索エンジンとRSSリーダ向け。ビルド時に生成 |
| `/tools/*` | ツール。CMS 管理ではない |

`src/posts/*.md` と `src/works/*.md` は**もう読んでいません**。CMS へ移す前の
原稿として置いてあるだけです。

## 開発

- `cd src`
- `npm install`
- `npm run dev`

既定では `src/fixtures/site-data.json` を読むので、CMS が無くても動きます。
CMS に繋ぐときは `.env.example` を写して `SITE_DATA_SOURCE=api` にしてください。

**お問い合わせフォームはローカルからは通りません。** CMS は `Origin` を見て
サイトを決めるので、`sites.url` に登録したオリジン（`https://kisana.me`）から
でないと 403 が返ります。

**Node 22.18 以上が要ります。** ビルドスクリプトが `@ivecolor/markdown` を
TypeScript のまま読むため、Node の型除去に頼っています。

## ビルド（静的出力）

このプロジェクトは Cloudflare Pages での静的配信を想定しており、`next build` により `src/out/` に静的ファイルを出力します。

- `cd src`
- `npm run build`
- ローカル確認: `npm run start`（`out/` を静的サーブ）

`prebuild` が `scripts/generate-content.mjs` を走らせ、
`generated/content.generated.js` と `public/sitemap.xml` / `public/feed.xml` を作ります。
どれも生成物なので Git には入れません。

## Cloudflare Pages デプロイ

Cloudflare Pages のプロジェクト設定で以下を指定してください。

- **Root directory**: `src`
- **Build command**: `npm ci && npm run build`
- **Build output directory**: `out`
- **環境変数**: `NODE_VERSION=22.18` 以上、`SITE_DATA_SOURCE=api`、
  `STUDIO_EXPORT_URL`、`STUDIO_EXPORT_TOKEN`、
  `NEXT_PUBLIC_CMS_API_BASE`、`NEXT_PUBLIC_TURNSTILE_SITE_KEY`

記事を公開したらビルドし直す必要があります。CMS のサイト設定の
`deploy_hook` に Cloudflare Pages のデプロイフックURLを入れておくと、
公開ボタンでビルドが走ります。

## Markdown

本文は `src/packages/markdown`（[kisana-me/markdown](https://github.com/kisana-me/markdown)
の subtree）で描画します。**CMS のライブプレビューと同じコード**を通すので、
書いている画面と公開後の見た目がずれません。

- `npm run markdown:pull` — 上流の変更を取り込む
- `npm run markdown:push` — ここでの変更を上流へ返す

markdown-it から移るときの記法の違いは
[docs/cms-migration.md](docs/cms-migration.md) にまとめてあります。
