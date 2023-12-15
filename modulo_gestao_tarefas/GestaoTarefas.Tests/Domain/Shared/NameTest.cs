using GestaoTarefas.Domain.Shared;
using JetBrains.Annotations;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace GestaoTarefas.Tests.Domain.Shared;

[TestClass]
[TestSubject(typeof(Name))]
public class NameTest
{

  [TestMethod]
  public void ValidName_ShouldCreateInstance()
  {
    // Arrange
    const string validName = "John Doe";

    // Act
    var name = new Name(validName);

    // Assert
    Assert.AreEqual(validName, name.Value);
  }

  [TestMethod]
  [ExpectedException(typeof(BusinessRuleValidationException))]
  public void NullName_ShouldThrowException()
  {
    // Arrange
    const string nullName = null;

    // Act
    var name = new Name(nullName);

    // Assert
    // Exception expected
  }

  [TestMethod]
  [ExpectedException(typeof(BusinessRuleValidationException))]
  public void EmptyString_ShouldNotCreateInstance()
  {
    // Arrange
    const string emptyString = "";

    // Act
    var name = new Name(emptyString);

    // Assert
    Assert.AreEqual(emptyString, name.Value);
  }

  [TestMethod]
  [ExpectedException(typeof(BusinessRuleValidationException))]
  public void WhitespaceString_ShouldNotCreateInstance()
  {
    // Arrange
    const string whitespaceString = "   ";

    // Act
    var name = new Name(whitespaceString);

    // Assert
    Assert.AreEqual(whitespaceString, name.Value);
  }

  [TestMethod]
  public void StringWithStartAndEndSpaces_ShouldTrim()
  {
    // Arrange
    const string whitespaceString = " Jonh Doe  ";
    const string expectedValue = "Jonh Doe";

    // Act
    var name = new Name(whitespaceString);

    // Assert
    Assert.AreEqual(expectedValue, name.Value);
  }

}
