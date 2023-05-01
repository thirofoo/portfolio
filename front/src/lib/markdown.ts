import rehypeStringify from 'rehype-stringify'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkMath from 'remark-math'
import rehypeMathJaxSvg from 'rehype-mathjax'

// Markdown 形式の文字列を受け取って、HTML 形式の文字列を返す
export async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse) // markdown -> mdast の変換
    .use(remarkRehype) // mdast -> hast の変換
    .use(remarkMath)
    .use(rehypeMathJaxSvg)
    .use(rehypeStringify) // hast -> html の変換
    .process(markdown) // 実行
  return result.toString()
}
