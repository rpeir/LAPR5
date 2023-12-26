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
    switch (me.ToLower())
    {
      case "pending":
        return Status.Pending;
      case "done":
        return Status.Done;
      default:
        throw new ArgumentException("Invalid Status Type");
    }
  }
}
