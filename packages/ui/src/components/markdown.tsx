import ReactMarkdown from "react-markdown";
//biome-ignore format: leave alone
import { 
  Anchor, Blockquote, Em,
  H1, H2, H3, H4, H5, H6,
  InlineCode,Li,
  Ol, P, Pre, Strong,Ul 
} from "../typography";

interface MarkdownProps {
  children?: string | null;
}

export const Markdown = ({ children }: MarkdownProps) => {
  return (
    <ReactMarkdown
      children={children}
      components={{
        h1: H1,
        h2: H2,
        h3: H3,
        h4: H4,
        h5: H5,
        h6: H6,
        blockquote: Blockquote,
        p: P,
        a: Anchor,
        strong: Strong,
        em: Em,
        ul: Ul,
        ol: Ol,
        li: Li,
        code: InlineCode,
        pre: Pre,
      }}
    />
  );
};
