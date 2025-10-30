let events = [];
const browserLanguage = navigator.language.slice(0, 2);
const supportedLanguages = {
	en: "English",
	es: "Español",
	fr: "Français",
	fi: "Suomi",
	nl: "Nederlands",
	pl: "Polski",
	sv: "Svensk",
};
const locale =
	window.localStorage.getItem("lang") ||
	(Object.keys(supportedLanguages).includes(browserLanguage)
		? browserLanguage
		: "en");
const banana = new Banana();

function updateText() {
	banana.setLocale(locale);
	const langFile = `${window.local.staticRoot}i18n/site/registration/${locale}.json?v=2025041000`;
	return fetch(langFile)
		.then((response) => response.json())
		.then((messages) => {
			banana.load(messages, banana.locale);
		});
}

const errorMessages = {
	"Device ID not found": "no-device-id",
	"Name is missing": "no-name",
	"Start time could not be parsed": "invalid-start-time",
	"Competitor start time should be during the event time": "bad-start-time",
	"Name already in use in this event": "bad-name",
	"Short name already in use in this event": "bad-sname",
	"Registration is closed": "registration-closed",
	"This device is already registered for this same start time":
		"start-time-already-used",
};

window.onload = () => {
	updateText().then(() => {
		document.getElementById("name-label").innerHTML = banana.i18n("name");
		document.getElementById("sname-label").innerHTML =
			banana.i18n("short-name");
		document.getElementById("dev-id-label").innerHTML = banana.i18n("dev-id");
		document.getElementById("save-btn").value = banana.i18n("save");
		document.getElementById("register-btn").value =
			banana.i18n("register-this");
		document.getElementById("event-label").innerHTML = banana.i18n("event");
		document.getElementById("no-events").innerHTML = banana.i18n("no-events");
		document.getElementById("registered").innerHTML = banana.i18n("registered");
		document.getElementById("registration-info").innerHTML =
			banana.i18n("registration-info");
		document.getElementById("register-title").innerHTML =
			banana.i18n("register");
		[...document.getElementsByClassName("settings-text")].map((el) => {
			el.innerHTML = banana.i18n("settings");
		});
		[...document.getElementsByClassName("refresh-text")].map((el) => {
			el.innerHTML = banana.i18n("refresh");
		});
		let userInfo = window.localStorage.getItem("userInfo");
		const myUrl = new URL(window.location.href.replace(/#/g, "?"));
		const devid = myUrl.searchParams.get("device_id");
		document.getElementById("devid").value = devid || "";
		if (userInfo) {
			try {
				userInfo = JSON.parse(userInfo);
				document.getElementById("name").value = userInfo.name;
				document.getElementById("sname").value = userInfo.short_name;
				document.getElementById("devid").value = devid || userInfo.devid || "";
				document.getElementById("p1").classList.add("d-none");
				document.getElementById("user-summary").textContent =
					`${userInfo.name} (${userInfo.short_name}) - ${userInfo.devid}`;
				document.getElementById("p0").classList.remove("d-none");
				fetchEvents();
			} catch (e) {
				document.getElementById("p2").classList.add("d-none");
				document.getElementById("p1").classList.remove("d-none");
				document.getElementById("p0").classList.add("d-none");
			}
		} else {
			document.getElementById("p2").classList.add("d-none");
			document.getElementById("p1").classList.remove("d-none");
			document.getElementById("p0").classList.add("d-none");
		}
	});
	document.getElementById("events").addEventListener("change", onEventSelect);
};
document.getElementById("form1").onsubmit = async (ev) => {
	ev.preventDefault();
	const deviceIdRaw = document.getElementById("devid").value;
	const resp = await fetch(`${window.local.apiRoot}device/${deviceIdRaw}`, {
		method: "GET",
		credentials: "omit",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const content = await resp.json();
	if (content.error) {
		swal(banana.i18n("no-device-id"));
		return;
	}
	userInfo = {};
	userInfo.name = document.getElementById("name").value;
	userInfo.short_name = document.getElementById("sname").value;
	userInfo.devid = document.getElementById("devid").value;
	window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
	document.getElementById("p1").classList.add("d-none");
	document.getElementById("user-summary").textContent =
		`${userInfo.name} (${userInfo.short_name}) - ${userInfo.devid}`;
	document.getElementById("p0").classList.remove("d-none");
	fetchEvents();
};
document.getElementById("form2").onsubmit = (ev) => {
	ev.preventDefault();
	data = {
		event_id: document.getElementById("events").value,
		name: document.getElementById("name").value,
		short_name: document.getElementById("sname").value,
		device_id: document.getElementById("devid").value,
	};
	if (!data.event_id) {
		return;
	}
	fetch(`${window.local.apiRoot}competitors/`, {
		method: "POST",
		credentials: "include",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
			"X-CSRFToken": window.local.csrfToken,
		},
		body: JSON.stringify(data),
	})
		.then((r) => r.json())
		.then((data) => {
			if (!data.id) {
				if (Array.isArray(data)) {
					swal({
						html: true,
						title: banana.i18n("error"),
						text: data
							.map((errorMessageEn) => {
								const errorMessage = banana.i18n(errorMessages[errorMessageEn]);
								return `<small>- ${errorMessage}.</small>`;
							})
							.join("<br/>"),
					});
				} else {
					swal(banana.i18n("error"));
				}
				return;
			}
			document.getElementById("p2").classList.add("d-none");
			document.getElementById("p4").classList.remove("d-none");
		})
		.catch((e) => {
			swal(banana.i18n("error"));
		});
};
Array.from(document.getElementsByClassName("user-setting-btn")).map((el) => {
	el.addEventListener("click", (e) => {
		document.getElementById("p2").classList.add("d-none");
		document.getElementById("p3").classList.add("d-none");
		document.getElementById("p4").classList.add("d-none");
		document.getElementById("p0").classList.add("d-none");
		document.getElementById("p1").classList.remove("d-none");
	});
});
Array.from(document.getElementsByClassName("refresh-btn")).map((el) => {
	el.addEventListener("click", (e) => {
		window.location.reload();
	});
});
function onEventSelect() {
	const select = document.getElementById("events");
	const value = select.options[select.selectedIndex].value;
	if (!value) {
		document.getElementById("warningA").classList.add("d-none");
		document.getElementById("warningB").classList.add("d-none");
		document.getElementById("register-btn").setAttribute("disabled", true);
		return;
	}
	document.getElementById("register-btn").removeAttribute("disabled");
	e = events.find((ev) => ev.id === value);
	if (dayjs(e.start_date) < dayjs()) {
		document.getElementById("warningA").classList.remove("d-none");
		document.getElementById("warningB").classList.add("d-none");
	} else {
		document.getElementById("warningA").classList.add("d-none");
		document.getElementById("warningB").classList.remove("d-none");
		document.getElementById("event_start_notice").innerHTML = banana.i18n(
			"registration-info-time",
			dayjs(e.start_date).local().locale(locale).format("LLLL"),
		);
	}
}
function fetchEvents() {
	fetch(`${window.local.apiRoot}events/`, { method: "GET" })
		.then((r) => r.json())
		.then((evs) => {
			events = evs
				.filter(
					(e) =>
						e.open_registration && (!e.end_date || dayjs(e.end_date) > dayjs()),
				)
				.map((e) => ({
					id: e.id,
					name: `${e.name} - ${e.club.name}`,
					start_date: e.start_date,
				}))
				.sort(
					(a, b) =>
						new Date(a.start_date) - new Date(b.start_date) ||
						a.name.localeCompare(b.name),
				);
			if (events.length === 0) {
				document.getElementById("p3").classList.remove("d-none");
			} else {
				document.getElementById("events").innerHTML = "";
				document.getElementById("p2").classList.remove("d-none");
				const optNull = document.createElement("option");
				optNull.setAttribute("value", "");
				optNull.appendChild(document.createTextNode("-----"));
				document.getElementById("events").appendChild(optNull);
				for (const ev of events) {
					const opt = document.createElement("option");
					opt.setAttribute("value", ev.id);
					opt.appendChild(document.createTextNode(ev.name));
					document.getElementById("events").appendChild(opt);
				}
				onEventSelect({ target: { value: events[0].id } });
			}
		});
}
