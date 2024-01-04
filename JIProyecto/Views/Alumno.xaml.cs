namespace JIProyecto.Views;

public partial class Alumno : ContentPage
{
	public Alumno()
	{
		BindingContext = App.Current.Services.GetService<AlumnoViewModels>();
		InitializeComponent();

	}
}
