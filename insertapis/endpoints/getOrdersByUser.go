package endpoints

import(
	"net/http"
	"github.com/gin-gonic/gin"
	"jiapis/DB"
	"jiapis/Models"
)
func GetOrdersByUser(c *gin.Context) {

    // Get email 
    email := c.Param("email")

    // Initialize user
    var user models.User
    result := DB.DBconn.Where("email = ?", email).FirstOrInit(&user)
	if result.RowsAffected == 0 {
		// No user found
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
		return
	}
    // Get orders
    var orders []models.Order
    if result := DB.DBconn.Model(&user).Association("Orders").Find(&orders); result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Error retrieving orders"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"orders": orders})
}
