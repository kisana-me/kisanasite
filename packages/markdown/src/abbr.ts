import { visit } from "unist-util-visit";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * 略語（`*[HTML]: Hyper Text Markup Language`）。
 *
 * 旧 kisana.me が markdown-it-abbr で書いていた記法をそのまま通すために足した。
 * remark に現行の unified 11 で動くパッケージが無かったので自前で持つ。
 *
 * **remark-breaks より先に置くこと。** breaks を通すと段落の本文が
 * text / break に割れて、行頭の判定ができなくなる。
 */

/** `*[TERM]: 説明` の行。行頭のみ。説明は行末まで */
const DEFINITION = /^\*\[([^\]\n]+)\]:[ \t]*(\S.*)$/;

/** 単語の一部にマッチさせない。CJK は語境界を持たないのでそのまま通る */
const WORDISH = /[A-Za-z0-9_]/;

interface Abbr {
  term: string;
  title: string;
}

/** 定義行を本文から抜き、term -> title を集める */
function collect(tree: any): Abbr[] {
  const found = new Map<string, string>();

  visit(tree, "text", (node: any) => {
    if (!node.value.includes("*[")) return;
    const kept: string[] = [];
    for (const line of node.value.split("\n")) {
      const m = DEFINITION.exec(line);
      if (m) found.set(m[1]!, m[2]!.trim());
      else kept.push(line);
    }
    node.value = kept.join("\n");
  });

  // 定義行しか無かった段落は空になる。残すと空の <p> が出る
  const empties: [any, any][] = [];
  visit(tree, "paragraph", (node: any, _index: number | undefined, parent: any) => {
    if (!parent) return;
    const blank = (node.children ?? []).every(
      (c: any) => c.type === "text" && /^\s*$/.test(c.value ?? ""),
    );
    if (blank) empties.push([parent, node]);
  });
  for (const [parent, node] of empties) {
    const at = parent.children.indexOf(node);
    if (at >= 0) parent.children.splice(at, 1);
  }

  // 長い語から先に当てる。"W3C" と "W3C DOM" が両方あるとき短い方に食われないように
  return [...found]
    .map(([term, title]) => ({ term, title }))
    .sort((a, b) => b.term.length - a.term.length);
}

function abbrNode(term: string, title: string) {
  return {
    type: "abbr",
    data: { hName: "abbr", hProperties: { title } },
    children: [{ type: "text", value: term }],
  };
}

/** 1つの text ノードを abbr で分割する。当たらなければ null */
function split(value: string, abbrs: Abbr[]): any[] | null {
  const out: any[] = [];
  let rest = value;
  let hit = false;

  while (rest.length > 0) {
    // **一番手前に出てくるものを採る。** 語の長い順に総当たりすると、
    // 後ろにある長い略語が手前の短い略語を飛び越して先に当たってしまう
    let best: { at: number; abbr: Abbr } | null = null;
    for (const abbr of abbrs) {
      let from = 0;
      for (;;) {
        const at = rest.indexOf(abbr.term, from);
        if (at < 0) break;
        const before = rest[at - 1];
        const after = rest[at + abbr.term.length];
        // 単語の内側（"HTML5" の HTML など）は略語として扱わない
        if ((before && WORDISH.test(before)) || (after && WORDISH.test(after))) {
          from = at + 1;
          continue;
        }
        if (!best || at < best.at) best = { at, abbr };
        break;
      }
    }
    if (!best) break;

    if (best.at > 0) out.push({ type: "text", value: rest.slice(0, best.at) });
    out.push(abbrNode(best.abbr.term, best.abbr.title));
    rest = rest.slice(best.at + best.abbr.term.length);
    hit = true;
  }

  if (!hit) return null;
  if (rest.length > 0) out.push({ type: "text", value: rest });
  return out;
}

export function remarkAbbr() {
  return (tree: any): void => {
    const abbrs = collect(tree);
    if (abbrs.length === 0) return;

    visit(tree, "text", (node: any, index: number | undefined, parent: any) => {
      if (index === undefined || !parent) return;
      // 略語の中身をもう一度略語にしない
      if (parent.type === "abbr") return;
      const replacement = split(node.value, abbrs);
      if (!replacement) return;
      parent.children.splice(index, 1, ...replacement);
      return index + replacement.length;
    });
  };
}
