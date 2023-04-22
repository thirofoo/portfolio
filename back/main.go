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

	db.AutoMigrate(&Models.Article{})
	fmt.Println("migrated!")

	router := gin.Default()

	r := router.Group("/article")
	r.GET("/get", Controller.ShowAllBlog)
	r.GET("/get/:id", Controller.ShowOneBlog)
	r.POST("/create", Controller.CreateBlog)
	r.PUT("/update/:id", Controller.EditBlog)
	r.DELETE("/delete/:id", Controller.DeleteBlog)

	router.Run(":8080")
}
