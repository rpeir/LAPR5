using System;
using System.Collections.Generic;
using GestaoTarefas.Domain.Shared;
using GestaoTarefas.Domain.Tasks;
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

  private static IGuardResult Validate(PhoneNumber emergencyNumber, Guid floorId)
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

  public override Task ToTask()
  {
    return new SurveillanceTask(
      taskRequestId: this.Id,
      taskDescription: this.TaskDescription,
      userId: this.UserId,
      emergencyNumber: this.EmergencyNumber,
      floorId: this.FloorId,
      pickupRoomId: this.PickupRoomId,
      deliveryRoomId: this.DeliveryRoomId
    );
  }
}
