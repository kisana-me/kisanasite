import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import type { Element } from "hast";
import type { RenderContext } from "./types.ts";
import { isUnresolvedRef } from "./media.ts";
import {
  audioPlayer,
  instagramEmbed,
  missingNode,
  playerFigure,
  postCard,
  tiktokEmbed,
  xEmbed,
  youtubeEmbed,
  videoPlayer,
  ytSyncHeader,
  ytSyncMain,
} from "./embeds.ts";
import { parseTime } from "./util.ts";

/* eslint-disable @typescript-eslint/no-explicit-any */

/** 事前に組んだ hast をそのまま出す（子の Markdown は処理されない）*/
function asLeaf(node: any, el: Element): void {
  node.data = {
    // src/alt は image ノード由来の値が残るので明示的に消す
    hProperties: { src: undefined, alt: undefined, ...el.properties },
    hName: el.tagName,
    hChildren: el.children,
  };
}

/** タグだけ差し替えて、子の Markdown は通常どおり処理させる */
function asContainer(node: any, tagName: string, properties: Record<string, unknown>): void {
  node.data = { hName: tagName, hProperties: properties };
}

function synth(type: string, tagName: string, properties: Record<string, unknown>, children: any[] = []) {
  return { type, data: { hName: tagName, hProperties: properties }, children };
}

function synthLeaf(type: string, el: Element) {
  return {
    type,
    data: { hName: el.tagName, hProperties: el.properties, hChildren: el.children },
    children: [],
  };
}

