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
	c.JSON(http.StatusOK, data)
}

func CreateBlog(c *gin.Context) {
	input := Models.Article{}

	// ヘッダーのJSONをinputにバインド
	err := c.ShouldBindWith(&input, binding.JSON)
	if err != nil {
		c.String(http.StatusBadRequest, "Bad request")
		return
	}

	fmt.Println(input)

	input.Create()
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

	c.JSON(http.StatusOK, gin.H{"message": "deleted successfully"})
}
