
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
/*
	GetuserOrders := func(c*gin.Context){
		email := c.Param("CreatorEmail")
		orders := endpoints.GetOrdersByUser(email)
		c.JSON(http.StatusOK, orders)

	}	
*/
	router.Use(cors.Default())

    router.GET("/",hello);
	router.POST("/createstore",endpoints.CreateOrder);
	router.GET("/getalldata",endpoints.JiGetallOrders);
	router.PUT("/updateorder/:id",endpoints.UpdateOrder);
	router.DELETE("/deleteorder/:id",endpoints.DeleteOrder);
	router.POST("/createuser",endpoints.CreateUser);
	router.GET("/users/:email/orders",endpoints.GetOrdersByUser);
	router.GET("/getorder/:id",endpoints.GetMyOrderInfo);
	router.GET("/getuserinfo/:id",endpoints.GetUserInfo);

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