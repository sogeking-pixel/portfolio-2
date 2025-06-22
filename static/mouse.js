const customCursor = document.querySelector(".custom-cursor");
const links = document.querySelectorAll("a");
const elements = document.querySelectorAll(".cursor-element");

let mouseMoved = false;

document.addEventListener("mousemove", (e) => {
  if (!mouseMoved) {
    customCursor.classList.add("active");
    mouseMoved = true;
  }

  customCursor.style.left = `${e.clientX}px`;
  customCursor.style.top = `${e.clientY}px`;
});

links.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    customCursor.classList.add("expanded");
  });

  link.addEventListener("mouseleave", () => {
    customCursor.classList.remove("expanded");
  });
});

elements.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    customCursor.classList.add("expanded");
  });

  element.addEventListener("mouseleave", () => {
    customCursor.classList.remove("expanded");
  });
});
