// light/dark mode toggle function
export function setLightMode(boolean) {
  if (boolean) {
    localStorage.setItem("td_light_mode", "1");
    document.querySelector("html").setAttribute("data-bs-theme", "light");
    document.querySelector("#light-dark-toggle>i").classList = "fs-3 bi bi-sun-fill"
  }
  else {
    localStorage.setItem("td_light_mode", "0");
    document.querySelector("html").setAttribute("data-bs-theme", "dark");
    document.querySelector("#light-dark-toggle>i").classList = "fs-3 bi bi-moon-stars-fill"
  }
}