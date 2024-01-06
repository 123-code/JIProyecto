using JIProyecto.Modelos;
using JIProyecto.Utilidades;
using Microsoft.EntityFrameworkCore;

namespace JIProyecto.DataAccess
{
    public class EmpleadoDbContext : DbContext
    {
        public DbSet<Empleado> Empleados { get; set; }
        public EmpleadoDbContext()
        {
            Database.EnsureCreated();
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string conexionDB = $"Filename={ConexionDB.DevolverRuta("empleados.db")}";
            optionsBuilder.UseSqlite(conexionDB);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Empleado>(entity=>{
                entity.HasKey(col=>col.IdEmpleado);
                entity.Property(col=>col.IdEmpleado).IsRequired()ValueGeneratedOnAdd();
            
            });
        }
        
    }
}