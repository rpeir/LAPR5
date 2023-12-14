using GestaoTarefas.Domain.Tasks;
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
    builder.Property(t => t.Description).HasConversion(d => d.Value, d => new Description(d));
    builder.Property(t => t.Type).HasConversion(tt => tt.ToString(), tt => tt.ToTaskType());
    builder.Property(t => t.Status).HasConversion(st => st.ToString(), st => st.ToStatus());
    builder.HasDiscriminator(t => t.Type)
      .HasValue<SurveillanceTask>(TaskType.Surveillance)
      .HasValue<DeliveryTask>(TaskType.Delivery);
    builder.HasIndex(t => t.Code).IsUnique();
  }
}
