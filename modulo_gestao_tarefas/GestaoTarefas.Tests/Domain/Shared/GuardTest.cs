using System.Collections.Generic;
using GestaoTarefas.Domain.Shared;
using JetBrains.Annotations;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace GestaoTarefas.Tests.Domain.Shared;

[TestClass]
[TestSubject(typeof(Guard))]
public class GuardTest
{

  [TestMethod]
    public void Guard_Combine_AllSucceeded_ShouldReturnSuccessResult()
    {
        // Arrange
        var guardResults = new List<IGuardResult>
        {
            new GuardResult(true),
            new GuardResult(true),
            new GuardResult(true)
        };

        // Act
        var combinedResult = Guard.Combine(guardResults);

        // Assert
        Assert.IsTrue(combinedResult.Succeeded);
    }

    [TestMethod]
    public void Guard_Combine_OneFailed_ShouldReturnFailedResult()
    {
        // Arrange
        const string expectedMessage = "Validation failed";

        var guardResults = new List<IGuardResult>
        {
            new GuardResult(true),
            new GuardResult(false, expectedMessage),
            new GuardResult(true)
        };

        // Act
        var combinedResult = Guard.Combine(guardResults);

        // Assert
        Assert.IsFalse(combinedResult.Succeeded);
        Assert.AreEqual(expectedMessage, combinedResult.Message);
    }

    [TestMethod]
    public void Guard_AgainstNullOrUndefined_NotNull_ShouldReturnSuccessResult()
    {
        // Arrange
        object validArgument = new object();

        // Act
        var guardResult = Guard.AgainstNullOrUndefined(validArgument, "argument");

        // Assert
        Assert.IsTrue(guardResult.Succeeded);
    }

    [TestMethod]
    public void Guard_AgainstNullOrUndefined_Null_ShouldReturnFailedResult()
    {
        // Arrange
        const object nullArgument = null;

        // Act
        var guardResult = Guard.AgainstNullOrUndefined(nullArgument, "argument");

        // Assert
        Assert.IsFalse(guardResult.Succeeded);
        Assert.AreEqual("argument is null or undefined", guardResult.Message);
    }

    // Similar tests can be created for other methods in the Guard class

    [TestMethod]
    public void GuardResult_SuccessfulResult_ShouldHaveSucceededTrue()
    {
        // Arrange
        var guardResult = new GuardResult(true);

        // Assert
        Assert.IsTrue(guardResult.Succeeded);
        Assert.IsNull(guardResult.Message);
    }

    [TestMethod]
    public void GuardResult_FailedResult_ShouldHaveSucceededFalseAndMessage()
    {
        // Arrange
        const string expectedMessage = "Validation failed";
        var guardResult = new GuardResult(false, expectedMessage);

        // Assert
        Assert.IsFalse(guardResult.Succeeded);
        Assert.AreEqual(expectedMessage, guardResult.Message);
    }

    [TestMethod]
    public void GuardArgument_Construction_ShouldSetProperties()
    {
        // Arrange
        object argument = new object();
        string argumentName = "myArgument";

        // Act
        var guardArgument = new GuardArgument(argument, argumentName);

        // Assert
        Assert.AreEqual(argument, guardArgument.Argument);
        Assert.AreEqual(argumentName, guardArgument.ArgumentName);
    }
}
