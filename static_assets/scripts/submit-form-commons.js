(() => {
	u("form").on("submit", function (e) {
		const t = u(this);
		const submitBtn = t.find("#submit-btn");
		const icon = submitBtn.find("i");
		submitBtn.attr({ disabled: true });
		icon.attr({ class: "" }).addClass("fa-solid fa-spinner fa-spin");
	});

	u("input[name=type-confirmation]").on("keyup", function (ev) {
		const t = u(this).parent().parent();
		const submitBtn = t.find("#submit-btn");
		if (ev.target.value === "DELETE") {
			submitBtn.attr({ disabled: false });
		} else {
			submitBtn.attr({ disabled: true });
		}
	});
})();
