namespace JIProyecto.Views;

public partial class ListadoAlumnos : ContentPage
{
	public ListadoAlumnos()
	{
		InitializeComponent();
		BindingContext = App.Current.Services.GetService<AlumnosViewModels>();
	}

    
}