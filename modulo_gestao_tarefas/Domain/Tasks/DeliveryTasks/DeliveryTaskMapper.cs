namespace GestaoTarefas.Domain.Tasks;

public class DeliveryTaskMapper : ITaskMapper<DeliveryTask, DeliveryTaskDto>
{
  public DeliveryTaskDto ToDto(DeliveryTask task)
  {
    return new DeliveryTaskDto()
    {
      Code = task.Code,
      ConfirmationCode = task.ConfirmationCode.Value.ToString(),
      DeliveryRoomId = task.DeliveryRoomId,
      Description = task.Description.Value,
      Id = task.Id.AsGuid(),
      Type = task.Type.ToString(),
      UserId = task.UserId,
      PickupRoomId = task.PickupRoomId,
      ReceiverContact = task.ReceiverContact.Value,
      ReceiverName = task.ReceiverName,
      SenderContact = task.SenderContact.Value,
      SenderName = task.SenderName,
      Status = task.Status.ToString()
    };
  }

  public DeliveryTask ToEntity(CreatingTaskDto dto)
  {
    return new DeliveryTask(
      description: new Description(dto.Description),
      code: dto.Code,
      userId: dto.UserId,
      senderName: dto.SenderName,
      receiverName: dto.ReceiverName,
      senderContact: new PhoneNumber(dto.SenderContact),
      receiverContact: new PhoneNumber(dto.ReceiverContact),
      confirmationCode: new ConfirmationCode(dto.ConfirmationCode),
      pickupRoomId: dto.PickupRoomId,
      deliveryRoomId: dto.DeliveryRoomId
    );
  }
}
