using System;
using GestaoTarefas.Domain.Shared;
using GestaoTarefas.Domain.Tasks;
using GestaoTarefas.Domain.TaskTypes;

namespace GestaoTarefas.Domain.TaskRequests;

public class DeliveryTaskRequest : TaskRequest
{
  public Name SenderName { get; private set; }
  public Name ReceiverName { get; private set; }
  public PhoneNumber SenderContact { get; private set; }
  public PhoneNumber ReceiverContact { get; private set; }
  public ConfirmationCode ConfirmationCode { get; private set; }

  public DeliveryTaskRequest(TaskDescription taskDescription, Guid userId,
    Name senderName, Name receiverName, PhoneNumber senderContact, PhoneNumber receiverContact,
    ConfirmationCode confirmationCode, Guid pickupRoomId, Guid deliveryRoomId)
    : base(TaskType.Delivery, taskDescription, userId, pickupRoomId, deliveryRoomId)
  {
    var guard = Validate(senderName: senderName, receiverName: receiverName, senderContact: senderContact,
      receiverContact: receiverContact, confirmationCode: confirmationCode);
    if (!guard.Succeeded)
      throw new BusinessRuleValidationException(guard.Message);
    this.SenderName = senderName;
    this.ReceiverName = receiverName;
    this.SenderContact = senderContact;
    this.ReceiverContact = receiverContact;
    this.ConfirmationCode = confirmationCode;
  }

  private static IGuardResult Validate(Name senderName, Name receiverName,
    PhoneNumber senderContact, PhoneNumber receiverContact, ConfirmationCode confirmationCode)
  {
    return Guard.AgainstNullOrUndefinedBulk(
      new GuardArgumentCollection()
      {
        new GuardArgument(senderName, nameof(senderName)),
        new GuardArgument(receiverName, nameof(receiverName)),
        new GuardArgument(senderContact, nameof(senderContact)),
        new GuardArgument(receiverContact, nameof(receiverContact)),
        new GuardArgument(confirmationCode, nameof(confirmationCode))
      }
    );
  }

  public override Task ToTask()
  {
    return new DeliveryTask(
      taskRequestId: this.Id,
      taskDescription: this.TaskDescription,
      userId: this.UserId,
      senderName: this.SenderName,
      receiverName: this.ReceiverName,
      senderContact: this.SenderContact,
      receiverContact: this.ReceiverContact,
      confirmationCode: this.ConfirmationCode,
      pickupRoomId: this.PickupRoomId,
      deliveryRoomId: this.DeliveryRoomId
    );
  }
}
