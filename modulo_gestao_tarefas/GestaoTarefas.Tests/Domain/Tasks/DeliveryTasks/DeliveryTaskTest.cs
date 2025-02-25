using System;
using GestaoTarefas.Domain.Shared;
using GestaoTarefas.Domain.TaskRequests;
using GestaoTarefas.Domain.Tasks;
using GestaoTarefas.Domain.TaskTypes;
using JetBrains.Annotations;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace GestaoTarefas.Tests.Domain.Tasks.DeliveryTasks;

[TestClass]
[TestSubject(typeof(DeliveryTask))]
public class DeliveryTaskTest
{

  private IdentificationCode _validIdentificationCode;
  private TaskDescription _validTaskDescription;
  private Guid _validUserId;
  private Name _validSenderName;
  private Name _validReceiverName;
  private PhoneNumber _validSenderContact;
  private PhoneNumber _validReceiverContact;
  private ConfirmationCode _validConfirmationCode;
  private Guid _validPickupRoomId;
  private Guid _validDeliveryRoomId;
  private Guid _validRobotId;

  [TestInitialize]
  public void BeforeEach()
  {
    _validIdentificationCode = new IdentificationCode("ID123456789");
    _validTaskDescription = new TaskDescription("Valid task description");
    _validUserId = Guid.NewGuid();
    _validSenderName = new Name("John Sender");
    _validReceiverName = new Name("Jane Receiver");
    _validSenderContact = new PhoneNumber("912345678");
    _validReceiverContact = new PhoneNumber("987654321");
    _validConfirmationCode = new ConfirmationCode("12345");
    _validPickupRoomId = Guid.NewGuid();
    _validDeliveryRoomId = Guid.NewGuid();
    _validRobotId = Guid.NewGuid();
  }

  [TestMethod]
  public void DeliveryTask_Constructor_ValidArguments_ShouldCreateInstance()
  {
    // Act
    var deliveryTask = new DeliveryTask(
      identificationCode: _validIdentificationCode,
      taskDescription: _validTaskDescription, userId: _validUserId,
      senderName: _validSenderName, receiverName: _validReceiverName,
      senderContact: _validSenderContact, receiverContact: _validReceiverContact,
      confirmationCode: _validConfirmationCode, pickupRoomId: _validPickupRoomId,
      deliveryRoomId: _validDeliveryRoomId, robotId: _validRobotId
    );

    // Assert
    Assert.IsNotNull(deliveryTask);
    Assert.AreEqual(TaskType.Delivery, deliveryTask.Type);
    Assert.AreEqual(_validTaskDescription, deliveryTask.TaskDescription);
    Assert.AreEqual(_validUserId, deliveryTask.UserId);
    Assert.AreEqual(_validPickupRoomId, deliveryTask.PickupRoomId);
    Assert.AreEqual(_validDeliveryRoomId, deliveryTask.DeliveryRoomId);
    Assert.AreEqual(_validSenderName, deliveryTask.SenderName);
    Assert.AreEqual(_validReceiverName, deliveryTask.ReceiverName);
    Assert.AreEqual(_validSenderContact, deliveryTask.SenderContact);
    Assert.AreEqual(_validReceiverContact, deliveryTask.ReceiverContact);
    Assert.AreEqual(_validConfirmationCode, deliveryTask.ConfirmationCode);
    Assert.AreEqual(Status.Pending, deliveryTask.Status);
    Assert.AreEqual(TaskType.Delivery, deliveryTask.Type);
    Assert.AreEqual(_validRobotId, deliveryTask.RobotId);
  }

