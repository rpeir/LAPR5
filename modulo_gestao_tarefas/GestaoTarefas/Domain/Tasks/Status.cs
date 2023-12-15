using System;

namespace GestaoTarefas.Domain.Tasks;

public enum Status
{
  Pending,
  Done
}

public static class StatusHelper
{
  public static Status ToStatus(this string me)
  {
    switch (me)
    {
      case "Pending":
        return Status.Pending;
      case "Done":
        return Status.Done;
      default:
        throw new ArgumentException("Invalid Status Type");
    }
  }
}
