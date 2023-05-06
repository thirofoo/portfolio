package Database

import (
	"fmt"
	"os"
)

type DbConfig struct {
	DB   string
	User string
	Pass string
	Host string
	Port string
	TZ   string
}

func buildDBConfig() *DbConfig {
	dbConfig := DbConfig{
		DB:   os.Getenv("POSTGRES_DB"),
		User: os.Getenv("POSTGRES_USER"),
		Pass: os.Getenv("POSTGRES_PASSWORD"),
		Host: os.Getenv("HOST"),
		Port: "5432",
		TZ:   os.Getenv("TIMEZONE"),
	}
	return &dbConfig
}

func DbUrl() string {
	dbConfig := buildDBConfig()
	return fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable TimeZone=%s",
		dbConfig.Host,
		dbConfig.Port,
		dbConfig.User,
		dbConfig.Pass,
		dbConfig.DB,
		dbConfig.TZ,
	)
}
