using System;
using GestaoTarefas.Domain.Shared;
using GestaoTarefas.Domain.TaskRequests;

namespace GestaoTarefas.Domain.Tasks;

public class DeliveryTaskMapper : ITaskMapper<DeliveryTask, DeliveryTaskDto>
{
  public DeliveryTaskDto ToDto(DeliveryTask task)
  {
    return new DeliveryTaskDto()
    {
      TaskRequestId = task.TaskRequestId.AsGuid(),
      ConfirmationCode = task.ConfirmationCode.Value,
      DeliveryRoomId = task.DeliveryRoomId.ToString(),
      Description = task.TaskDescription.Value,
      Id = task.Id.AsGuid(),
      Type = task.Type.ToString(),
      UserId = task.UserId.ToString(),
      PickupRoomId = task.PickupRoomId.ToString(),
      ReceiverContact = task.ReceiverContact.Value,
      ReceiverName = task.ReceiverName.Value,
      SenderContact = task.SenderContact.Value,
      SenderName = task.SenderName.Value,
      Status = task.Status.ToString()
    };
  }

  public DeliveryTask ToEntity(CreatingTaskDto dto)
  {
    try
    {
      return new DeliveryTask(
        taskRequestId: new TaskRequestId(dto.TaskRequestId),
        taskDescription: new TaskDescription(dto.Description),
        userId: new Guid(dto.UserId),
        senderName: new Name(dto.SenderName),
        receiverName: new Name(dto.ReceiverName),
        senderContact: new PhoneNumber(dto.SenderContact),
        receiverContact: new PhoneNumber(dto.ReceiverContact),
        confirmationCode: new ConfirmationCode(dto.ConfirmationCode),
        pickupRoomId: new Guid(dto.PickupRoomId),
        deliveryRoomId: new Guid(dto.DeliveryRoomId)
      );
    } catch (FormatException e)
    {
      throw new BusinessRuleValidationException(e.Message);
    }

  }
}
