using System.Collections.Generic;
using System.Threading.Tasks;
using GestaoTarefas.Domain.Shared;

namespace GestaoTarefas.Domain.TaskRequests;

public interface ITaskRequestRepository : IRepository<TaskRequest, TaskRequestId>
{
  Task<IEnumerable<TaskRequest>> GetByStatusAsync(RequestStatus status);
}
