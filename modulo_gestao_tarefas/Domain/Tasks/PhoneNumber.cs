using GestaoTarefas.Domain.Shared;

namespace GestaoTarefas.Domain.Tasks;

public class PhoneNumber : IValueObject
{
  const int NUMBER_LENGHT = 9;

  public string Value { get; private set; }

  public PhoneNumber(string value)
  {
    if (value == null)
      throw new BusinessRuleValidationException("Phone number is null");
    bool hasNineDigits = value is {Length: NUMBER_LENGHT};
    bool isMobilePT = value.StartsWith("9");
    bool isLandlinePT = value.StartsWith("2");

    if (!hasNineDigits)
      throw new BusinessRuleValidationException("Phone number "+ value +" is not valid");

    if (!(isMobilePT || isLandlinePT))
      throw new BusinessRuleValidationException("Phone number " + value+" is not Portuguese");

    this.Value = value;
  }
}
