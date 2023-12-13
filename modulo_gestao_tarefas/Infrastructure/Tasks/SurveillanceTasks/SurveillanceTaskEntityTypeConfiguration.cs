using GestaoTarefas.Domain.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GestaoTarefas.Infrastructure.Tasks;

public class SurveillanceTaskEntityTypeConfiguration : IEntityTypeConfiguration<SurveillanceTask>
{
  public void Configure(EntityTypeBuilder<SurveillanceTask> builder)
  {
    // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx

    //builder.ToTable("Tasks", SchemaNames.DDDSample1);
    builder.Property(t => t.Status).HasConversion(st => st.ToString(), st => st.ToStatus());
    builder.Property(t => t.EmergencyNumber).HasConversion(en => en.Value, en => new PhoneNumber(en));
  }
}
