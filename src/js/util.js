import tenses from "./tenses";
import verbs from "./verbs";

// light/dark mode toggle function
export function setLightMode(boolean) {
  if (boolean) {
    localStorage.setItem("td_light_mode", "1");
    document.querySelector("html").setAttribute("data-bs-theme", "light");
    document.querySelector("#light-dark-toggle>i").classList = "fs-3 bi bi-sun-fill";
  }
  else {
    localStorage.setItem("td_light_mode", "0");
    document.querySelector("html").setAttribute("data-bs-theme", "dark");
    document.querySelector("#light-dark-toggle>i").classList = "fs-3 bi bi-moon-stars-fill";
  }
}

// sycronous timeout/sleep function
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// App main function
export function newQNA() {

  // Randomize form
  const forms = ['Affirmative', 'Negative', 'Question'];
  const questionForm = forms[Math.floor(Math.random() * forms.length)];
  const answerForm = forms[Math.floor(Math.random() * forms.length)];

  // Randomize subject
  const subjects = ['I', 'He', 'She', 'It', 'You', 'We', 'They'];
  const subject = subjects[Math.floor(Math.random() * subjects.length)];

  // Set verb based on tenses
  const verb = verbs[Math.floor(Math.random() * verbs.length)];

  // Get object
  const objects = ['tenses', 'math'];
  const object = objects[Math.floor(Math.random() * objects.length)];

  // Randomize question and answer tense
  const sessionTenses = [...tenses];
  const [ questionTense ] = sessionTenses.splice(Math.floor(Math.random() * sessionTenses.length), 1);
  const [ answerTense ] = sessionTenses.splice(Math.floor(Math.random() * sessionTenses.length), 1);

  // Arrange sentence based on choosen tenses
  const questionSentence = questionTense.arrangeSentence(subject, verb, object, questionForm);
  const answerSentence = answerTense.arrangeSentence(subject, verb, object, answerForm);

  // Randomize order type
  const orders = ['name']//, 'use'];
  const order = {type: orders[Math.floor(Math.random() * orders.length)]};
  // Randomize tenses use order
  if (order.type == 'use') {
    order.value = answerTense.use[Math.floor(Math.random() * answerTense.use.length)];
  }

  return { questionForm, questionTense, questionSentence, order, answerForm, answerTense, answerSentence };
}

export async function showQNA(questionSentence, order, answerTense, answerForm) {

  // Hide previous question
  document.querySelector('#quiz').style.opacity = 0;

  // Hide previous review
  document.querySelector('#review').style.opacity = 0;
  document.querySelector('#review').style.visibility = 'hidden';

  await sleep(250);

  // Update new question on UI
  document.querySelector('#question').textContent = questionSentence;

  // Update order on UI
  switch (order) {
    case 'use':
      document.querySelector('#order').innerHTML = `Change sentence so it express <b>${order.value}</b>`;
      break;
    default:
      document.querySelector('#order').innerHTML = `Change to <b>${answerForm} ${answerTense.name} sentence</b>`;
      break;
  }

  // Reset answer form
  document.querySelector('#answer-form').value = '';
  document.querySelector('#answer-form').classList.remove('is-valid', 'is-invalid');
  document.querySelector('#answer-form').removeAttribute('disabled');
  document.querySelector('#answer-feedback').style.display = '';

  // Reset node with clone (to remove any event listener)
  const quizForm = document.querySelector('#quiz').cloneNode(true);
  document.querySelector('#quiz').replaceWith(quizForm);

  // Focus on answer form
  document.getElementById("answer-form").focus({focusVisible: true});

  // Show question
  document.querySelector('#quiz').style.opacity = 1;
}

function evalAnswer(answerSentence) {
  // Get user answer 
  const userSentence = document.querySelector('#answer-form').value;
  // Compare user answer and answerSentence and return boolean
  return userSentence === answerSentence;
}

function showAnswer(isInputsCorrect, answerSentence, answerTense, answerForm) {
  document.querySelector('#correct-answer').textContent = answerSentence;
  document.querySelector('#answer-formula').textContent = answerTense.formula[answerForm];
  document.querySelector('#review').style.visibility = 'visible';
  document.querySelector('#review').style.opacity = 1;
  setTimeout(() => {
    document.getElementById("reset-button").focus();
  }, 0);
}

export function handleFormSubmit(answerSentence, answerTense, answerForm, trial) {
  if (evalAnswer(answerSentence)) {
    document.querySelector('#answer-form').classList.remove('is-invalid');
    document.querySelector('#answer-form').classList.add('is-valid');
    document.querySelector('#answer-form').setAttribute('disabled', '');
    showAnswer(true, answerSentence, answerTense, answerForm);
  } else {
    if (trial > 1) {
      document.querySelector('#answer-form').classList.add('is-invalid');
      trial -= 1;
      document.querySelector('#answer-feedback').textContent = `${trial} chance${trial != 1 ? 's':''} left`;
    } else {
      document.querySelector('#answer-form').classList.add('is-invalid');
      document.querySelector('#answer-form').setAttribute('disabled', '');
      document.querySelector('#answer-feedback').style.display = 'none';
      showAnswer(false, answerSentence, answerTense, answerForm);
    }
  }
  return trial;
}

export function handleFormChange() {
  document.querySelector('#answer-form').classList.remove('is-invalid');
}