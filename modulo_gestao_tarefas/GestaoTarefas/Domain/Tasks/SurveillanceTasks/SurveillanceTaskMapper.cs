using System;
using GestaoTarefas.Domain.Shared;
using GestaoTarefas.Domain.TaskRequests;
using GestaoTarefas.Domain.TaskTypes;

namespace GestaoTarefas.Domain.Tasks;

public class SurveillanceTaskMapper : ITaskMapper<SurveillanceTask, SurveillanceTaskDto>
{
  public SurveillanceTaskDto ToDto(SurveillanceTask task)
  {
    return new SurveillanceTaskDto()
    {
      TaskRequestId = task.TaskRequestId.AsGuid(),
      Description = task.TaskDescription.Value,
      EmergencyNumber = task.EmergencyNumber.Value,
      Id = task.Id.AsGuid(),
      FloorId = task.FloorId.ToString(),
      Type = TaskType.Surveillance.ToString(),
      UserId = task.UserId.ToString(),
      Status = task.Status.ToString(),
      DeliveryRoomId = task.DeliveryRoomId.ToString(),
      PickupRoomId = task.PickupRoomId.ToString(),
      RobotId = task.RobotId
    };
  }

  public SurveillanceTask ToEntity(CreatingTaskDto dto)
  {
    try
    {
      return new SurveillanceTask(
        taskRequestId: new TaskRequestId(dto.TaskRequestId),
        taskDescription: new TaskDescription(dto.Description),
        userId: new Guid(dto.UserId),
        emergencyNumber: new PhoneNumber(dto.EmergencyNumber),
        floorId: new Guid(dto.FloorId),
        pickupRoomId: new Guid(dto.PickupRoomId),
        deliveryRoomId: new Guid(dto.DeliveryRoomId),
        robotId: dto.RobotId
      );
    } catch (FormatException e)
    {
      throw new BusinessRuleValidationException(e.Message);
    }

  }
}
