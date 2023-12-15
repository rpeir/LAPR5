using GestaoTarefas.Domain.Shared;

namespace GestaoTarefas.Domain.TaskRequests;

public interface IDeliveryTaskRequestRepository : IRepository<DeliveryTaskRequest, TaskRequestId>
{

}
