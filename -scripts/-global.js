// Camel Case Formatting

document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((element) => {
	element.innerHTML = element.innerHTML.replace(/([a-z])([A-Z])/g, "$1<wbr>$2");
});



// Nav Height Calculation

function updateNavHeight() {
	document.querySelectorAll("nav").forEach((nav) => {
		nav.style.setProperty("--nav-height", `${nav.scrollHeight}px`);
	});
}

document.addEventListener("DOMContentLoaded", updateNavHeight);
window.addEventListener("resize", updateNavHeight);

document.fonts?.ready.then(updateNavHeight);



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



// Nav Submenu Height Calculation

function updateSubmenuHeights() {
	document.querySelectorAll("nav .submenu").forEach((submenu) => {
		submenu.style.setProperty(
			"--nav-submenu-height",
			`${submenu.scrollHeight}px`
		);
	});
}

document.addEventListener("DOMContentLoaded", updateSubmenuHeights);
window.addEventListener("resize", updateSubmenuHeights);

document.fonts?.ready.then(updateSubmenuHeights);