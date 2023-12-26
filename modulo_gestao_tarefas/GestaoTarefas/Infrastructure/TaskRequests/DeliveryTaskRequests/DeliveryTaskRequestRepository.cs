using GestaoTarefas.Domain.TaskRequests;
using GestaoTarefas.Infrastructure.Shared;

namespace GestaoTarefas.Infrastructure.TaskRequests;

public class DeliveryTaskRequestRepository : BaseRepository<DeliveryTaskRequest, TaskRequestId>, IDeliveryTaskRequestRepository
{
  public DeliveryTaskRequestRepository(GestaoTarefasDbContext context) : base(context.DeliveryTaskRequests)
  {
  }
}
