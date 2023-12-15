using System;
using System.Collections.Generic;
using GestaoTarefas.Domain.Shared;
using GestaoTarefas.Domain.TaskTypes;

namespace GestaoTarefas.Domain.Tasks;

public class SurveillanceTask : Task
{
  public PhoneNumber EmergencyNumber { get; private set; }

  public Guid FloorId { get; private set; }

  public SurveillanceTask(TaskDescription taskDescription, Guid userId, PhoneNumber emergencyNumber,
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
    var guardNulls = Guard.AgainstNullOrUndefinedBulk(
      new GuardArgumentCollection()
      {
        new GuardArgument(emergencyNumber, nameof(emergencyNumber)),
        new GuardArgument(floorId, nameof(floorId))
      }
    );
    var guardEmptyGuids = Guard.Combine(
      new List<IGuardResult>()
      {
        Guard.IsTrue(!floorId.Equals(Guid.Empty), "FloorId is empty")
      }
    );
    return Guard.Combine(
      new List<IGuardResult>()
      {
        guardNulls,
        guardEmptyGuids
      }
    );
  }
}
