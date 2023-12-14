namespace GestaoTarefas.Domain.TaskRequests;

public class SurveillanceTaskRequestDto : TaskRequestDto
{
  public string EmergencyNumber { get; set; }

  public string FloorId { get; set; }

}
