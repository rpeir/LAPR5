using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GestaoTarefas.Domain.TaskRequests;
using GestaoTarefas.Domain.Tasks;
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

  public async Task<IEnumerable<TaskRequest>> GetByTaskIdsAsync(List<TaskDto> tasksWithRobots)
  {
    var ids = tasksWithRobots.Select(t => t.IdentificationCode).ToList();

    return await this.Objs
      .Where(r => ids.Contains(r.IdentificationCode.Value)).ToListAsync();
  }

  public async Task<IEnumerable<TaskRequest>> GetByStatusUserTimeAsync(
    RequestStatus? status = null, Guid? userId = null, DateTime? startTime = null, DateTime? endTime = null)
    {
      var query = this.Objs.AsQueryable();

      if (status != null)
        query = query.Where(r => r.RequestStatus == status);

      if (userId != null)
        query = query.Where(r => r.UserId == userId);

      if (startTime != null)
        query = query.Where(r => r.CreatedAt >= startTime);

      if (endTime != null)
        query = query.Where(r => r.CreatedAt <= endTime);

      return await query.ToListAsync();
    }
}
