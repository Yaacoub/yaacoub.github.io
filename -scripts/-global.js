// Camel Case Formatting

document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((element) => {
	element.innerHTML = element.innerHTML.replace(/([a-z])([A-Z])/g, "$1<wbr>$2");
});



// Nav Height Calculation

let navHeightUpdatePending = false;

function updateNavHeights() {
	navHeightUpdatePending = false;

	const navs = [...document.querySelectorAll("nav")];
	const submenus = [...document.querySelectorAll("nav .submenu")];

	const navHeights = navs.map((nav) => nav.scrollHeight);
	const submenuHeights = submenus.map((submenu) => submenu.scrollHeight);

	navs.forEach((nav, index) => {
		nav.style.setProperty("--nav-height", `${navHeights[index]}px`);
	});

	submenus.forEach((submenu, index) => {
		submenu.style.setProperty("--nav-submenu-height", `${submenuHeights[index]}px`);
	});
}

function scheduleNavHeightUpdate() {
	if (navHeightUpdatePending) return;

	navHeightUpdatePending = true;
	requestAnimationFrame(updateNavHeights);
}

document.addEventListener("DOMContentLoaded", scheduleNavHeightUpdate);
window.addEventListener("resize", scheduleNavHeightUpdate);

document.fonts?.ready.then(scheduleNavHeightUpdate);



// Nav Hover Initialization

function suppressInitialNavHover() {
	requestAnimationFrame(() => {
		document
			.querySelectorAll("nav .nav-item.has-submenu:hover")
			.forEach((item) => {
				item.classList.add("suppress-hover");
				
				item.addEventListener(
					"pointerleave",
					() => item.classList.remove("suppress-hover"),
					{ once: true }
				);
			});
	});
}

document.addEventListener("DOMContentLoaded", suppressInitialNavHover);
