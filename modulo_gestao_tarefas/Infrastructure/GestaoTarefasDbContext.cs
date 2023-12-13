using Microsoft.EntityFrameworkCore;
using GestaoTarefas.Domain.Tasks;
using GestaoTarefas.Infrastructure.Tasks;

namespace GestaoTarefas.Infrastructure
{
    public class GestaoTarefasDbContext : DbContext
    {

        public DbSet<SurveillanceTask> SurveillanceTasks { get; set; }

        public DbSet<DeliveryTask> DeliveryTasks { get; set; }

        public DbSet<Task> Tasks { get; set; }

        public GestaoTarefasDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new TaskEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new SurveillanceTaskEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new DeliveryTaskEntityTypeConfiguration());
        }
    }
}
