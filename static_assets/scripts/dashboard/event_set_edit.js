(() => {
	makeTextAreasAutoGrow();

	u("#id_create_page").on("change", (e) => {
		if (e.target.checked) {
			u("#id_slug").closest("div:has(label)").show();
			u("#id_slug").attr("required", true);
			u("#id_list_secret_events").closest("div:has(label)").show();
			u("#id_description").closest("div:has(label)").show();
		} else {
			u("#id_slug").closest("div:has(label)").hide();
			u("#id_slug").attr("required", false);
			u("#id_list_secret_events").closest("div:has(label)").hide();
			u("#id_description").closest("div:has(label)").hide();
		}
	});

	const slugPrefix = u(
		`<br/><span id="id_slug-prefix" class="pe-2" style="color: #999">${window.local.clubUrl}</span>`,
	);
	u("#id_slug").before(slugPrefix);
	const slugPrefixWidth = document
		.getElementById("id_slug-prefix")
		.getBoundingClientRect().width;
	u("#id_slug").css({
		width: `calc(100% - ${slugPrefixWidth}px)`,
		"min-width": "150px",
		display: "inline-block",
	});
	u("#id_slug").closest(":has(.form-label)").find(".form-label").text("URL");
	u("#id_slug").attr("required", true);

	makeFieldRandomizable("#id_slug");

	if (!u("#id_create_page").nodes[0].checked) {
		u("#id_slug").closest("div:has(label)").hide();
		u("#id_slug").attr("required", false);
		u("#id_list_secret_events").closest("div:has(label)").hide();
		u("#id_description").closest("div:has(label)").hide();
	}
})();
