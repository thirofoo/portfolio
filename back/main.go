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

func checkError(err error) {
    if err != nil {
        panic(err)
    }
}

func main() {
    dsn := Database.DbUrl()
    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    checkError(err)

    err = db.AutoMigrate(&Models.Article{})
    checkError(err)
    err = db.AutoMigrate(&Models.User{})
    checkError(err)
    fmt.Println("migrated!")

    router := gin.Default()
    
    // CORS middleware 設定
    config := cors.DefaultConfig()
    config.AllowOrigins = []string{os.Getenv("FRONT_URL")}
    config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
    config.AllowHeaders = []string{"Origin", "Content-Type", "Authorization"}
    config.AllowCredentials = true
    router.Use(cors.New(config))

    r_blog := router.Group("/article")
    r_admin := router.Group("/admin")
    
    // public系API
    router.POST("/login", Controller.Login)
    r_blog.GET("/get", Controller.ShowAllBlog)
    r_blog.GET("/get/:slug", Controller.ShowOneBlogBySlug)
    
    // secret系API
    r_blog.POST("/create", Controller.AuthMiddleware(), Controller.CreateBlog)
    r_blog.PUT("/update/:id", Controller.AuthMiddleware(), Controller.EditBlog)
    r_blog.DELETE("/delete/:id", Controller.AuthMiddleware(), Controller.DeleteBlog)
    
    r_admin.Use(Controller.AuthMiddleware())
    r_admin.POST("/create", Controller.CreateAdmin)
    r_admin.POST("/check-auth", Controller.AuthCheckHandler)

    router.Run(":8080")
}
