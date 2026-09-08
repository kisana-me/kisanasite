import { renderMarkdown, extractToc, renderPlain, rewriteMediaRefs } from "../src/index.ts";

// **描画に渡すのはURLと記事の索引だけ。** `/m/{id}` の解決は CMS が先に済ませる
const media = {
  abc12345678901: { id: "abc12345678901", kind: "image", mime: "image/webp", ext: "png", name: "テスト画像" },
  gif12345678901: { id: "gif12345678901", kind: "image", mime: "image/gif", ext: "gif", name: "動くやつ" },
};
const BASE = "https://m.ivecolor.com";
const ctx = {
  posts: { "hello-world": { slug: "hello-world", title: "こんにちは", summary: "要約", thumbnailUrl: `${BASE}/media/abc12345678901.png`, publishedAt: "2025-01-02T03:04:05Z", editedAt: null } },
  siteUrl: "https://ivecolor.com",
};
const md = `
# 見出し1

本文です。
改行はそのまま。

![キャプション付き](/m/abc12345678901)

![](/m/gif12345678901)

:::gallery
![1枚目](/m/abc12345678901)
![2枚目](/m/abc12345678901)
:::

https://youtu.be/9qkpcLK422o

https://x.com/foo/status/1234567890

https://ivecolor.com/posts/hello-world

::post{slug="hello-world"}

::youtube{id="abcdefg"}

## 見出し2

| a | b |
|---|---|
| 1 | 2 |

~~打ち消し~~ と脚注[^1]

[^1]: 脚注の中身

\`\`\`ruby
puts "hello"
\`\`\`

:::yt-sync{video="9qkpcLK422o"}
::cue{at="0"}

### 冒頭

最初のキュー。

::cue{at="01:20"}

あとのキュー。
:::

![存在しない](/m/nosuchimage00)
`;
const html = await renderMarkdown(rewriteMediaRefs(md, { media, baseUrl: BASE }), ctx);
console.log(html);
console.log("\n=== TOC ===");
console.log(JSON.stringify(extractToc(md), null, 1));
console.log("\n=== PLAIN ===");
console.log(renderPlain(md).slice(0, 160));

console.log("\n=== HIGHLIGHT ===");
console.log(await renderMarkdown('==最新アルバム「STRATEGY」== と ==**太字**入り== 、`==code==` はそのまま。', ctx));
