namespace GestaoTarefas.Domain.Shared;

public class Name : IValueObject
{

  public string Value { get; private set; }

  public Name(string value)
  {
    bool valueIsValid = value != null;
    if (!valueIsValid)
      throw new BusinessRuleValidationException("Name must not be null");
    this.Value = value;
  }
}
