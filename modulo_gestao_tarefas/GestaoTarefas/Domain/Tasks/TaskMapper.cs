using GestaoTarefas.Domain.Shared;

namespace GestaoTarefas.Domain.Tasks;

public class TaskMapper : ITaskMapper<Task, TaskDto>
{
  private const string SurveillanceTaskType = "Surveillance";
  private const string DeliveryTaskType = "Delivery";

  public TaskDto ToDto(Task task)
  {
    switch (task)
    {
      case SurveillanceTask t:
        return new SurveillanceTaskMapper().ToDto(t);
      case DeliveryTask t:
        return new DeliveryTaskMapper().ToDto(t);
      default:
        throw new BusinessRuleValidationException("Unknown task type");
    }
  }

  public Task ToEntity(CreatingTaskDto dto)
  {
    switch (dto.Type)
    {
      case SurveillanceTaskType:
        return new SurveillanceTaskMapper().ToEntity(dto);
      case DeliveryTaskType:
        return new DeliveryTaskMapper().ToEntity(dto);
          default:
        throw new BusinessRuleValidationException("Unknown task type");
    }
  }
}
