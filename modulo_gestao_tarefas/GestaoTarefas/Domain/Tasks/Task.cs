using System;
using System.Collections.Generic;
using GestaoTarefas.Domain.Shared;
using GestaoTarefas.Domain.TaskRequests;
using GestaoTarefas.Domain.TaskTypes;

namespace GestaoTarefas.Domain.Tasks
{
    public abstract class Task : Entity<TaskId>, IAggregateRoot
    {
        public TaskDescription TaskDescription { get;  private set; }
        public TaskType Type { get; private set; }
        public Guid UserId { get; private set; }
        public Status Status { get; private set; }
        public Guid PickupRoomId { get; private set; }
        public Guid DeliveryRoomId { get; private set; }
        public Guid RobotId { get ; private set; }
        public IdentificationCode IdentificationCode { get; private set; }

        protected Task(IdentificationCode identificationCode,TaskType type, TaskDescription taskDescription,
          Guid userId, Guid pickupRoomId, Guid deliveryRoomId, Guid robotId)
        {
          var guard = Validate(identificationCode, type, taskDescription, userId, pickupRoomId, deliveryRoomId, robotId);
          if (!guard.Succeeded)
            throw new BusinessRuleValidationException(guard.Message);

          this.IdentificationCode = identificationCode;
          this.Id = new TaskId(Guid.NewGuid());
          this.Type = type;
          this.TaskDescription = taskDescription;
          this.UserId = userId;
          this.Status = Status.Pending;
          this.PickupRoomId = pickupRoomId;
          this.DeliveryRoomId = deliveryRoomId;
          this.RobotId = robotId;
        }

        private static IGuardResult Validate(IdentificationCode taskRequestId,TaskType type, TaskDescription taskDescription,
          Guid userId, Guid pickupRoomId, Guid deliveryRoomId, Guid robotId)
        {
          var guardNulls = Guard.AgainstNullOrUndefinedBulk(
            new GuardArgumentCollection()
            {
              new GuardArgument(taskRequestId, nameof(taskRequestId)),
              new GuardArgument(type, nameof(type)),
              new GuardArgument(taskDescription, nameof(taskDescription)),
              new GuardArgument(userId, nameof(userId)),
              new GuardArgument(pickupRoomId, nameof(pickupRoomId)),
              new GuardArgument(deliveryRoomId, nameof(deliveryRoomId)),
              new GuardArgument(robotId, nameof(robotId))
            }
          );
          var guardEmptyGuids = Guard.Combine(
            new List<IGuardResult>()
            {
              Guard.IsTrue(!userId.Equals(Guid.Empty), "UserId is empty"),
              Guard.IsTrue(!pickupRoomId.Equals(Guid.Empty), "PickupRoomId is empty"),
              Guard.IsTrue(!deliveryRoomId.Equals(Guid.Empty), "DeliveryRoomId is empty"),
              Guard.IsTrue(!robotId.Equals(Guid.Empty), "RobotId is empty")
            }
          );
          var guard = Guard.Combine(
            new List<IGuardResult>()
            {
              guardNulls,
              guardEmptyGuids
            }
          );

          return guard;
        }

    }

}
