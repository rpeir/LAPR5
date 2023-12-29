using GestaoTarefas.Domain.Shared;
using GestaoTarefas.Domain.TaskRequests;
using GestaoTarefas.Domain.TaskTypes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GestaoTarefas.Infrastructure.TaskRequests;

public class TaskRequestEntityTypeConfiguration : IEntityTypeConfiguration<TaskRequest>
{
  public void Configure(EntityTypeBuilder<TaskRequest> builder)
  {
    // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx

    //builder.ToTable("Tasks", SchemaNames.DDDSample1);
    builder.HasKey(b => b.Id);
    //builder.Property<bool>("_active").HasColumnName("Active");
    builder.Property(t => t.IdentificationCode)
      .HasConversion(d => d.Value,
        d => new IdentificationCode(d))
      .HasComputedColumnSql("CONCAT(Type,'-',RIGHT(CONCAT('000000000',Id),9))")
      .IsRequired();
    builder.HasIndex(t => t.IdentificationCode).IsUnique();
    builder.Property(t => t.TaskDescription).HasConversion(d => d.Value, d => new TaskDescription(d));
    builder.Property(t => t.Type).HasConversion(tt => tt.ToString(), tt => tt.ToTaskType());
    builder.Property(t => t.RequestStatus).HasConversion(st => st.ToString(), st => st.ToStatus());
    builder.HasDiscriminator(t => t.Type)
      .HasValue<SurveillanceTaskRequest>(TaskType.Surveillance)
      .HasValue<DeliveryTaskRequest>(TaskType.Delivery);
  }
}
