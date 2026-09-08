import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

/**
 * データの取得口はここ1箇所だけ。blog17 の `src/lib/source.ts` と同じ役割で、
 * 読むのは同じ契約のJSON（headless-cms の `GET /export/build.json`）。
 *
 *   SITE_DATA_SOURCE=fixture (既定) … fixtures/site-data.json を読む
 *   SITE_DATA_SOURCE=api             … CMS の /export/build.json を fetch する
 *
 * 契約は blog17 の docs/data-contract.md が正本。
 */

/** 予約タグ。これが付いている公開記事が「作品」になる（契約の「予約タグ」）*/
export const WORKS_TAG = "works";

/** 固定ページ。`status === 'specific'` の記事を `name_id` で引く */
export const PAGE_NAME_IDS = ["about", "terms-of-service", "privacy-policy", "contact"];

async function loadFromFixture() {
  const path = fileURLToPath(new URL("../fixtures/site-data.json", import.meta.url));
  return JSON.parse(await readFile(path, "utf8"));
}

async function loadFromApi() {
  const url = process.env.STUDIO_EXPORT_URL;
  if (!url) throw new Error("SITE_DATA_SOURCE=api には STUDIO_EXPORT_URL が必要です");
  const token = process.env.STUDIO_EXPORT_TOKEN;
  const res = await fetch(url, {
    headers: token ? { authorization: `Bearer ${token}` } : {},
  });
  // **古いデータで静かに公開されるのが一番まずい**ので、ここで必ず落とす
  if (!res.ok) {
    throw new Error(`CMS からの取得に失敗しました: ${res.status} ${res.statusText}`);
  }
  return await res.json();
}

export async function loadSiteData() {
  return process.env.SITE_DATA_SOURCE === "api" ? await loadFromApi() : await loadFromFixture();
}
