package insert

import (
	"fmt"
	"io/ioutil"
	"strings"

	"github.com/microcosm-cc/bluemonday"
	"github.com/russross/blackfriday/v2"
	"gorm.io/gorm"
)

type Article struct {
	gorm.Model
	Title       string
	Slug        string
	Description string
	Author      string
	Thumbnail   string
	Tags        []string
	Type        string
	Body        string
}

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
	article := Article{}
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
			article.Tags = strings.Split(value, ",")
		case "type":
			article.Type = value
		}
	}

	// 本文をHTMLに変換してサニタイズ
	htmlBytes := blackfriday.Run([]byte(bodyStr))
	sanitizedHTML := bluemonday.UGCPolicy().SanitizeBytes(htmlBytes)
	article.Body = string(sanitizedHTML)

	// TODO: DBに挿入する処理

	fmt.Println(article)
}