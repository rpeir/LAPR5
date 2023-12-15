using GestaoTarefas.Domain.Tasks;
using GestaoTarefas.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;

namespace GestaoTarefas.Infrastructure.Tasks;

public class SurveillanceTaskRepository : BaseRepository<SurveillanceTask, TaskId>, ISurveillanceTaskRepository
{
  public SurveillanceTaskRepository(GestaoTarefasDbContext context) : base(context.SurveillanceTasks)
  {
  }
}
