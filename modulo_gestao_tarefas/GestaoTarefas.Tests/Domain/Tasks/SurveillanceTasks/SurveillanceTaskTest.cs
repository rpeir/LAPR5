using System;
using GestaoTarefas.Domain.Shared;
using GestaoTarefas.Domain.TaskRequests;
using GestaoTarefas.Domain.Tasks;
using GestaoTarefas.Domain.TaskTypes;
using JetBrains.Annotations;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace GestaoTarefas.Tests.Domain.Tasks.SurveillanceTasks;

[TestClass]
[TestSubject(typeof(SurveillanceTask))]
public class SurveillanceTaskTest
{
  private TaskRequestId _validTaskRequestId;
  private TaskDescription _validTaskDescription;
  private Guid _validUserId;
  private PhoneNumber _validEmergencyNumber;
  private Guid _validFloorId;
  private Guid _validPickupRoomId;
  private Guid _validDeliveryRoomId;
  private Guid _validRobotId;

  [TestInitialize]
  public void BeforeEach()
  {
    _validTaskRequestId = new TaskRequestId(Guid.NewGuid());
    _validTaskDescription = new TaskDescription("Valid task description");
    _validUserId = Guid.NewGuid();
    _validEmergencyNumber = new PhoneNumber("912345678");
    _validFloorId = Guid.NewGuid();
    _validPickupRoomId = Guid.NewGuid();
    _validDeliveryRoomId = Guid.NewGuid();
    _validRobotId = Guid.NewGuid();
  }

  [TestMethod]
  public void SurveillanceTask_Constructor_ValidArguments_ShouldCreateInstance()
  {
    // Act
    var surveillanceTask = new SurveillanceTask(
      taskRequestId: _validTaskRequestId,
      taskDescription: _validTaskDescription, userId: _validUserId,
      emergencyNumber: _validEmergencyNumber, floorId: _validFloorId,
      pickupRoomId: _validPickupRoomId, deliveryRoomId: _validDeliveryRoomId,
      robotId: _validRobotId
    );

    // Assert
    Assert.IsNotNull(surveillanceTask);
    Assert.AreEqual(_validTaskDescription, surveillanceTask.TaskDescription);
    Assert.AreEqual(_validUserId, surveillanceTask.UserId);
    Assert.AreEqual(_validPickupRoomId, surveillanceTask.PickupRoomId);
    Assert.AreEqual(_validDeliveryRoomId, surveillanceTask.DeliveryRoomId);
    Assert.AreEqual(_validEmergencyNumber, surveillanceTask.EmergencyNumber);
    Assert.AreEqual(_validFloorId, surveillanceTask.FloorId);
    Assert.AreEqual(Status.Pending, surveillanceTask.Status);
    Assert.AreEqual(TaskType.Surveillance, surveillanceTask.Type);
    Assert.AreEqual(_validRobotId, surveillanceTask.RobotId);
  }

  [TestMethod]
  [ExpectedException(typeof(BusinessRuleValidationException))]
  public void SurveillanceTask_Constructor_InvalidDescription_ShouldThrowBusinessRuleValidationException()
  {
    // Arrange
    const TaskDescription invalidTaskDescription = null;

    // Act
    var surveillanceTask = new SurveillanceTask(
      taskRequestId: _validTaskRequestId,
      taskDescription: invalidTaskDescription, userId: _validUserId,
      emergencyNumber: _validEmergencyNumber, floorId: _validFloorId,
      pickupRoomId: _validPickupRoomId, deliveryRoomId: _validDeliveryRoomId,
      robotId: _validRobotId
    );

    // Assert
    // Exception expected
  }

  [TestMethod]
  [ExpectedException(typeof(BusinessRuleValidationException))]
  public void SurveillanceTask_Constructor_InvalidUserId_ShouldThrowBusinessRuleValidationException()
  {
    // Arrange
    var invalidUserId = Guid.Empty;
    // Act
    var surveillanceTask = new SurveillanceTask(
      taskRequestId: _validTaskRequestId,
      taskDescription: _validTaskDescription, userId: invalidUserId,
      emergencyNumber: _validEmergencyNumber, floorId: _validFloorId,
      pickupRoomId: _validPickupRoomId, deliveryRoomId: _validDeliveryRoomId,
      robotId: _validRobotId
    );

    // Assert
    // Exception expected
  }

