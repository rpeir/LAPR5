using System;
using GestaoTarefas.Domain.Tasks;
using JetBrains.Annotations;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace GestaoTarefas.Tests.Domain.Tasks;

[TestClass]
[TestSubject(typeof(RequestStatusHelper))]
public class RequestStatusHelperTest
{

  [TestMethod]
  public void ToStatus_ValidPendingString_ShouldReturnPendingStatus()
  {
    // Arrange
    string pendingString = "Pending";

    // Act
    var status = pendingString.ToStatus();

    // Assert
    Assert.AreEqual(Status.Pending, status);
  }

  [TestMethod]
  public void ToStatus_ValidDoneString_ShouldReturnDoneStatus()
  {
    // Arrange
    string doneString = "Done";

    // Act
    var status = doneString.ToStatus();

    // Assert
    Assert.AreEqual(Status.Done, status);
  }

  [TestMethod]
  [ExpectedException(typeof(ArgumentException))]
  public void ToStatus_InvalidString_ShouldThrowArgumentException()
  {
    // Arrange
    string invalidString = "InvalidStatus";

    // Act
    var status = invalidString.ToStatus();

    // Assert
    // Exception expected
  }
}
