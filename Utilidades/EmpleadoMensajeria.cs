using Community Toolkit.Mvvm.Messaging.Messages;
namespace JIProyecto.Utilidades;

public class EmpleadoMensajeria:ValueChangedMessage<EmpleadoMensaje>
{
    public EmpleadoMensajeria(EmpleadoMensaje value):base(value)
    {
        
    }
}