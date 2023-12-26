namespace GestaoTarefas.Domain.Shared;

public class Name : IValueObject
{

  public string Value { get; private set; }

  public Name(string value)
  {
    if (value == null)
      throw new BusinessRuleValidationException("Name must not be null");
    value = value.Trim();
    if (value.Length < 1)
      throw new BusinessRuleValidationException("Must not be empty");
    this.Value = value;
  }
}
