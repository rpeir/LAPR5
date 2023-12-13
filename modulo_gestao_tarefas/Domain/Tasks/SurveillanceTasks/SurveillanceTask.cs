using GestaoTarefas.Domain.Shared;

namespace GestaoTarefas.Domain.Tasks;

public class SurveillanceTask : Task
{
  public PhoneNumber EmergencyNumber { get; private set; }

  public string FloorId { get; private set; }

  public SurveillanceTask(Description description, string code, string userId, PhoneNumber emergencyNumber,
    string floorId, string pickupRoomId, string deliveryRoomId)
    : base(TaskType.Surveillance, description, code, userId, pickupRoomId, deliveryRoomId)
  {
    var guard = Validate(emergencyNumber: emergencyNumber, floorId: floorId);
    if (!guard.Succeeded)
      throw new BusinessRuleValidationException(guard.Message);

    this.EmergencyNumber = emergencyNumber;
    this.FloorId = floorId;
  }

  protected static IGuardResult Validate(PhoneNumber emergencyNumber, string floorId)
  {
    return Guard.AgainstNullOrUndefinedBulk(
      new GuardArgumentCollection()
      {
        new GuardArgument(emergencyNumber, nameof(emergencyNumber)),
        new GuardArgument(floorId, nameof(floorId))
      }
    );
  }
}
