package endpoints

import (
	"jiapis/DB"
	"jiapis/Models"
	"github.com/gin-gonic/gin"
)

func JiGetallOrders(c* gin.Context){
	var orders []models.Order
	DB.DBconn.Find(&orders)
	c.JSON(200,orders)
}


