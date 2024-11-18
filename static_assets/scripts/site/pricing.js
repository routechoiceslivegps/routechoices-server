(() => {
	const onPriceChange = (e) => {
		const perMonthRaw = u(e.target).val();
		let perMonth = Number.parseFloat(perMonthRaw);
		if (Number.isNaN(perMonth) || perMonth < 4.99) {
			u(e.target).val("4.99");
			perMonth = 4.99;
		}
		if (`${perMonth}` !== perMonthRaw) {
			u(e.target).val(`${perMonth}`);
		}
		u("#price-per-year").text(
			`(${Math.round((perMonth * 12 + Number.EPSILON) * 100) / 100}€/year + VAT)`,
		);
	};
	u("#price-per-month").on("change", onPriceChange);
	u("#price-per-month").trigger("change");
})();
