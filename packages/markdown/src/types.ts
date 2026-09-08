export type MediaKind = "image" | "video" | "audio" | "file";

/**
 * **描画側は受け取らない。** `rewriteMediaRefs` が本文を配信URLに直すときにだけ
 * 使う（CMS が持っていて、配信データには載らない）。
 */
export interface MediaItem {
  id: string;
  kind: MediaKind;
  mime: string;
  /**
   * 保存されているファイルの拡張子。
   * 静止画は変換後の "webp"、アニメーション画像は元の形式のまま。
   */
  ext: string;
  bytes?: number | null;
  name?: string;
  alt?: string;
}

/** 記事カード埋め込み（::post）に必要な最小限 */
export interface PostRef {
  slug: string;
  title: string;
  summary?: string;
  /** 配信URLそのもの。id ではない（解決するのは CMS の仕事）*/
  thumbnailUrl?: string | null;
  publishedAt?: string | null;
  editedAt?: string | null;
}

/**
 * **描画に要るのはURLと記事の索引だけ。** メディアの一覧も配信元のホストも
 * 持たない。本文に入っている画像・動画の参照は、ここへ来る前に配信URLへ
 * 置き換わっている（`rewriteMediaRefs`）。
 */
export interface RenderContext {
  /** slug -> PostRef */
  posts: Record<string, PostRef>;
  /** 例: https://ivecolor.com */
  siteUrl: string;
}

export interface TocItem {
  depth: number;
  id: string;
  text: string;
}
