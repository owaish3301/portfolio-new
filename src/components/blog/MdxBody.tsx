import type { ComponentProps, ReactElement, ReactNode } from 'react';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import type { MDXComponents } from 'mdx/types';
import CodeBlock from './CodeBlock';
import { mdxLiteralProps } from '@/lib/mdx-literal-props';

function Quote({ children }: { children: ReactNode }) {
  return <div className="my-8 rounded-2xl border-l-4 border-accent bg-blue-50/70 p-6 shadow-xs"><blockquote className="font-serif italic text-lg sm:text-xl text-gray-dark leading-snug">{children}</blockquote></div>;
}

function Callout({ title = 'Rule of thumb', children }: { title?: string; children: ReactNode }) {
  return (
    <div className="my-6 flex items-start gap-3.5 rounded-2xl border border-blue-200 bg-blue-50/50 p-4 text-sm text-gray-dark break-words">
      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-white text-xs font-bold">i</div>
      <div className="min-w-0">
        <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold block mb-0.5">{title}</span>
        {children}
      </div>
    </div>
  );
}

const components: MDXComponents = {
  h1: props => <h2 {...props} className="text-2xl sm:text-3xl font-medium tracking-tight text-black pt-6 break-words" />,
  h2: props => <h2 {...props} className="text-2xl sm:text-3xl font-medium tracking-tight text-black pt-6 break-words" />,
  h3: props => <h3 {...props} className="text-xl sm:text-2xl font-medium tracking-tight text-black pt-4 break-words" />,
  h4: props => <h4 {...props} className="text-lg font-medium text-black pt-4 break-words" />,
  p: props => <p {...props} />,
  a: props => <a {...props} className="text-accent underline underline-offset-4 break-words" />,
  strong: props => <strong {...props} className="text-gray-dark" />,
  ul: props => <ul {...props} className="list-disc space-y-2 pl-6 text-gray-mid break-words" />,
  ol: props => <ol {...props} className="list-decimal space-y-2 pl-6 text-gray-mid break-words" />,
  code: props => <code {...props} className="text-accent font-mono text-xs break-all" />,
  pre: ({ children }) => {
    const code = children as ReactElement<{ children: string; className?: string }>;
    return <CodeBlock code={String(code.props.children).replace(/\n$/, '')} language={code.props.className?.replace('language-', '') || 'text'} />;
  },
  blockquote: Quote,
  img: ({ alt = '', ...props }: ComponentProps<'img'>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} alt={alt} loading="lazy" className="h-auto max-w-full rounded-2xl" />
  ),
  hr: props => <hr {...props} className="border-black/8 my-8" />,
  table: props => <div className="max-w-full overflow-x-auto"><table {...props} className="w-full border-collapse text-sm" /></div>,
  th: props => <th {...props} className="border border-black/8 bg-surface-alt px-4 py-3 text-left font-medium" />,
  td: props => <td {...props} className="border border-black/8 px-4 py-3" />,
  Callout, Quote, CodeBlock,
};

export default async function MdxBody({ source }: { source: string }) {
  const { content } = await compileMDX({
    source, components,
    options: { blockJS: true, mdxOptions: { remarkPlugins: [remarkGfm, mdxLiteralProps], rehypePlugins: [rehypeSlug] } },
  });
  return content;
}