  [TestMethod]
  [ExpectedException(typeof(BusinessRuleValidationException))]
  public void DeliveryTask_Constructor_InvalidDescription_ShouldThrowBusinessRuleValidationException()
  {
    // Arrange
    const TaskDescription invalidTaskDescription = null;

    // Act
    var deliveryTask = new DeliveryTask(
      identificationCode: _validIdentificationCode,
      taskDescription: invalidTaskDescription, userId: _validUserId,
      senderName: _validSenderName, receiverName: _validReceiverName,
      senderContact: _validSenderContact, receiverContact: _validReceiverContact,
      confirmationCode: _validConfirmationCode, pickupRoomId: _validPickupRoomId,
      deliveryRoomId: _validDeliveryRoomId, robotId: _validRobotId
    );

    // Assert
    // Exception expected
  }

  [TestMethod]
  [ExpectedException(typeof(BusinessRuleValidationException))]
  public void DeliveryTask_Constructor_InvalidUserId_ShouldThrowBusinessRuleValidationException()
  {
    // Arrange
    var invalidUserId = Guid.Empty;
    // Act
    var deliveryTask = new DeliveryTask(
      identificationCode: _validIdentificationCode,
      taskDescription: _validTaskDescription, userId: invalidUserId,
      senderName: _validSenderName, receiverName: _validReceiverName,
      senderContact: _validSenderContact, receiverContact: _validReceiverContact,
      confirmationCode: _validConfirmationCode, pickupRoomId: _validPickupRoomId,
      deliveryRoomId: _validDeliveryRoomId, robotId: _validRobotId
    );

    // Assert
    // Exception expected
  }

  [TestMethod]
  [ExpectedException(typeof(BusinessRuleValidationException))]
  public void DeliveryTask_Constructor_InvalidSenderName_ShouldThrowBusinessRuleValidationException()
  {
    // Arrange
    const Name invalidSenderName = null;
    // Act
    var deliveryTask = new DeliveryTask(
      identificationCode: _validIdentificationCode,
      taskDescription: _validTaskDescription, userId: _validUserId,
      senderName: invalidSenderName, receiverName: _validReceiverName,
      senderContact: _validSenderContact, receiverContact: _validReceiverContact,
      confirmationCode: _validConfirmationCode, pickupRoomId: _validPickupRoomId,
      deliveryRoomId: _validDeliveryRoomId, robotId: _validRobotId
    );

    // Assert
    // Exception expected
  }

  [TestMethod]
  [ExpectedException(typeof(BusinessRuleValidationException))]
  public void DeliveryTask_Constructor_InvalidReceiverName_ShouldThrowBusinessRuleValidationException()
  {
    // Arrange
    const Name invalidReceiverName = null;
    // Act
    var deliveryTask = new DeliveryTask(
      identificationCode: _validIdentificationCode,
      taskDescription: _validTaskDescription, userId: _validUserId,
      senderName: _validSenderName, receiverName: invalidReceiverName,
      senderContact: _validSenderContact, receiverContact: _validReceiverContact,
      confirmationCode: _validConfirmationCode, pickupRoomId: _validPickupRoomId,
      deliveryRoomId: _validDeliveryRoomId, robotId: _validRobotId
    );

    // Assert
    // Exception expected
  }

  [TestMethod]
  [ExpectedException(typeof(BusinessRuleValidationException))]
  public void DeliveryTask_Constructor_InvalidSenderContact_ShouldThrowBusinessRuleValidationException()
  {
    // Arrange
    const PhoneNumber invalidSenderContact = null;
    // Act
    var deliveryTask = new DeliveryTask(
      identificationCode: _validIdentificationCode,
      taskDescription: _validTaskDescription, userId: _validUserId,
      senderName: _validSenderName, receiverName: _validReceiverName,
      senderContact: invalidSenderContact, receiverContact: _validReceiverContact,
      confirmationCode: _validConfirmationCode, pickupRoomId: _validPickupRoomId,
      deliveryRoomId: _validDeliveryRoomId, robotId: _validRobotId
    );

    // Assert
    // Exception expected
  }

