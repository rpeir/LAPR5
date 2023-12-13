using GestaoTarefas.Domain.Shared;

namespace GestaoTarefas.Domain.Tasks;

public class DeliveryTask : Task
{
  public string SenderName { get; private set; }
  public string ReceiverName { get; private set; }
  public PhoneNumber SenderContact { get; private set; }
  public PhoneNumber ReceiverContact { get; private set; }
  public ConfirmationCode ConfirmationCode { get; private set; }

  public DeliveryTask(Description description, string code, string userId,
    string senderName, string receiverName, PhoneNumber senderContact, PhoneNumber receiverContact,
    ConfirmationCode confirmationCode, string pickupRoomId, string deliveryRoomId)
    : base(TaskType.Delivery, description, code, userId, pickupRoomId, deliveryRoomId)
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

  protected static IGuardResult Validate(string senderName, string receiverName,
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
}
