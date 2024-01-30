
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
 curl -X GET http://localhost:8080/getorder/8dea5102-ac09-448b-afe3-84bd453a7a30


	}	
*/
	router.Use(cors.Default())

    router.GET("/",hello);
	router.POST("/createstore",endpoints.CreateOrder);
	router.GET("/getalldata",endpoints.JiGetallOrders);
	router.PUT("/updateorder/:id",endpoints.UpdateOrder);
	router.DELETE("/deleteorder/:id",endpoints.DeleteOrder);
 
	router.POST("/createuser",endpoints.CreateUser);
	//router.GET("/users/:user_id/orders",endpoints.GetOrdersByUser);
	router.GET("/user_orders",endpoints.GetUserOrders);
	router.GET("/getuserinfo/:id",endpoints.GetUserInfo);
	router.GET("/getuserbyemail",endpoints.GetUserByEmail);

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