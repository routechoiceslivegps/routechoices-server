(() => {
	u("#print-btn").on("click", () => {
		window.print();
	});
	u(".date-utc").each((el) => {
		const _el = u(el);
		_el.text(
			dayjs(_el.data("date")).local().format("YYYY-MM-DD [at] HH:mm:ss"),
		);
	});
})();
