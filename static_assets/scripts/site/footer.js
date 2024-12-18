(async function updateStatus() {
	await fetch("https://j9njnl3qx7d8.statuspage.io/api/v2/status.json")
		.then((r) => r.json())
		.then((data) => {
			const className = `status-indicator-${data.status.indicator}`;
			const el = document.getElementById("status-indicator");
			el.classList.remove("status-indicator-default");
			el.classList.add(className);
			el.parentNode.title = data.status.description;
		});
})();
