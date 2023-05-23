package Controller

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/thirofoo/portfolio/Models"
)


func ShowAllArticles(c *gin.Context) {
	datas := Models.GetArticlesByType("blog")
	c.JSON(http.StatusOK, datas)
}

func ShowAllLibraries(c *gin.Context) {
	datas := Models.GetArticlesByType("library")
	c.JSON(http.StatusOK, datas)
}


func ShowOneArticle(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	data := Models.GetOneArticle(id)
	c.JSON(http.StatusOK, data)
}


func ShowOneArticleBySlug(c *gin.Context) {
	slug := c.Param("slug")
	data := Models.GetOneArticleBySlug(slug)
	c.JSON(http.StatusOK, data)
}

func ShowArticlesByTags(c *gin.Context) {
	tagIDs := c.QueryArray("tagID")

	// タグIDが指定されていない場合はエラーを返す
	if len(tagIDs) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No tagID provided"})
		return
	}

	// タグIDに対応するタグを取得
	tags := Models.GetTagsByID(tagIDs)
	
	// タグが見つからない場合はエラーを返す
	if len(tags) != len(tagIDs) {
		c.JSON(http.StatusNotFound, gin.H{"error": "Tag(s) not found"})
		return
	}

	// タグに関連する記事を取得
	articles := Models.GetArticlesByTags(tags)

	c.JSON(http.StatusOK, articles)
}


func CreateArticle(c *gin.Context) {
	// 入力バリデーションに必要項目だけを指定する為の構造体
	var input Models.UpdateArticleInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	if len(input.Tags) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Tags cannot be empty"})
		return
	}

	article := Models.Article{
		Title:       input.Title,
		Slug:        input.Slug,
		Description: input.Description,
		Author:      input.Author,
		Thumbnail:   input.Thumbnail,
		Type:        input.Type,
		Body:        input.Body,
	}
	Models.Db.Create(&article)

	// タグの操作 ( dbにあるならtag_idを追加、ないなら作成してtag_idを追加 )
	for _, tagName := range input.Tags {
		tag := Models.Tag{Name: tagName}
		// ないなら作成、あるなら検索
		if err := Models.Db.Where(&tag).FirstOrCreate(&tag).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		
		Models.Db.Model(&article).Association("Tags").Append(&tag)
	}

	c.JSON(http.StatusOK, gin.H{"message": "created successfully"})
}


func EditArticle(c *gin.Context) {
	// query parameterからidを取得 ( 危険なので後で修正 )func UpdateArticle(c *gin.Context) {
	id := c.Param("id")

	var article Models.Article
	// tagも読み込んだ状態で初期化
	if err := Models.Db.Preload("Tags").Where("id = ?", id).First(&article).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Article not found"})
		return
	}
	
	// 入力バリデーションに必要項目だけを指定する為の構造体
	var input Models.UpdateArticleInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	if len(input.Tags) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Tags cannot be empty"})
		return
	}
	
	article.Title = input.Title
	article.Body = input.Body
	article.Description = input.Description
	article.Author = input.Author
	article.Thumbnail = input.Thumbnail
	article.Type = input.Type
	article.Slug = input.Slug
	
	Models.Db.Save(&article)
	
	// Update tags
	var tagNames []string
	for _, tag := range article.Tags {
		tagNames = append(tagNames, tag.Name)
	}

	// 新しく追加されたtagの操作 ( dbにあるならtag_idを追加、ないなら作成してtag_idを追加 )
	for _, tagName := range input.Tags {
		if !contains(tagNames, tagName) {
			tag := Models.Tag{Name: tagName}
			// ないなら作成、あるなら検索
			if err := Models.Db.Where(&tag).FirstOrCreate(&tag).Error; err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			
			Models.Db.Model(&article).Association("Tags").Append(&tag)
		}
	}
	
	// 消えたtagの操作 ( dbになくなったらtagごと消す )
	for _, tagName := range tagNames {
		if !contains(input.Tags, tagName) {
			var tag Models.Tag
			if err := Models.Db.Where("name = ?", tagName).First(&tag).Error; err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}

			Models.Db.Model(&article).Association("Tags").Delete(&tag)
		}
	}

	c.JSON(http.StatusOK, gin.H{"message": "updated successfully"})
}

func contains(arr []string, str string) bool {
	for _, a := range arr {
		if a == str {
			return true
		}
	}
	return false
}

func DeleteArticle(c *gin.Context) {
	// query parameterからidを取得 ( 危険なので後で修正 )
	id, _ := strconv.Atoi(c.Param("id"))

	data := Models.GetOneArticle(id)
	data.DeleteArticle()

	// 中間テーブルのデータを取得 (tag_id が 中間テーブルにしかない為分かる)
	var Tags []Models.Tag
	Models.Db.Where("Article_id = ?", id).Find(&Tags)
	
	// 取得した中間テーブルのデータを削除
	for _, Tag := range Tags {
	    Models.Db.Delete(&Tag)
	}

	c.JSON(http.StatusOK, gin.H{"message": "deleted successfully"})
}