  [TestMethod]
  [ExpectedException(typeof(BusinessRuleValidationException))]
  public void SurveillanceTask_Constructor_InvalidPickupRoom_ShouldThrowBusinessRuleValidationException()
  {
    // Arrange
    var invalidPickupRoom = Guid.Empty;
    // Act
    var surveillanceTask = new SurveillanceTask(
      taskRequestId: _validTaskRequestId,
      taskDescription: _validTaskDescription, userId: _validUserId,
      emergencyNumber: _validEmergencyNumber, floorId: _validFloorId,
      pickupRoomId: invalidPickupRoom, deliveryRoomId: _validDeliveryRoomId,
      robotId: _validRobotId
    );

    // Assert
    // Exception expected
  }

  [TestMethod]
  [ExpectedException(typeof(BusinessRuleValidationException))]
  public void SurveillanceTask_Constructor_InvalidDeliveryRoom_ShouldThrowBusinessRuleValidationException()
  {
    // Arrange
    var invalidDeliveryRoom = Guid.Empty;
    // Act
    var surveillanceTask = new SurveillanceTask(
      taskRequestId: _validTaskRequestId,
      taskDescription: _validTaskDescription, userId: _validUserId,
      emergencyNumber: _validEmergencyNumber, floorId: _validFloorId,
      pickupRoomId: _validPickupRoomId, deliveryRoomId: invalidDeliveryRoom,
      robotId: _validRobotId
    );

    // Assert
    // Exception expected
  }

  [TestMethod]
  [ExpectedException(typeof(BusinessRuleValidationException))]
  public void SurveillanceTask_Constructor_InvalidFloorId_ShouldThrowBusinessRuleValidationException()
  {
    // Arrange
    var invalidFloorId = Guid.Empty;
    // Act
    var surveillanceTask = new SurveillanceTask(
      taskRequestId: _validTaskRequestId,
      taskDescription: _validTaskDescription, userId: _validUserId,
      emergencyNumber: _validEmergencyNumber, floorId: invalidFloorId,
      pickupRoomId: _validPickupRoomId, deliveryRoomId: _validDeliveryRoomId,
      robotId: _validRobotId
    );

    // Assert
    // Exception expected
  }

  [TestMethod]
  [ExpectedException(typeof(BusinessRuleValidationException))]
  public void SurveillanceTask_Constructor_InvalidEmergencyNumber_ShouldThrowBusinessRuleValidationException()
  {
    // Arrange
    const PhoneNumber invalidEmergencyNumber = null;
    // Act
    var surveillanceTask = new SurveillanceTask(
      taskRequestId: _validTaskRequestId,
      taskDescription: _validTaskDescription, userId: _validUserId,
      emergencyNumber: invalidEmergencyNumber, floorId: _validFloorId,
      pickupRoomId: _validPickupRoomId, deliveryRoomId: _validDeliveryRoomId,
      robotId: _validRobotId
    );

    // Assert
    // Exception expected
  }

  [TestMethod]
  [ExpectedException(typeof(BusinessRuleValidationException))]
  public void SurveillanceTask_Constructor_InvalidRobotId_ShouldThrowBusinessRuleValidationException()
  {
    // Arrange
    var invalidRobotId = Guid.Empty;
    // Act
    var surveillanceTask = new SurveillanceTask(
      taskRequestId: _validTaskRequestId,
      taskDescription: _validTaskDescription, userId: _validUserId,
      emergencyNumber: _validEmergencyNumber, floorId: _validFloorId,
      pickupRoomId: _validPickupRoomId, deliveryRoomId: _validDeliveryRoomId,
      robotId: invalidRobotId
    );

    // Assert
    // Exception expected
  }

}
