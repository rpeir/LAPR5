using GestaoTarefas.Domain.Shared;
using JetBrains.Annotations;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace GestaoTarefas.Tests.Domain.Shared;

[TestClass]
[TestSubject(typeof(PhoneNumber))]
public class PhoneNumberTests
{
  [TestMethod]
  public void ValidMobileNumber_ShouldCreateInstance()
  {
    // Arrange
    string validMobileNumber = "912345678";

    // Act
    var phoneNumber = new PhoneNumber(validMobileNumber);

    // Assert
    Assert.AreEqual(validMobileNumber, phoneNumber.Value);
  }

  [TestMethod]
  public void ValidLandlineNumber_ShouldCreateInstance()
  {
    // Arrange
    string validLandlineNumber = "212345678";

    // Act
    var phoneNumber = new PhoneNumber(validLandlineNumber);

    // Assert
    Assert.AreEqual(validLandlineNumber, phoneNumber.Value);
  }

  [TestMethod]
  [ExpectedException(typeof(BusinessRuleValidationException))]
  public void NullNumber_ShouldThrowException()
  {
    // Arrange
    string nullNumber = null;

    // Act
    var phoneNumber = new PhoneNumber(nullNumber);

    // Assert
    // Exception expected
  }

  [TestMethod]
  [ExpectedException(typeof(BusinessRuleValidationException))]
  public void InvalidNumberLength_ShouldThrowException()
  {
    // Arrange
    string invalidNumber = "12345678"; // Less than 9 digits

    // Act
    var phoneNumber = new PhoneNumber(invalidNumber);

    // Assert
    // Exception expected
  }

  [TestMethod]
  [ExpectedException(typeof(BusinessRuleValidationException))]
  public void NonPortugueseNumber_ShouldThrowException()
  {
    // Arrange
    string nonPortugueseNumber = "345678912"; // Doesn't start with 9 or 2

    // Act
    var phoneNumber = new PhoneNumber(nonPortugueseNumber);

    // Assert
    // Exception expected
  }
}
