import { maskCode } from "./media.ts";

const JST = "Asia/Tokyo";

/** 旧サイトの strftime('%Y/%m/%d %H:%M') と同じ見た目にする */
export function formatDateTime(value?: string | null): string | null {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  const parts = new Intl.DateTimeFormat("ja-JP", {
    timeZone: JST,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return `${get("year")}/${get("month")}/${get("day")} ${get("hour")}:${get("minute")}`;
}

/** "90" / "1:30" / "01:02:03" を秒に。旧 parse_yt_sync_time と同じ規則 */
export function parseTime(value: unknown): number | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "number") return value;
  const s = String(value).trim();
  if (!s) return null;
  if (/^\d+(?:\.\d+)?$/.test(s)) return Number(s);
  const m = /^(?:(\d+):)?(\d{1,2}):(\d{2})$/.exec(s);
  if (m) return Number(m[1] ?? 0) * 3600 + Number(m[2]) * 60 + Number(m[3]);
  return null;
}

/**
 * `::: warning` を `:::warning` に寄せる。
 *
 * remark-directive は**名前の前に空白を許さない**が、markdown-it-container は
 * 許していた。旧 kisana.me の本文はその書き方で、そのまま通すと段落として
 * 出てしまう（黙って地の文になるので気づきにくい）。開始行だけ詰める。
 *
 * 閉じ側（`:::` だけの行）は元から名前を持たないので触らない。
 * コードブロックの中は伏せてから当てる。
 */
const CONTAINER_OPEN = /^(:{3,})[ \t]+(?=[A-Za-z][\w-]*)/gm;

export function normalizeDirectives(md: string): string {
  if (!md || !md.includes(":::")) return md;
  const { masked, restore } = maskCode(md);
  return restore(masked.replace(CONTAINER_OPEN, "$1"));
}
