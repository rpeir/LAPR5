using GestaoTarefas.Domain.Shared;

namespace GestaoTarefas.Domain.Tasks;

public interface ITaskRepository : IRepository<Task, TaskId>
{

}
