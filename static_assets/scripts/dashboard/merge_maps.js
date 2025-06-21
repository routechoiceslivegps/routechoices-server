(() => {
	document.getElementById("id_base").addEventListener("change", (e) => {
		const options = document.querySelectorAll("#id_addend option");
		for (const opt of options) {
			const isDisabled = opt.value === e.target.value;
			opt.disabled = isDisabled;
			if (opt.selected && isDisabled) {
				opt.selected = false;
			}
		}
	});
})();
