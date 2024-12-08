using Microsoft.EntityFrameworkCore;

namespace JobDetailAPI.Models
{
    public class JobDetailContext : DbContext
    {
        public JobDetailContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<JobDetail> JobDetails { get; set; }

    }

}
