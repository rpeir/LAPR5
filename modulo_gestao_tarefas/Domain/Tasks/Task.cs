using System;
using GestaoTarefas.Domain.Shared;

namespace GestaoTarefas.Domain.Tasks
{
    public abstract class Task : Entity<TaskId>, IAggregateRoot
    {
        public string Code { get; private set; }
        public Description Description { get;  private set; }
        public TaskType Type { get; private set; }
        public string UserId { get; private set; }
        public Status Status { get; private set; }
        public string PickupRoomId { get; private set; }
        public string DeliveryRoomId { get; private set; }

        protected Task(TaskType type, Description description, string code,
          string userId, string pickupRoomId, string deliveryRoomId)
        {
          var guard = Validate(type, description, code, userId, pickupRoomId, deliveryRoomId);
          if (!guard.Succeeded)
            throw new BusinessRuleValidationException(guard.Message);

          this.Id = new TaskId(Guid.NewGuid());
          this.Type = type;
          this.Description = description;
          this.Code = code;
          this.UserId = userId;
          this.Status = Status.Pending;
          this.PickupRoomId = pickupRoomId;
          this.DeliveryRoomId = deliveryRoomId;
        }

        protected static IGuardResult Validate(TaskType type, Description description, string code,
          string userId, string pickupRoomId, string deliveryRoomId)
        {
          var guard = Guard.AgainstNullOrUndefinedBulk(
            new GuardArgumentCollection()
            {
              new GuardArgument(type, nameof(type)),
              new GuardArgument(description, nameof(description)),
              new GuardArgument(code, nameof(code)),
              new GuardArgument(userId, nameof(userId)),
              new GuardArgument(pickupRoomId, nameof(pickupRoomId)),
              new GuardArgument(deliveryRoomId, nameof(deliveryRoomId))
            }
          );
          return guard;
        }

    }

}
