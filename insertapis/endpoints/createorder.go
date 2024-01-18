package endpoints
import (
	"net/http"
	"github.com/gin-gonic/gin"
	"jiapis/DB"
	"jiapis/models"
)

func CreateOrder(c *gin.Context) {


    var reqBody struct {
        Nombre string `json:"nombre"`
        Cantidad int `json:"cantidad"`
        Email string `json:"email"`
    }


    if err := c.ShouldBindJSON(&reqBody); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    

    nombre := reqBody.Nombre 
    cantidad := reqBody.Cantidad
    email := reqBody.Email
    
    order := models.Order{
        Nombre: nombre,
        Cantidad: cantidad,
        Email: email,
    }

    DB.DBconn.Create(&order)
}