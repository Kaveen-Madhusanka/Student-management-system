using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using student_management_system_API.Domain;
using student_management_system_API.Infastructure;
using System.Collections.Generic;

namespace student_management_system_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StudentController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<Studant>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IResult> GetStudents()
        {
            var result = await _context.Student.ToListAsync();
            return Results.Ok(result);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Studant))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IResult> GetStudentsById(int id)
        {
            var result = await _context.Student.FirstOrDefaultAsync(x => x.Id ==id);
            Ok();
            return Results.Ok(result); 
        }

        [HttpPost]
        public async Task<IResult> CreateStudent(Studant studant)
        {
            var result = await _context.Student.AddAsync(studant);
            await _context.SaveChangesAsync();
            return Results.Ok();
        }

        [HttpPut]
        public async Task<IResult> UpdateStudent(Studant studant)
        {
            var result =  _context.Student.Update(studant);
            await _context.SaveChangesAsync();
            return Results.Ok();
        }

        [HttpDelete]
        public async Task<IResult> DeleteStudent(int id)
        {
            var existingStudent = await _context.Student.FirstOrDefaultAsync(x=> x.Id == id);
            if (existingStudent != null)
            {
                _context.Student.Remove(existingStudent);
                await _context.SaveChangesAsync();
                return Results.Ok();
            }
            else
            {
                return Results.Ok("Student not found");
            }
           
           
        }
    }
}
