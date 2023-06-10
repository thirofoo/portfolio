package main

import (
	"fmt"
	"os"

	"github.com/thirofoo/portfolio/Controller"
	"github.com/thirofoo/portfolio/Database"
	"github.com/thirofoo/portfolio/Models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	dsn := Database.DbUrl()
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(fmt.Errorf("failed to connect to database: %w", err))
	}

	err = db.AutoMigrate(&Models.Article{})
	if err != nil {
		panic(fmt.Errorf("failed to migrate Article model: %w", err))
	}
	err = db.AutoMigrate(&Models.User{})
	if err != nil {
		panic(fmt.Errorf("failed to migrate User model: %w", err))
	}
	fmt.Println("migrated!")

	router := gin.Default()

	// CORS middleware 設定
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{os.Getenv("FRONT_URL")}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Authorization"}
	config.AllowCredentials = true
	router.Use(cors.New(config))

	Article := router.Group("/article")
	Admin := router.Group("/admin")

	// public系API
	router.POST("/login", Controller.Login)
	Article.GET("/get/blog", Controller.ShowAllArticles)
	Article.GET("/get/library", Controller.ShowAllLibraries)
	Article.GET("/get/:slug", Controller.ShowOneArticleBySlug)
	Article.GET("/get-by-tags", Controller.ShowArticlesByTags)

	// secret系API
	Article.POST("/create", Controller.AuthMiddleware(), Controller.CreateArticle)
	Article.PUT("/update/:id", Controller.AuthMiddleware(), Controller.EditArticle)
	Article.DELETE("/delete/:id", Controller.AuthMiddleware(), Controller.DeleteArticle)

	Admin.Use(Controller.AuthMiddleware())
	Admin.POST("/create", Controller.CreateAdmin)
	Admin.POST("/check-auth", Controller.AuthCheckHandler)

	err = router.Run(":8080")
	if err != nil {
		panic(fmt.Errorf("failed to start server: %w", err))
	}
}
