using System;
using Newtonsoft.Json;

namespace GestaoTarefas.Domain.Tasks;

public abstract class TaskDto
{
  // General properties
  [JsonProperty("id")] public Guid ?Id { get; set; }
  [JsonProperty("description")] public string Description { get; set; }
  [JsonProperty("type")] public string Type { get; set; }
  [JsonProperty("userId")] public string UserId { get; set; }
  [JsonProperty("pickupRoomId")] public string PickupRoomId { get; set; }
  [JsonProperty("deliveryRoomId")] public string DeliveryRoomId { get; set; }
  [JsonProperty("status")] public string Status { get; set; }
  [JsonProperty("identificationCode")] public string IdentificationCode { get; set; }
  [JsonProperty("robotId")] public Guid RobotId { get; set; } = new Guid();

}
