using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GestaoTarefas.Domain.TaskRequests;
using GestaoTarefas.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;


namespace GestaoTarefas.Infrastructure.TaskRequests;

public class TaskRequestRepository : BaseRepository<TaskRequest, TaskRequestId>, ITaskRequestRepository
{
  public TaskRequestRepository(GestaoTarefasDbContext context) : base(context.TaskRequests)
  {
  }

  public async Task<IEnumerable<TaskRequest>> GetByStatusAsync(RequestStatus status)
  {
    return await this.Objs.Where(r => r.RequestStatus == status).ToListAsync();
  }
}
