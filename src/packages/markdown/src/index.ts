import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import remarkCjkFriendly from "remark-cjk-friendly";
import remarkDirective from "remark-directive";
import remarkFlexibleMarkers from "remark-flexible-markers";
import remarkIns from "remark-ins";
import remarkDefinitionList, { defListHastHandlers } from "remark-definition-list";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeShiki from "@shikijs/rehype";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import type { Root as HastRoot } from "hast";
import { toString } from "mdast-util-to-string";
import GithubSlugger from "github-slugger";

import { remarkAbbr } from "./abbr.ts";
import { remarkIvecolor } from "./plugin.ts";
import type { RenderContext, TocItem } from "./types.ts";

export * from "./types.ts";
export { isUnresolvedRef, mediaUrl, rewriteMediaRefs } from "./media.ts";
export type { RewriteSource } from "./media.ts";
export { formatDateTime } from "./util.ts";

/**
 * remark-flexible-markers と remark-ins が付ける class を落として、
 * 素の `<mark>` / `<ins>` に戻す。スタイルはサイト側のCSSが要素名で当てる
 */
const BARE_TAGS = new Set(["mark", "ins"]);

function rehypeCleanMark() {
  return function transformer(tree: HastRoot): void {
    visit(tree, "element", (node: any) => {
      if (BARE_TAGS.has(node.tagName)) delete node.properties?.className;
    });
  };
}

function baseProcessor() {
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    // 定義リスト（Term / : 説明）。旧 kisana.me の markdown-it-deflist 相当
    .use(remarkDefinitionList)
    // **breaks より先。** breaks を通すと段落が text / break に割れて、
    // `*[HTML]: ...` の行頭判定ができなくなる（src/abbr.ts）
    .use(remarkAbbr)
    // 旧 Redcarpet の hard_wrap: true 相当
    .use(remarkBreaks)
    // **CJK の括弧や句読点に隣り合う `**` / `==` を効かせる。**
    // CommonMark の flanking 規則は `「` `）` `、` を「約物」として数えるので、
    // `あ**「い」**う` は開始側が、`**IVE（アイヴ）**の` は終了側が成立しない。
    // 旧サイトの Redcarpet にこの規則が無く、実データがその書き方で書かれている
    .use(remarkCjkFriendly)
    // 旧 Redcarpet の highlight: true（==text==）相当。実データで75箇所/38記事使われている
    .use(remarkFlexibleMarkers, { markerClassName: () => [] })
    // 旧 kisana.me の markdown-it-ins 相当（++text++ → <ins>）
    .use(remarkIns)
    .use(remarkDirective);
}

/**
 * 記事本文を HTML にする。
 * 見出しIDは rehype-slug（旧 Redcarpet の with_toc_data とは規則が変わる）。
 * 見出しへのアンカーリンクは旧サイトに無いので付けない。
 */
export async function renderMarkdown(md: string, ctx: RenderContext): Promise<string> {
  const file = await baseProcessor()
    .use(remarkIvecolor, ctx)
    .use(remarkRehype, {
      footnoteLabel: "脚注",
      footnoteLabelTagName: "h2",
      footnoteBackLabel: "本文へ戻る",
      // 定義リストの mdast ノードを hast に落とすのはこのハンドラ
      handlers: { ...defListHastHandlers },
    })
    .use(rehypeSlug)
    .use(rehypeCleanMark)
    .use(rehypeShiki, { theme: "monokai" })
    .use(rehypeStringify)
    .process(md ?? "");
  return String(file);
}

/**
 * **parse だけでなく transformer も通す。** 略語の定義行（`*[HTML]: ...`）を
 * 落としているのは remarkAbbr なので、parse しただけの木には本文として残る。
 * 目次にも検索インデックスにも出したくない
 */
function parseBase(md: string): any {
  const processor = baseProcessor();
  return processor.runSync(processor.parse(md ?? ""));
}

/**
 * 目次。rehype-slug と同じ github-slugger を使うのでIDが一致する。
 * yt-sync の中の見出しはウィジェット内部の話なので目次には出さないが、
 * slugger には通して連番がずれないようにする。
 */
export function extractToc(md: string): TocItem[] {
  const tree = parseBase(md);
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];

  const walk = (node: any, insideWidget: boolean): void => {
    const isWidget =
      insideWidget || (node.type === "containerDirective" && node.name === "yt-sync");

    if (node.type === "heading") {
      const text = toString(node).trim();
      if (text) {
        const id = slugger.slug(text);
        if (!isWidget) items.push({ depth: node.depth, id, text });
      }
      return;
    }
    for (const child of node.children ?? []) walk(child, isWidget);
  };

  walk(tree, false);
  return items;
}

/** 検索インデックスや og:description 用のプレーンテキスト */
export function renderPlain(md: string): string {
  const tree = parseBase(md);
  // URL単独行は埋め込みになるので、本文テキストとしては数えない
  visit(tree, "paragraph", (node: any) => {
    const kids = (node.children ?? []).filter(
      (c: any) => !(c.type === "text" && /^\s*$/.test(c.value ?? "")),
    );
    if (kids.length === 1 && kids[0].type === "link" && kids[0].url === toString(kids[0]).trim()) {
      node.children = [];
    }
  });
  return toString(tree).replace(/\s+/g, " ").trim();
}
