(() => {
	let tsDevId = null;
	function selectizeDeviceInput() {
		tsDevId = new TomSelect("select[name='device_id']", {
			valueField: "id",
			labelField: "device_id",
			searchField: "device_id",
			create: false,
			createOnBlur: false,
			persist: false,
			plugins: ["preserve_on_blur"],
			load: (query, callback) => {
				if (query.length < 4) {
					return callback();
				}
				reqwest({
					url: `${window.local.apiBaseUrl}search/device?aid=true&q=${encodeURIComponent(query)}`,
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
	}

	u("#quick-creation-form").on("submit", (e) => {
		e.preventDefault();
		const now = dayjs();
		const formData = new FormData(e.target);
		const data = {
			name: `Quick tracking ${dayjs().local().format("YYYY-MM-DD HH:mm:ss")}`,
			club_slug: window.local.clubSlug,
			backdrop: formData.get("backdrop"),
			start_date: now.toISOString(),
			end_date: now
				.add(Number.parseInt(formData.get("duration"), 10), "m")
				.toISOString(),
		};
		reqwest({
			url: `${window.local.apiBaseUrl}events/`,
			method: "post",
			type: "json",
			withCredentials: true,
			crossOrigin: true,
			data: data,
			headers: {
				"X-CSRFToken": window.local.csrfToken,
			},
			success: (res) => {
				reqwest({
					url: `${window.local.apiBaseUrl}competitors/`,
					method: "post",
					type: "json",
					withCredentials: true,
					crossOrigin: true,
					data: {
						event_id: res.id,
						name: formData.get("name"),
						device_id: formData.get("device_id"),
						start_time: now.toISOString(),
					},
					headers: {
						"X-CSRFToken": window.local.csrfToken,
					},
					success: () => {
						window.localStorage.setItem(
							"quick-event-devId",
							formData.get("device_id"),
						);
						window.location.href = res.url;
					},
					error: (err) => {
						if (err.status === 400) {
							swal({
								text: JSON.parse(err.responseText).join("\n"),
								title: "error",
								type: "error",
							});
						} else {
							swal({
								text: "Something went wrong",
								title: "error",
								type: "error",
							});
						}
					},
				});
			},
			error: (err) => {
				if (err.status === 400) {
					swal({
						text: JSON.parse(err.responseText).join("\n"),
						title: "error",
						type: "error",
					});
				} else {
					swal({
						text: "Something went wrong",
						title: "error",
						type: "error",
					});
				}
			},
		});
	});
	selectizeDeviceInput();
	u("#id_device_id").attr("required", true);
	u("#id_name").val(window.local.username);
	const myUrl = new URL(window.location.href.replace(/#/g, "?"));
	const urlDevId = myUrl.searchParams.get("device_id");
	const devId = urlDevId || window.localStorage.getItem("quick-event-devId");
	if (devId) {
		tsDevId.load(devId, (res) => {
			if (res) {
				tsDevId.setValue(devId);
			}
		});
	}
})();
