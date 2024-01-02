using System;
using System.Collections.Generic;
using System.Linq;
using SYSTasks = System.Threading.Tasks;
using GestaoTarefas.Domain.Shared;
using GestaoTarefas.Domain.TaskRequests;
using Microsoft.Extensions.Primitives;

namespace GestaoTarefas.Domain.Tasks;

public class TaskService
{
  private readonly IUnitOfWork _unitOfWork;
  private readonly ISurveillanceTaskRepository _survRepo;
  private readonly IDeliveryTaskRepository _delvRepo;
  private readonly ITaskRepository _taskRepo;
  private readonly ITaskRequestRepository _taskRequestRepo;
  private readonly ITaskMapper<Task, TaskDto> _taskMapper;

  public TaskService(IUnitOfWork unitOfWork, ITaskRepository taskRepo, IDeliveryTaskRepository delvRepo, ISurveillanceTaskRepository survRepo, ITaskRequestRepository taskRequestRepo, ITaskMapper<Task, TaskDto> taskMapper)
  {
    this._unitOfWork = unitOfWork;
    this._survRepo = survRepo;
    this._delvRepo = delvRepo;
    this._taskRepo = taskRepo;
    this._taskRequestRepo = taskRequestRepo;
    this._taskMapper = taskMapper;
  }

  public async SYSTasks.Task<List<TaskDto>> GetAllAsync()
  {
    var list = await this._taskRepo.GetAllAsync();

    return _taskMapper.ToDtoList(list).ToList();
  }

  public async SYSTasks.Task<TaskDto> GetByIdAsync(TaskId id)
  {
    var task = await this._taskRepo.GetByIdAsync(id);

    if(task == null)
      return null;

    return _taskMapper.ToDto(task);
  }


  public async SYSTasks.Task<List<TaskDto>> GetPendingAsync()
  {
    var list = await this._taskRepo.GetPendingAsync();

    return _taskMapper.ToDtoList(list).ToList();
  }

  /*
  public async SYSTasks.Task<TaskDto> AddAsync(CreatingTaskDto dto)
  {
    var task = _taskMapper.ToEntity(dto);

    await this._taskRepo.AddAsync(task);

    try
    {
      await this._unitOfWork.CommitAsync();
    }
    catch (DbUpdateException e)
    {
      throw new IntegrityException(e.GetBaseException().Message);
    }

    return _taskMapper.ToDto(task);
  }
  */

  public async SYSTasks.Task<TaskDto> ApproveTaskRequest(CreatingTaskDto dto)
  {
    var request = await this._taskRequestRepo.GetByIdAsync(new TaskRequestId(dto.TaskRequestId));

    if (request == null)
      return null;

    request.Approve();
    var task = request.ToTask(dto.RobotId);

    await this._taskRequestRepo.UpdateAsync(request);
    await this._taskRepo.AddAsync(task);
    await this._unitOfWork.CommitAsync();

    return this._taskMapper.ToDto(task);
  }

  public async SYSTasks.Task<List<TaskDto>> GetByRobotsAsync(List<String> robotIds)
  {
    List<Guid> ids = new List<Guid>();
    // transform each string robotId in a Guid robotId
    foreach (var robotId in robotIds)
    {
      ids.Add(Guid.Parse(robotId));
      if (!Guid.TryParse(robotId, out Guid result))
        throw new ArgumentException("Invalid robotId");
    }
    // get tasks by robotIds
    var list = await this._taskRepo.GetByRobotsAsync(ids);

    return _taskMapper.ToDtoList(list).ToList();
  }
}
