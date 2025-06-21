(() => {
	u("#id_base").on("change", (e) => {
		u("#id_addend option").each((opt) => {
			const isDisabled = opt.value === e.target.value;
			opt.disabled = isDisabled;
			if (opt.selected && isDisabled) {
				opt.selected = false;
			}
		});
	});
})();
