using GestaoTarefas.Domain.Tasks;
using GestaoTarefas.Infrastructure.Shared;

namespace GestaoTarefas.Infrastructure.Tasks;

public class DeliveryTaskRepository : BaseRepository<DeliveryTask, TaskId>, IDeliveryTaskRepository
{
  public DeliveryTaskRepository(GestaoTarefasDbContext context) : base(context.DeliveryTasks)
  {
  }
}
