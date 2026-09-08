import { h } from "hastscript";
import type { Element } from "hast";
import type { PostRef } from "./types.ts";
import { formatDateTime } from "./util.ts";

/**
 * 埋め込みのクラス名は旧サイトの CSS をそのまま使えるように合わせてある。
 * Stimulus の data-controller は data-embed に置き換えた（読み込みは site 側の
 * 小さなスクリプトが担当する）。
 */

function loader(label: string): Element {
  return h(".embed-loader", [h(".embed-spinner"), h("span", label)]);
}

export function youtubeEmbed(videoId: string): Element {
  return h(".embed-container", { dataEmbed: "youtube" }, [
    h(".youtube-embed-frame", [
      h("iframe", {
        src: `https://www.youtube.com/embed/${videoId}`,
        title: "YouTube",
        loading: "lazy",
        frameborder: "0",
        allowfullscreen: true,
        allow:
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
      }),
    ]),
  ]);
}

export function xEmbed(tweetId: string): Element {
  return h(".embed-container", { dataEmbed: "x" }, [
    loader("Xの投稿を準備中..."),
    h(
      "blockquote.twitter-tweet",
      { dataDnt: "true", style: "max-width: 550px; margin: 0 auto;" },
      [h("a", { href: `https://twitter.com/i/status/${tweetId}` })],
    ),
  ]);
}

export function tiktokEmbed(videoId: string): Element {
  return h(".embed-container", { dataEmbed: "tiktok" }, [
    loader("TikTokの投稿を準備中..."),
    h(
      "blockquote.tiktok-embed",
      {
        cite: `https://www.tiktok.com/@user/video/${videoId}`,
        dataVideoId: videoId,
        style: "width: 100%; max-width: 325px; margin: 0 auto;",
      },
      [h("section")],
    ),
  ]);
}

export function instagramEmbed(shortcode: string): Element {
  return h(".embed-container", { dataEmbed: "instagram" }, [
    loader("Instagramの投稿を準備中..."),
    h("blockquote.instagram-media", {
      dataInstgrmPermalink: `https://www.instagram.com/p/${shortcode}/`,
      dataInstgrmVersion: "14",
      style:
        "background:#FFF; border:0; margin: 0 auto; max-width:540px; min-width:326px; padding:0; width:100%;",
    }),
  ]);
}

/** 旧 posts/_show_mini.html.erb と同じ構造 */
export function postCard(post: PostRef): Element {
  const thumbnail = post.thumbnailUrl
    ? h("img", {
        src: post.thumbnailUrl,
        alt: `${post.title}のサムネイル`,
        loading: "lazy",
        decoding: "async",
      })
    : h(".show-mini-post-altspace", [
        h(".show-mini-post-alttext", "サムネイル画像なし"),
      ]);

  const published = formatDateTime(post.publishedAt);
  const edited = formatDateTime(post.editedAt);
  const dates: string[] = [];
  if (published) dates.push(`公開:${published}`);
  if (edited) dates.push(`更新:${edited}`);

  return h(".show-mini-post", [
    h("a", { href: `/posts/${post.slug}` }, [
      h(".show-mini-post-container", [
        h(".show-mini-post-thumbnail", [thumbnail]),
        h(".show-mini-post-context", [
          h(".show-mini-post-title", post.title || "タイトルなし"),
          h("span", dates.join(" ")),
        ]),
      ]),
    ]),
  ]);
}

/**
 * 自分のところで配信するメディアのプレイヤー。**埋め込みとは別物**で、
 * 外部サービスの iframe を挟まないので loader も要らない。
 *
 * `controls` は常に付ける。**付けないと再生する手段が無くなる。**
 * `preload="metadata"` にして、開いただけで実体を落とさせない。
 */
export function videoPlayer(
  src: string,
  options: { poster?: string; loop?: boolean; muted?: boolean; autoplay?: boolean } = {},
): Element {
  // 自動再生はミュートでなければブラウザが無視する。**黙って効かないより、
  // こちらで muted を立てて意図どおりに動かす**
  const muted = options.muted || options.autoplay;
  return h(".markdown-player.markdown-player--video", [
    h("video", {
      src,
      controls: true,
      preload: "metadata",
      playsinline: true,
      // 寸法は出さない。幅は表示側の CSS（`.markdown-player video { width: 100% }`）
      poster: options.poster || undefined,
      loop: options.loop || undefined,
      muted: muted || undefined,
      autoplay: options.autoplay || undefined,
    }),
  ]);
}

export function audioPlayer(src: string, options: { loop?: boolean } = {}): Element {
  return h(".markdown-player.markdown-player--audio", [
    h("audio", {
      src,
      controls: true,
      preload: "metadata",
      loop: options.loop || undefined,
    }),
  ]);
}

/** プレイヤーの下に出す説明。無ければ何も出さない */
export function playerFigure(player: Element, caption: string): Element {
  if (!caption) return player;
  return h("figure.markdown-player-figure", [player, h("figcaption", caption)]);
}

export function missingNode(label: string): Element {
  return h("span.markdown-missing", label);
}

export const YT_LOGO = h(
  "svg",
  { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: 24, height: 24, ariaHidden: "true" },
  [
    h("path", {
      d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z",
      fill: "#FF0000",
    }),
    h("path", { d: "M9.545 15.568L15.818 12l-6.273-3.568v7.136z", fill: "#FFFFFF" }),
  ],
);

export function ytSyncHeader(): Element {
  return h(".yt-sync-header", [YT_LOGO, h("span.yt-sync-header-text", "YouTube Sync")]);
}

export function ytSyncMain(): Element {
  return h(".yt-sync-main", [h(".yt-sync-player")]);
}
