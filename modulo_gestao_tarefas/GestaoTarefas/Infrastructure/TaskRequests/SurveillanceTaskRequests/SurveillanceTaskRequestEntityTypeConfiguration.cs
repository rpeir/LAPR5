using GestaoTarefas.Domain.Shared;
using GestaoTarefas.Domain.TaskRequests;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GestaoTarefas.Infrastructure.TaskRequests;

public class SurveillanceTaskRequestEntityTypeConfiguration : IEntityTypeConfiguration<SurveillanceTaskRequest>
{
  public void Configure(EntityTypeBuilder<SurveillanceTaskRequest> builder)
  {
    // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx

    //builder.ToTable("Tasks", SchemaNames.DDDSample1);
    builder.Property(t => t.EmergencyNumber).HasConversion(en => en.Value, en => new PhoneNumber(en));
  }
}
