// light/dark mode toggle function
export function setLightMode(boolean) {
  if (boolean) {
    localStorage.setItem("td_light_mode", "1");
    document.querySelector("html").setAttribute("data-bs-theme", "light");
    document.querySelector("#light-dark-toggle>i").classList = "fs-5 bi bi-sun-fill";
  }
  else {
    localStorage.setItem("td_light_mode", "0");
    document.querySelector("html").setAttribute("data-bs-theme", "dark");
    document.querySelector("#light-dark-toggle>i").classList = "fs-5 bi bi-moon-stars-fill";
  }
}

export function setQuestionTense() {
  const tenses = [
    // pa = past | pr = present | f = future
    // s = simple 
    'spr',
    'spa',
    'sf',
  ];
  const [ questionTenses ] = tenses.splice(Math.floor(Math.random() * tenses.length), 1);
  const [ answerTenses ] = tenses.splice(Math.floor(Math.random() * tenses.length), 1);
  return { questionTenses, answerTenses };
}