// Camel Case Formatting

document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((element) => {
    element.innerHTML = element.innerHTML.replace(/([a-z])([A-Z])/g, "$1<wbr>$2");
});



// Code Formatting

document.addEventListener("DOMContentLoaded", (event) => {
    document.querySelectorAll("code").forEach((element) => {
        hljs.configure({languages: ["swift"]});
        hljs.highlightElement(element);
        let pattern = element.outerHTML.match(/\s*\n[\t\s]*/);
        element.innerHTML = element.innerHTML.trim();
        element.outerHTML = element.outerHTML.replace(new RegExp(pattern, "g"),"\n");
    });
});



// Code Link Decoration Color

document.querySelectorAll("a").forEach((element) => {
    if (element.querySelector("code") != null) {
        element.style.color = getComputedStyle(document.documentElement).getPropertyValue("--color-element-label-primary-alternate");
        element.style.textDecoration = "underline";
    };
});



// Social Links

document.querySelectorAll("article .social").forEach((element) => {
    let text = encodeURI(document.querySelector("title").innerHTML);
    let url = encodeURI(document.querySelector("link[rel*=\"canonical\"]").href);
    element.style.display = "grid";
    element.querySelectorAll("a.social-email").forEach((anchor) => {
        anchor.href = "mailto:yaapete.dev@gmail.com?subject=" + text + "&body=" + url;
    });
    element.querySelectorAll("a.social-twitter").forEach((anchor) => {
        anchor.href = "https://twitter.com/intent/tweet?text=" + text + "&url=" + url;
    });
    element.querySelectorAll("a.social-facebook").forEach((anchor) => {
        anchor.href = "https://www.facebook.com/sharer/sharer.php?u=" + url;
    });
});