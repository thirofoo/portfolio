package Models

import (
	"gorm.io/gorm"
)

type User struct {
    gorm.Model
    Username string `gorm:"unique" json:"username"`
    Password string `gorm:"not null" json:"password"`
}

type UpdateUserInput struct {
    Username string `json:"username"`
    Password string `json:"password"`
}
