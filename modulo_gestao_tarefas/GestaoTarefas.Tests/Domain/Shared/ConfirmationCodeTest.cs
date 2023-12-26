using GestaoTarefas.Domain.Shared;
using JetBrains.Annotations;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace GestaoTarefas.Tests.Domain.Shared;

[TestClass]
[TestSubject(typeof(ConfirmationCode))]
public class ConfirmationCodeTest
{

  [TestMethod]
  public void ValidCodeWithFiveDigits_ShouldCreateInstance()
  {
    // Arrange
    string validCode = "12345";

    // Act
    var confirmationCode = new ConfirmationCode(validCode);

    // Assert
    Assert.AreEqual(validCode, confirmationCode.Value);
  }

  [TestMethod]
  public void ValidCodeWithSixDigits_ShouldCreateInstance()
  {
    // Arrange
    string validCode = "123456";

    // Act
    var confirmationCode = new ConfirmationCode(validCode);

    // Assert
    Assert.AreEqual(validCode, confirmationCode.Value);
  }

  [TestMethod]
  public void ValidCodeWithFourDigits_ShouldCreateInstance()
  {
    // Arrange
    string validCode = "6789";

    // Act
    var confirmationCode = new ConfirmationCode(validCode);

    // Assert
    Assert.AreEqual(validCode, confirmationCode.Value);
  }

  [TestMethod]
  [ExpectedException(typeof(BusinessRuleValidationException))]
  public void NullCode_ShouldThrowException()
  {
    // Arrange
    string nullCode = null;

    // Act
    var confirmationCode = new ConfirmationCode(nullCode);

    // Assert
    // Exception expected
  }

  [TestMethod]
  [ExpectedException(typeof(BusinessRuleValidationException))]
  public void InvalidCodeLength_ShouldThrowExceptionIfLonger()
  {
    // Arrange
    string invalidCode = "1234567"; // More than 6 digits

    // Act
    var confirmationCode = new ConfirmationCode(invalidCode);

    // Assert
    // Exception expected
  }

  [TestMethod]
  [ExpectedException(typeof(BusinessRuleValidationException))]
  public void InvalidCodeLength_ShouldThrowExceptionIfShorter()
  {
    // Arrange
    string invalidCode = "12"; // Less than 4 digits

    // Act
    var confirmationCode = new ConfirmationCode(invalidCode);

    // Assert
    // Exception expected
  }
}
