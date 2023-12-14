using GestaoTarefas.Domain.TaskRequests;
using Microsoft.EntityFrameworkCore;
using GestaoTarefas.Domain.Tasks;
using GestaoTarefas.Infrastructure.TaskRequests;
using GestaoTarefas.Infrastructure.Tasks;

namespace GestaoTarefas.Infrastructure
{
    public class GestaoTarefasDbContext : DbContext
    {

        public DbSet<SurveillanceTask> SurveillanceTasks { get; set; }

        public DbSet<DeliveryTask> DeliveryTasks { get; set; }

        public DbSet<Task> Tasks { get; set; }

        public DbSet<SurveillanceTaskRequest> SurveillanceTaskRequests { get; set; }

        public DbSet<DeliveryTaskRequest> DeliveryTaskRequests { get; set; }

        public DbSet<TaskRequest> TaskRequests { get; set; }

        public GestaoTarefasDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new TaskEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new SurveillanceTaskEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new DeliveryTaskEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new TaskRequestEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new SurveillanceTaskRequestEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new DeliveryTaskRequestEntityTypeConfiguration());
        }
    }
}
