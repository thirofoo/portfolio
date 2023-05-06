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

type ArticleWithTag struct {
    Title       string `json:"title" binding:"required"`
    Slug        string `json:"slug" binding:"required"`
    Description string `json:"description" binding:"required"`
    Author      string `json:"author" binding:"required"`
    Thumbnail   string `json:"thumbnail" binding:"required"`
    Type        string `json:"type" binding:"required"`
    Body        string `json:"body" binding:"required"`
    TagNames    []string `json:"tag_names"`
}

func GetAll() (datas []Article) {
	// Article型のデータ全取得 ( JOIN句でTagsも引っ張っている感じ )
	result := Db.Preload("Tags").Find(&datas)
	if result.Error != nil {
		panic(result.Error)
	}
	return
}

func GetOne(id int) (data Article) {
	result := Db.Preload("Tags").First(&data, id)
	if result.Error != nil {
		panic(result.Error)
	}
	return
}

func GetOneBySlug(slug string) (data Article) {
	result := Db.Preload("Tags").Where("slug = ?", slug).First(&data)
	if result.Error != nil {
		panic(result.Error)
	}
	return
}

func (b *Article) Create() {
	result := Db.Create(b)
	if result.Error != nil {
		panic(result.Error)
	}
}

func (b *Article) Update() {
	result := Db.Save(b)
	if result.Error != nil {
		panic(result.Error)
	}
}

func (b *Article) Delete() {
	result := Db.Delete(b)
	if result.Error != nil {
		panic(result.Error)
	}
}