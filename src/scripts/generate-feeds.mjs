import fs from "node:fs";
import path from "node:path";

/**
 * sitemap.xml と feed.xml を `public/` に書き出す。
 *
 * **`output: 'export'` では動的ルートが使えない**ので、ページとしては作れない。
 * `public/` に置けば `next build` が `out/` へ写し、`next dev` でもそのまま出る。
 * 生成物なので `.gitignore` に入れてある。
 */

const escape = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** RSS の pubDate は RFC 822。壊れた日付は出さない */
function toRfc822(iso) {
  if (!iso) return null;
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? null : date.toUTCString();
}

function toIso(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

/**
 * CMS が持たないページも sitemap には要る。
 * **固定ページも載せる** — フッターから常時リンクされている実ページなので
 * （blog17 は載せていない。契約 1.2 のとおり、ここは表示側の判断）。
 */
const STATIC_ENTRIES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/works", changefreq: "weekly", priority: "0.8" },
  { path: "/posts", changefreq: "weekly", priority: "0.8" },
  { path: "/tags", changefreq: "monthly", priority: "0.4" },
  { path: "/contact", changefreq: "yearly", priority: "0.3" },
  { path: "/sitemap", changefreq: "monthly", priority: "0.3" },
  { path: "/tools", changefreq: "monthly", priority: "0.4" },
  { path: "/tools/markdown-editor", changefreq: "monthly", priority: "0.4" },
  { path: "/tools/blockchain-maker", changefreq: "monthly", priority: "0.4" },
  { path: "/tools/rsa-key-generator", changefreq: "monthly", priority: "0.4" },
  { path: "/terms-of-service", changefreq: "yearly", priority: "0.3" },
  { path: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
];

/** `trailingSlash: true` に合わせる。ルート以外は末尾に `/` を付ける */
function absoluteUrl(siteUrl, pathname) {
  const url = new URL(pathname === "/" ? "/" : `${pathname}/`, siteUrl);
  return url.toString();
}

function sitemapXml(generated) {
  const { url: siteUrl } = generated.site;
  const entries = STATIC_ENTRIES.map((entry) => ({
    loc: absoluteUrl(siteUrl, entry.path),
    changefreq: entry.changefreq,
    priority: entry.priority,
  }));

  for (const work of generated.works.list) {
    entries.push({
      loc: absoluteUrl(siteUrl, `/works/${work.slug}`),
      lastmod: toIso(work.editedAt ?? work.publishedAt),
      changefreq: "monthly",
      priority: "0.6",
    });
  }
  for (const post of generated.posts.list) {
    entries.push({
      loc: absoluteUrl(siteUrl, `/posts/${post.slug}`),
      lastmod: toIso(post.editedAt ?? post.publishedAt),
      changefreq: "weekly",
      priority: "0.6",
    });
  }

  const body = entries
    .map(
      (e) => `  <url>
    <loc>${escape(e.loc)}</loc>
${e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>\n` : ""}    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

/** RSS に出すのは記事だけ。作品は更新されるものではないので入れない */
function feedXml(generated) {
  const { name, description, url: siteUrl } = generated.site;
  const items = generated.posts.list.slice(0, 50).map((post) => {
    const link = absoluteUrl(siteUrl, `/posts/${post.slug}`);
    const pubDate = toRfc822(post.publishedAt);
    return `    <item>
      <title>${escape(post.title)}</title>
      <link>${escape(link)}</link>
      <guid isPermaLink="true">${escape(link)}</guid>
      <description>${escape(post.plain)}</description>
${pubDate ? `      <pubDate>${pubDate}</pubDate>\n` : ""}    </item>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(name)}</title>
    <link>${escape(absoluteUrl(siteUrl, "/"))}</link>
    <atom:link href="${escape(new URL("/feed.xml", siteUrl).toString())}" rel="self" type="application/rss+xml" />
    <description>${escape(description || name)}</description>
    <language>ja</language>
${items.join("\n")}
  </channel>
</rss>
`;
}

export function writeFeeds({ rootDir, generated }) {
  const outputs = [
    ["sitemap.xml", sitemapXml(generated)],
    ["feed.xml", feedXml(generated)],
  ];
  for (const [name, body] of outputs) {
    const target = path.join(rootDir, "public", name);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, body, "utf8");
    console.log(`Generated public/${name}`);
  }
}
