// Camel Case Formatting

document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((element) => {
	element.innerHTML = element.innerHTML.replace(/([a-z])([A-Z])/g, "$1<wbr>$2");
});