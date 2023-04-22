package Models

import (
	"fmt"

	"gorm.io/gorm"
)

type Article struct {
	gorm.Model
	Title string `json:"title" binding:"required" xorm:"title"`
	Body  string `json:"body" binding:"required" xorm:"body"`
}

type UpdateArticleInput struct {
	Title string `json:"title" binding:"required" xorm:"title"`
	Body  string `json:"body" binding:"required" xorm:"body"`
}

func GetAll() (datas []Article) {
	// Article型のデータ全取得
	result := Db.Find(&datas)
	fmt.Println(result)
	if result.Error != nil {
		panic(result.Error)
	}
	return
}

func GetOne(id int) (data Article) {
	result := Db.First(&data, id)
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
