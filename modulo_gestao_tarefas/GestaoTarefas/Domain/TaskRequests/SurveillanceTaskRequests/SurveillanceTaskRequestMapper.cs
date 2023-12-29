using System;
using GestaoTarefas.Domain.Shared;
using GestaoTarefas.Domain.TaskTypes;

namespace GestaoTarefas.Domain.TaskRequests;

public class SurveillanceTaskRequestMapper : ITaskRequestMapper<SurveillanceTaskRequest, SurveillanceTaskRequestDto>
{
  public SurveillanceTaskRequestDto ToDto(SurveillanceTaskRequest task)
  {
    return new SurveillanceTaskRequestDto()
    {
      Description = task.TaskDescription.Value,
      EmergencyNumber = task.EmergencyNumber.Value,
      Id = task.Id.AsGuid(),
      FloorId = task.FloorId.ToString(),
      Type = TaskType.Surveillance.ToString(),
      UserId = task.UserId.ToString(),
      RequestStatus = task.RequestStatus.ToString(),
      DeliveryRoomId = task.DeliveryRoomId.ToString(),
      PickupRoomId = task.PickupRoomId.ToString(),
      IdentificationCode = task.IdentificationCode.Value,
      CreatedAt = task.CreatedAt
    };
  }

  public SurveillanceTaskRequest ToEntity(CreatingTaskRequestDto dto)
  {
    try
    {
      return new SurveillanceTaskRequest(
            taskDescription: new TaskDescription(dto.Description),
            userId: new Guid(dto.UserId),
            emergencyNumber: new PhoneNumber(dto.EmergencyNumber),
            floorId: new Guid(dto.FloorId),
            pickupRoomId: new Guid(dto.PickupRoomId),
            deliveryRoomId: new Guid(dto.DeliveryRoomId)
          );
    } catch (FormatException e)
    {
      throw new BusinessRuleValidationException(e.Message);
    }

  }
}
