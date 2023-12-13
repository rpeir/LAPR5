using System;

namespace GestaoTarefas.Domain.Tasks;

public class TaskDto
{
  // General properties
  public Guid ?Id { get; set; }
  public string Description { get; set; }
  public string Type { get; set; }
  public string UserId { get; set; }
  public string Code { get; set; }
  public string PickupRoomId { get; set; }
  public string DeliveryRoomId { get; set; }
  public string Status { get; set; }

}
