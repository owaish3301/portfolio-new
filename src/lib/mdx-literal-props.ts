import type { Root, RootContent } from 'mdast';

// Keystatic serializes multiline text props as JSON strings inside JSX braces.
// Preserve those strings without enabling executable JavaScript in article bodies.
export function mdxLiteralProps() {
  return (tree: Root) => {
    function walk(node: Root | RootContent) {
      if (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') {
        for (const attribute of node.attributes) {
          if (attribute.type !== 'mdxJsxAttribute' || !attribute.value || typeof attribute.value === 'string') continue;
          try {
            const value: unknown = JSON.parse(attribute.value.value);
            if (typeof value === 'string') attribute.value = value;
          } catch { /* The compiler's blockJS option removes executable expressions. */ }
        }
      }
      if ('children' in node) for (const child of node.children) walk(child as RootContent);
    }
    walk(tree);
  };
}
