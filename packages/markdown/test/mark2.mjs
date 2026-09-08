import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFlexibleMarkers from "remark-flexible-markers";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

const md = "==強調== と ==*斜体*== 。";
for (const [label, opts] of [
  ["className: false", { markerClassName: false }],
  ["className: () => []", { markerClassName: () => [] }],
  ["markerClassName undefined + markerProperties", { markerProperties: () => ({}) }],
]) {
  try {
    const out = await unified()
      .use(remarkParse).use(remarkFlexibleMarkers, opts)
      .use(remarkRehype).use(rehypeStringify).process(md);
    console.log(label, "→", String(out).trim());
  } catch (e) {
    console.log(label, "→ ERROR:", e.message.split("\n")[0]);
  }
}
