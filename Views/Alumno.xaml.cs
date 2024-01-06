using JIProyecto.ViewModels;

namespace JIProyecto.Views;
 
public partial class Alumno : ContentPage
{
	public Alumno(EmpleadoViewModel viewModel)
	{
		//BindingContext = App.Current.Services.GetService<AlumnoViewModels>();
		InitializeComponent();
		BindingContext = viewModel;

	}
}
