func CreateProfile(c *gin.Context) {


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

    // Rest of endpoint logic...

    profile := models.Profile{
        Nombre: nombre,
        Cantidad: cantidad,
        Email: email,
    }

    DB.DBconn.Create(&profile)
}