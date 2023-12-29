using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GestaoTarefas.Domain.TaskRequests;
using GestaoTarefas.Domain.TaskTypes;
using GestaoTarefas.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;


namespace GestaoTarefas.Infrastructure.TaskRequests;

public class TaskRequestRepository : BaseRepository<TaskRequest, TaskRequestId>, ITaskRequestRepository
{
  public TaskRequestRepository(GestaoTarefasDbContext context) : base(context.TaskRequests)
  {
  }

  public async Task<IEnumerable<TaskRequest>> GetByStatusUserAsync(
    RequestStatus? status = null, Guid? userId = null)
  {
    var query = this.Objs.AsQueryable();

    if (status != null)
      query = query.Where(r => r.RequestStatus == status);

    if (userId != null)
      query = query.Where(r => r.UserId == userId);

    return await query.ToListAsync();
  }
}
