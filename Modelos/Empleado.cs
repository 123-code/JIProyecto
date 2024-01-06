//entityframeworkcore.sqlite
//
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JIProyecto.Modelos;

public class Empleado
{
    [Key]
    public int IdEmpleado { get; set; }
    public string Nombre { get; set; }
    public string Correo { get; set; }
    public decimal Sueldo { get; set; }
    public DateTime FechaContrato { get; set; }


}



