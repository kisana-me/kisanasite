// 旧 kisana.me（markdown-it）から持ってきた記法。
// コールアウト / ++ins++ / 略語 / 定義リスト。
import assert from "node:assert/strict";
import { renderMarkdown, renderPlain } from "../src/index.ts";

const ctx = { posts: {}, siteUrl: "https://kisana.me" };
const render = (md) => renderMarkdown(md, ctx);

{
  const html = await render(":::warning\nここを読め\n:::");
  assert.match(html, /<div class="markdown-callout markdown-callout--warning">/);
  assert.match(html, /ここを読め/);
}

{
  const html = await render(":::info{title=\"補足\"}\n本文\n:::");
  assert.match(html, /markdown-callout--info/);
  assert.match(html, /<div class="markdown-callout-title">補足<\/div>/);
}

{
  // markdown-it-container の書き方（名前の前に空白）も通す
  const html = await render("::: warning\nここを読め\n:::");
  assert.match(html, /markdown-callout--warning/);
  assert.match(html, /ここを読め/);
}

{
  // コードブロックの中は詰めない
  const html = await render("```md\n::: warning\n:::\n```");
  assert.match(html, /::: warning/);
  assert.doesNotMatch(html, /markdown-callout/);
}

{
  // 4種以外は素通し（未知のディレクティブとして消える）
  const html = await render(":::note\n本文\n:::");
  assert.doesNotMatch(html, /markdown-callout/);
}

{
  const html = await render("++足した++もじ");
  assert.match(html, /<ins>足した<\/ins>/);
}

{
  const html = await render(
    "*[HTML]: Hyper Text Markup Language\n*[W3C]:  World Wide Web Consortium\nThe HTML spec is by the W3C.",
  );
  assert.match(html, /<abbr title="Hyper Text Markup Language">HTML<\/abbr>/);
  assert.match(html, /<abbr title="World Wide Web Consortium">W3C<\/abbr>/);
  // 定義行そのものは本文に残らない
  assert.doesNotMatch(html, /\*\[HTML\]/);
  assert.doesNotMatch(html, /<p><\/p>/);
}

{
  // 単語の内側には当てない
  const html = await render("*[HTML]: Hyper Text Markup Language\n\nHTML5 と HTML の話");
  assert.match(html, /HTML5/);
  assert.equal(html.match(/<abbr/g).length, 1);
}

{
  // 手前に出てくるものから順に当てる（長い語を先に総当たりして飛び越さない）
  const html = await render("*[A]: first\n*[BBBB]: second\n\nA を見てから BBBB を見る");
  const order = [...html.matchAll(/<abbr title="([^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(order, ["first", "second"]);
}

{
  const html = await render("用語\n: その説明\n");
  assert.match(html, /<dl>/);
  assert.match(html, /<dt>用語<\/dt>/);
  assert.match(html, /<dd>その説明\s*<\/dd>/);
}

{
  // 検索インデックス用のプレーンテキストでも定義行は消えている
  const text = renderPlain("*[HTML]: Hyper Text Markup Language\n\nHTML の話");
  assert.doesNotMatch(text, /Hyper Text/);
  assert.match(text, /HTML の話/);
}

console.log("syntax ok");
