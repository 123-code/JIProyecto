using Community Toolkit.Mvvm.ComponentModel;
namespace JIProyecto.DTOs;

public partial class EmpleadoDTO : ObservableObject
{
    [ObservableProperty]
    public int IdEmpleado;
     [ObservableProperty]
    public string Nombre; 
     [ObservableProperty]
    public string Correo;
     [ObservableProperty]
    public decimal Sueldo;
     [ObservableProperty]
    public DateTime FechaContrato;
}