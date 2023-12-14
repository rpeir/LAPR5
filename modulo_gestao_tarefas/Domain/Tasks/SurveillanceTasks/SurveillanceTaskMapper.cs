namespace GestaoTarefas.Domain.Tasks;

public class SurveillanceTaskMapper : ITaskMapper<SurveillanceTask, SurveillanceTaskDto>
{
  public SurveillanceTaskDto ToDto(SurveillanceTask task)
  {
    return new SurveillanceTaskDto()
    {
      Code = task.Code,
      Description = task.Description.Value,
      EmergencyNumber = task.EmergencyNumber.Value,
      Id = task.Id.AsGuid(),
      FloorId = task.FloorId,
      Type = TaskType.Surveillance.ToString(),
      UserId = task.UserId,
      Status = task.Status.ToString(),
      DeliveryRoomId = task.DeliveryRoomId,
      PickupRoomId = task.PickupRoomId
    };
  }

  public SurveillanceTask ToEntity(CreatingTaskDto dto)
  {
    return new SurveillanceTask(
      description: new Description(dto.Description),
      code: dto.Code,
      userId: dto.UserId,
      emergencyNumber: new PhoneNumber(dto.EmergencyNumber),
      floorId: dto.FloorId,
      pickupRoomId: dto.PickupRoomId,
      deliveryRoomId: dto.DeliveryRoomId
    );
  }
}
