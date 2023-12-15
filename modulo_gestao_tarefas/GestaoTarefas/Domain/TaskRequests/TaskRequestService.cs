using System.Collections.Generic;
using System.Linq;
using SYSTasks = System.Threading.Tasks;
using GestaoTarefas.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace GestaoTarefas.Domain.TaskRequests;

public class TaskRequestService
{
  private readonly IUnitOfWork _unitOfWork;
  private readonly ISurveillanceTaskRequestRepository _surRepo;
  private readonly IDeliveryTaskRequestRepository _delRepo;
  private readonly ITaskRequestRepository _reqRepo;
  private readonly ITaskRequestMapper<TaskRequest, TaskRequestDto> _reqMapper;

  public TaskRequestService(IUnitOfWork unitOfWork, ITaskRequestRepository reqRepo,
    IDeliveryTaskRequestRepository delRepo, ISurveillanceTaskRequestRepository surRepo,
    ITaskRequestMapper<TaskRequest, TaskRequestDto> reqMapper)
  {
    this._unitOfWork = unitOfWork;
    this._surRepo = surRepo;
    this._delRepo = delRepo;
    this._reqRepo = reqRepo;
    this._reqMapper = reqMapper;
  }

  public async SYSTasks.Task<List<TaskRequestDto>> GetAllAsync()
  {
    var list = await this._reqRepo.GetAllAsync();

    return _reqMapper.ToDtoList(list).ToList();
  }

  public async SYSTasks.Task<TaskRequestDto> GetByIdAsync(TaskRequestId id)
  {
    var task = await this._reqRepo.GetByIdAsync(id);

    if(task == null)
      return null;

    return _reqMapper.ToDto(task);
  }

  public async SYSTasks.Task<TaskRequestDto> AddAsync(CreatingTaskRequestDto dto)
  {
    var task = _reqMapper.ToEntity(dto);

    await this._reqRepo.AddAsync(task);

    try
    {
      await this._unitOfWork.CommitAsync();
    }
    catch (DbUpdateException e)
    {
      throw new IntegrityException(e.GetBaseException().Message);
    }

    return _reqMapper.ToDto(task);
  }

}
