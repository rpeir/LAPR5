using GestaoTarefas.Domain.Shared;
using GestaoTarefas.Domain.TaskRequests;
using GestaoTarefas.Domain.Tasks;
using GestaoTarefas.Domain.TaskTypes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GestaoTarefas.Infrastructure.Tasks;

public class TaskEntityTypeConfiguration : IEntityTypeConfiguration<Task>
{
  public void Configure(EntityTypeBuilder<Task> builder)
  {
    // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx

    //builder.ToTable("Tasks", SchemaNames.DDDSample1);
    builder.HasKey(b => b.Id);
    //builder.Property<bool>("_active").HasColumnName("Active");
    builder.Property(t => t.IdentificationCode).HasConversion(ic => ic.Value, ic => new IdentificationCode(ic));
    builder.HasIndex(t => t.IdentificationCode).IsUnique();
    builder.Property(t => t.TaskDescription).HasConversion(d => d.Value, d => new TaskDescription(d));
    builder.Property(t => t.Type).HasConversion(tt => tt.ToString(), tt => tt.ToTaskType());
    builder.Property(t => t.Status).HasConversion(st => st.ToString(), st => StatusHelper.ToStatus(st));
    builder.HasDiscriminator(t => t.Type)
      .HasValue<SurveillanceTask>(TaskType.Surveillance)
      .HasValue<DeliveryTask>(TaskType.Delivery);
  }
}
