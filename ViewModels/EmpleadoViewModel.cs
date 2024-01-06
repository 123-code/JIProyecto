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

public partial class EmpleadoViewModel:ObservableObject,QueryAttributable{
    private readonlyEmpleadoDbContext _dbContext;
    [ObservableProperty]
    private EmpleadoDTO empleadoDTO = new EmpleadoDTO();

    [ObservableProperty]
    private string tituloPagina;

    
    private int IdEmpleado;
    [ObservableProperty]
    private bool LoadingEsVisible = false;

    public EmpleadoViewModel(EmpleadoDbContext context){
        _dbContext = context;
        EmpleadoDTO.FechaContrato = DateTime.Now;

    }

    public void ApplyQueryAttributes(IDictionary<string,object>query){
        var id = int.Parse(query["id"].ToString());
        if(IdEmpleado==0){
            tituloPagina = "Nuevo Empleado";
          
        }
        else{
             tituloPagina = "EditarEmpleado";
             LoadingEsVisible = true;
             await Task Run(async()=>{
                var encontrado = await _dbContext.Empleados.FirstAsync(e=>e.IdEmpleado==IdEmpleado);
                EmpleadoDTO.IdEmpleado = encontrado.IdEmpleado;
                EmpleadoDTO.Nombre = encontrado.Nombre;
                EmpleadoDTO.Correo = encontrado.Correo;
                EmpleadoDTO.Sueldo = encontrado.Sueldo;
                EmpleadoDTO.FechaContrato = encontrado.FechaContrato;
                MainThread.BeginInvokeOnMainThread(()=>{LoadingEsVisible=false});
             })
        }

        throw new NotImplementedException();
    }
    [RelayCommand]
    private async Task Guardar(){
        LoadingEsVisible = true;
        EmpleadoMensaje mensaje = new EmpleadoMensaje();
        await Task Run(async()=>{
            if(IdEmpleado==0){
                var tbEmpleado = new Empleado{
                    NombreCompleto = EmpleadoDTO.NombreCompleto,
                    Correo = EmpleadoDTO.Correo,
                    Sueldo = EmpleadoDTO.Sueldo,
                    FechaContrato = EmpleadoDTO.FechaContrato
                };
                _dbContext.Empleados.Add(tbEmpleado);
                await _dbContext.SaveChangesAsync();
                EmpleadoDTO.IdEmpleado = tbEmpleado.IdEmpleado;
                mensaje = new EmpleadoMensaje{
                    EsCrear = true,
                    Empleado = EmpleadoDTO
                };
            }
            else{
                var encontrado = await _dbContext.Empleados.FirstAsync(e=>e.IdEmpleado==IdEmpleado);
                encontrado.NombreCompleto = EmpleadoDTO.NombreCompleto;
                encontrado.Correo = EmpleadoDTO.Correo;
                encontrado.Sueldo = EmpleadoDTO.Sueldo;
                encontrado.FechaContrato = EmpleadoDTO.FechaContrato;
                await _dbContext.SaveChangesAsync();
                mensaje = new EmpleadoMensaje{
                    EsCrear = false,
                    Empleado = EmpleadoDTO
                };
            }
            MainThread.BeginInvokeOnMainThread(async()=>{LoadingEsVisible=false; WeakReferenceMessenger.Default.Send(new EmpleadoMensajeria(mensaje)); await Shell.Current.Navigation.PopAsync();});
        })
    }

}