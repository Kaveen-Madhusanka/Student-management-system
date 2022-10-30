using Microsoft.EntityFrameworkCore;
using student_management_system_API.Infastructure;

namespace student_management_system_API
{
    public class APIConfigurations
    {
        public IConfiguration Configuration { get; }
        public APIConfigurations(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("DevConnection")));
        }

    }
}
