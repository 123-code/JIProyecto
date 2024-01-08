using System.ComponentModel.DataAnnotations;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Messaging;
using CommunityToolkit.Mvvm.Input;
using Microsoft.EntityFrameworkCore;
using JIProyecto.DataAccess;
using JIProyecto.DTOs;
using JIProyecto.Utilidades;
using JIProyecto.Modelos;

using MaxLengthAttribute = System.ComponentModel.DataAnnotations.MaxLengthAttribute;


namespace JIProyecto.ViewModels;

public partial class MainViewModel: ObservableObject
{
   private readonly EmpleadoDbContext _dbContext;
    [ObservableProperty]
    private ObservableCollection<EmpleadoDTO> listaEmpleado = new ObservableCollection<EmpleadoDTO>();

    public MainViewModel(EmpleadoDbContext context)
    {
        _dbContext = context;
        MainThread.BeginInvokeOnMainThread(new Action(async () => await Obtener()));
        WeakReferenceMessenger.Default.Register<EmpleadoMensajeria>(this,(r,m)=>{
            EmpleadoMensajeRecibido(m.Value);
        });
        //Messenger.Register<EmpleadoMensajeria>(this, OnEmpleadoMensaje);
        //CargarDatos();
    }  

    public async Task Obtener(){
        var lista = await _dbContext.Empleados.ToListAsync();

        if(lista Any()){
            foreach(var item in lista){
                listaEmpleado.Add(new EmpleadoDTO(){
                    IdEmpleado = item.IdEmpleado,
                    Nombre = item.Nombre,
                    Correo = item.Correo,
                    Sueldo = item.Sueldo,
                    FechaContrato = item.FechaContrato
                });
            }
        }
    }

    private void EmpleadoMensajeRecibido(EmpleadoMensaje empleadoMensaje){
var empleadoDto = empleadoMensaje.EmpleadoDTO;

if(empleadoMensaje.EsCrear){
    listaEmpleado.Add(empleadoDto);

}else{
    
    var encontrado = ListaEmpleado.First(e=>e.IdEmpleado==empleadoDto.IdEmpleado);
    encontrado.NombreCompleto = empleadoDto.NombreCompleto;
    encontrado.Correo = empleadoDto.Correo;
    encontrado.Sueldo = empleadoDto.Sueldo;
    encontrado.FechaContrato = empleadoDto.FechaContrato;

}
    }
[RelayCommand]
private async Task crear(){
    var uri = $"{nameof(EmpleadoPage)}?id=0";
    await Shell.Current.GoToAsync(uri);
}
[RelayCommand]
private async Task Editar(EmpleadoDTO empleadoDto){
    var uri = $"{nameof(EmpleadoPage)}?id={empleadoDto.IdEmpleado}";
    await Shell.Current.GoToAsync(uri);

}
[RelayCommand]
private async Task Eliminar(EmpleadoDTO empleadoDto){
    bool answer = await Shell.Current.DisplayAlert("Mensaje","¿Está seguro de eliminar el registro?","Si","No");
    if(answer){
        var encontrado = await _dbContext.Empleados.FirstAsync(e=>e.IdEmpleado==empleadoDto.IdEmpleado);
        _dbContext.Empleados.Remove(encontrado);
        await _dbContext.SaveChangesAsync();
        listaEmpleado.Remove(empleadoDto);
    }
     
}


}