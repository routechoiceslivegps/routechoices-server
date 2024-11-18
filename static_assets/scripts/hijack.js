document.getElementById("djhj-hide-btn")?.addEventListener("click", (e) => {
	e.preventDefault();
	document.getElementById("djhj").style.display = "none";
});
if (window.location.host.split(".").at(-3) !== "www") {
	document.getElementById("djhj-release-btn").remove();
}
