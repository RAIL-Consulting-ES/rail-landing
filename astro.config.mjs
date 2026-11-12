// @ts-check
import { defineConfig } from 'astro/config';

// Envuelve cada tabla de Markdown en un contenedor con scroll horizontal, para
// que en móvil se desplace la tabla y no la página.
const wrapTables = () => (tree) => {
  const walk = (node) => {
    if (!node.children) return;
    node.children = node.children.map((child) => {
      if (child.type === 'element' && child.tagName === 'table') {
        return {
          type: 'element',
          tagName: 'div',
          properties: { className: ['table-wrap'] },
          children: [child],
        };
      }
      walk(child);
      return child;
    });
  };
  walk(tree);
};

// https://astro.build/config
export default defineConfig({
  site: 'https://www.railconsulting.es',
  trailingSlash: 'always',
  markdown: {
    rehypePlugins: [wrapTables],
  },
});
