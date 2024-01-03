namespace JIProyecto;

public partial class AppShell : Shell
{
	public AppShell()
	{
		InitializeComponent();
        Routing.RegisterRoute(nameof(Alumno), typeof(Alumno));
        Routing.RegisterRoute(nameof(ListadoAlumnos), typeof(ListadoAlumnos));
    }
}
