import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkHeadingId from "remark-heading-id";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export const processor = unified()
	.use(remarkParse)
	.use(remarkGfm)
	.use(remarkHeadingId, { defaults: true })
	.use(remarkRehype, { allowDangerousHtml: true })
	.use(rehypeRaw) // allow html within markdown files
	.use(rehypeHighlight)
	.use(rehypeStringify)
	.use(rehypeAutolinkHeadings, { behavior: "append" });
