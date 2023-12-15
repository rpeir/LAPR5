namespace GestaoTarefas.Domain.Tasks;

public class DeliveryTaskDto : TaskDto
{
  public string SenderName { get; set; }
  public string ReceiverName { get; set; }
  public string SenderContact { get; set; }
  public string ReceiverContact { get; set; }
  public string ConfirmationCode { get; set; }

}
