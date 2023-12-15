using GestaoTarefas.Domain.Shared;
using GestaoTarefas.Domain.TaskRequests;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GestaoTarefas.Infrastructure.TaskRequests;

public class DeliveryTaskRequestEntityTypeConfiguration : IEntityTypeConfiguration<DeliveryTaskRequest>
{
  public void Configure(EntityTypeBuilder<DeliveryTaskRequest> builder)
  {
    // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx

    builder.Property(t => t.SenderContact).HasConversion(sc => sc.Value, sc => new PhoneNumber(sc));
    builder.Property(t => t.ReceiverContact).HasConversion(rc => rc.Value, rc => new PhoneNumber(rc));
    builder.Property(t => t.ConfirmationCode).HasConversion(cc => cc.Value, cc => new ConfirmationCode(cc));
    builder.Property(t => t.SenderName).HasConversion(sn => sn.Value, sn => new Name(sn));
    builder.Property(t => t.ReceiverName).HasConversion(rn => rn.Value, rn => new Name(rn));
  }
}