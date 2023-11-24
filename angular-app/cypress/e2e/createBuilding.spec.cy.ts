// cypress/integration/create.spec.ts

describe('CreateBuildingComponent', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/building/create'); // Assuming '/create' is the route for your CreateComponent
  });

  const randomCode = generateRandomString(5); // You can adjust the length as needed
  const randomDesignation = generateRandomString(10);

  it('should create a new building', () => {
    // Generate random values for code and designation
    const buildingData = {
      code: randomCode,
      designation: randomDesignation,
      description: 'This is a test building',
      length: 10,
      width: 8,
      height: 5,
    };

    // Fill in the form fields
    cy.get('[data-cy=code]').type(buildingData.code);
    cy.get('[data-cy=designation]').type(buildingData.designation);
    cy.get('[data-cy=description]').type(buildingData.description);
    cy.get('[data-cy=length]').type(String(buildingData.length));
    cy.get('[data-cy=width]').type(String(buildingData.width));
    cy.get('[data-cy=height]').type(String(buildingData.height));

    // Trigger the createBuilding function
    cy.get('[data-cy=create-button]').click();

    // Check if the building is created successfully
    cy.on('window:alert', (message) => {
      expect(message).to.equal(
        'Building created successfully\n' +
        `Code:${buildingData.code}\n` +
        `Designation:${buildingData.designation}\n` +
        `Description:${buildingData.description}\n` +
        `Length:${buildingData.length}\n` +
        `Width:${buildingData.width}\n` +
        `Height:${buildingData.height}\n`
      );
    });
  });
  it('should fail to create a new building because the code is the same', () => {
    // Generate random values for code and designation
    const buildingData = {
      code: randomCode,
      designation: randomDesignation,
      description: 'This is a test building',
      length: 10,
      width: 8,
      height: 5,
    };

    // Fill in the form fields
    cy.get('[data-cy=code]').type(buildingData.code);
    cy.get('[data-cy=designation]').type(buildingData.designation);
    cy.get('[data-cy=description]').type(buildingData.description);
    cy.get('[data-cy=length]').type(String(buildingData.length));
    cy.get('[data-cy=width]').type(String(buildingData.width));
    cy.get('[data-cy=height]').type(String(buildingData.height));

    // Trigger the createBuilding function
    cy.get('[data-cy=create-button]').click();

    //The building already exists
    cy.on('window:alert', (message) => {
      const expectedMessage = `"Already exists building with {\\\"code\\\":\\\"${buildingData.code}\\\"}"`;
      const unescapedMessage = JSON.parse(JSON.parse(message)); // Parse twice to unescape the string

      expect(unescapedMessage).to.equal(expectedMessage);
    });

    });
   it('should fail because the code is empty', () => {
  // Generate random values for code and designation
        const buildingData = {
            designation: randomDesignation,
            description: 'This is a test building',
            length: 10,
            width: 8,
            height: 5,
        };

        // Fill in the form fields
        cy.get('[data-cy=designation]').type(buildingData.designation);
        cy.get('[data-cy=description]').type(buildingData.description);
        cy.get('[data-cy=length]').type(String(buildingData.length));
        cy.get('[data-cy=width]').type(String(buildingData.width));
        cy.get('[data-cy=height]').type(String(buildingData.height));

        // Trigger the createBuilding function
        cy.get('[data-cy=create-button]').click();

        //The building already exists

       cy.on('window:alert', (message) => {
           expect(message).to.equal(
               `"Bad Request"`
           );
       });
   });


    it('should fail to create a new building because the designation is empty', () => {
      // Generate random values for code and designation
      const buildingData = {
        code: randomCode,
        description: 'This is a test building',
        length: 10,
        width: 8,
        height: 5,
      };

      // Fill in the form fields
      cy.get('[data-cy=code]').type(buildingData.code);
      cy.get('[data-cy=description]').type(buildingData.description);
      cy.get('[data-cy=length]').type(String(buildingData.length));
      cy.get('[data-cy=width]').type(String(buildingData.width));
      cy.get('[data-cy=height]').type(String(buildingData.height));

      // Trigger the createBuilding function
      cy.get('[data-cy=create-button]').click();

      //The building already exists
        cy.on('window:alert', (message) => {
            expect(message).to.equal(
                `"Bad Request"`
            );
        });
    });
    it('should fail to create a new building because the description is empty', () => {
        // Generate random values for code and designation
        const buildingData = {
            code: randomCode,
            designation: randomDesignation,
            length: 10,
            width: 8,
            height: 5,
        };

        // Fill in the form fields
        cy.get('[data-cy=code]').type(buildingData.code);
        cy.get('[data-cy=designation]').type(buildingData.designation);
        cy.get('[data-cy=length]').type(String(buildingData.length));
        cy.get('[data-cy=width]').type(String(buildingData.width));
        cy.get('[data-cy=height]').type(String(buildingData.height));

        // Trigger the createBuilding function
        cy.get('[data-cy=create-button]').click();

        //The building already exists
        cy.on('window:alert', (message) => {
            expect(message).to.equal(
                `"Bad Request"`
            );
        });
    });
    it('should fail to create a new building because the length is empty', () => {
      // Generate random values for code and designation
      const buildingData = {
        code: randomCode,
        designation: randomDesignation,
        description: 'This is a test building',
        width: 8,
        height: 5,
      };

      // Fill in the form fields
      cy.get('[data-cy=code]').type(buildingData.code);
      cy.get('[data-cy=designation]').type(buildingData.designation);
      cy.get('[data-cy=description]').type(buildingData.description);
      cy.get('[data-cy=width]').type(String(buildingData.width));
      cy.get('[data-cy=height]').type(String(buildingData.height));

      // Trigger the createBuilding function
      cy.get('[data-cy=create-button]').click();

      //The building already exists
        cy.on('window:alert', (message) => {
            expect(message).to.equal(
                `"Bad Request"`
            );
        });
    });
      it('should fail to create a new building because the width is empty', () => {
        // Generate random values for code and designation
        const buildingData = {
          code: randomCode,
          designation: randomDesignation,
          description: 'This is a test building',
          length: 10,
          height: 5,
        };

        // Fill in the form fields
        cy.get('[data-cy=code]').type(buildingData.code);
        cy.get('[data-cy=designation]').type(buildingData.designation);
        cy.get('[data-cy=description]').type(buildingData.description);
        cy.get('[data-cy=length]').type(String(buildingData.length));
        cy.get('[data-cy=height]').type(String(buildingData.height));

        // Trigger the createBuilding function
        cy.get('[data-cy=create-button]').click();

        //The building already exists
          cy.on('window:alert', (message) => {
              expect(message).to.equal(
                  `"Bad Request"`
              );
          });
      });
        it('should fail to create a new building because the height is empty', () => {
            // Generate random values for code and designation
            const buildingData = {
                code: randomCode,
                designation: randomDesignation,
                description: 'This is a test building',
                length: 10,
                width: 8
            };

            // Fill in the form fields
            cy.get('[data-cy=code]').type(buildingData.code);
            cy.get('[data-cy=designation]').type(buildingData.designation);
            cy.get('[data-cy=description]').type(buildingData.description);
            cy.get('[data-cy=length]').type(String(buildingData.length));
            cy.get('[data-cy=width]').type(String(buildingData.width));

            // Trigger the createBuilding function
            cy.get('[data-cy=create-button]').click();

            //The building already exists
            cy.on('window:alert', (message) => {
                expect(message).to.equal(
                    `"Bad Request"`
                );
            });
        });

// Helper function to generate a random string of a given length
function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
});
