package endpoints

import (
	//"net/http"
	"github.com/gin-gonic/gin"
	"jiapis/DB"
	"jiapis/Models"

)

func GetUserInfo(c* gin.Context){
	var user models.User
	if err := DB.DBconn.Where("id = ?", c.Param("id")).First(&user).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	
	c.JSON(200, user)
}