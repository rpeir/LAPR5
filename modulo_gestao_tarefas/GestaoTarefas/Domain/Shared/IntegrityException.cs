using System;

namespace GestaoTarefas.Domain.Shared;

public class IntegrityException : Exception
{
  public string Details { get; }

  public IntegrityException(string message) : base(message)
  {

  }

  public IntegrityException(string message, string details) : base(message)
  {
    this.Details = details;
  }
}
