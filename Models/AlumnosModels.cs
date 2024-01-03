using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JIProyecto.Models;

[System.ComponentModel.DataAnnotations.Schema.Table("alumnos")]
public class AlumnosModels : BaseModels
{

    [System.ComponentModel.DataAnnotations.MaxLength(30)]
    public string Nombre { get; set; } = "";

    [System.ComponentModel.DataAnnotations.MaxLength(30)]
    public string Apellido { get; set; } = "";

    public override string ToString() =>
    $"Id:{Id} - {Nombre} {Apellido}";

}

public abstract class BaseModels

{

    [PrimaryKey, AutoIncrement]
    public int Id { get; set; }

}


