describe("MakeTaskRequestComponent", () => {
  beforeEach(() => {
    // @ts-ignore
    cy.loginUser();
    cy.visit("tasks/makeTaskRequest");
  });


  it("should be able to make a delivery task request", () => {
    const deliveryTaskData = {
      description: "Tarefa Test",
      type: "Delivery",
      userId: "e173de0d-8bf3-45b5-be80-6f0320c74acd",
      senderContact: "219191919",
      receiverContact: "912345678",
      confirmationCode: "12345",
      senderName: "Joao Mesquita",
      receiverName: "Joana Castelo"
    };

    cy.intercept("POST", "**/api/taskRequests").as("postTaskRequest");
    cy.get("[data-cy=description]").type(deliveryTaskData.description);
    cy.get("[data-cy=delivery-type]").click();
    cy.get("[name=buildingSource]").click().get(`mat-option`).contains("A").click();
    cy.get("[name=floorSource]").click().get(`mat-option`).contains("1").click();
    cy.get("[name=roomSource]").click().get(`mat-option`).first().click();
    cy.get("[name=buildingDestination]").click().get(`mat-option`).contains("B").click();
    cy.get("[name=floorDestination]").click().get(`mat-option`).contains("1").click();
    cy.get("[name=roomDestination]").click().get(`mat-option`).first().click();
    cy.get("[data-cy=senderContact]").type(deliveryTaskData.senderContact);
    cy.get("[data-cy=receiverContact]").type(deliveryTaskData.receiverContact);
    cy.get("[data-cy=confirmationCode]").type(deliveryTaskData.confirmationCode);
    cy.get("[data-cy=senderName]").type(deliveryTaskData.senderName);
    cy.get("[data-cy=receiverName]").type(deliveryTaskData.receiverName);
    cy.get("[data-cy=submit]").click();

    cy.wait("@postTaskRequest").then((interception) => {
      expect(interception.response.statusCode).to.equal(201);
    });
  });

  it("should be able to make a surveillance task request", () => {
    const deliveryTaskData = {
      description: "Tarefa Test",
      type: "Surveillance",
      emergencyNumber: "213115912",
      userId: "e173de0d-8bf3-45b5-be80-6f0320c74acd"
    };

    cy.intercept("POST", "**/api/taskRequests").as("postTaskRequest");
    cy.get("[data-cy=description]").type(deliveryTaskData.description);
    cy.get("[data-cy=surveillance-type]").click();
    cy.get("[name=buildingSource]").click().get(`mat-option`).contains("A").click();
    cy.get("[name=floorSource]").click().get(`mat-option`).contains("1").click();
    cy.get("[name=roomSource]").click().get(`mat-option`).first().click();
    cy.get("[name=roomDestination]").click().get(`mat-option`).first().click();
    cy.get("[data-cy=emergencyNumber]").type(deliveryTaskData.emergencyNumber);
    cy.get("[data-cy=submit]").click();

    cy.wait("@postTaskRequest").then((interception) => {
      expect(interception.response.statusCode).to.equal(201);
    });
  });
});
