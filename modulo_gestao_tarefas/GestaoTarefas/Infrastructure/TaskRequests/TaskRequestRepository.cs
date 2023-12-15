using GestaoTarefas.Domain.TaskRequests;
using GestaoTarefas.Infrastructure.Shared;


namespace GestaoTarefas.Infrastructure.TaskRequests;

public class TaskRequestRepository : BaseRepository<TaskRequest, TaskRequestId>, ITaskRequestRepository
{
  public TaskRequestRepository(GestaoTarefasDbContext context) : base(context.TaskRequests)
  {
  }
}
