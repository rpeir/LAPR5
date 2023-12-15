using System;
using GestaoTarefas.Domain.TaskRequests;
using JetBrains.Annotations;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace GestaoTarefas.Tests.Domain.TaskRequests;

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
    Assert.AreEqual(RequestStatus.Pending, status);
  }

  [TestMethod]
  public void ToStatus_ValidApprovedString_ShouldReturnDoneStatus()
  {
    // Arrange
    string doneString = "Approved";

    // Act
    var status = doneString.ToStatus();

    // Assert
    Assert.AreEqual(RequestStatus.Approved, status);
  }

  [TestMethod]
  public void ToStatus_ValidRejectedString_ShouldReturnDoneStatus()
  {
    // Arrange
    string doneString = "Rejected";

    // Act
    var status = doneString.ToStatus();

    // Assert
    Assert.AreEqual(RequestStatus.Rejected, status);
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
