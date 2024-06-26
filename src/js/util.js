import tenses from "./tenses";

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

// App main function
export function newQNA() {

  // Randomize form
  const forms = ['Affirmative', 'Negative'];
  const questionForm = forms[Math.floor(Math.random() * forms.length)];
  const answerForm = forms[Math.floor(Math.random() * forms.length)];

  // Randomize subject
  const subjects = ['I', 'He', 'She', 'It', 'You', 'We', 'They'];
  const subject = subjects[Math.floor(Math.random() * subjects.length)];

  // Set verb based on tenses
  const verbs = [
    {
      v1: 'learn',
      vs: 'learns',
      ving: 'learning',
      v2: 'learned',
      v3: 'learnt',
    },
    {
      v1: 'teach',
      vs: 'teaches',
      ving: 'teaching',
      v2: 'taught',
      v3: 'taught',
    },
  ];
  const verb = verbs[Math.floor(Math.random() * verbs.length)];

  // Get object
  const objects = ['tenses', 'math'];
  const object = objects[Math.floor(Math.random() * objects.length)];

  // Randomize question and answer tense
  const sessionTenses = [...tenses];
  console.log(sessionTenses.length);
  const [ questionTense ] = sessionTenses.splice(Math.floor(Math.random() * sessionTenses.length), 1);
  const [ answerTense ] = sessionTenses.splice(Math.floor(Math.random() * sessionTenses.length), 1);

  // Arrange sentence based on choosen tenses
  const questionSentence = questionTense.arrangeSentence(subject, verb, object, questionForm);
  const answerSentence = answerTense.arrangeSentence(subject, verb, object, answerForm);

  return { questionForm, questionTense, questionSentence, answerForm, answerTense, answerSentence };
}

export function showQNA(questionSentence, answerTense, answerForm) {
  document.querySelector('#quiz');
  // Update new question on UI
  document.querySelector('#question').textContent = questionSentence;
  // Update instruction on UI
  document.querySelector('#instruction').innerHTML = `Change to <b>${answerForm} ${answerTense.name}</b> sentence`;
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
  // Hide previous review
  if (document.querySelector('#review')) {
    document.querySelector('#review').style.visibility = 'hidden';
  }
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
  document.querySelector('#review').style.visibility = '';
  document.getElementById("reset-button").focus({focusVisible: true});
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