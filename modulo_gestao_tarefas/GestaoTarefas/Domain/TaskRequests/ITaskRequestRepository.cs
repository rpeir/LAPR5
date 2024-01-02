using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GestaoTarefas.Domain.Shared;
using GestaoTarefas.Domain.Tasks;
using GestaoTarefas.Domain.TaskTypes;

namespace GestaoTarefas.Domain.TaskRequests;

public interface ITaskRequestRepository : IRepository<TaskRequest, TaskRequestId>
{
  public Task<IEnumerable<TaskRequest>> GetByStatusUserTimeAsync(
    RequestStatus? status, Guid? userId, DateTime? startTime, DateTime? endTime);
  Task<IEnumerable<TaskRequest>> GetByStatusUserAsync(
    RequestStatus? status, Guid? userId);

  Task<IEnumerable<TaskRequest>> GetByTaskIdsAsync(List<TaskDto> tasksWithRobots);
}
