package main

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
	"github.com/thirofoo/portfolio/Database"
)

func checkError(err error) {
	if err != nil {
		panic(err)
	}
}

func main() {
	// Initialize connection string.
	var connectionString string = Database.DbUrl()
	fmt.Println(connectionString)

	// Initialize connection object.
	db, err := sql.Open("postgres", connectionString)
	checkError(err)

	err = db.Ping()
	checkError(err)

	fmt.Println("Successfully created connection to database")

	// Drop previous table of same name if one exists.
	_, err = db.Exec("DROP TABLE IF EXISTS inventory;")
	checkError(err)
	fmt.Println("Finished dropping table (if existed)")
}
