using GestaoTarefas.Domain.TaskRequests;
using GestaoTarefas.Infrastructure.Shared;

namespace GestaoTarefas.Infrastructure.TaskRequests;

public class SurveillanceTaskRequestRepository : BaseRepository<SurveillanceTaskRequest, TaskRequestId>, ISurveillanceTaskRequestRepository
{
  public SurveillanceTaskRequestRepository(GestaoTarefasDbContext context) : base(context.SurveillanceTaskRequests)
  {
  }
}
