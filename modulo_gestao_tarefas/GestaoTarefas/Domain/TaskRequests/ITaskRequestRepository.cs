using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GestaoTarefas.Domain.Shared;
using GestaoTarefas.Domain.TaskTypes;

namespace GestaoTarefas.Domain.TaskRequests;

public interface ITaskRequestRepository : IRepository<TaskRequest, TaskRequestId>
{
  Task<IEnumerable<TaskRequest>> GetByStatusUserAsync(
    RequestStatus? status, Guid? userId);
}