const RE = {
  youtube: [
    /^https?:\/\/(?:www\.)?youtube\.com\/watch\?(?:[^#]*&)?v=([\w-]{6,})/,
    /^https?:\/\/youtu\.be\/([\w-]{6,})/,
    /^https?:\/\/(?:www\.)?youtube\.com\/shorts\/([\w-]{6,})/,
  ],
  x: [/^https?:\/\/(?:www\.)?(?:twitter|x)\.com\/[^/]+\/status\/(\d+)/],
  tiktok: [/^https?:\/\/(?:www\.)?tiktok\.com\/@[^/]+\/video\/(\d+)/],
  instagram: [/^https?:\/\/(?:www\.)?instagram\.com\/(?:p|reel)\/([\w-]+)/],
};

/**
 * `::: info` 系のコールアウト。旧 kisana.me が markdown-it-container で
 * 4種類だけ定義していたので、それに合わせる。**ここに無い名前は素通し**で、
 * 未知のディレクティブとして消える
 */
const CALLOUTS = new Set(["info", "success", "warning", "danger"]);

function matchFirst(url: string, patterns: RegExp[]): string | null {
  for (const re of patterns) {
    const m = re.exec(url);
    if (m) return m[1]!;
  }
  return null;
}

/** URL単独行 → 埋め込み。判定できなければ null（ただのリンクのまま残す）*/
function embedForUrl(ctx: RenderContext, url: string): Element | null {
  const yt = matchFirst(url, RE.youtube);
  if (yt) return youtubeEmbed(yt);
  const x = matchFirst(url, RE.x);
  if (x) return xEmbed(x);
  const tt = matchFirst(url, RE.tiktok);
  if (tt) return tiktokEmbed(tt);
  const ig = matchFirst(url, RE.instagram);
  if (ig) return instagramEmbed(ig);

  const selfPost = new RegExp(
    `^${ctx.siteUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/posts/([\\w-]+)/?$`,
  ).exec(url);
  if (selfPost) {
    const post = ctx.posts[selfPost[1]!];
    return post ? postCard(post) : missingNode("[存在しない記事]");
  }
  return null;
}

/**
 * `::video` / `::audio` を組み立てる。
 *
 * 参照は本文の画像と同じで、**ここへ来る時点では配信URLになっている**
 * （CMS が `rewriteMediaRefs` で置き換える）。**属性名でも位置引数でも書ける**
 * ようにしてあるのは、directive の `{...}` が `id` やクラス名として
 * 解釈されうるため。実際に来る形を全部拾う。
 *
 * ```
 * ::video{src=/m/xxxxxxxxxxxxxx poster=/m/yyyyyyyyyyyyyy loop}
 * ::audio{src=/m/xxxxxxxxxxxxxx caption="第1回の音源"}
 * ```
 *
 * **画像を ::video に渡したかどうかは見ない。** 判別に使っていた `kind` は
 * 配信データから外れたし、書き方を間違えないのは書く側の責任にした。
 */
function playerNode(node: any, kind: "video" | "audio") {
  const attrs = node.attributes ?? {};
  // remark-directive は `{/m/xxx}` を id 属性に、`{.foo}` を className に入れる。
  // 素の値として書かれたときのために、本文（[...]）も最後に見る
  const src: string | undefined = attrs.src ?? attrs.id ?? attrs.media ?? textOf(node) ?? undefined;
  if (!src) return missingNode(`[${kind} 設定エラー: メディアの指定が無い]`);
  if (isUnresolvedRef(src)) {
    return missingNode(`[存在しない${kind === "video" ? "動画" : "音声"}]`);
  }

  const caption: string = attrs.caption ?? "";
  const loop = has(attrs, "loop");

  if (kind === "audio") return playerFigure(audioPlayer(src, { loop }), caption);

  const poster: string | undefined = attrs.poster;
  if (poster && isUnresolvedRef(poster)) return missingNode("[存在しないポスター画像]");

  return playerFigure(
    videoPlayer(src, {
      poster,
      loop,
      muted: has(attrs, "muted"),
      autoplay: has(attrs, "autoplay"),
    }),
    caption,
  );
}

/** `{loop}` は値なしで来る。remark-directive は空文字を入れる */
function has(attrs: Record<string, unknown>, name: string): boolean {
  const value = attrs[name];
  return value !== undefined && value !== null && value !== "false";
}

/**
 * `::video[https://...]` のように本文へ書かれたとき用。
 *
 * **`children[0].value` では取れない。** 中身は配信URLになっていて、
 * remark-gfm がそれをリンクノードに変えてしまう。文字列に潰して読む。
 */
function textOf(node: any): string | null {
  const text = toString(node).trim();
  return text || null;
}

export function remarkIvecolor(ctx: RenderContext) {
  return function transformer(tree: any): void {
    // --- 1. リーフディレクティブ ---
    visit(tree, "leafDirective", (node: any) => {
      const attrs = node.attributes ?? {};
      const id: string | undefined = attrs.id ?? attrs.video ?? attrs.code;
      switch (node.name) {
        case "youtube":
          if (id) asLeaf(node, youtubeEmbed(id));
          break;
        case "x":
        case "twitter":
          if (id) asLeaf(node, xEmbed(id));
          break;
        case "tiktok":
          if (id) asLeaf(node, tiktokEmbed(id));
          break;
        case "instagram":
        case "ig":
          if (id) asLeaf(node, instagramEmbed(id));
          break;
        case "post": {
          const slug: string | undefined = attrs.slug ?? attrs.id;
          const post = slug ? ctx.posts[slug] : undefined;
          asLeaf(node, post ? postCard(post) : missingNode("[存在しない記事]"));
          break;
        }
        // 自前で配信するメディア。**外部埋め込みとは別物**で iframe を挟まない
        case "video":
        case "audio":
          asLeaf(node, playerNode(node, node.name));
          break;
        default:
          break;
      }
    });

    // --- 2. yt-sync（cue で区切ってグループ化する）---
    visit(tree, "containerDirective", (node: any) => {
      if (node.name !== "yt-sync") return;
      const videoId: string | undefined = node.attributes?.video ?? node.attributes?.id;
      if (!videoId) {
        asLeaf(node, missingNode("[yt-sync 設定エラー: video が無い]"));
        return;
      }

      const groups: { at: number; children: any[] }[] = [];
      for (const child of node.children ?? []) {
        if (child.type === "leafDirective" && child.name === "cue") {
          const at = parseTime(child.attributes?.at ?? child.attributes?.id);
          groups.push({ at: at ?? 0, children: [] });
        } else if (groups.length > 0) {
          groups[groups.length - 1]!.children.push(child);
        }
      }
      groups.sort((a, b) => a.at - b.at);

      if (groups.length === 0) {
        asLeaf(node, missingNode("[yt-sync 設定エラー: cue が無い]"));
        return;
      }

      const cueNodes = groups.map((g, i) =>
        synth("ytSyncCue", "div", {
          className: i === 0 ? ["yt-sync-cue"] : ["yt-sync-cue", "yt-sync-cue--hidden"],
        }, g.children),
      );

      node.children = [
        synth("ytSyncInner", "div", { className: ["yt-sync-inner"] }, [
          synthLeaf("ytSyncHeader", ytSyncHeader()),
          synthLeaf("ytSyncMain", ytSyncMain()),
          synth("ytSyncContent", "div", { className: ["yt-sync-content"] }, cueNodes),
        ]),
      ];

      asContainer(node, "div", {
        className: ["yt-sync"],
        "data-yt-sync": "",
        "data-yt-sync-video-id": videoId,
        "data-yt-sync-cues": JSON.stringify(groups.map((g) => ({ at: g.at }))),
      });
    });

    // --- 3. 画像。参照は配信URLに置き換わっている（rewriteMediaRefs）---
    visit(tree, "image", (node: any) => {
      const url: string = node.url ?? "";
      if (isUnresolvedRef(url)) {
        asLeaf(node, missingNode("[存在しない画像]"));
        return;
      }
      node.data = {
        hName: "img",
        hProperties: {
          src: url,
          alt: node.alt ?? "",
          loading: "lazy",
          decoding: "async",
        },
      };
      node.__image = true;
    });

    // --- 4. gallery: 中の画像を figure として横に並べる ---
    visit(tree, "containerDirective", (node: any) => {
      if (node.name !== "gallery") return;
      const images: any[] = [];
      visit(node, "image", (img: any) => {
        images.push(img);
      });
      node.children = images.map((img) => {
        // キャプションの材料は alt だけ。空なら CMS が出力時に埋めている
        const caption = (img.alt ?? "").trim();
        const children: any[] = [img];
        if (caption) {
          children.push(
            synth("figCaption", "figcaption", {}, [{ type: "text", value: caption }]),
          );
        }
        return synth("galleryFigure", "figure", {
          className: ["markdown-image-figure"],
        }, children);
      });
      asContainer(node, "div", { className: ["markdown-image-slider"] });
    });

    // --- 5. コールアウト（::: info / success / warning / danger）---
    // 旧 kisana.me の markdown-it-container で書かれた記法をそのまま通す。
    // 中身は素の Markdown のまま処理させたいので asContainer を使う
    visit(tree, "containerDirective", (node: any) => {
      if (!CALLOUTS.has(node.name)) return;
      const label = node.attributes?.title ?? node.attributes?.label;
      if (label) {
        node.children = [
          synth("calloutTitle", "div", { className: ["markdown-callout-title"] }, [
            { type: "text", value: label },
          ]),
          ...(node.children ?? []),
        ];
      }
      asContainer(node, "div", {
        className: ["markdown-callout", `markdown-callout--${node.name}`],
      });
    });

    // --- 6. 段落の整形（単独画像 → figure、URL単独行 → 埋め込み）---
    visit(tree, "paragraph", (node: any) => {
      const kids = (node.children ?? []).filter(
        (c: any) => !(c.type === "text" && /^\s*$/.test(c.value ?? "")),
      );
      if (kids.length !== 1) return;
      const only = kids[0];

      // URL単独行
      if (only.type === "link" && only.url === toString(only).trim()) {
        const el = embedForUrl(ctx, only.url);
        if (el) {
          asLeaf(node, el);
          node.children = [];
        }
        return;
      }

      // 単独画像 → figure + figcaption（旧 ?[image] と同じ見た目）
      if (only.type === "image" && only.__image) {
        const caption = (only.alt ?? "").trim();
        node.children = [only];
        if (caption) {
          node.children.push(
            synth("figCaption", "figcaption", {}, [{ type: "text", value: caption }]),
          );
        }
        asContainer(node, "figure", { className: ["markdown-image-figure"] });
      }
    });
  };
}
