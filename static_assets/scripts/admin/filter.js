django
	.jQuery(`.admin-filter-${document.currentScript.dataset.title} select`)
	.on("change", function (e) {
		const opt = this.options[this.selectedIndex].value;
		console.log(opt);
		window.location = window.location.pathname + opt;
	});
