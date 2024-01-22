package models

import(
	"gorm.io/gorm"
    "github.com/google/uuid"
)

type User struct {
	gorm.Model
    ID          uuid.UUID `gorm:"foreignKey:ProfileID;"`
    Nombre string `json:"Nombre"`
    Apellido string `json:"Apellido"`
    NumCedula string `json:"Cedula"`
	UsoCuenta string  `json:"UsoCuenta"`

}


func (p *User) BeforeCreate(tx *gorm.DB) error {
	p.ID = uuid.New()

	return nil
}