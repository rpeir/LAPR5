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
    switch (me.ToLower())
    {
      case "pending":
        return RequestStatus.Pending;
      case "approved":
        return RequestStatus.Approved;
      case "rejected":
        return RequestStatus.Rejected;
      default:
        throw new ArgumentException("Invalid Status Type");
    }
  }
}
