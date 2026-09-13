const availableSubjects = [
  { name: "Transfiguration", desc: "Learning to change the physical form and properties of objects." },
  { name: "Charms", desc: "Learning to cast spells that add or alter properties of an object or person." },
  { name: "Potions", desc: "Mixing magical ingredients in cauldrons to create potions, antidotes, and elixirs." },
  { name: "History of Magic", desc: "Studying past wizarding events, goblin rebellions, and magic history taught by a ghost." },
  { name: "Defence Against the Dark Arts", desc: "Learning protective and defensive spells against dark creatures and curses." },
  { name: "Astronomy", desc: "Observing stars, planets, and moons from the Astronomy Tower." },
  { name: "Herbology", desc: "Studying and caring for magical plants, fungi, and botanical ingredients." },
  { name: "Flying", desc: "Mastering broomstick flight, aerial control, and magical maneuvers." },
  { name: "Care of Magical Creatures", desc: "Studying, feeding, and handling beasts like Hippogriffs and Thestrals." },
  { name: "Divination", desc: "Attempting to foresee the future using crystal balls, tea leaves, and palmistry." },
  { name: "Arithmancy", desc: "A complex, number-based branch of magic related to magical properties of numbers." },
  { name: "Study of Ancient Runes", desc: "Translating and interpreting old magical scripts and symbols." },
  { name: "Muggle Studies", desc: "Understanding non-magical society, technology, and culture." },
  { name: "Alchemy", desc: "Exploring the transmutation of substances and the magical nature of elements." }
];

const quizQuestions = [
  {
    title: "1. Under high pressure or conflict, what is your natural reaction?",
    options: [
      { text: "Stay calm, analyze the situation, and seek the most strategic answer.", house: "Ravenclaw" },
      { text: "Act quickly and stand brave to defend your peers.", house: "Gryffindor" },
      { text: "Keep distance, protect personal boundary, and identify opponent weaknesses.", house: "Slytherin" },
      { text: "Seek peace and ensure everyone is safe and accounted for.", house: "Hufflepuff" }
    ]
  },
  {
    title: "2. Which companion animal best reflects your personal energy?",
    options: [
      { text: "Black Barn Owl — Calm, night observer, swift message deliverer.", animal: "Black Barn Owl" },
      { text: "Shadow Cat — Independent, quiet, sharp instinct.", animal: "Shadow Cat" },
      { text: "Raven — Intelligent, secret gatherer, mysterious.", animal: "Raven" },
      { text: "Viper / Snake — Calm but formidable when provoked.", animal: "Viper" }
    ]
  },
  {
    title: "3. What rare ability or trait resonates most with your inner self?",
    options: [
      { text: "The Schism — Ability to isolate reality and magic minds seamlessly.", ability: "The Schism (Dual-Mind Isolation)" },
      { text: "The Sight — Intuitive foresight to sense danger before it happens.", ability: "The Sight (Intuitive Foresight)" },
      { text: "Wild Resonance — Natural ability to communicate with magical flora.", ability: "Wild Resonance (Botanical Empathy)" }
    ]
  },
  {
    title: "4. Final Choice: Is there a specific House YOU WANT to belong to?",
    options: [
      { text: "Slytherin — Ambition and resourcefulness.", pref: "Slytherin" },
      { text: "Ravenclaw — Wisdom and intellect.", pref: "Ravenclaw" },
      { text: "Gryffindor — Bravery and chivalry.", pref: "Gryffindor" },
      { text: "Hufflepuff — Loyalty and dedication.", pref: "Hufflepuff" },
      { text: "Let the Sorting Hat decide based on my answers.", pref: "none" }
    ]
  }
];

let currentQuestion = 0;
let scores = { Slytherin: 0, Ravenclaw: 0, Gryffindor: 0, Hufflepuff: 0 };
let chosenAnimal = "Black Barn Owl";
let chosenAbility = "The Schism (Dual-Mind Isolation)";
let housePreference = "none";
let selectedSubjects = [];

function renderQuestion() {
  const q = quizQuestions[currentQuestion];
  document.getElementById('question-title').innerText = q.title;
  const container = document.getElementById('options-container');
  container.innerHTML = '';

  q.options.forEach((opt) => {
    const btn = document.createElement('button');
    btn.className = 'question-option';
    btn.innerText = opt.text;
    btn.onclick = () => selectOption(opt);
    container.appendChild(btn);
  });
}

