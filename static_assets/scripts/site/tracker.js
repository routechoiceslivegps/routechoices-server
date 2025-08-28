function luhnChecksum(value) {
	// The Luhn Algorithm. It's so pretty.
	let nCheck = 0;
	let bEven = false;

	for (let n = value.length - 1; n >= 0; n--) {
		const cDigit = value.charAt(n);
		let nDigit = Number.parseInt(cDigit, 10);

		if (bEven) {
			nDigit *= 2;
			if (nDigit > 9) nDigit -= 9;
		}

		nCheck += nDigit;
		bEven = !bEven;
	}

	return nCheck % 10;
}

function luhnGenerate(value) {
	// The Luhn Algorithm. It's so pretty.
	const cksum = luhnChecksum(`${value}0`);
	return (10 - cksum) % 10;
}

function luhnAppend(value) {
	// The Luhn Algorithm. It's so pretty.
	return `${value}${luhnGenerate(value)}`;
}

(() => {
	u(".error-message").hide();
	u("#h02Form").on("submit", (e) => {
		e.preventDefault();

		const serialNumber = u("#H02SN").val();
		if (!/^[0-9]{10}$/.test(serialNumber)) {
			u("#h02ErrorMsg").removeClass("d-none");
			u("#H02SN").addClass("is-invalid");
			u("#imeiDevId").addClass("d-none");
			u("#h02ErrorMsg").html(
				`<i class="fa-solid fa-triangle-exclamation"></i> Serial Number should be 10 digits`,
			);
			return false;
		}

		const submitBtn = u("#submit-btn-h02");
		submitBtn.attr({ disabled: true });

		const fakeIMEI = luhnAppend(serialNumber.padEnd(14, "0"));

		u("#imeiRes").text(serialNumber);
		reqwest({
			url: `${window.local.apiRoot}device/`,
			method: "post",
			data: {
				imei: fakeIMEI,
				csrfmiddlewaretoken: window.local.csrfToken,
			},
			type: "json",
			withCredentials: true,
			crossOrigin: true,
			success: (response) => {
				u("#H02SN").removeClass("is-invalid").addClass("is-valid");
				u("#imeiDevId").removeClass("d-none");
				u(".imeiDevId").text(response.device_id);
				u("#h02ErrorMsg").addClass("d-none");
				u("#copyDevIdBtn").off("click");
				u("#copyDevIdBtn").on("click", (ev) => {
					const tooltip = new bootstrap.Tooltip(ev.currentTarget, {
						placement: "right",
						title: "copied",
					});
					tooltip.show();
					navigator.clipboard.writeText(response.device_id);
					setTimeout(() => {
						tooltip.dispose();
					}, 750);
				});
			},
			error: () => {
				u("#h02ErrorMsg").removeClass("d-none");
				u("#H02SN").addClass("is-invalid");
				u("#imeiDevId").addClass("d-none");
				try {
					u("#h02ErrorMsg").html(
						`<i class="fa-solid fa-triangle-exclamation"></i> Something went wrong...`,
					);
				} catch {}
			},
			complete: () => {
				submitBtn.attr({ disabled: false });
			},
		});
	});
	u("#imeiForm").on("submit", (e) => {
		e.preventDefault();

		const submitBtn = u("#submit-btn-imei");
		submitBtn.attr({ disabled: true });

		u("#imeiRes").text(u("#IMEI").val());
		reqwest({
			url: `${window.local.apiRoot}device/`,
			method: "post",
			data: {
				imei: u("#IMEI").val(),
				csrfmiddlewaretoken: window.local.csrfToken,
			},
			type: "json",
			withCredentials: true,
			crossOrigin: true,
			success: (response) => {
				u("#IMEI").removeClass("is-invalid").addClass("is-valid");
				u("#imeiDevId").removeClass("d-none");
				u(".imeiDevId").text(response.device_id);
				u("#imeiErrorMsg").addClass("d-none");
				u("#copyDevIdBtn").off("click");
				u("#copyDevIdBtn").on("click", (ev) => {
					const tooltip = new bootstrap.Tooltip(ev.currentTarget, {
						placement: "right",
						title: "copied",
					});
					tooltip.show();
					navigator.clipboard.writeText(response.device_id);
					setTimeout(() => {
						tooltip.dispose();
					}, 750);
				});
			},
			error: (req) => {
				u("#imeiErrorMsg").removeClass("d-none");
				u("#IMEI").addClass("is-invalid");
				u("#imeiDevId").addClass("d-none");
				try {
					u("#imeiErrorMsg").html(
						`<i class="fa-solid fa-triangle-exclamation"></i> ${u("<div/>").text(JSON.parse(req.responseText)[0]).html()}`,
					);
				} catch {}
			},
			complete: () => {
				submitBtn.attr({ disabled: false });
			},
		});
	});

	u('button[data-bs-toggle="tab"]').each((el) => {
		u(el).on("show.bs.tab", (e) => {
			window.location.hash = u(e.target).attr("data-bs-target").slice(0, -5);
		});
	});

	const hash = window.location.hash;
	if (hash) {
		const triggerEl = document.querySelector(`${hash}-tab`);
		bootstrap.Tab.getOrCreateInstance(triggerEl).show();
	}
})();
