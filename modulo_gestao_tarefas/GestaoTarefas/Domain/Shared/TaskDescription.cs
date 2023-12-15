namespace GestaoTarefas.Domain.Shared;

public class TaskDescription : IValueObject
{
  private const int MaxLength = 1000;

  public string Value { get; private set; }

  public TaskDescription(string description)
  {
    if (description == null)
      throw new BusinessRuleValidationException("Task description must not be null");
    description = description.Trim();
    bool valueIsValid = description is {Length: <= MaxLength and > 0};
    if (!valueIsValid)
      throw new BusinessRuleValidationException("Task description must be less than " + MaxLength + " characters");
    this.Value = description;
  }
}
