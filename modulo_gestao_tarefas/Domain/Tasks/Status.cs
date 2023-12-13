using System;

namespace GestaoTarefas.Domain.Tasks;

public enum Status
{
  Pending,
  Approved,
  Rejected
}

public static class StatusHelper
{
  public static Status ToStatus(this string me)
  {
    switch (me)
    {
      case "Pending":
        return Status.Pending;
      case "Approved":
        return Status.Approved;
      case "Rejected":
        return Status.Rejected;
      default:
        throw new ArgumentException("Invalid Status Type");
    }
  }
}
