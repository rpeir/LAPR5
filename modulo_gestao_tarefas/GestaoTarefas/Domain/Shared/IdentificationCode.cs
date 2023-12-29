namespace GestaoTarefas.Domain.Shared;

public class IdentificationCode : IValueObject
{
  public string Value { get; private set; }

  public IdentificationCode(string value)
  {
    var valueIsValid = value is { Length: >= 1 };
    if (!valueIsValid)
      throw new BusinessRuleValidationException("Identification Code must be a value with at least 1 character");
    this.Value = value;
  }
}
