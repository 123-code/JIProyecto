package models

import(
	"gorm.io/gorm"
    "github.com/google/uuid"
)

type User struct {
	gorm.Model
    ID          uuid.UUID 
    Nombre string `json:"Nombre"`
	Orders[] Order `gorm:"foreignKey:UserID;"`
    Apellido string `json:"Apellido"`
	Email string `json:"Email"`
    NumCedula string `json:"Cedula"`
	UsoCuenta string  `json:"UsoCuenta"`

}


func (p *User) BeforeCreate(tx *gorm.DB) error {
	p.ID = uuid.New()

	return nil
}