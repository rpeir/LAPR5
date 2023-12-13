using GestaoTarefas.Domain.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GestaoTarefas.Infrastructure.Tasks;

public class DeliveryTaskEntityTypeConfiguration : IEntityTypeConfiguration<DeliveryTask>
{
  public void Configure(EntityTypeBuilder<DeliveryTask> builder)
  {
    // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx

    builder.Property(t => t.SenderContact).HasConversion(sc => sc.Value, sc => new PhoneNumber(sc));
    builder.Property(t => t.ReceiverContact).HasConversion(rc => rc.Value, rc => new PhoneNumber(rc));
    builder.Property(t => t.ConfirmationCode).HasConversion(cc => cc.Value, cc => new ConfirmationCode(cc));
  }
}
