package Models

import (
	"fmt"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"github.com/thirofoo/portfolio/Database"
)

var Db *gorm.DB

// init関数は各packageがimportされた時点で実行される ( packageに複数存在する場合は、importされた順に実行される )
// → 今回は init関数で import時にDBが接続されている状態になる！
func init() {
	dsn := Database.DbUrl()
	dialector := postgres.Open(dsn)
	var err error
	if Db, err = gorm.Open(dialector); err != nil {
		connect(dialector, 100)
	}
	fmt.Println("db connected!!")
}

func connect(dialector gorm.Dialector, count uint) {
	var err error
	if Db, err = gorm.Open(dialector); err != nil {
		// 再帰的に接続を試みる
		if count > 1 {
			time.Sleep(time.Second * 2)
			count--
			fmt.Printf("retry... count:%v\n", count)
			connect(dialector, count)
			return
		}
		panic(err.Error())
	}
}
