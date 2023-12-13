using System.Collections.Generic;
using System.Linq;
using SYSTasks = System.Threading.Tasks;
using GestaoTarefas.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace GestaoTarefas.Domain.Tasks;

public class TaskService
{
  private readonly IUnitOfWork _unitOfWork;
  private readonly ISurveillanceTaskRepository _survRepo;
  private readonly IDeliveryTaskRepository _delvRepo;
  private readonly ITaskRepository _taskRepo;
  private readonly ITaskMapper<Task, TaskDto> _taskMapper;

  public TaskService(IUnitOfWork unitOfWork, ITaskRepository taskRepo, IDeliveryTaskRepository delvRepo, ISurveillanceTaskRepository survRepo, ITaskMapper<Task, TaskDto> taskMapper)
  {
    this._unitOfWork = unitOfWork;
    this._survRepo = survRepo;
    this._delvRepo = delvRepo;
    this._taskRepo = taskRepo;
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

}
