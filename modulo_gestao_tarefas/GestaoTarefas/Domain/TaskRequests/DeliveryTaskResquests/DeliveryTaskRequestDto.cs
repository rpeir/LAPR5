using Newtonsoft.Json;

namespace GestaoTarefas.Domain.TaskRequests;

public class DeliveryTaskRequestDto : TaskRequestDto
{
  [JsonProperty("senderName")]
  public string SenderName { get; set; }
  [JsonProperty("receiverName")]
  public string ReceiverName { get; set; }
  [JsonProperty("senderContact")]
  public string SenderContact { get; set; }
  [JsonProperty("receiverContact")]
  public string ReceiverContact { get; set; }
  [JsonProperty("confirmationCode")]
  public string ConfirmationCode { get; set; }

}
