package endpoints

import(
	//"net/http"
	"github.com/gin-gonic/gin"
"jiapis/DB"
	"jiapis/Models"
	//"encoding/json"
)

func GetUserOrders(c *gin.Context) {
	userId := c.Query("user_id")

    // Get user ID from request params 

    
    var orders []models.Order
	DB.DBconn.Where("user_id = ?", userId).Find(&orders)
    
	c.JSON(200, orders)
}