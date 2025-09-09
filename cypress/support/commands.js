// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add(
	"login",
	(username = "admin", password = "pa$$word123") => {
		cy.visit("https://dashboard.routechoices.dev/login");
		cy.get("#id_login").type(username);
		cy.get("#id_password").type(`${password}{enter}`);
	},
);

Cypress.Commands.add("createClub", (name = "Kangasala SK") => {
	cy.visit("https://dashboard.routechoices.dev/clubs/new");
	cy.get("#id_name").type(name);
	cy.get("button:not([type]),button[type=submit]").click();
	cy.contains("successfully");
});

Cypress.Commands.add(
	"createMap",
	(name = "Jukola 2019 - 1st Leg", club = "halden-sk") => {
		cy.visit(`https://dashboard.routechoices.dev/clubs/${club}/maps/new`);
		cy.fixture("Jukola2019/1/map.jpg", { encoding: null }).as("mapFile");
		cy.get("#id_name").clear().type(name).blur();
		cy.get("#id_image").selectFile({
			contents: "@mapFile",
			fileName:
				"Jukola2019 - 1 osuus_61.45075_24.18994_61.44656_24.24721_61.42094_24.23851_61.42533_24.18156_.jpg",
		});
		cy.get("#submit-btn").click();
		cy.location("pathname").should("eq", `/clubs/${club}/maps/`);
	},
);
