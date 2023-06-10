package Models

import (
	"gorm.io/gorm"
)

type Article struct {
	gorm.Model
	Title       string `json:"title" binding:"required" xorm:"title"`
	Slug        string `json:"slug" binding:"required" xorm:"slug"`
	Description string `json:"description" binding:"required" xorm:"description"`
	Author      string `json:"author" binding:"required" xorm:"author"`
	Thumbnail   string `json:"thumbnail" binding:"required" xorm:"thumbnail"`
	// tag が複数 →　many2manyメソッドを利用して中間テーブルを作成
	Tags        []Tag `gorm:"many2many:article_tags;"`
	Type        string `json:"type" binding:"required" xorm:"type"`
	Body        string `json:"body" binding:"required" xorm:"body"`
}

type Tag struct {
    gorm.Model
    Name string `json:"name" binding:"required" xorm:"name"`
}

type UpdateArticleInput struct {
	Title       string `json:"title" binding:"required" gorm:"column:title"`
	Slug        string `json:"slug" binding:"required" gorm:"column:slug"`
	Description string `json:"description" binding:"required" gorm:"column:description"`
	Author      string `json:"author" binding:"required" gorm:"column:author"`
	Thumbnail   string `json:"thumbnail" gorm:"column:thumbnail"`
	Type        string `json:"type" binding:"required" gorm:"column:type"`
	Body        string `json:"body" binding:"required" gorm:"column:body"`
	Tags        []string `json:"tags" gorm:"column:tags"`
}

func GetAllArticles() (datas []Article) {
	// Article型のデータ全取得 ( JOIN句でTagsも引っ張っている感じ )
	result := Db.Preload("Tags").Find(&datas)
	if result.Error != nil {
		panic(result.Error)
	}
	return
}

func GetArticlesByType(articleType string) (datas []Article) {
	result := Db.Preload("Tags").Where("type = ?", articleType).Find(&datas)
	if result.Error != nil {
		panic(result.Error)
	}
	return
}

func GetOneArticle(id int) (data Article) {
	result := Db.Preload("Tags").First(&data, id)
	if result.Error != nil {
		panic(result.Error)
	}
	return
}

func GetOneArticleBySlug(slug string) (data Article) {
	result := Db.Preload("Tags").Where("slug = ?", slug).First(&data)
	if result.Error != nil {
		panic(result.Error)
	}
	return
}

func (b *Article) CreateArticle() {
	result := Db.Create(b)
	if result.Error != nil {
		panic(result.Error)
	}
}

func (b *Article) UpdateArticle() {
	result := Db.Save(b)
	if result.Error != nil {
		panic(result.Error)
	}
}

func (b *Article) DeleteArticle() {
	result := Db.Delete(b)
	if result.Error != nil {
		panic(result.Error)
	}
}

// タグIDからタグを取得する関数
func GetTagsByID(tagIDs []string) []*Tag {
	var tags []*Tag
	// タグIDが一致するタグをデータベースから取得
	Db.Find(&tags, "id IN ?", tagIDs)
	return tags
}

// タグに関連する記事を取得する関数
func GetArticlesByTags(tags []*Tag) []*Article {
	var articles []*Article

	// 中間テーブルのエイリアスを作成
	articleTag := Db.Table("article_tags")

	// タグに関連する記事をデータベースから取得 ( 複雑の為後々調べる )
	Db.Preload("Tags").Joins("JOIN (?) AS article_tags ON article_tags.article_id = articles.id", articleTag.Select("article_tags.article_id").Where("article_tags.tag_id IN ?", GetTagIDs(tags))).Find(&articles)

	return articles
}


// タグのIDを取得する関数
func GetTagIDs(tags []*Tag) []uint {
	var tagIDs []uint
	for _, tag := range tags {
		tagIDs = append(tagIDs, tag.ID)
	}
	return tagIDs
}