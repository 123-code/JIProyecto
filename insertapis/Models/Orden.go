package models

import(
	"gorm.io/gorm"
    "github.com/google/uuid"
)

type Order struct {
	gorm.Model
    ID          uuid.UUID
    UserID uuid.UUID 
    Nombre string `json:"Nombre"`
    Cantidad int `json:"Cantidad"`
    Contacto string `json:"Contacto"`
    CreatorEmail string `json:"CreatorEmail"`
}

/*

curl -X POST -H "Content-Type: application/json" -d '{
    "Nombre": "John",
    "Apellido": "Doe",
    "NumCedula": "123456789",
    "UsoCuenta": "Personal"
}' http://localhost:8080/createstore
*/
func (p *Order) BeforeCreate(tx *gorm.DB) error {
	p.ID = uuid.New()

	return nil
} 