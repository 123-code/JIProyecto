package endpoints

import(
	//"net/http"
	"github.com/gin-gonic/gin"
    "github.com/google/uuid"
	"jiapis/DB"
	"jiapis/Models"
)
func GetUserOrders(c *gin.Context) {

    // Get user ID from query params
    userId := c.Query("user_id")
    
    // Validate UUID format
    if _, err := uuid.Parse(userId); err != nil {
        c.JSON(400, gin.H{"error": "invalid user id"})
        return
    }
    
    // Get orders
    var orders []models.Order
    if err := DB.DBconn.Where("user_id = ?", userId).Find(&orders).Error; err != nil {
        c.JSON(500, gin.H{"error": "error fetching orders"})
        return
    }
    
    // Return orders
    c.JSON(200, orders)
}
