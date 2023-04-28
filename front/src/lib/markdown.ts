import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remark2rehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

// Markdown 形式の文字列を受け取って、HTML 形式の文字列を返す
export async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse) // markdown -> mdast の変換
    .use(remark2rehype) // mdast -> hast の変換
    .use(rehypeStringify) // hast -> html の変換
    .process(markdown) // 実行
  return result.toString()
}
