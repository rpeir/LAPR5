using System;

namespace GestaoTarefas.Domain.TaskRequests;

public class TaskRequestDto
{
  // General properties
  public Guid ?Id { get; set; }
  public string Description { get; set; }
  public string Type { get; set; }
  public string UserId { get; set; }
  public string PickupRoomId { get; set; }
  public string DeliveryRoomId { get; set; }
  public string RequestStatus { get; set; }

}
