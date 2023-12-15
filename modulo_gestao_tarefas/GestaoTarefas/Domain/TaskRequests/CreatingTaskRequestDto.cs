using GestaoTarefas.Domain.Tasks;

namespace GestaoTarefas.Domain.TaskRequests;

public class CreatingTaskRequestDto : TaskRequestDto
{
  // Surveillance properties
  public string EmergencyNumber { get; set; }
  public string FloorId { get; set; }

  // Delivery properties
  public string SenderName { get; set; }
  public string ReceiverName { get; set; }
  public string SenderContact { get; set; }
  public string ReceiverContact { get; set; }
  public string ConfirmationCode { get; set; }

}
