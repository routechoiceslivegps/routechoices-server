(() => {
	u(".date-utc").each((el) => {
		$el = u(el);
		$el.text(dayjs($el.data("date")).local().format("YYYY-MM-DD HH:mm:ss"));
	});
})();
