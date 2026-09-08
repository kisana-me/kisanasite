import type { MediaItem } from "./types.ts";

/**
 * 本文中のメディア参照は `/m/{id}` の1形だけ。拡張子もサイズも書かない。
 *
 * **描画のときには、この形はもう残っていない。** CMS が配信データを作る前に
 * `rewriteMediaRefs` で配信URLへ置き換える（CMS の docs/design.md 6.1）。
 * ここまで残っているのは、そのidのメディアが見つからなかったときだけ。
 */
export const MEDIA_REF = /^\/m\/([A-Za-z0-9_-]+)\/?$/;

/**
 * 置き換えられずに残った `/m/{id}`。**解決できなかった参照**を意味する。
 * 消されたか、非公開にされたか、idを打ち間違えたか。
 */
export function isUnresolvedRef(url: string): boolean {
  return MEDIA_REF.test(url.trim());
}

/**
 * 1メディア = 1ファイル。
 *
 * 静止画はアップロード時にブラウザで webp 化したものだけを持ち、原本は保存しない。
 * アニメーション画像はブラウザで変換できないので、そのままの形式で保存する
 * （`ext` が gif や webp のまま）。どちらも `media/{id}.{ext}` の1本に収まる。
 */
export function mediaUrl(baseUrl: string, item: MediaItem): string {
  return `${baseUrl}/media/${item.id}.${item.ext}`;
}

/** Markdown のリンクテキストに入れて壊れないようにする */
function escapeLabel(text: string): string {
  return text.replace(/([[\]\\])/g, "\\$1");
}

/** `caption="..."` に入れて壊れないようにする */
function escapeAttr(text: string): string {
  return text.replace(/(["\\])/g, "\\$1");
}

/** 拡張子とキャプションの出どころ。**表示側はこれを受け取らない** */
export interface RewriteSource {
  /** id -> メディア。`GET /api/media` や D1 の1行から作る */
  media: Record<string, MediaItem>;
  /** 例: https://m.ivecolor.com */
  baseUrl: string;
}

/** コードブロックとコードスパンを伏せる。中の `/m/xxx` は本文ではない */
const CODE = /(^|\n)(?:```|~~~)[\s\S]*?(?:\n(?:```|~~~)|$)|`+[^`\n]*`+/g;

function maskCode(md: string): { masked: string; restore: (s: string) => string } {
  const holes: string[] = [];
  const masked = md.replace(CODE, (hit) => {
    holes.push(hit);
    return `\u0000${holes.length - 1}\u0000`;
  });
  return {
    masked,
    restore: (s) => s.replace(/\u0000(\d+)\u0000/g, (_, i) => holes[Number(i)]!),
  };
}

/** 画像の代替テキスト・キャプションに使う名前。alt を先に見る */
function labelOf(item: MediaItem): string {
  return (item.alt || item.name || "").trim();
}

const EMPTY_ALT = /!\[[ \t]*\]\([ \t]*\/m\/([A-Za-z0-9_-]+)\/?[ \t]*\)/g;
const PLAYER = /^([ \t]*::(?:video|audio))(\[[^\]\n]*\]|)(\{[^}\n]*\}|)[ \t]*$/gm;
const REF = /\/m\/([A-Za-z0-9_-]+)/g;
const PLAYER_SRC = /(?:^|[\s{])(?:src|id|media)=(\/m\/[A-Za-z0-9_-]+)|^\{?(\/m\/[A-Za-z0-9_-]+)/;

/**
 * 本文の `/m/{id}` を配信URLに置き換える。**配信データに `media` を積まずに
 * 済ませるための変換**で、表示側に渡るのは URL だけになる（CMS の
 * docs/design.md 6.1）。CMS のプレビューも同じ関数を通すので、
 * プレビューと公開後で解決の仕方がずれない。
 *
 * ついでに、**空の代替テキストとキャプションをここで埋める。** 埋める材料
 * （`alt` / `name`）は `media` にしかなく、表示側はもう持っていない。
 *
 * **見つからなかった id は `/m/{id}` のまま残す。** 拡張子が分からない以上
 * URLを組みようがないので、表示側で「存在しない画像」として出す。
 */
export function rewriteMediaRefs(md: string, source: RewriteSource): string {
  if (!md) return md;
  const { masked, restore } = maskCode(md);
  const { media, baseUrl } = source;

  let out = masked;

  // 1. `![](/m/xxx)` の空の alt を埋める。figcaption もこの値から出る
  out = out.replace(EMPTY_ALT, (hit, id: string) => {
    const item = media[id];
    const label = item ? labelOf(item) : "";
    return label ? `![${escapeLabel(label)}](/m/${id})` : hit;
  });

  // 2. `::video` / `::audio` に caption が無ければ、メディアの名前を入れる
  out = out.replace(PLAYER, (hit, head: string, text: string, attrs: string) => {
    if (/(?:^|[\s{])caption=/.test(attrs)) return hit;
    const found = PLAYER_SRC.exec(attrs) ?? PLAYER_SRC.exec(text.slice(1, -1));
    const ref = found?.[1] ?? found?.[2];
    const id = ref ? MEDIA_REF.exec(ref)?.[1] : undefined;
    const item = id ? media[id] : undefined;
    const label = item ? labelOf(item) : "";
    if (!label) return hit;
    const body = attrs ? attrs.slice(1, -1) : "";
    return `${head}${text}{${body ? `${body} ` : ""}caption="${escapeAttr(label)}"}`;
  });

  // 3. 残った参照をすべて配信URLにする。見つからないものは触らない
  out = out.replace(REF, (hit, id: string) => {
    const item = media[id];
    return item ? mediaUrl(baseUrl, item) : hit;
  });

  return restore(out);
}
