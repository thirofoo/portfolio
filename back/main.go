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
    config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE"}
    router.Use(cors.New(config))

    r_blog := router.Group("/article")
    r_admin := router.Group("/admin")

    // article系のAPI
    r_blog.GET("/get", Controller.ShowAllBlog)
    r_blog.GET("/get/:slug", Controller.ShowOneBlogBySlug)
    r_blog.POST("/create", Controller.CreateBlog)
    r_blog.PUT("/update/:id", Controller.EditBlog)
    r_blog.DELETE("/delete/:id", Controller.DeleteBlog)

    // admin系のAPI
    r_admin.POST("/login", Controller.Login)
    r_admin.POST("/create", Controller.CreateAdmin)

    router.Run(":8080")
}
