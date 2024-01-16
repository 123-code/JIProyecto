package models

import(
	"gorm.io/gorm"
    "github.com/google/uuid"
)

type Order struct {
	gorm.Model
    ID          uuid.UUID `gorm:"foreignKey:ProfileID;"`
    Nombre string `json:"nombre"`
    Cantidad int `json:"cantidad"`
    Email string `json:"Email"`
}

/*

 curl --location --request POST 'http://localhost:8080/createstore' --header 'Content-Type: application/json' --data-raw '{
    "Nombre":"My Store",
    "Productos":"Clothing",
    "Direccion":"123 Main St", 
    "Web":"www.mystore.com",
    "ProfileID": "26744267-2ab2-48d9-8552-c3f7de73e545"
}'


*/
func (p *Order) BeforeCreate(tx *gorm.DB) error {
	p.ID = uuid.New()

	return nil
}