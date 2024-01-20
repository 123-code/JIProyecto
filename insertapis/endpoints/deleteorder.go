package endpoints

import(
	"github.com/gin-gonic/gin"
	"jiapis/Models"
	"jiapis/DB"
)

func DeleteOrder(c * gin.Context){
	if err := DB.DBconn.Where("id = ?", c.Param("id")).Delete(&models.Order{}).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	
	c.Status(200)
}