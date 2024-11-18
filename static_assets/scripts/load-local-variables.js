(() => {
	const d = document.currentScript.dataset;
	window.local = window.local || {};
	for (const f in d) {
		window.local[f] = d[f];
	}
})();
