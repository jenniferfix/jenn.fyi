import ReactMarkdown from "react-markdown";
import {
  Anchor,
  Blockquote,
  Em,
  H1,
  H2,
  H3,
  H4,
  P,
  Strong,
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
        blockquote: Blockquote,
        p: P,
        a: Anchor,
        strong: Strong,
        em: Em,
      }}
    />
  );
};
