package Controller

import (
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"

	// password hash algorithm
	"golang.org/x/crypto/bcrypt"

	"github.com/thirofoo/portfolio/Models"
)

// jwtCustomClaims are custom claims extending default ones.
type jwtCustomClaims struct {
    UID  uint   `json:"uid"`
    Name string `json:"name"`
    jwt.StandardClaims
}

var signingKey []byte

func setSigningKey() error {
    if len(signingKey) > 0 {
        return nil
    }
    signingKey = []byte(os.Getenv("SIGNING_KEY"))
    return nil
}

func Login(c *gin.Context) {
    var loginForm Models.UpdateUserInput
    if err := c.BindJSON(&loginForm); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
        return
    }

    username := loginForm.Username
    password := loginForm.Password

    // DBからユーザーを取得
    user := Models.User{}
    result := Models.Db.Where("username = ?", username).First(&user)
    if result.Error != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "ユーザーが存在しません"})
        return
    }

    // password検証 ( DBに入っているhashとpasswordのhashを比較 )
	// ※ DBにはpasswordのhashが入ってる
    err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
    if err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "パスワードが正しくありません"})
        return
    }

    // JWTを作成
    setSigningKey()
    token, err := createToken(user.ID, user.Username)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "JWTtokenの生成に失敗しました"})
        return
    }

    // JWTをCookieに設定
    exp := time.Now().Add(time.Hour * 24) // 1日後の時間を取得
    expUnix := exp.Unix()                 // Unix時間（秒）に変換
    c.SetCookie("token", token, int(expUnix), "/", "", false, false)

    // response
    c.JSON(http.StatusOK, gin.H{
        "message": "ログインに成功しました",
        "token":   token,
    })
}

func createToken(uid uint, username string) (string, error) {
    // 有効期限を設定 ( 1日 )
    expireAt := time.Now().Add(time.Hour * 24).Unix()

    // JWTclaimを作成
    claims := &jwtCustomClaims{
        UID:  uid,
        Name: username,
        StandardClaims: jwt.StandardClaims{
            ExpiresAt: expireAt,
        },
    }

    // JWTを作成
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

    // 署名を設定
    tokenString, err := token.SignedString(signingKey)
    if err != nil {
        return "", err
    }

    return tokenString, nil
}

func AuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        // Authorizationヘッダーからtokenを取得
        authHeader := c.GetHeader("Authorization")
        if authHeader == "" {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorizationヘッダーが存在しません"})
            c.Abort()
            return
        }

        // "Bearer "を取り除いたtokenを設定
        tokenString := authHeader[len("Bearer "):]

        // JWTを検証
        claims, err := validateToken(tokenString)
        if err != nil {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "tokenが無効です"})
            c.Abort()
            return
        }

        // claimからユーザーIDを取得し、コンテキストに設定
        userID := claims["uid"].(float64)
        c.Set("userID", uint(userID))

        c.Next()
    }
}

func validateToken(tokenString string) (jwt.MapClaims, error) {
    // JWTの検証に使う鍵をバイト列に変換
    err := setSigningKey()
	if err != nil {
		log.Fatalf("Error initializing signing key: %v", err)
	}

    // token parse
    token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
        // 署名に使った鍵と同じ鍵を返す
        if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
            return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
        }
        return signingKey, nil
    })
    if err != nil {
        return nil, err
    }

    // tokenが有効か確認
    if !token.Valid {
        return nil, errors.New("tokenが無効です")
    }

    // tokenに含まれるclaimを返す
    claims, ok := token.Claims.(jwt.MapClaims)
    if !ok {
        return nil, errors.New("tokenにclaimがありません")
    }

    return claims, nil
}

func CreateAdmin(c *gin.Context) {
    var user Models.User
    c.BindJSON(&user)

    fmt.Println(user)

    // password hash化
    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "パスワードハッシュ化に失敗しました"})
        return
    }

    user.Password = string(hashedPassword)

    if err := Models.Db.Create(&user).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "ユーザー作成に失敗しました"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "ユーザーを作成しました"})
}

func AuthCheckHandler(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H{"message": "ログインしています"})
}