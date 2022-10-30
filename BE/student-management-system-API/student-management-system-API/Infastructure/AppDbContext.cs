using Microsoft.EntityFrameworkCore;
using student_management_system_API.Domain;

namespace student_management_system_API.Infastructure
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<Studant> Student { get; set; }
    }
}
