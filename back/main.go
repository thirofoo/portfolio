package main

import (
	"fmt"

	"github.com/thirofoo/portfolio/Controller"
	"github.com/thirofoo/portfolio/Database"
	"github.com/thirofoo/portfolio/Models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"github.com/gin-gonic/gin"
)

func checkError(err error) {
	if err != nil {
		panic(err)
	}
}

func main() {
	dsn := Database.DbUrl()
	fmt.Println(dsn)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	checkError(err)

	err = db.AutoMigrate(&Models.Article{})
	checkError(err)
	fmt.Println("migrated!")

	router := gin.Default()
	r := router.Group("/article")

	// CORS
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Next()
	})

	r.GET("/get", Controller.ShowAllBlog)
	r.GET("/get/:slug", Controller.ShowOneBlogBySlug)
	r.POST("/create", Controller.CreateBlog)
	r.PUT("/update/:id", Controller.EditBlog)
	r.DELETE("/delete/:id", Controller.DeleteBlog)

	router.Run(":8080")
}
