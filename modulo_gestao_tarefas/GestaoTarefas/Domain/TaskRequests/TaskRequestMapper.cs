using GestaoTarefas.Domain.Shared;

namespace GestaoTarefas.Domain.TaskRequests;

public class TaskRequestMapper : ITaskRequestMapper<TaskRequest, TaskRequestDto>
{
  private const string SurveillanceTaskType = "Surveillance";
  private const string DeliveryTaskType = "Delivery";

  public TaskRequestDto ToDto(TaskRequest task)
  {
    switch (task)
    {
      case SurveillanceTaskRequest t:
        return new SurveillanceTaskRequestMapper().ToDto(t);
      case DeliveryTaskRequest t:
        return new DeliveryTaskRequestMapper().ToDto(t);
      default:
        throw new BusinessRuleValidationException("Unknown task type");
    }
  }

  public TaskRequest ToEntity(CreatingTaskRequestDto dto)
  {
    switch (dto.Type)
    {
      case SurveillanceTaskType:
        return new SurveillanceTaskRequestMapper().ToEntity(dto);
      case DeliveryTaskType:
        return new DeliveryTaskRequestMapper().ToEntity(dto);
          default:
        throw new BusinessRuleValidationException("Unknown task type");
    }
  }
}
