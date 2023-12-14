namespace GestaoTarefas.Domain.Shared;

public class TaskDescription : IValueObject
{
  private const int MaxLength = 1000;

  public string Value { get; private set; }

  public TaskDescription(string description)
  {
    bool valueIsValid = description is {Length: < MaxLength};
    if (!valueIsValid)
      throw new BusinessRuleValidationException("Task description must be less than " + MaxLength + " characters");
    this.Value = description;
  }
}
