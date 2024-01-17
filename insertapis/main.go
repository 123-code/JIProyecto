
package main
import (
	"net/http"
	"github.com/gin-gonic/gin"
   "jiapis/DB"
	"github.com/gin-contrib/cors"
    "jiapis/endpoints"
	"os"
)

func main() {
	router := gin.Default();

	router.Use(cors.Default())

    router.GET("/",hello);
	router.POST("/createstore",endpoints.CreateOrder);
	router.GET("/getalldata",endpoints.JiGetallOrders);


	port := os.Getenv("PORT")
	if(port == ""){
		port = "8080"
	}
	router.Run("0.0.0.0:"+port);
}

func hello(c *gin.Context) {
	c.String(http.StatusOK, "Hello World")
}

func init(){
	DB.DBconnect()
}