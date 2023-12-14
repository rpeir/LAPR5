using System;
using GestaoTarefas.Domain.Shared;

namespace GestaoTarefas.Domain.TaskRequests;

public class DeliveryTaskRequestMapper : ITaskRequestMapper<DeliveryTaskRequest, DeliveryTaskRequestDto>
{
  public DeliveryTaskRequestDto ToDto(DeliveryTaskRequest task)
  {
    return new DeliveryTaskRequestDto()
    {
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
      RequestStatus = task.RequestStatus.ToString()
    };
  }

  public DeliveryTaskRequest ToEntity(CreatingTaskRequestDto dto)
  {
    try
    {
      return new DeliveryTaskRequest(
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
