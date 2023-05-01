package Controller

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/thirofoo/portfolio/Models"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
)


func ShowAllBlog(c *gin.Context) {
	datas := Models.GetAll()
	c.JSON(http.StatusOK, datas)
}


func ShowOneBlog(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	data := Models.GetOne(id)
	fmt.Println(data)
	c.JSON(http.StatusOK, data)
}


func ShowOneBlogBySlug(c *gin.Context) {
	slug := c.Param("slug")
	data := Models.GetOneBySlug(slug)
	fmt.Println(data)
	c.JSON(http.StatusOK, data)
}

func CreateBlog(c *gin.Context) {
	// ArticleWithTag の形で入力受付
	input := Models.ArticleWithTag{}

	// bind
	err := c.ShouldBindWith(&input, binding.JSON)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Articleをデータベースに挿入
	article := Models.Article{
		Title:       input.Title,
		Slug:        input.Slug,
		Description: input.Description,
		Author:      input.Author,
		Thumbnail:   input.Thumbnail,
		Type:        input.Type,
		Body:        input.Body,
	}
	article.Create()

	for _, tagName := range input.TagNames {
		tag := Models.Tag{Name: tagName}

		// タグが存在しなければ作成
		err = Models.Db.Where(Models.Tag{Name: tagName}).FirstOrCreate(&tag).Error
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		// 中間テーブルにデータを挿入
		// ※ 該当のarticleに対して、tagを追加 ( 中間テーブルに関係性を追加 ) している
		err = Models.Db.Model(&article).Association("Tags").Append(&tag)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	}
	c.JSON(http.StatusOK, gin.H{"message": "created successfully"})
}


func EditBlog(c *gin.Context) {
	// query parameterからidを取得 ( 危険なので後で修正 )func UpdateArticle(c *gin.Context) {
	id := c.Param("id")

	var article Models.Article
	if err := Models.Db.Where("id = ?", id).First(&article).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Article not found"})
		return
	}

	// 入力バリデーションに必要項目だけを指定する為の構造体
	var input Models.UpdateArticleInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	article.Title = input.Title
	article.Body = input.Body

	Models.Db.Save(&article)

	c.JSON(http.StatusOK, gin.H{"message": "updated successfully"})
}


func DeleteBlog(c *gin.Context) {
	// query parameterからidを取得 ( 危険なので後で修正 )
	id, _ := strconv.Atoi(c.Param("id"))

	data := Models.GetOne(id)
	data.Delete()

	// 中間テーブルのデータを取得 (tag_id が 中間テーブルにしかない為分かる)
	var Tags []Models.Tag
	Models.Db.Where("blog_id = ?", id).Find(&Tags)
	
	// 取得した中間テーブルのデータを削除
	for _, Tag := range Tags {
	    Models.Db.Delete(&Tag)
	}

	c.JSON(http.StatusOK, gin.H{"message": "deleted successfully"})
}