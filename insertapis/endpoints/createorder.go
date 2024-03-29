package endpoints
import (
	"net/http"
	"github.com/gin-gonic/gin"
	"jiapis/DB"
	"jiapis/Models"
    "github.com/google/uuid"
)

func CreateOrder(c *gin.Context) {

    
    var reqBody struct {
        UserID uuid.UUID `json:"user_id"`
        Nombre string `json:"nombre"`
        Cantidad int `json:"cantidad"`
        Contacto string `json:"contacto"`
        CreatorEmail string `json:"CreatorEmail"`

    }


    if err := c.ShouldBindJSON(&reqBody); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    var user models.User
    DB.DBconn.FirstOrCreate(&user, models.User{Email: reqBody.CreatorEmail})


    nombre := reqBody.Nombre 
    cantidad := reqBody.Cantidad
    contacto := reqBody.Contacto
    creatoremail := reqBody.CreatorEmail

    userID, err := uuid.Parse(reqBody.UserID.String())
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user_id"})
		return
	}
    
    order := models.Order{
        UserID: userID,
        Nombre: nombre,
        Cantidad: cantidad,
        Contacto: contacto,
        CreatorEmail: creatoremail,
    }

    DB.DBconn.Create(&order)

    user.Orders = append(user.Orders, order)
    DB.DBconn.Save(&user)
    c.JSON(http.StatusOK, gin.H{"message": "Orden creada!"})


}