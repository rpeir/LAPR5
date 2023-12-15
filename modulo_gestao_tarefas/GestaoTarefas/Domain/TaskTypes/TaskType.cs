using System;
using GestaoTarefas.Domain.Shared;

namespace GestaoTarefas.Domain.TaskTypes;

public enum TaskType
{
  Surveillance,
  Delivery
}

public static class TaskTypeHelper
{
  public static TaskType ToTaskType(this string me)
  {
    switch (me)
    {
      case "Surveillance":
        return TaskType.Surveillance;
      case "Delivery":
        return TaskType.Delivery;
      default:
        throw new ArgumentException("Invalid task type");
    }
  }

}
