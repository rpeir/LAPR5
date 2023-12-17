using System;
using GestaoTarefas.Domain.Shared;
using GestaoTarefas.Domain.TaskRequests;
using GestaoTarefas.Domain.TaskTypes;
using JetBrains.Annotations;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace GestaoTarefas.Tests.Domain.TaskRequests.SurveillanceTaskRequests;

[TestClass]
[TestSubject(typeof(SurveillanceTaskRequest))]
public class SurveillanceTaskRequestTest
{
    private TaskDescription _validTaskDescription;
    private Guid _validUserId;
    private PhoneNumber _validEmergencyNumber;
    private Guid _validFloorId;
    private Guid _validPickupRoomId;
    private Guid _validDeliveryRoomId;

    [TestInitialize]
    public void BeforeEach()
    {
        _validTaskDescription = new TaskDescription("Valid task description");
        _validUserId = Guid.NewGuid();
        _validEmergencyNumber = new PhoneNumber("912345678");
        _validFloorId = Guid.NewGuid();
        _validPickupRoomId = Guid.NewGuid();
        _validDeliveryRoomId = Guid.NewGuid();
    }

    [TestMethod]
    public void SurveillanceTaskRequest_Constructor_ValidArguments_ShouldCreateInstance()
    {
        // Act
        var surveillanceTask = new SurveillanceTaskRequest(
            taskDescription: _validTaskDescription, userId: _validUserId,
            emergencyNumber: _validEmergencyNumber, floorId: _validFloorId,
            pickupRoomId: _validPickupRoomId, deliveryRoomId: _validDeliveryRoomId
        );

        // Assert
        Assert.IsNotNull(surveillanceTask);
        Assert.AreEqual(_validTaskDescription, surveillanceTask.TaskDescription);
        Assert.AreEqual(_validUserId, surveillanceTask.UserId);
        Assert.AreEqual(_validPickupRoomId, surveillanceTask.PickupRoomId);
        Assert.AreEqual(_validDeliveryRoomId, surveillanceTask.DeliveryRoomId);
        Assert.AreEqual(_validEmergencyNumber, surveillanceTask.EmergencyNumber);
        Assert.AreEqual(_validFloorId, surveillanceTask.FloorId);
        Assert.AreEqual(RequestStatus.Pending, surveillanceTask.RequestStatus);
        Assert.AreEqual(TaskType.Surveillance, surveillanceTask.Type);
    }

    [TestMethod]
    [ExpectedException(typeof(BusinessRuleValidationException))]
    public void SurveillanceTaskRequest_Constructor_InvalidDescription_ShouldThrowBusinessRuleValidationException()
    {
      // Arrange
      const TaskDescription invalidTaskDescription = null;

      // Act
      var surveillanceTask = new SurveillanceTaskRequest(
        taskDescription: invalidTaskDescription, userId: _validUserId,
        emergencyNumber: _validEmergencyNumber, floorId: _validFloorId,
        pickupRoomId: _validPickupRoomId, deliveryRoomId: _validDeliveryRoomId
      );

      // Assert
      // Exception expected
    }

    [TestMethod]
    [ExpectedException(typeof(BusinessRuleValidationException))]
    public void SurveillanceTaskRequest_Constructor_InvalidUserId_ShouldThrowBusinessRuleValidationException()
    {
      // Arrange
      var invalidUserId = Guid.Empty;
      // Act
      var surveillanceTask = new SurveillanceTaskRequest(
        taskDescription: _validTaskDescription, userId: invalidUserId,
        emergencyNumber: _validEmergencyNumber, floorId: _validFloorId,
        pickupRoomId: _validPickupRoomId, deliveryRoomId: _validDeliveryRoomId
      );

      // Assert
      // Exception expected
    }

    [TestMethod]
    [ExpectedException(typeof(BusinessRuleValidationException))]
    public void SurveillanceTaskRequest_Constructor_InvalidPickupRoom_ShouldThrowBusinessRuleValidationException()
    {
      // Arrange
      var invalidPickupRoom = Guid.Empty;
      // Act
      var surveillanceTask = new SurveillanceTaskRequest(
        taskDescription: _validTaskDescription, userId: _validUserId,
        emergencyNumber: _validEmergencyNumber, floorId: _validFloorId,
        pickupRoomId: invalidPickupRoom, deliveryRoomId: _validDeliveryRoomId
      );

      // Assert
      // Exception expected
    }

    [TestMethod]
    [ExpectedException(typeof(BusinessRuleValidationException))]
    public void SurveillanceTaskRequest_Constructor_InvalidDeliveryRoom_ShouldThrowBusinessRuleValidationException()
    {
      // Arrange
      var invalidDeliveryRoom = Guid.Empty;
      // Act
      var surveillanceTask = new SurveillanceTaskRequest(
        taskDescription: _validTaskDescription, userId: _validUserId,
        emergencyNumber: _validEmergencyNumber, floorId: _validFloorId,
        pickupRoomId: _validPickupRoomId, deliveryRoomId: invalidDeliveryRoom
      );

      // Assert
      // Exception expected
    }

