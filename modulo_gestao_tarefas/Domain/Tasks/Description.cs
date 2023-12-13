using GestaoTarefas.Domain.Shared;

namespace GestaoTarefas.Domain.Tasks;

public class Description : IValueObject
{
  private const int MaxLength = 1000;

  public string Value { get; private set; }

  public Description(string description)
  {
    bool valueIsValid = description is {Length: < MaxLength};
    if (!valueIsValid)
      throw new BusinessRuleValidationException("Task description must be less than " + MaxLength + " characters");
    this.Value = description;
  }
}
