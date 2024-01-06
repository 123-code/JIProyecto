using JIProyecto.DataAccess;
using JIProyecto.ViewModels;
using JIProyecto.Views;

namespace JIProyecto;


public static class MauiProgram
{
	public static MauiApp CreateMauiApp()
	{
		var builder = MauiApp.CreateBuilder();
		builder
			.UseMauiApp<App>()
			.ConfigureFonts(fonts =>
			{
				fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
				fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
			});

			var dbContext = new EmpleadoDbContext();
			dbContext.Database.EnsureCreated();
			dbContext.Dispose();
			builder.Services.AddDbContext<EmpleadoDbContext>();
			builder.Services.AddTrasient<EmpleadoViewModel>(); 

		return builder.Build();
	}
}
