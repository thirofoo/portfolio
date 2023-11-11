package Controller

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
	"github.com/thirofoo/portfolio/Models"
)

func ShowAllArticles(c *gin.Context) {
	datas, err := Models.GetArticlesByType("blog")
	if err != nil {
		errorMessage := fmt.Sprintf("Error in ShowAllArticles: %s", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": errorMessage})
		return
	}
	c.JSON(http.StatusOK, datas)
}

func ShowAllLibraries(c *gin.Context) {
	datas, err := Models.GetArticlesByType("library")
	if err != nil {
		errorMessage := fmt.Sprintf("Error in ShowAllLibraries: %s", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": errorMessage})
		return
	}
	c.JSON(http.StatusOK, datas)
}

func ShowOneArticle(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	data, err := Models.GetOneArticle(id)
	if err != nil {
		errorMessage := fmt.Sprintf("Error in ShowOneArticle: %s", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": errorMessage})
		return
	}
	c.JSON(http.StatusOK, data)
}

func ShowOneArticleBySlug(c *gin.Context) {
	slug := c.Param("slug")
	data, err := Models.GetOneArticleBySlug(slug)
	if err != nil {
		errorMessage := fmt.Sprintf("Error in ShowOneArticleBySlug: %s", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": errorMessage})
		return
	}
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
	tags, err := Models.GetTagsByID(tagIDs)
	if err != nil {
		errorMessage := fmt.Sprintf("Error in ShowArticlesByTags: %s", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": errorMessage})
		return
	}

	// タグが見つからない場合はエラーを返す
	if len(tags) != len(tagIDs) {
		c.JSON(http.StatusNotFound, gin.H{"error": "Tag(s) not found"})
		return
	}

	// タグに関連する記事を取得
	articles, err := Models.GetArticlesByTags(tags)
	if err != nil {
		errorMessage := fmt.Sprintf("Error in ShowArticlesByTags: %s", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": errorMessage})
		return
	}

	c.JSON(http.StatusOK, articles)
}

func CreateArticle(c *gin.Context) {
	// 入力バリデーションに必要項目だけを指定する為の構造体
	var input Models.UpdateArticleInput
	if err := c.ShouldBindJSON(&input); err != nil {
		errorMessage := fmt.Sprintf("Error in ShouldBindJSON: %s", err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"error": errorMessage})
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
	err := article.CreateArticle()
	if err != nil {
		errorMessage := fmt.Sprintf("Error in CreateArticle: %s", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": errorMessage})
		return
	}

	// タグの操作 ( dbにあるならtag_idを追加、ないなら作成してtag_idを追加 )
	for _, tagName := range input.Tags {
		tag := Models.Tag{Name: tagName}
		// ないなら作成、あるなら検索
		if err := Models.Db.Where(&tag).FirstOrCreate(&tag).Error; err != nil {
			errorMessage := fmt.Sprintf("Error in CreateArticle: %s", err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"error": errorMessage})
			return
		}
		// Tag field に tag を追加
		Models.Db.Model(&article).Association("Tags").Append(&tag)
	}

	c.JSON(http.StatusOK, gin.H{"message": "created successfully"})
}

func EditArticle(c *gin.Context) {
	// query parameterからidを取得
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

	log.Info().Msgf("article.Thumbnail: %v", article.Thumbnail)
	
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
				errorMessage := fmt.Sprintf("Error in EditArticle: %s", err.Error())
				c.JSON(http.StatusInternalServerError, gin.H{"error": errorMessage})
				return
			}

			Models.Db.Model(&article).Association("Tags").Append(&tag)
		}
	}

	// 他に使用されていないタグを削除 ( soft delete )
	for _, tagName := range tagNames {
		if !contains(input.Tags, tagName) {
			var tag Models.Tag
			if err := Models.Db.Where("name = ?", tagName).First(&tag).Error; err != nil {
				errorMessage := fmt.Sprintf("Error in EditArticle: %s", err.Error())
				c.JSON(http.StatusInternalServerError, gin.H{"error": errorMessage})
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
	// query parameterからidを取得
	id, _ := strconv.Atoi(c.Param("id"))

	var article Models.Article
	// tagも読み込んだ状態で初期化
	if err := Models.Db.Preload("Tags").Where("id = ?", id).First(&article).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Article not found"})
		return
	}
	
	var tags []Models.Tag
	Models.Db.Model(&article).Association("Tags").Find(&tags)
	
	// article削除
	if err := Models.Db.Delete(&article).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to delete article"})
		return
	}
	
	// 他に使用されていないタグを削除 ( soft delete )
	for _, tag := range tags {
		var count int64
		Models.Db.Model(&Models.Article{}).Where("id != ?", id).Where("id IN (SELECT article_id FROM article_tags WHERE tag_id = ?)", tag.ID).Count(&count)
		if count == 0 {
			if err := Models.Db.Delete(&tag).Error; err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to delete unused tag"})
				return
			}
		}
	}

	// article_tags という名前の中間テーブルの該当レコードを削除
	if err := Models.Db.Table("article_tags").Where("article_id = ?", id).Delete(nil).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to delete article tags"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Deleted successfully"})
}
