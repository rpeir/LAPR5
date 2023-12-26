using GestaoTarefas.Domain.Shared;

namespace GestaoTarefas.Domain.Tasks;

public interface IDeliveryTaskRepository : IRepository<DeliveryTask, TaskId>
{

}
