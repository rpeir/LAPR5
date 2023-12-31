describe("MakeTaskRequestComponent", () => {
  beforeEach(() => {
    // @ts-ignore
    cy.loginUtente();
    cy.visit("tasks/makeTaskRequest");
  });


  it("should display make task request page", () => {
    cy.get(".make-task-request").should("exist");
  });

  it("should be able to make a  delivery task request", () => {
    const deliveryTaskData = {
      description: "Tarefa Test",
      type: "Delivery",
      userId: "e173de0d-8bf3-45b5-be80-6f0320c74acd",
      pickupRoomId: "A101",
      deliveryRoomId: "B202",
      senderContact: "219191919",
      receiverContact: "917598494",
      confirmationCode: "12345",
      senderName: "Joao Mesquita",
      receiverName: "Joana Castelo"
    };

    cy.intercept("POST", "/api/tasksRequests").as("postTaskRequest");
    cy.get("#description").type(deliveryTaskData.description);
    cy.get("#type").click().get(`mat-option`).contains(deliveryTaskData.type).click();
    cy.get("#pickupRoomId").type(deliveryTaskData.pickupRoomId);
    cy.get("#deliveryRoomId").type(deliveryTaskData.deliveryRoomId);
    cy.get("#senderContact").type(deliveryTaskData.senderContact);
    cy.get("#receiverContact").type(deliveryTaskData.receiverContact);
    cy.get("#confirmationCode").type(deliveryTaskData.confirmationCode);
    cy.get("#senderName").type(deliveryTaskData.senderName);
    cy.get("#receiverName").type(deliveryTaskData.receiverName);
    cy.get("#submit").click();

    cy.wait("@postTaskRequest").then((interception) => {
      expect(interception.response.statusCode).to.equal(201);
      expect(interception.request.body).to.deep.equal(deliveryTaskData);
    });

    cy.on("window:alert", (str) => {
      expect(str).to.equal(JSON.stringify(deliveryTaskData));
    });
  });

  it("should be able to make a  surveillance task request", () => {
    const surveillanceTaskData = {
      description: "Tarefa Test",
      type: "Surveillance",
      userId: "e173de0d-8bf3-45b5-be80-6f0320c74acd",
      pickupRoomId: "A101",
      deliveryRoomId: "B202",
      emergencyNumber: "911767890"
    };

    cy.intercept("POST", "/api/tasksRequests").as("postTaskRequest");
    cy.get("#description").type(surveillanceTaskData.description);
    cy.get("#type").click().get(`mat-option`).contains(surveillanceTaskData.type).click();
    cy.get("#pickupRoomId").type(surveillanceTaskData.pickupRoomId);
    cy.get("#deliveryRoomId").type(surveillanceTaskData.deliveryRoomId);
    cy.get("#emergencyNumber").type(surveillanceTaskData.emergencyNumber);
    cy.get("#submit").click();

    cy.wait("@postTaskRequest").then((interception) => {
      expect(interception.response.statusCode).to.equal(201);
      expect(interception.request.body).to.deep.equal(surveillanceTaskData);
    });

    cy.on("window:alert", (str) => {
      expect(str).to.equal(JSON.stringify(surveillanceTaskData));
    });
  });

});
