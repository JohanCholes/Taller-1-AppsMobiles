const wrapper = document.querySelector(".wrapper");
let isDown = false;
let startX;
let scrollLeft;

wrapper.addEventListener("mousedown", (e) => {
  isDown = true;
  wrapper.classList.add("active"); // Opcional: cambia el cursor mientras se arrastra
  startX = e.pageX - wrapper.offsetLeft;
  scrollLeft = wrapper.scrollLeft;
});

wrapper.addEventListener("mouseleave", () => {
  isDown = false;
  wrapper.classList.remove("active");
});

wrapper.addEventListener("mouseup", () => {
  isDown = false;
  wrapper.classList.remove("active");
});

wrapper.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - wrapper.offsetLeft;
  const walk = (x - startX) * 2; // Ajusta la velocidad del desplazamiento
  wrapper.scrollLeft = scrollLeft - walk;
});
