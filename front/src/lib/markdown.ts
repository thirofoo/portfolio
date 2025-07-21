import { Image } from '@/components/atoms/Image'
import { ConditionalLink } from '@/components/molecules/ConditionalLink'
import { fetchOGPInfo } from '@/lib/ogp'
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
    const promises: Promise<void>[] = []

    visit(tree, 'element', (node: Node & Element) => {
      const { tagName, properties } = node

      // img タグの src を絶対パスに変換
      if (tagName === 'img' && properties) {
        const { src, alt } = properties
        const srcString = src as string
        node.properties = {
          src: getUrl(slug + '/' + srcString),
          alt: alt,
        }
      }

      // a タグの処理
      if (tagName === 'a' && properties) {
        const firstChild = node.children[0]

        if (
          firstChild &&
          firstChild.type === 'text' &&
          firstChild.value.startsWith('!')
        ) {
          firstChild.value = firstChild.value.substring(1)
          return
        }

        const { href } = properties

        if (
          typeof href === 'string' &&
          (href.startsWith('https://twitter.com') || href.startsWith('https://x.com'))
        ) {
          const apiUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(href)}`

          promises.push(
            (async () => {
              const res_normal = await fetch(apiUrl)
              const res_dark = await fetch(apiUrl + '&theme=dark')
              const data_normal = await res_normal.json()
              const data_dark = await res_dark.json()

              node.properties = {
                ...properties, // 元のプロパティを維持
                twitter_normal: data_normal.html,
                twitter_dark: data_dark.html,
              }
            })(),
          )
        } else {
          promises.push(
            (async () => {
              const ogp = await fetchOGPInfo(href as string)
              node.properties = {
                ...properties,
                url: href,
                title: ogp?.title,
                description: ogp?.description,
              }

              if (ogp?.image && ogp.image.startsWith('http')) {
                node.properties.img = ogp.image
              } else {
                node.properties.img = getUrl('default_vbbudj')
              }
              if (ogp?.icon && ogp.icon.startsWith('http')) {
                node.properties.icon = ogp.icon
              }
            })(),
          )
        }
      }
    })

    await Promise.all(promises)
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
        // img タグを Image コンポーネントに置き換える
        img: Image,
        // a タグを LinkCard コンポーネントに置き換える
        a: ConditionalLink,
      },
    })

  const reactJSX = processorReact.processSync(htmlContent).result

  return reactJSX
}
