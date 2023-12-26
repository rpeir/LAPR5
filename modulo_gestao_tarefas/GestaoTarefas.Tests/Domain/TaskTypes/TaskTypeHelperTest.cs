using System;
using GestaoTarefas.Domain.Shared;
using GestaoTarefas.Domain.TaskTypes;
using JetBrains.Annotations;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace GestaoTarefas.Tests.Domain.TaskTypes;

[TestClass]
[TestSubject(typeof(TaskTypeHelper))]
public class TaskTypeHelperTest
{

  [TestMethod]
  public void ToTaskType_ValidSurveillanceString_ShouldReturnSurveillanceTaskType()
  {
    // Arrange
    string surveillanceString = "Surveillance";

    // Act
    var taskType = surveillanceString.ToTaskType();

    // Assert
    Assert.AreEqual(TaskType.Surveillance, taskType);
  }

  [TestMethod]
  public void ToTaskType_ValidDeliveryString_ShouldReturnDeliveryTaskType()
  {
    // Arrange
    string deliveryString = "Delivery";

    // Act
    var taskType = deliveryString.ToTaskType();

    // Assert
    Assert.AreEqual(TaskType.Delivery, taskType);
  }

  [TestMethod]
  [ExpectedException(typeof(ArgumentException))]
  public void ToTaskType_InvalidString_ShouldThrowArgumentOutOfRangeException()
  {
    // Arrange
    string invalidString = "InvalidTaskType";

    // Act
    var taskType = invalidString.ToTaskType();

    // Assert
    // Exception expected
  }
}
