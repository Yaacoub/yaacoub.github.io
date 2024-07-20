// Cursor

let cursor = document.querySelector("#cursor");
let body = document.querySelector("body");

cursor.classList.remove("no-js");
document.addEventListener("mousemove", (e) => {
    cursor.style.top = e.clientY - 500 + "px";
    cursor.style.left = e.clientX - 500 + "px";
})