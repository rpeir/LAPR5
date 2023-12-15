using System;

namespace GestaoTarefas.Domain.TaskRequests;

public enum RequestStatus
{
  Pending,
  Approved,
  Rejected
}

public static class RequestStatusHelper
{
  public static RequestStatus ToStatus(this string me)
  {
    switch (me)
    {
      case "Pending":
        return RequestStatus.Pending;
      case "Approved":
        return RequestStatus.Approved;
      case "Rejected":
        return RequestStatus.Rejected;
      default:
        throw new ArgumentException("Invalid Status Type");
    }
  }
}
