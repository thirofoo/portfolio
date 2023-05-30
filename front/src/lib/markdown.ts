import { Image } from '@/components/atoms/Image'
import { getUrl } from '@/lib/url'
import { Element } from 'hast'
import React from 'react'
import rehypeHighlight from 'rehype-highlight'
import rehypeMathJaxSvg from 'rehype-mathjax'
import rehypeParse from 'rehype-parse'
import rehypeReact from 'rehype-react'
import rehypeStringify from 'rehype-stringify'
import remarkMath from 'remark-math'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { Node } from 'unist'
import { visit } from 'unist-util-visit'

function rehypeTransformImageUrls(slug: string) {
  return async (tree: Node) => {
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

export const markdownToHtml = async (markdown: string, slug: string) => {
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

export const parseHTMLToReactJSX = (htmlContent: string) => {
  const processorReact = unified()
    .use(rehypeParse, { fragment: true })
    // eslint・TypeScriptのエラーをここだけ無視
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .use(rehypeReact, {
      createElement: React.createElement,
      components: {
        img: Image,
      },
    })

  const reactJSX = processorReact.processSync(htmlContent).result

  return reactJSX
}
