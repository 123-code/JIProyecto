package endpoints

import(
	//"net/http"
	"github.com/gin-gonic/gin"
	"jiapis/DB"
	"jiapis/Models"
)


func GetMyOrderInfo(c *gin.Context) {
	var order models.Order
	if err := DB.DBconn.Where("id = ?", c.Param("id")).First(&order).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	
	c.JSON(200, order)
}
