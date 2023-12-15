using GestaoTarefas.Domain.Tasks;
using GestaoTarefas.Infrastructure.Shared;


namespace GestaoTarefas.Infrastructure.Tasks;

public class TaskRepository : BaseRepository<Task, TaskId>, ITaskRepository
{
  public TaskRepository(GestaoTarefasDbContext context) : base(context.Tasks)
  {
  }
}
