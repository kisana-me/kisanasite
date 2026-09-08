import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkFlexibleMarkers from "remark-flexible-markers";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

const md = `
==最新アルバム「STRATEGY」== が出た。

==**太字を含む**マーク== も試す。

数式の a == b は変換されないこと。

\`==code==\` はそのまま。
`;
const out = await unified()
  .use(remarkParse).use(remarkGfm).use(remarkFlexibleMarkers)
  .use(remarkRehype).use(rehypeStringify).process(md);
console.log(String(out));
