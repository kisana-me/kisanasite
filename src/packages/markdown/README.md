# @ivecolor/markdown

IVECOLOR の Markdown を HTML にするパイプライン。

**表示側（[blog17](https://github.com/kisana-me/blog17)）と管理側
（[headless-cms](https://github.com/kisana-me/headless-cms)）が同じコードを通す**
ために切り出してある。別実装にすると、CMS のプレビューと公開後の見た目がずれて、
Web編集で完結させる意味が薄れる。

もとは blog17 の `packages/markdown` だった。**public な headless-cms から
private な blog17 を参照できずビルドが落ちた**のをきっかけに、独立させた。

## 使う側

```jsonc
"@ivecolor/markdown": "github:kisana-me/markdown"
```

private リポジトリなので、CI ではトークンが要る。手順は使う側の README にある。

## 中身

| ファイル | 役割 |
|---|---|
| `src/index.ts` | `renderMarkdown` / `extractToc` / `renderPlain` |
| `src/plugin.ts` | 独自記法（`:::gallery` / `:::info` / `::youtube` / `yt-sync`）と URL単独行の埋め込み |
| `src/abbr.ts` | 略語（`*[HTML]: Hyper Text Markup Language`）|
| `src/embeds.ts` | YouTube / X / TikTok / Instagram の埋め込み HTML |
| `src/media.ts` | `/m/{id}` の解決と配信URLの組み立て |
| `src/types.ts` | `RenderContext` など。**両側の契約** |

`main` は `./src/index.ts` で、**TypeScript の生ソースを配っている。**
使う側（Vite / Astro）がバンドル時に変換する前提。

## テスト

```sh
pnpm install
pnpm test
```

## 記法を変えるとき

**表示側と管理側の両方に同時に効く。** プレビューと公開後がずれないのが
この切り出しの目的なので、片方だけ古い版に固定しない。
