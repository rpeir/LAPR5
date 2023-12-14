using System;
using GestaoTarefas.Domain.Shared;
using GestaoTarefas.Domain.TaskTypes;

namespace GestaoTarefas.Domain.TaskRequests;

public class SurveillanceTaskRequest : TaskRequest
{
  public PhoneNumber EmergencyNumber { get; private set; }

  public Guid FloorId { get; private set; }

  public SurveillanceTaskRequest(TaskDescription taskDescription, Guid userId, PhoneNumber emergencyNumber,
    Guid floorId, Guid pickupRoomId, Guid deliveryRoomId)
    : base(TaskType.Surveillance, taskDescription, userId, pickupRoomId, deliveryRoomId)
  {
    var guard = Validate(emergencyNumber: emergencyNumber, floorId: floorId);
    if (!guard.Succeeded)
      throw new BusinessRuleValidationException(guard.Message);

    this.EmergencyNumber = emergencyNumber;
    this.FloorId = floorId;
  }

  protected static IGuardResult Validate(PhoneNumber emergencyNumber, Guid floorId)
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
