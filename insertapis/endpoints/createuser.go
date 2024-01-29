package endpoints

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"jiapis/DB"
	"jiapis/Models"
)


func CreateUser(c *gin.Context) {


    var reqBody struct {
		Nombre string `json:"Nombre"`
		Apellido string `json:"Apellido"`
		NumCedula string `json:"Cedula"`
		UsoCuenta string  `json:"UsoCuenta"`
    }
// crear el usuario, pasar el userid a la curl request de crear orden despues 

    if err := c.ShouldBindJSON(&reqBody); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    

    Nombre := reqBody.Nombre 
    Apellido := reqBody.Apellido
    NumCedula := reqBody.NumCedula
	UsoCuenta := reqBody.UsoCuenta

    
    user := models.User{
		Nombre : Nombre,
		Apellido : Apellido,
		NumCedula : NumCedula,
		UsoCuenta : UsoCuenta,
    
    }

    DB.DBconn.Create(&user)
	c.JSON(http.StatusCreated, gin.H{"id": user.ID})
}