  [TestMethod]
  [ExpectedException(typeof(BusinessRuleValidationException))]
  public void DeliveryTask_Constructor_InvalidReceiverContact_ShouldThrowBusinessRuleValidationException()
  {
    // Arrange
    const PhoneNumber invalidReceiverContact = null;
    // Act
    var deliveryTask = new DeliveryTask(
      identificationCode: _validIdentificationCode,
      taskDescription: _validTaskDescription, userId: _validUserId,
      senderName: _validSenderName, receiverName: _validReceiverName,
      senderContact: _validSenderContact, receiverContact: invalidReceiverContact,
      confirmationCode: _validConfirmationCode, pickupRoomId: _validPickupRoomId,
      deliveryRoomId: _validDeliveryRoomId, robotId: _validRobotId
    );

    // Assert
    // Exception expected
  }

  [TestMethod]
  [ExpectedException(typeof(BusinessRuleValidationException))]
  public void DeliveryTask_Constructor_InvalidConfirmationCode_ShouldThrowBusinessRuleValidationException()
  {
    // Arrange
    const ConfirmationCode invalidConfirmationCode = null;
    // Act
    var deliveryTask = new DeliveryTask(
      identificationCode: _validIdentificationCode,
      taskDescription: _validTaskDescription, userId: _validUserId,
      senderName: _validSenderName, receiverName: _validReceiverName,
      senderContact: _validSenderContact, receiverContact: _validReceiverContact,
      confirmationCode: invalidConfirmationCode, pickupRoomId: _validPickupRoomId,
      deliveryRoomId: _validDeliveryRoomId, robotId: _validRobotId
    );

    // Assert
    // Exception expected
  }

  [TestMethod]
  [ExpectedException(typeof(BusinessRuleValidationException))]
  public void DeliveryTask_Constructor_InvalidPickupRoom_ShouldThrowBusinessRuleValidationException()
  {
    // Arrange
    var invalidPickupRoom = Guid.Empty;
    // Act
    var deliveryTask = new DeliveryTask(
      identificationCode: _validIdentificationCode,
      taskDescription: _validTaskDescription, userId: _validUserId,
      senderName: _validSenderName, receiverName: _validReceiverName,
      senderContact: _validSenderContact, receiverContact: _validReceiverContact,
      confirmationCode: _validConfirmationCode, pickupRoomId: invalidPickupRoom,
      deliveryRoomId: _validDeliveryRoomId, robotId: _validRobotId
    );

    // Assert
    // Exception expected
  }

  [TestMethod]
  [ExpectedException(typeof(BusinessRuleValidationException))]
  public void DeliveryTask_Constructor_InvalidDeliveryRoom_ShouldThrowBusinessRuleValidationException()
  {
    // Arrange
    var invalidDeliveryRoom = Guid.Empty;
    // Act
    var deliveryTask = new DeliveryTask(
      identificationCode: _validIdentificationCode,
      taskDescription: _validTaskDescription, userId: _validUserId,
      senderName: _validSenderName, receiverName: _validReceiverName,
      senderContact: _validSenderContact, receiverContact: _validReceiverContact,
      confirmationCode: _validConfirmationCode, pickupRoomId: _validPickupRoomId,
      deliveryRoomId: invalidDeliveryRoom, robotId: _validRobotId
    );

    // Assert
    // Exception expected
  }

  [TestMethod]
  [ExpectedException(typeof(BusinessRuleValidationException))]
  public void DeliveryTask_Constructor_InvalidRobotId_ShouldThrowBusinessRuleValidationException()
  {
    // Arrange
    var invalidRobotId = Guid.Empty;
    // Act
    var deliveryTask = new DeliveryTask(
      identificationCode: _validIdentificationCode,
      taskDescription: _validTaskDescription, userId: _validUserId,
      senderName: _validSenderName, receiverName: _validReceiverName,
      senderContact: _validSenderContact, receiverContact: _validReceiverContact,
      confirmationCode: _validConfirmationCode, pickupRoomId: _validPickupRoomId,
      deliveryRoomId: _validDeliveryRoomId, robotId: invalidRobotId
    );

    // Assert
    // Exception expected
  }
}
