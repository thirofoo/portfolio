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

func GetAllArticles() ([]Article, error) {
	var datas []Article
	result := Db.Preload("Tags").Find(&datas)
	if result.Error != nil {
		return nil, result.Error
	}
	return datas, nil
}

func GetArticlesByType(articleType string) ([]Article, error) {
	var datas []Article
	result := Db.Preload("Tags").Where("type = ?", articleType).Find(&datas)
	if result.Error != nil {
		return nil, result.Error
	}
	return datas, nil
}

func GetOneArticle(id int) (Article, error) {
	var data Article
	result := Db.Preload("Tags").First(&data, id)
	if result.Error != nil {
		return Article{}, result.Error
	}
	return data, nil
}

func GetOneArticleBySlug(slug string) (Article, error) {
	var data Article
	result := Db.Preload("Tags").Where("slug = ?", slug).First(&data)
	if result.Error != nil {
		return Article{}, result.Error
	}
	return data, nil
}

func (b *Article) CreateArticle() error {
	result := Db.Create(b)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (b *Article) UpdateArticle() error {
	result := Db.Save(b)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (b *Article) DeleteArticle() error {
	result := Db.Delete(b)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (a *Article) PreloadTags() error {
	result := Db.Preload("Tags").First(a)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func GetTagsByID(tagIDs []string) ([]*Tag, error) {
	var tags []*Tag
	result := Db.Find(&tags, "id IN ?", tagIDs)
	if result.Error != nil {
		return nil, result.Error
	}
	return tags, nil
}

func GetArticlesByTags(tags []*Tag) ([]*Article, error) {
	var articles []*Article
	articleTag := Db.Table("article_tags")
	result := Db.Preload("Tags").Joins("JOIN (?) AS article_tags ON article_tags.article_id = articles.id", articleTag.Select("article_tags.article_id").Where("article_tags.tag_id IN ?", GetTagIDs(tags))).Find(&articles)
	if result.Error != nil {
		return nil, result.Error
	}
	return articles, nil
}

func GetTagIDs(tags []*Tag) []uint {
	var tagIDs []uint
	for _, tag := range tags {
		tagIDs = append(tagIDs, tag.ID)
	}
	return tagIDs
}
