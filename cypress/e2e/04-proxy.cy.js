context("Test proxy pages", () => {
	after(() => {
		cy.wait(100);
	});

	it("Visit proxy page", () => {
		const pages = [
			"https://gpsseuranta.routechoices.dev/20241205VJyoA/",
			"https://loggator.routechoices.dev/EADQWA/",
			"https://livelox.routechoices.dev/886369/",
		];
		for (const page of pages) {
			cy.forceVisit(page);
			cy.intercept("GET", `${page}map`).as(`mapLoaded${page}`, {
				statusCode: 200,
				forceNetworkError: true,
			});
			cy.get("#loading-text").should("be.visible");
			cy.get("#loading-text", { timeout: 30000 }).should("not.exist");
			cy.wait(`@mapLoaded${page}`, { timeout: 60000 });
		}
	});
});
