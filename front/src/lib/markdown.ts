import { Image } from '@/components/atoms/Image'
import { LinkCard } from '@/components/molecules/LinkCard'
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
  // ここでは 置換したいコンポーネントの属性をいじって props として情報を渡す為に修正を入れている
  return async (tree: Node) => {
    // Promise 配列を作成
    const promises: Promise<void>[] = []

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

      // a タグ ⇒ LinkCard 用の props を追加
      if (tagName === 'a' && properties) {
        const { href } = properties
        // 非同期処理を Promise 配列に追加
        if (
          typeof href === 'string' &&
          (href.startsWith('https://twitter.com') || href.startsWith('https://x.com'))
        ) {
          // Twitter APIのoEmbedエンドポイント
          const apiUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(href)}`

          // Twitter APIを呼び出してoEmbed情報を取得
          promises.push(
            (async () => {
              const res_normal = await fetch(apiUrl)
              const res_dark = await fetch(apiUrl + '&theme=dark')
              const data_normal = await res_normal.json()
              const data_dark = await res_dark.json()
              
              node.properties = {
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
                url: href,
                title: ogp?.title,
                description: ogp?.description,
              }
              // もし image がある場合は、image を追加、なければ No Image を追加
              if (ogp?.image && ogp.image.startsWith('http')) {
                node.properties.img = ogp.image
              } else {
                node.properties.img = getUrl('default_vbbudj')
              }
              // もし icon がある場合は、icon を追加
              if (ogp?.icon && ogp.icon.startsWith('http')) {
                node.properties.icon = ogp.icon
              }
            })(),
          )
        }
      }
    })
    // Promise 配列を解決
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
        a: LinkCard,
      },
    })

  const reactJSX = processorReact.processSync(htmlContent).result

  return reactJSX
}
