(() => {
	u("#id_slug").parent().find(".form-label").text("Domain Prefix");

	const currentLogo = u("#id_logo").parent().find("div div a").attr("href");
	if (currentLogo) {
		u("#id_logo")
			.parent()
			.find("div div a")
			.html(
				`<br/><img alt="Current Logo" height="50" width="50" src="${window.local.clubNiceUrl}logo"/>`,
			);
	}

	const currentBanner = u("#id_banner").parent().find("div div a").attr("href");
	if (currentBanner) {
		u("#id_banner")
			.parent()
			.find("div div a")
			.html(
				`<br/><img alt="Current Banner" height="210" width="400" src="${window.local.clubNiceUrl}banner"/>`,
			);
	}

	const newSlug = u("#id_name").val() === "";
	let slugEdited = false;
	u("#id_name").on("keyup", (e) => {
		if (!slugEdited) {
			const value = e.target.value;
			const slug = slugify(value, {
				strict: true,
				replacement: "-",
				trim: true,
			});
			u("#id_slug").val(slug.toLowerCase());
		}
	});

	u("#id_slug").on("blur", (e) => {
		slugEdited = e.target.value !== "";
	});

	if (newSlug) {
		u("#id_slug").val("");
	} else {
		slugEdited = true;
	}

	new TomSelect("#id_admins", {
		valueField: "id",
		labelField: "username",
		searchField: "username",
		multiple: true,
		plugins: ["preserve_on_blur"],
		load: (query, callback) => {
			if (!query.length || query.length < 2) return callback();
			reqwest({
				url: `${window.local.apiBaseUrl}search/user?q=${encodeURIComponent(query)}`,
				method: "get",
				type: "json",
				withCredentials: true,
				crossOrigin: true,
				success: (res) => {
					callback(res.results);
				},
				error: () => {
					callback();
				},
			});
		},
	});

	const inviteBtn = u("#invite-btn").clone();
	u("#invite-btn").remove();
	if (inviteBtn) {
		u("#id_admins-ts-label").parent().after(inviteBtn);
	}
	const submitForm = u("#change_form");
	if (submitForm) {
		submitForm.on("submit", function confirmResetStats(e) {
			if (
				window.local.clubSlug &&
				u("#id_slug").val() !== window.local.clubSlug
			) {
				e.preventDefault();
				swal(
					{
						title: "Confirm",
						text: "You may change your domain prefix only once every 72hours.\nYour pages will still be accessible at the old domain during those 72hours.",
						type: "warning",
						confirmButtonText: "Continue",
						showCancelButton: true,
						confirmButtonClass: "btn-danger",
					},
					(isConfirmed) => {
						if (isConfirmed) {
							u(e.target).off("submit");
							e.target.submit();
						} else {
							u("#id_slug").val(window.local.clubSlug);
						}
					},
				);
			}
		});
	}
	makeTextAreasAutoGrow();
})();
