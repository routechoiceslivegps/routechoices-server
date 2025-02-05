const seletizeOptions = {
	valueField: "id",
	labelField: "device_id",
	searchField: "device_id",
	create: false,
	createOnBlur: false,
	persist: false,
	plugins: ["preserve_on_blur", "change_listener"],
	load: (query, callback) => {
		if (query.length < 4) {
			return callback();
		}
		reqwest({
			url: `${window.local.apiBaseUrl}search/device?q=${encodeURIComponent(query)}`,
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
};

let lastDeviceSelectInput = null;
function onAddedCompetitorRow(row) {
	const options = {
		useCurrent: false,
		display: {
			components: {
				useTwentyfourHour: true,
				seconds: true,
			},
		},
	};
	const el = u(row).find(".datetimepicker").first();
	new tempusDominus.TempusDominus(el, options);
	u(row)
		.find('select[name$="-device"]')
		.each((el) => {
			lastDeviceSelectInput = new TomSelect(el, seletizeOptions);
		});

	u(row)
		.find('input[id$="-start_time"]')
		.each((el) => {
			makeTimeFieldClearable(el);
			makeFieldNowable(el);
		});

	u(el).attr("autocomplete", "off");
	showLocalTime(el);
	el.addEventListener(tempusDominus.Namespace.events.change, (e) => {
		showLocalTime(e.target);
	});
	u(el).on("change", (e) => {
		showLocalTime(e.target);
	});
}

function clearEmptyCompetitorRows() {
	u(".formset_row").each((e) => {
		if (
			u(e)
				.find("input")
				.filter((el) => u(el).attr("type") !== "hidden" && el.value !== "")
				.length === 0
		) {
			u(e).find(".delete-row").first().click();
		}
	});
}

function addCompetitor(name, shortName, startTime, deviceId) {
	u(".add-competitor-btn").first().click();
	const inputs = u(u(".formset_row").last()).find("input").nodes;
	if (startTime) {
		inputs[5].value = dayjs(startTime).utc().format("YYYY-MM-DD HH:mm:ss");
		u(inputs[5]).trigger("change");
	}
	inputs[2].value = name;
	inputs[3].value = shortName;
	if (deviceId) {
		const myDeviceSelectInput = lastDeviceSelectInput;
		reqwest({
			url: `${window.local.apiBaseUrl}search/device?q=${deviceId}`,
			method: "get",
			type: "json",
			withCredentials: true,
			crossOrigin: true,
			success: ((line) => (res) => {
				if (res.results.length === 1) {
					const r = res.results[0];
					myDeviceSelectInput.addOption(r);
					myDeviceSelectInput.setValue(r[seletizeOptions.valueField]);
				}
			})(),
		});
	}
}

function displayRoutechoicesListedOption(value, first) {
	if (value === "public") {
		u("#id_on_events_page").closest("div:has(.form-check)").show();
		if (!first && window.local.clubUpgraded) {
			u("#id_on_events_page").first().checked = true;
		}
	} else {
		u("#id_on_events_page").closest("div:has(.form-check)").hide();
		u("#id_on_events_page").first().checked = false;
	}
}

function onIofXMLLoaded(e) {
	const file = e.target.files[0];
	if (file) {
		const reader = new FileReader();
		reader.onload = (evt) => {
			const txt = evt.target.result;
			const parser = new DOMParser();
			const parsedXML = parser.parseFromString(txt, "text/xml");
			const isResultFile =
				parsedXML.getElementsByTagName("ResultList").length === 1;
			const isStartFile =
				parsedXML.getElementsByTagName("StartList").length === 1;
			if (!isResultFile && !isStartFile) {
				swal({
					title: "Error!",
					text: "Neither a start list or a result list",
					type: "error",
					confirmButtonText: "OK",
				});
				u("#iof_input").val("");
				return;
			}
			const classes = [];
			const selector = document.getElementById("iof_class_input");
			selector.innerHTML = "";
			let ii = 1;
			for (c of parsedXML.getElementsByTagName("Class")) {
				const id = ii;
				const name = c.getElementsByTagName("Name")[0].textContent;
				classes.push({ id, name });
				const opt = document.createElement("option");
				opt.value = id;
				opt.appendChild(document.createTextNode(name));
				selector.appendChild(opt);
				ii++;
			}
			u("#iof-step-1").addClass("d-none");
			u("#iof-step-2").removeClass("d-none");
			u("#iof-class-cancel-btn").on("click", (e) => {
				e.preventDefault();
				u("#iof-step-2").addClass("d-none");
				u("#iof-step-1").removeClass("d-none");
				u("#iof_input").val("");
			});
			u("#iof-class-submit-btn").off("click");
			u("#iof-class-submit-btn").on("click", (e) => {
				e.preventDefault();
				const classId = u("#iof_class_input").val();
				const suffix = isResultFile ? "Result" : "Start";

				clearEmptyCompetitorRows();
				let ii = 1;
				for (c of parsedXML.getElementsByTagName(`Class${suffix}`)) {
					if (ii === Number.parseInt(classId, 10)) {
						for (p of c.getElementsByTagName(`Person${suffix}`)) {
							let startTime = null;
							let name = null;
							let shortName = null;
							try {
								startTime = p
									.getElementsByTagName(suffix)[0]
									.getElementsByTagName("StartTime")[0].textContent;
							} catch (e) {
								console.log(e);
							}
							try {
								name = `${
									p
										.getElementsByTagName("Person")[0]
										.getElementsByTagName("Given")[0].textContent
								} ${
									p
										.getElementsByTagName("Person")[0]
										.getElementsByTagName("Family")[0].textContent
								}`;
								shortName = `${
									p
										.getElementsByTagName("Person")[0]
										.getElementsByTagName("Given")[0].textContent[0]
								}.${
									p
										.getElementsByTagName("Person")[0]
										.getElementsByTagName("Family")[0].textContent
								}`;
							} catch (e) {
								console.log(e);
							}
							if (name) {
								addCompetitor(name, shortName, startTime);
							}
						}
						u(".add-competitor-btn").first().click();
					}
					ii++;
				}
				u("#iof-step-2").addClass("d-none");
				u("#iof-step-1").removeClass("d-none");
				u("#iof_input").val("");
			});
		};
		reader.onerror = () => {
			swal({
				title: "Error!",
				text: "Could not parse this file",
				type: "error",
				confirmButtonText: "OK",
			});
		};
		reader.readAsText(file, "UTF-8");
	}
}

function onCsvParsed(result) {
	u("#csv_input").val("");
	let errors = "";
	if (result.errors.length > 0) {
		errors = "No line found";
	}
	if (!errors) {
		for (const l of result.data) {
			let empty = false;
			if (l.length === 1 && l[0] === "") {
				empty = true;
			}
			if (!empty && l.length !== 4) {
				errors = "Each row should have 4 columns";
			} else {
				if (!empty && l[2]) {
					try {
						new Date(l[2]);
					} catch (e) {
						errors = "One row contains an invalid date";
					}
				}
			}
		}
	}
	if (errors) {
		swal({
			title: "Error!",
			text: `Could not parse this file: ${errors}`,
			type: "error",
			confirmButtonText: "OK",
		});
		return;
	}
	clearEmptyCompetitorRows();
	for (const l of result.data) {
		if (l.length !== 1) {
			addCompetitor(l[0], l[1], l[2], l?.[3]);
		}
	}
	u(".add-competitor-btn").first().click();
}

function showLocalTime(el) {
	const val = u(el).val();
	if (val) {
		let local = dayjs(val).utc(true).local().format("YYYY-MM-DD HH:mm:ss");
		local += local === "Invalid Date" ? "" : " Local time";
		u(el).closest(":has(.local_time)").find(".local_time").text(local);
	} else {
		u(el)
			.closest(":has(.local_time)")
			.find(".local_time")
			.html("&ZeroWidthSpace;");
	}
}

(() => {
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
	const newSlug = u("#id_name").val() === "";
	let slugEdited = false;
	makeFieldRandomizable("#id_slug");
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

	const REGEX_EMAIL =
		"([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@" +
		"(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)";

	new TomSelect("#id_emergency_contacts", {
		persist: false,
		maxItems: null,
		valueField: "email",
		delimiter: " ",
		render: {
			item: (item, escapeFunc) =>
				`<div>${
					item.email
						? `<span class="email">${escapeFunc(item.email)}</span>`
						: ""
				}</div>`,
			option: (item, escapeFunc) => {
				const label = item.email;
				return `<div><span class="label">${escapeFunc(label)}</span></div>`;
			},
		},
		createFilter: (input) => {
			const regexpA = new RegExp(`^${REGEX_EMAIL}$`, "i");
			return regexpA.test(input);
		},
		create: (input) => {
			if (new RegExp(`^${REGEX_EMAIL}$`, "i").test(input)) {
				return { email: input };
			}
			swal({
				title: "Error!",
				text: "Invalid email address.",
				type: "error",
				confirmButtonText: "OK",
			});
			return false;
		},
	});

	new TomSelect("#id_event_set", {
		allowEmptyOption: true,
		render: {
			option_create: (data, escapeFunc) =>
				`<div class="create">Create <strong>${escapeFunc(data.input)}</strong>&hellip;</div>`,
		},
		create: (input, callback) => {
			reqwest({
				url: `${window.local.apiBaseUrl}event-set`,
				method: "post",
				data: {
					club_slug: window.local.clubSlug,
					name: input,
				},
				type: "json",
				withCredentials: true,
				crossOrigin: true,
				headers: {
					"X-CSRFToken": window.local.csrfToken,
				},
				success: (res) => callback(res),
				error: () => callback(),
			});
		},
	});

	u(".datetimepicker").map((el) => {
		const options = {
			useCurrent: false,
			display: {
				components: {
					useTwentyfourHour: true,
					seconds: true,
				},
			},
		};
		let val = u(el).val();
		if (
			val &&
			/^\d{4}-\d{2}-\d{2}/.test(val) &&
			/\d{2}:\d{2}:\d{2}$/.test(val)
		) {
			val = `${val.substring(0, 10)} ${val.substring(11, 19)}`;
			u(el).val(val);
			u(el).trigger("change");
		} else {
			u(el).val("");
		}
		new tempusDominus.TempusDominus(el, options);
	});
	u('label[for$="-DELETE"]').parent(".form-group").hide();
	$(".formset_row").formset({
		addText: '<i class="fa-solid fa-circle-plus"></i> Add Competitor',
		addCssClass: "btn btn-info add-competitor-btn",
		deleteCssClass: "btn btn-danger delete-row",
		deleteText: '<i class="fa-solid fa-xmark"></i>',
		prefix: "competitors",
		added: onAddedCompetitorRow,
	});
	$(".extra_map_formset_row").formset({
		addText: '<i class="fa-solid fa-circle-plus"></i> Add Map',
		addCssClass: "btn btn-info add-map-btn",
		deleteCssClass: "btn btn-danger delete-row",
		deleteText: '<i class="fa-solid fa-xmark"></i>',
		prefix: "map_assignations",
		formCssClass: "extra_map_formset_row",
	});

	// next line must come after formset initialization
	let hasArchivedDevices = false;
	u('select[name$="-device"]').each((el) => {
		if (el.options[el.selectedIndex].text.endsWith("*")) {
			hasArchivedDevices = true;
		}
		new TomSelect(el, seletizeOptions);
	});
	if (hasArchivedDevices) {
		u(".add-competitor-btn")
			.parent()
			.append(
				'<div class="form-text"><span>* Archive of original device</span></div>',
			);
	}

	const originalEventStart = u("#id_start_date").val();
	let competitorsStartTimeElsWithSameStartAsEvents = u(
		".competitor-table .datetimepicker",
	).filter(
		(el) => originalEventStart !== "" && u(el).val() === originalEventStart,
	).nodes;
	u("#csv_input").on("change", (e) => {
		Papa.parse(e.target.files[0], { complete: onCsvParsed });
	});

	u("#iof_input").on("change", onIofXMLLoaded);
	u(".competitor-table .datetimepicker").each(makeTimeFieldClearable);
	u(".datetimepicker").each((el) => {
		u(el).attr("autocomplete", "off");
		makeFieldNowable(el);
		showLocalTime(el);
		el.addEventListener(tempusDominus.Namespace.events.change, (e) => {
			const elId = u(e.target).attr("id");
			competitorsStartTimeElsWithSameStartAsEvents = u(
				competitorsStartTimeElsWithSameStartAsEvents,
			).filter((_e) => u(_e).attr("id") !== elId).nodes;
			showLocalTime(e.target);
		});
		u(el).on("change", (e) => {
			showLocalTime(e.target);
		});
	});

	const utcOffset = dayjs().utcOffset();
	const utcOffsetText = `${
		(utcOffset > 0 ? "+" : "-") +
		`0${Math.floor(Math.abs(utcOffset / 60))}`.slice(-2)
	}:${(`0${Math.round(utcOffset % 60)}`).slice(-2)}`;
	u(".utc-offset").text(`(UTC Offset ${utcOffsetText})`);

	u("#id_start_date")
		.first()
		.addEventListener(tempusDominus.Namespace.events.change, (e) => {
			const newValue = u(e.target).val();
			u(competitorsStartTimeElsWithSameStartAsEvents).each((el) => {
				u(el).val(newValue);
			});
		});

	const tailLength = u("#id_tail_length").addClass("d-none").val();
	u('[for="id_tail_length"]').text("Tail length (Hours, Minutes, Seconds)");

	const tailLenFormDiv = u("<div/>").addClass("row", "g-1");

	const hourInput = u("<input/>")
		.addClass("d-inline-block")
		.addClass("form-control", "tailLengthControl")
		.css({ width: "85px" })
		.attr({
			type: "number",
			min: "0",
			max: "9999",
			name: "hours",
		})
		.val(Math.floor(tailLength / 3600));

	const hourDiv = u("<div/>")
		.addClass("col-auto")
		.append(hourInput)
		.append("<span> : </span>");

	const minuteInput = u("<input/>")
		.addClass("d-inline-block")
		.addClass("form-control", "tailLengthControl")
		.css({ width: "65px" })
		.attr({
			type: "number",
			min: "0",
			max: "59",
			name: "minutes",
		})
		.val(Math.floor(tailLength / 60) % 60);

	const minuteDiv = u("<div/>")
		.addClass("col-auto")
		.append(minuteInput)
		.append("<span> : </span>");

	const secondInput = u("<input/>")
		.addClass("d-inline-block")
		.addClass("form-control", "tailLengthControl")
		.css({ width: "65px" })
		.attr({
			type: "number",
			min: "0",
			max: "59",
			name: "seconds",
		})
		.val(tailLength % 60);

	const secondDiv = u("<div/>").addClass("col-auto").append(secondInput);

	tailLenFormDiv.append(hourDiv).append(minuteDiv).append(secondDiv);

	u("#id_tail_length").after(tailLenFormDiv);
	u(tailLenFormDiv)
		.find(".tailLengthControl")
		.on("input", (e) => {
			const commonDiv = u(e.target).closest("div:has(div input)");
			const hourInput = commonDiv.find('input[name="hours"]');
			const minInput = commonDiv.find('input[name="minutes"]');
			const secInput = commonDiv.find('input[name="seconds"]');
			const h = Number.parseInt(hourInput.val() || 0);
			const m = Number.parseInt(minInput.val() || 0);
			const s = Number.parseInt(secInput.val() || 0);
			const v = 3600 * h + 60 * m + s;
			if (Number.isNaN(v)) {
				return;
			}
			const tailLength = Math.max(0, v);
			u("#id_tail_length").val(tailLength);
			hourInput.val(Math.floor(tailLength / 3600));
			minInput.val(Math.floor((tailLength / 60) % 60));
			secInput.val(Math.floor(tailLength % 60));
		});

	u("#id_backdrop_map").parent().before("<hr/><h3>Maps</h3>");
	u("#id_privacy").on("change", (e) => {
		displayRoutechoicesListedOption(e.target.value, false);
	});
	displayRoutechoicesListedOption(u("#id_privacy").val(), true);

	const currentGeoJson = u("#id_geojson_layer")
		.parent()
		.find("div div a")
		.attr("href");
	if (currentGeoJson) {
		u("#id_geojson_layer")
			.parent()
			.find("div div a")
			.text("Download")
			.after(
				`<a class="ms-2" href="https://map.routechoices.com/#geojson=${currentGeoJson}" target="_blank">Preview<a/>`,
			);
	}

	u("form").on("submit", (e) => {
		u("#submit-btn").attr({ disabled: true });
		u("button[name='save_continue']").addClass("disabled");
		u(e.submitter)
			.find("i")
			.removeClass("fa-floppy-disk")
			.addClass("fa-spinner fa-spin");
	});
})();
