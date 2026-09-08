# CMS への移行

kisana.me の記事・作品・固定ページを、ヘッドレスCMS
（[kisana-me/headless-cms](https://github.com/kisana-me/headless-cms)）の
管理に移した。この文書は**CMS に中身を入れる手順**と、
markdown-it から `@ivecolor/markdown` に移ったことで変わる記法をまとめる。

契約（JSONの形）の正本は
[blog17 の docs/data-contract.md](https://github.com/kisana-me/blog17/blob/main/docs/data-contract.md)。

## 1. どう振り分けているか

配信データの記事は `status` と**タグ**でしか分かれない。

| 出る場所 | 条件 |
|---|---|
| `/works` | `status = 'published'` かつ `works` タグが付いている |
| `/posts` | `status = 'published'` かつ `works` タグが付いていない |
| `/about` `/terms-of-service` `/privacy-policy` `/contact` | `status = 'specific'` で `name_id` が一致する |

`works` は予約タグ。**`hidden` にしてはいけない**（`hidden` なタグは
エクスポートで `tag_ids` から落ちて、作品が1件も出なくなる。CMS 側で弾いている）。
タグ一覧と記事のタグ表示からは、このサイトが自分で除いている。

## 2. CMS に入れる手順

### 2.1 サイトを作る

CMS の `/sites` で1つ作る。

| 項目 | 値 |
|---|---|
| `name_id` | `kisanasite` |
| `name` | `KISANA:ME` |
| `url` | `https://kisana.me` |
| `deploy_hook` | Cloudflare Pages のデプロイフックURL |

作ったらサイト設定で**ビルドトークンを発行**し、Cloudflare Pages の
`STUDIO_EXPORT_TOKEN` に入れる。

### 2.2 タグを作る

`/s/kisanasite/tags` で `works` を作る。**`active` のまま**にすること。

記事に付けるタグ（`start` / `bealive` / `test` など）も、必要なぶんだけ作る。

### 2.3 固定ページを4つ作る

`status` を `specific` にする（エディタの「固定ページにする」ボタン）。
`name_id` は**この4つのいずれか**でないと、ページ側から引けない。

| `name_id` | 元 |
|---|---|
| `about` | `pages/about.js` に直書きされていた本文と `data/series.json` |
| `terms-of-service` | 旧 `pages/terms-of-service.js` |
| `privacy-policy` | 旧 `pages/privacy-policy.js` |
| `contact` | 旧 `pages/contact.js` |

### 2.4 作品を6つ入れる

`src/works/*.md` の中身を写す。`name_id` は**ファイル名と同じ**にする
（`anyur` / `amiverse` / `ivecolor` / `bealive` / `x` / `kisana-me`）。
URLを変えないため。

| 旧 frontmatter | 移し先 |
|---|---|
| `title` | タイトル |
| `summary` | 要約 |
| `description` | 本文の冒頭。または要約に寄せる |
| `image` | サムネイル（メディアから選ぶ）|
| `icon` | 「追加のデータ」に `icon` として入れる |
| `order` | 「追加のデータ」に `order` として入れる（小さいほど先）|

「追加のデータ」の値は文字列で持つ。`order` は `3` のように書けばよく、
数として使うのは表示側。画像は右のボタンでメディアを選ぶと `/m/{id}` が入り、
配信URLに置き換わって届く。

最後に `works` タグを付ける。**これを忘れると `/posts` に出る。**

### 2.5 記事を入れる

`src/posts/*.md` の中身を写す。`name_id` はファイル名と同じ。

| 旧 frontmatter | 移し先 |
|---|---|
| `title` | タイトル |
| `description` | 要約 |
| `image` | サムネイル |
| `date` | 公開日時 |
| `update` | 更新日時（空なら未設定のまま）|
| `tag` | タグ |

## 3. 記法の違い（markdown-it → @ivecolor/markdown）

### そのまま使えるもの

改行（`breaks`）、GFM の表・打ち消し・自動リンク、タスクリスト `- [ ]`、
脚注 `[^1]`、マーカー `==text==`、挿入 `++ins++`、
略語 `*[HTML]: Hyper Text Markup Language`、定義リスト、
コンテナ `::: info` / `success` / `warning` / `danger`。

コードのハイライトは highlight.js から Shiki（monokai）に変わる。
見出しの `id` は rehype-slug が振る。

### 書き方が変わるもの

| 旧 | 新 |
|---|---|
| `[[toc]]` | **書かない。** 目次はページ側が本文の見出しから組み立てて、本文の上に出す |

### 使えなくなるもの

| 記法 | 備考 |
|---|---|
| 上付き `^th^` | 実データで未使用 |
| 下付き `H~2~O` | GFM の `~~打ち消し~~` と衝突するため入れていない |
| MultiMD の表（colspan / rowspan / headerless）| 素の GFM 表だけになる |
| typographer（引用符・ダッシュの自動整形）| |
| 生HTML（`<br />` など）| **黙って消える。** 意図的に閉じてある |

### 増えるもの

- URL単独行を書くだけで埋め込みになる（YouTube / X / TikTok / Instagram / 自サイトの記事）
- `::youtube{id="..."}` などのディレクティブ
- `:::gallery` で画像を横並び
- `::video` / `::audio` で自前配信のメディア
- 単独行の画像が `figure` + `figcaption` になる（キャプションは `alt`）
- 日本語の括弧に隣り合う強調が効く（`**IVE（アイヴ）**の`）

## 4. 入れ終わったら

1. `SITE_DATA_SOURCE=api` にして `npm run build` が通ることを確かめる
2. `/works` の並びが `order` どおりか、`/posts` に作品が混ざっていないかを見る
3. `/sitemap.xml` と `/feed.xml` が出ているかを見る
4. CMS の「公開」でデプロイフックが叩かれ、ビルドが走ることを確かめる

`src/posts/*.md` と `src/works/*.md` は移行後も残してあるが、
**ビルドはもう読んでいない。** 消すかどうかは移行が済んでから決める。
