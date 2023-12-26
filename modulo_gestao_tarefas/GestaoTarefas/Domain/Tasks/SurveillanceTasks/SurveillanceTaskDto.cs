using Newtonsoft.Json;

namespace GestaoTarefas.Domain.Tasks;

public class SurveillanceTaskDto : TaskDto
{
  [JsonProperty("emergencyNumber")]
  public string EmergencyNumber { get; set; }

  [JsonProperty("floorId")]
  public string FloorId { get; set; }

}
