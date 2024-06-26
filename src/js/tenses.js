const tenses = [
  // s = simple | c = continous | p = perfect | pc = perfect continous
  // pa = past | pr = present | f = future
  // Simple
  {
    id: 'spr',
    name: 'Simple Present',
    formula: {
      Affirmative: 'S + V1(-s) + O',
      Negative: 'S + do/does not + V1 + O',
    },
    arrangeSentence: (subject, verb, object, form) => {
      switch (form) {
        case 'Affirmative':
          if (['He', 'She', 'It'].includes(subject)) {
            return `${subject} ${verb.vs} ${object}`;
          } else {
            return `${subject} ${verb.v1} ${object}`;
          }
        case 'Negative':
          if (['He', 'She', 'It'].includes(subject)) {
            return `${subject} does not ${verb.v1} ${object}`;
          } else {
            return `${subject} do not ${verb.v1} ${object}`;
          }
        default:
          break;
      }
    },
  },
  {
    id: 'spa',
    name: 'Simple Past',
    formula: {
      Affirmative: 'S + V2 + O',
      Negative: 'S + did not + V1 + O',
    },
    arrangeSentence: (subject, verb, object, form) => {
      switch (form) {
        case 'Affirmative':
          return `${subject} ${verb.v2} ${object}`;
        case 'Negative':
          return `${subject} did not ${verb.v1} ${object}`;
        default:
          break;
      }      
    },
  },
  {
    id: 'sf',
    name: 'Simple Future',
    formula: {
      Affirmative: 'S + will + V1 + O',
      Negative: 'S + will not + V1 + O',
    },
    arrangeSentence: (subject, verb, object, form) => {
      switch (form) {
        case 'Affirmative':
          return `${subject} will ${verb.v1} ${object}`;
        case 'Negative':
          return `${subject} will not ${verb.v1} ${object}`;
        default:
          break;
      }
    },
  },
  // Continuous
  {
    id: 'prc',
    name: 'Present Continuous',
    formula: {
      Affirmative: 'S + be (am/is/are) + Ving + O',
      Negative: 'S + be (am/is/are) + not + Ving + O',
    },
    arrangeSentence: (subject, verb, object, form) => {
      switch (form) {
        case 'Affirmative':
          if (['He', 'She', 'It'].includes(subject)) {
            return `${subject} is ${verb.ving} ${object}`;
          } else if (['You', 'They', 'We'].includes(subject)) {
            return `${subject} are ${verb.ving} ${object}`;
          } else {
            return `${subject} am ${verb.ving} ${object}`;
          }
        case 'Negative':
          if (['He', 'She', 'It'].includes(subject)) {
            return `${subject} is not ${verb.ving} ${object}`;
          } else if (['You', 'They', 'We'].includes(subject)) {
            return `${subject} are not ${verb.ving} ${object}`;
          } else {
            return `${subject} am not ${verb.ving} ${object}`;
          }
        default:
          break;
      }
    },
  },
  {
    id: 'pac',
    name: 'Past Continuous',
    formula: {
      Affirmative: 'S + be (was/were) + Ving + O',
      Negative: 'S + be (was/were) + not + Ving + O',
    }, 
    arrangeSentence: (subject, verb, object, form) => {
      switch (form) {
        case 'Affirmative':
          if (['You', 'They', 'We'].includes(subject)) {
            return `${subject} were ${verb.ving} ${object}`;
          } else {
            return `${subject} was ${verb.ving} ${object}`;
          }
        case 'Negative':
          if (['You', 'They', 'We'].includes(subject)) {
            return `${subject} were not ${verb.ving} ${object}`;
          } else {
            return `${subject} was not ${verb.ving} ${object}`;
          }
        default:
          break;
      }
    },
  },
  {
    id: 'fc',
    name: 'Future Continuous',
    formula: {
      Affirmative: 'S + will be + V-ing + O',
      Negative: 'S + will not be + V-ing + O',
    }, 
    arrangeSentence: (subject, verb, object, form) => {
      switch (form) {
        case 'Affirmative':
          return `${subject} will be ${verb.ving} ${object}`
        case 'Negative':
          return `${subject} will not be ${verb.ving} ${object}`
        default:
          break;
      }
    },
  },
  // Perfect
  {
    id: 'prp',
    name: 'Present Perfect',
    formula: {
      Affirmative: 'S + have/has + V3 + O',
      Negative: 'S + have/has + not + V3 + O',
    },
    arrangeSentence: (subject, verb, object, form) => {
      switch (form) {
        case 'Affirmative':
          if (['He', 'She', 'It'].includes(subject)) {
            return `${subject} has ${verb.v3} ${object}`;
          } else {
            return `${subject} have ${verb.v3} ${object}`;
          }
        case 'Negative':
          if (['He', 'She', 'It'].includes(subject)) {
            return `${subject} has not ${verb.v3} ${object}`;
          } else {
            return `${subject} have not ${verb.v3} ${object}`;
          }
        default:
          break;
      }
    },
  },
  {
    id: 'pap',
    name: 'Past Perfect',
    formula: {
      Affirmative: 'S + had + V3 + O',
      Negative: 'S + had not + V3 + O',
    },
    arrangeSentence: (subject, verb, object, form) => {
      switch (form) {
        case 'Affirmative':
          return `${subject} had ${verb.v3} ${object}`;
        case 'Negative':
          return `${subject} had not ${verb.v3} ${object}`;
        default:
          break;
      }
    },
  },
  {
    id: 'fp',
    name: 'Future Perfect',
    formula: {
      Affirmative: 'S + will have + V3 + O',
      Negative: 'S + will not have + V3 + O',
    },
    arrangeSentence: (subject, verb, object, form) => {
      switch (form) {
        case 'Affirmative':
          return `${subject} will have ${verb.v3} ${object}`;
        case 'Negative':
          return `${subject} will not have ${verb.v3} ${object}`;
        default:
          break;
      }
    },
  },
  // Perfect Continuous
  {
    id: 'prpc',
    name: 'Present Perfect Continuous',
    formula: {
      Affirmative: 'S + have/has + been + V-ing + O',
      Negative: 'S + have/has + not been + V-ing + O',
    },
    arrangeSentence: (subject, verb, object, form) => {
      switch (form) {
        case 'Affirmative':
          if (['He', 'She', 'It'].includes(subject)) {
            return `${subject} has been ${verb.ving} ${object}`;
          } else {
            return `${subject} have been ${verb.ving} ${object}`;
          }
        case 'Negative':
          if (['He', 'She', 'It'].includes(subject)) {
            return `${subject} has not been ${verb.ving} ${object}`;
          } else {
            return `${subject} have not been ${verb.ving} ${object}`;
          }
        default:
          break;
      }
    },
  },
  {
    id: 'papc',
    name: 'Past Perfect Continuous',
    formula: {
      Affirmative: 'S + had been + V-ing + O',
      Negative: 'S + had not been + V-ing + O',
    },
    arrangeSentence: (subject, verb, object, form) => {
      switch (form) {
        case 'Affirmative':
          return `${subject} had been ${verb.ving} ${object}`;
        case 'Negative':
          return `${subject} had not been ${verb.ving} ${object}`;
        default:
          break;
      }
    },
  },
  {
    id: 'fpc',
    name: 'Future Perfect Continuous',
    formula: {
      Affirmative: 'S + will have been + V-ing + O',
      Negative: 'S + will not have been + V-ing + O',
    },
    arrangeSentence: (subject, verb, object, form) => {
      switch (form) {
        case 'Affirmative':
          return `${subject} will have been ${verb.ving} ${object}` ;
        case 'Negative':
          return `${subject} will not have been ${verb.ving} ${object}` ;
        default:
          break;
      }
    },
  },
];

export default tenses;