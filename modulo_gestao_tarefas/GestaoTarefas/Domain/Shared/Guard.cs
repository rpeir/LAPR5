using System;
using System.Collections.Generic;

namespace GestaoTarefas.Domain.Shared
{

  public interface IGuardResult
  {
    bool Succeeded { get; }
    string Message { get; }
  }

  public interface IGuardArgument
  {
    object Argument { get; }
    string ArgumentName { get; }
  }

  public class GuardArgumentCollection : List<IGuardArgument> { }

  public class Guard
  {
    public static IGuardResult Combine(List<IGuardResult> guardResults)
    {
      foreach (var result in guardResults)
      {
        if (!result.Succeeded) return result;
      }

      return new GuardResult(true);
    }

    public static IGuardResult AgainstNullOrUndefined(object argument, string argumentName)
    {
      if (argument == null || argument.Equals(default))
      {
        return new GuardResult(false, $"{argumentName} is null or undefined");
      }
      else
      {
        return new GuardResult(true);
      }
    }

    public static IGuardResult AgainstNullOrUndefinedBulk(GuardArgumentCollection args)
    {
      foreach (var arg in args)
      {
        var result = AgainstNullOrUndefined(arg.Argument, arg.ArgumentName);
        if (!result.Succeeded) return result;
      }

      return new GuardResult(true);
    }

    public static IGuardResult IsOneOf(object value, object[] validValues, string argumentName)
    {
      if (Array.Exists(validValues, validValue => value.Equals(validValue)))
      {
        return new GuardResult(true);
      }
      else
      {
        return new GuardResult(false, $"{argumentName} isn't one of the correct types in {string.Join(", ", validValues)}. Got \"{value}\".");
      }
    }

    public static IGuardResult InRange(int num, int min, int max, string argumentName)
    {
      var isInRange = num >= min && num <= max;
      if (!isInRange)
      {
        return new GuardResult(false, $"{argumentName} is not within range {min} to {max}.");
      }
      else
      {
        return new GuardResult(true);
      }
    }

    public static IGuardResult AllInRange(int[] numbers, int min, int max, string argumentName)
    {
      foreach (var num in numbers)
      {
        var numIsInRangeResult = InRange(num, min, max, argumentName);
        if (!numIsInRangeResult.Succeeded) return numIsInRangeResult;
      }

      return new GuardResult(true);
    }

    public static IGuardResult AgainstNullOrValueObject(object value, string argumentName)
    {
      if (value == null || value.Equals(default))
      {
        return new GuardResult(false, $"{argumentName} is null or undefined");
      }
      else if (!(value is IValueObject))
      {
        return new GuardResult(false, $"{argumentName} is not a valid value object.");
      }
      else
      {
        return new GuardResult(true);
      }
    }

    public static IGuardResult IsTrue(bool value, string message)
    {
      if (value)
      {
        return new GuardResult(true);
      }

      return new GuardResult(false, message);
    }

    public static IGuardResult AgainstNullOrUndefinedOrWhiteSpace(string argument, string argumentName)
    {
      if (string.IsNullOrWhiteSpace(argument))
      {
        return new GuardResult(false, $"{argumentName} is null, undefined, or whitespace");
      }
      else
      {
        return new GuardResult(true);
      }
    }
  }

  public class GuardResult : IGuardResult
  {
    public bool Succeeded { get; }
    public string Message { get; }

    public GuardResult(bool succeeded, string message = null)
    {
      Succeeded = succeeded;
      Message = message;
    }
  }

  public class GuardArgument : IGuardArgument
  {
    public object Argument { get; }
    public string ArgumentName { get; }

    public GuardArgument(object argument, string argumentName)
    {
      Argument = argument;
      ArgumentName = argumentName;
    }
  }
}
