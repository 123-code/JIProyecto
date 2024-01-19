package endpoints
import(
	"github.com/gin-gonic/gin"
	"jiapis/models"
	"jiapis/DB"
	"net/http"
)

func UpdateOrder(c * gin.Context){
	var order = models.Order{}
	if err := c.ShouldBindJSON(&order); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := DB.DBconn.Model(&order).Where("id = ?", c.Param("id")).Updates(order).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, order)


}