import rehypeMathJaxSvg from 'rehype-mathjax'
import rehypeStringify from 'rehype-stringify'
import remarkMath from 'remark-math'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeHighlight from 'rehype-highlight'
import { unified } from 'unified'
import { Node } from 'unist'
import { visit } from 'unist-util-visit'
import { Element } from 'hast'
import { getUrl } from '@/lib/url'

function rehypeTransformImageUrls(slug: string) {
  return async (tree: Node, _file: unknown) => {
    visit(tree, 'element', (node: Node & Element) => {
      const { tagName, properties } = node

      // undefined との union 型の場合は、undefined を除外
      if (tagName === 'img' && properties) {
        // properties: ![alt](src) の alt,src
        const { src, alt } = properties
        const srcString = src as string

        node.properties = {
          src: getUrl(slug + '/' + srcString),
          alt: alt,
        }
      }
    })
  }
}

export async function markdownToHtml(markdown: string, slug: string) {
  const processor = unified()
    .use(remarkParse) // markdown -> mdast の変換
    .use(remarkRehype) // mdast -> hast の変換
    .use(remarkMath)
    .use(rehypeMathJaxSvg)
    .use(() => rehypeTransformImageUrls(slug))
    .use(rehypeHighlight) // syntax highlight 追加
    .use(rehypeStringify) // hast -> html の変換

  const result = await processor.process(markdown) // 実行

  return result.toString()
}
