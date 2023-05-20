import rehypeMathJaxSvg from 'rehype-mathjax'
import rehypeStringify from 'rehype-stringify'
import remarkMath from 'remark-math'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { Node } from 'unist'
import { visit } from 'unist-util-visit'
import { Element } from 'hast'

const getUrl = (public_id: string): string => {
  return (
    'https://res.cloudinary.com/' +
    process.env.CLOUDINARY_CLOUD_NAME +
    '/image/upload/v1684482420/portfolio/' +
    public_id
  )
}

function rehypeImageSize() {
  return async (tree: Node, _file: unknown) => {
    visit(tree, 'element', (node: Node & Element) => {
      const { tagName, properties } = node

      // undefined との union 型の場合は、undefined を除外
      if (tagName === 'img' && properties) {
        // properties: ![alt](src) の alt,src
        const { src, alt } = properties
        const srcString = src as string

        node.properties = {
          src: getUrl(srcString),
          alt: alt,
          style: 'display: block; margin: 0 auto; max-width: 1024px;',
        }
      }
    })
  }
}

// Markdown 形式の文字列を受け取って、HTML 形式の文字列を返す
export async function markdownToHtml(markdown: string) {
  const processor = unified()
    .use(remarkParse) // markdown -> mdast の変換
    .use(remarkRehype) // mdast -> hast の変換
    .use(remarkMath)
    .use(rehypeMathJaxSvg)
    .use(rehypeImageSize) // 画像のサイズ情報を追加
    .use(rehypeStringify) // hast -> html の変換

  const result = await processor.process(markdown) // 実行

  return result.toString()
}
