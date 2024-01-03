using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JIProyecto.Interfaces;

    public interface IAlumnos
    {
        public Task<List<AlumnosModels>> GetAll();
        public Task<AlumnosModels> GetById(int id);
        public Task<int> InsertAlumno(AlumnosModels A);
        public Task<int> DeleteAlumno(AlumnosModels A);
        public Task<int> UpdateAlumno(AlumnosModels A);

    }