function selectOption(opt) {
  if (opt.house) scores[opt.house]++;
  if (opt.animal) chosenAnimal = opt.animal;
  if (opt.ability) chosenAbility = opt.ability;
  if (opt.pref) housePreference = opt.pref;

  currentQuestion++;
  if (currentQuestion < quizQuestions.length) {
    renderQuestion();
  } else {
    showSubjectSelection();
  }
}

function showSubjectSelection() {
  document.getElementById('quiz-container').style.display = 'none';
  document.getElementById('subject-selection-container').style.display = 'block';

  const grid = document.getElementById('subject-grid');
  grid.innerHTML = '';

  availableSubjects.forEach((sub, index) => {
    const item = document.createElement('label');
    item.className = 'subject-item';
    item.innerHTML = `
      <input type="checkbox" value="${sub.name}" onchange="toggleSubject(this)">
      <div class="subject-info">
        <span class="subject-name">${sub.name}</span>
        <span>${sub.desc}</span>
      </div>
    `;
    grid.appendChild(item);
  });
}

function toggleSubject(checkbox) {
  if (checkbox.checked) {
    if (selectedSubjects.length >= 10) {
      checkbox.checked = false;
      alert("You can only select up to 10 subjects!");
      return;
    }
    selectedSubjects.push(checkbox.value);
  } else {
    selectedSubjects = selectedSubjects.filter(name => name !== checkbox.value);
  }

  document.getElementById('selected-count').innerText = selectedSubjects.length;
  const btn = document.getElementById('submit-subjects-btn');
  btn.disabled = selectedSubjects.length !== 10;
}

function confirmSubjects() {
  document.getElementById('subject-selection-container').style.display = 'none';
  processFinalResults();
}

function processFinalResults() {
  document.getElementById('results-container').style.display = 'block';

  let naturalHouse = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

  let finalHouse = naturalHouse;
  let noteText = "";

  if (housePreference !== "none") {
    finalHouse = housePreference;
    if (housePreference === naturalHouse) {
      noteText = `The Sorting Hat fully agrees with your instincts! You naturally and by choice belong to **${finalHouse}**.`;
    } else {
      noteText = `The Sorting Hat sensed strong **${naturalHouse}** traits in your answers — but the Hat always honors personal choice. You have been placed in **${finalHouse}**.`;
    }
  } else {
    noteText = `The Sorting Hat searched your mind and made its decision without hesitation: **${finalHouse}**!`;
  }

  renderOutputs(finalHouse, noteText);
}

function renderOutputs(house, note) {
  document.getElementById('sheet-name').innerText = "Ami (Alter Ego)";
  document.getElementById('sheet-house').innerText = house;
  document.getElementById('sorting-hat-note').innerHTML = note;
  document.getElementById('sheet-wand').innerText = "12½ inches, Ebony Wood with Dragon Heartstring Core";
  document.getElementById('sheet-companion').innerText = chosenAnimal;
  document.getElementById('sheet-ability').innerText = chosenAbility;

  const subjectListHTML = selectedSubjects.map(subName => {
    const detail = availableSubjects.find(s => s.name === subName);
    return `<li><strong>${detail.name}:</strong> ${detail.desc}</li>`;
  }).join('');

  document.getElementById('sheet-subjects').innerHTML = subjectListHTML;

  document.getElementById('sheet-swot').innerHTML = `
    <li><strong>Strength:</strong> Versatile mastery across 10 specialized academic disciplines.</li>
    <li><strong>Weakness:</strong> High potential for academic burnout due to a heavy 10-subject course load.</li>
    <li><strong>Opportunity:</strong> Dual-living ability bridges practical logic with broad magical knowledge.</li>
    <li><strong>Threat:</strong> Over-reliance on self-shielding mechanisms in stressful environments.</li>
  `;

  document.getElementById('id-name').innerText = "Ami";
  document.getElementById('id-house').innerText = house;

  const houseQuotes = {
    Slytherin: '"Greatness awaits those who have the ambition to seize it."',
    Ravenclaw: '"Wit beyond measure is man\'s greatest treasure."',
    Gryffindor: '"Where dwell the brave at heart, their daring and chivalry set them apart."',
    Hufflepuff: '"Where those are real and loyal, patient and true."'
  };

  document.getElementById('congrats-house').innerText = house;
  document.getElementById('congrats-quote').innerText = houseQuotes[house] || "";
}

function exportToImage(elementId, fileName) {
  const target = document.getElementById(elementId);
  html2canvas(target, { scale: 2, useCORS: true }).then(canvas => {
    const link = document.createElement('a');
    link.download = fileName;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }).catch(err => {
    alert("Failed to export image. Please try again.");
  });
}

window.onload = renderQuestion;
