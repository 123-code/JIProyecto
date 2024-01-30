package endpoints
import (
	"github.com/gin-gonic/gin"
	"jiapis/Models"
	"jiapis/DB"

)
func GetUserByEmail(c *gin.Context) {

  
	email := c.Query("email")

	var user models.User
	if err := DB.DBconn.First(&user, "email = ?", email).Error; err != nil {
	   c.JSON(404, gin.H{"error": "User not found"})
	   return
	}
  
	var orders []models.Order
	DB.DBconn.Where("creator_email = ?", email).Find(&orders)
  
	c.JSON(200, orders)
  
  }