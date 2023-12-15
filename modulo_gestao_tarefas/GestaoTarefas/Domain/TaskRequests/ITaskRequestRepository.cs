using GestaoTarefas.Domain.Shared;

namespace GestaoTarefas.Domain.TaskRequests;

public interface ITaskRequestRepository : IRepository<TaskRequest, TaskRequestId>
{

}