    [TestMethod]
    [ExpectedException(typeof(BusinessRuleValidationException))]
    public void SurveillanceTaskRequest_Constructor_InvalidFloorId_ShouldThrowBusinessRuleValidationException()
    {
      // Arrange
      var invalidFloorId = Guid.Empty;
      // Act
      var surveillanceTask = new SurveillanceTaskRequest(
        taskDescription: _validTaskDescription, userId: _validUserId,
        emergencyNumber: _validEmergencyNumber, floorId: invalidFloorId,
        pickupRoomId: _validPickupRoomId, deliveryRoomId: _validDeliveryRoomId
      );

      // Assert
      // Exception expected
    }

    [TestMethod]
    [ExpectedException(typeof(BusinessRuleValidationException))]
    public void SurveillanceTaskRequest_Constructor_InvalidEmergencyNumber_ShouldThrowBusinessRuleValidationException()
    {
      // Arrange
      const PhoneNumber invalidEmergencyNumber = null;
      // Act
      var surveillanceTask = new SurveillanceTaskRequest(
        taskDescription: _validTaskDescription, userId: _validUserId,
        emergencyNumber: invalidEmergencyNumber, floorId: _validFloorId,
        pickupRoomId: _validPickupRoomId, deliveryRoomId: _validDeliveryRoomId
      );

      // Assert
      // Exception expected
    }

      [TestMethod]
  public void SurveillanceTaskRequest_Approve_IsValidIfPending()
  {
    // Arrange
    var task = new SurveillanceTaskRequest(
      taskDescription: _validTaskDescription, userId: _validUserId,
      emergencyNumber: _validEmergencyNumber, floorId: _validFloorId,
      pickupRoomId: _validPickupRoomId, deliveryRoomId: _validDeliveryRoomId
    );
    Assert.AreEqual(task.RequestStatus, RequestStatus.Pending);

    // Act
    task.Approve();

    // Assert
    Assert.AreEqual(task.RequestStatus, RequestStatus.Approved);
  }

  [TestMethod]
  [ExpectedException(typeof(BusinessRuleValidationException))]
  public void SurveillanceTaskRequest_Approve_IsNotValidIfRejected()
  {
    // Arrange
    var surveillanceTask = new SurveillanceTaskRequest(
      taskDescription: _validTaskDescription, userId: _validUserId,
      emergencyNumber: _validEmergencyNumber, floorId: _validFloorId,
      pickupRoomId: _validPickupRoomId, deliveryRoomId: _validDeliveryRoomId
    );
    surveillanceTask.Reject();
    Assert.AreEqual(surveillanceTask.RequestStatus, RequestStatus.Rejected);

    // Act
    surveillanceTask.Approve();

    // Assert
    // Exception expected
  }

  [TestMethod]
  [ExpectedException(typeof(BusinessRuleValidationException))]
  public void SurveillanceTaskRequest_Approve_IsNotValidIfAlreadyApproved()
  {
    // Arrange
    var surveillanceTask = new SurveillanceTaskRequest(
      taskDescription: _validTaskDescription, userId: _validUserId,
      emergencyNumber: _validEmergencyNumber, floorId: _validFloorId,
      pickupRoomId: _validPickupRoomId, deliveryRoomId: _validDeliveryRoomId
    );
    surveillanceTask.Approve();
    Assert.AreEqual(surveillanceTask.RequestStatus, RequestStatus.Approved);

    // Act
    surveillanceTask.Approve();

    // Assert
    // Exception expected
  }

    [TestMethod]
  public void SurveillanceTaskRequest_Reject_IsValidIfPending()
  {
    // Arrange
    var surveillanceTask = new SurveillanceTaskRequest(
      taskDescription: _validTaskDescription, userId: _validUserId,
      emergencyNumber: _validEmergencyNumber, floorId: _validFloorId,
      pickupRoomId: _validPickupRoomId, deliveryRoomId: _validDeliveryRoomId
    );
    Assert.AreEqual(surveillanceTask.RequestStatus, RequestStatus.Pending);

    // Act
    surveillanceTask.Reject();

    // Assert
    Assert.AreEqual(surveillanceTask.RequestStatus, RequestStatus.Rejected);
  }

  [TestMethod]
  [ExpectedException(typeof(BusinessRuleValidationException))]
  public void SurveillanceTaskRequest_Rejected_IsNotValidIfAlreadyRejected()
  {
    // Arrange
    var surveillanceTask = new SurveillanceTaskRequest(
      taskDescription: _validTaskDescription, userId: _validUserId,
      emergencyNumber: _validEmergencyNumber, floorId: _validFloorId,
      pickupRoomId: _validPickupRoomId, deliveryRoomId: _validDeliveryRoomId
    );
    surveillanceTask.Reject();
    Assert.AreEqual(surveillanceTask.RequestStatus, RequestStatus.Rejected);

    // Act
    surveillanceTask.Reject();

    // Assert
    // Exception expected
  }

  [TestMethod]
  [ExpectedException(typeof(BusinessRuleValidationException))]
  public void SurveillanceTaskRequest_Rejected_IsNotValidIfApproved()
  {
    // Arrange
    var surveillanceTask = new SurveillanceTaskRequest(
      taskDescription: _validTaskDescription, userId: _validUserId,
      emergencyNumber: _validEmergencyNumber, floorId: _validFloorId,
      pickupRoomId: _validPickupRoomId, deliveryRoomId: _validDeliveryRoomId
    );
    surveillanceTask.Approve();
    Assert.AreEqual(surveillanceTask.RequestStatus, RequestStatus.Approved);

    // Act
    surveillanceTask.Reject();

    // Assert
    // Exception expected
  }

}
