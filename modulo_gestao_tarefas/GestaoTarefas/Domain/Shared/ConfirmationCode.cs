namespace GestaoTarefas.Domain.Shared;

public class ConfirmationCode : IValueObject
{
  public string Value { get; private set; }

  public ConfirmationCode(string value)
  {
    var valueIsValid = value is { Length: > 4 and < 6 };
    if (!valueIsValid)
      throw new BusinessRuleValidationException("Confirmation Code must be a value between 4 and 6 digits");
    this.Value = value;
  }
}
