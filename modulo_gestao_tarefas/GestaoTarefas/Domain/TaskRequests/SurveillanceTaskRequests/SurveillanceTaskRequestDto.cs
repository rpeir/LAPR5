using Newtonsoft.Json;

namespace GestaoTarefas.Domain.TaskRequests;

public class SurveillanceTaskRequestDto : TaskRequestDto
{
  [JsonProperty("emergencyNumber")]
  public string EmergencyNumber { get; set; }

  [JsonProperty("floorId")]
  public string FloorId { get; set; }

}
