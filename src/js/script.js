import { setLightMode } from "./util";

// First visit
if (!localStorage.getItem("td_light_mode")) {
  localStorage.setItem("td_light_mode", "1");
} else {
  setLightMode(Boolean(Number(localStorage.getItem("td_light_mode"))));
}

// Add light/dark mode toggle
document.getElementById("light-dark-toggle").addEventListener('click', function() {
  const isLightMode = Boolean(Number(localStorage.getItem("td_light_mode")));
  if (isLightMode) {
    setLightMode(false);
  }
  else {
    setLightMode(true);
  }
});