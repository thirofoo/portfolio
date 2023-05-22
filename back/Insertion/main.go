package main

import (
	"fmt"
	"html"
	"io/ioutil"
	"regexp"
	"strings"

	"github.com/thirofoo/portfolio/Models"
)

func main() {
	// メタデータと本文を取得するmdファイルのパス
	filePath := "./article/test.md"

	// mdファイルから文字列を取得
	mdBytes, err := ioutil.ReadFile(filePath)
	if err != nil {
		fmt.Println(err)
		return
	}
	mdStr := string(mdBytes)

	// メタデータと本文に分割
	splitMd := strings.Split(mdStr, "---")
	if len(splitMd) != 3 {
		fmt.Println("invalid md format")
		return
	}
	metaDataStr := splitMd[1]
	bodyStr := splitMd[2]

	// メタデータをパースしてArticleにセット
	article := Models.Article{}
	tags := []string{}
	metaDataArr := strings.Split(metaDataStr, "\n")
	for _, data := range metaDataArr {
		if data == "" {
			continue
		}
		meta := strings.SplitN(data, ":", 2)
		if len(meta) != 2 {
			continue
		}
		key := strings.TrimSpace(meta[0])
		value := strings.TrimSpace(meta[1])
		switch key {
		case "title":
			article.Title = value
		case "slug":
			article.Slug = value
		case "description":
			article.Description = value
		case "author":
			article.Author = value
		case "thumbnail":
			article.Thumbnail = value
		case "tags":
			tags = strings.Split(value, ",")
		case "type":
			article.Type = value
		}
	}

	// コードブロックのパターンを正規表現で定義
	codeBlockPattern := regexp.MustCompile("(?s)```.*?```")

	// コードブロックを取得
	codeBlocks := codeBlockPattern.FindAllString(bodyStr, -1)

	// コードブロック内のHTMLタグをエスケープ
	for _, block := range codeBlocks {
		bodyStr = strings.ReplaceAll(bodyStr, block, html.EscapeString(block))
	}

	article.Body = html.EscapeString(bodyStr)

	// DBに記事を挿入
	article.CreateArticle()

	// 記事に紐付くタグを挿入
	for _, tagName := range tags {
		tag := Models.Tag{Name: tagName}

		// タグが存在しなければ作成
		err = Models.Db.Where(Models.Tag{Name: tagName}).FirstOrCreate(&tag).Error
		if err != nil {
			panic(err)
		}
		// 中間テーブルにデータを挿入
		err = Models.Db.Model(&article).Association("Tags").Append(&tag)
		if err != nil {
			panic(err)
		}
	}
}