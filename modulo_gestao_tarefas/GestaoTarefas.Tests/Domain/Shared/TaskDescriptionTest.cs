using GestaoTarefas.Domain.Shared;
using JetBrains.Annotations;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace GestaoTarefas.Tests.Domain.Shared;

[TestClass]
[TestSubject(typeof(TaskDescription))]
public class TaskDescriptionTest
{

  const int descriptionMaxLength = 1000;

  [TestMethod]
  public void ValidDescription_ShouldCreateInstance()
  {
    // Arrange
    const string validDescription = "task description";

    // Act
    var taskDescription = new TaskDescription(validDescription);

    // Assert
    Assert.AreEqual(validDescription, taskDescription.Value);
  }

  [TestMethod]
  [ExpectedException(typeof(BusinessRuleValidationException))]
  public void NullDescription_ShouldThrowException()
  {
    // Arrange
    const string nullDescription = null;

    // Act
    var taskDescription = new TaskDescription(nullDescription);

    // Assert
    // Exception expected
  }

  [TestMethod]
  [ExpectedException(typeof(BusinessRuleValidationException))]
  public void LongDescription_ShouldThrowException()
  {
    // Arrange
    string longDescription = new string('A', descriptionMaxLength + 1); // Exceeds the MaxLength

    // Act
    var taskDescription = new TaskDescription(longDescription);

    // Assert
    // Exception expected
  }

  [TestMethod]
  public void DescriptionEqualToMaxLength_ShouldCreateInstance()
  {
    // Arrange
    string maxLengthDescription = new string('A', descriptionMaxLength); // Exactly the MaxLength

    // Act
    var taskDescription = new TaskDescription(maxLengthDescription);

    // Assert
    Assert.AreEqual(maxLengthDescription, taskDescription.Value);
  }

  [TestMethod]
  public void DescriptionWithSpaces_ShouldTrim()
  {
    // Arrange
    const string descriptionWithSpaces = "  task description  ";
    const string expectedDescription = "task description";

    // Act
    var taskDescription = new TaskDescription(descriptionWithSpaces);

    // Assert
    Assert.AreEqual(expectedDescription, taskDescription.Value);
  }

  [TestMethod]
  public void DescriptionWithSpacesAndMaxLength_ShouldTrimAndCreateInstance()
  {
    // Arrange
    string descriptionWithSpacesAndMaxLength = new string('A', descriptionMaxLength) + "  "; // Exactly the MaxLength + spaces
    string expectedDescription = new string('A', descriptionMaxLength); // Exactly the MaxLength
    // Act
    var taskDescription = new TaskDescription(descriptionWithSpacesAndMaxLength);

    // Assert
    Assert.AreEqual(expectedDescription, taskDescription.Value);

  }
}
