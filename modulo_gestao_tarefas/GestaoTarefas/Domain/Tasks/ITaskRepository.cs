using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GestaoTarefas.Domain.Shared;

namespace GestaoTarefas.Domain.Tasks;

public interface ITaskRepository : IRepository<Task, TaskId>
{
  public  Task<List<Task>> GetPendingAsync();
  public Task<List<Task>> GetByRobotsAsync(List<Guid> ids);
}
