import { setLightMode, newQNA, showQNA, handleFormSubmit, handleFormChange } from "./util";

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

async function newSession() {
  // Set new session (for initiate or reset)
  let trial = 3;
  const session =  {...newQNA()};
  await showQNA(session.questionSentence, session.order, session.answerTense, session.answerForm);

  // Add event listener to answer form
  document.getElementById("quiz").addEventListener('submit', function(event) {
    trial = handleFormSubmit(session.answerSentence, session.answerTense, session.answerForm, trial);
    event.preventDefault();
  });
  document.getElementById("quiz").addEventListener('input', function(event) {
    handleFormChange();
    event.preventDefault();
  });

  // Add event listener to reset/newquestion button
  document.getElementById("reset-button").addEventListener('click', function(event) {
    newSession();
  }, {once: true});
}

newSession();
