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
    title: "1. What is your magical lineage and blood heritage?",
    options: [
      { text: "Pure-Blood — Deep wizarding roots across centuries.", blood: "Pure-Blood" },
      { text: "Half-Blood — Raised between magical and non-magical worlds.", blood: "Half-Blood" },
      { text: "Muggle-Born — The first in my family to unleash magic.", blood: "Muggle-Born" },
      { text: "Mysterious / Unknown Ancestry — My origins remain hidden.", blood: "Unknown Lineage" }
    ]
  },
  {
    title: "2. Under high pressure or conflict, what is your natural reaction?",
    options: [
      { text: "Stay calm, analyze the situation, and seek the most strategic answer.", house: "Ravenclaw" },
      { text: "Act quickly and stand brave to defend your peers.", house: "Gryffindor" },
      { text: "Keep distance, protect personal boundary, and identify opponent weaknesses.", house: "Slytherin" },
      { text: "Seek peace and ensure everyone is safe and accounted for.", house: "Hufflepuff" }
    ]
  },
  {
    title: "3. Which companion animal best reflects your personal energy?",
    options: [
      { text: "Black Barn Owl — Calm, night observer, swift message deliverer.", animal: "Black Barn Owl" },
      { text: "Shadow Cat — Independent, quiet, sharp instinct.", animal: "Shadow Cat" },
      { text: "Raven — Intelligent, secret gatherer, mysterious.", animal: "Raven" },
      { text: "Viper / Snake — Calm but formidable when provoked.", animal: "Viper" }
    ]
  },
  {
    title: "4. What rare ability or trait resonates most with your inner self?",
    options: [
      { text: "The Schism — Ability to isolate reality and magic minds seamlessly.", ability: "The Schism (Dual-Mind Isolation)" },
      { text: "The Sight — Intuitive foresight to sense danger before it happens.", ability: "The Sight (Intuitive Foresight)" },
      { text: "Wild Resonance — Natural ability to communicate with magical flora.", ability: "Wild Resonance (Botanical Empathy)" },
      { text: "Parseltongue — Innate capacity to speak and comprehend serpentine languages.", ability: "Parseltongue (Serpent Speech)" },
      { text: "Metamorphmagus — Rare capability to alter physical appearance at will.", ability: "Metamorphmagus (Shape Alteration)" },
      { text: "Legilimency — Skill to navigate and extract thoughts from another's mind.", ability: "Legilimency (Mind Navigation)" }
    ]
  },
  {
    title: "5. Final Choice: Is there a specific House YOU WANT to belong to?",
    options: [
      { text: "Slytherin — Ambition, cunning, and resourcefulness.", pref: "Slytherin" },
      { text: "Ravenclaw — Wisdom, intellect, and curiosity.", pref: "Ravenclaw" },
      { text: "Gryffindor — Bravery, daring, and chivalry.", pref: "Gryffindor" },
      { text: "Hufflepuff — Loyalty, patience, and dedication.", pref: "Hufflepuff" },
      { text: "Let the Sorting Hat decide based on my answers.", pref: "none" }
    ]
  }
];

let playerName = "";
let currentQuestion = 0;
let scores = { Slytherin: 0, Ravenclaw: 0, Gryffindor: 0, Hufflepuff: 0 };
let chosenBlood = "Pure-Blood";
let chosenAnimal = "Black Barn Owl";
let chosenAbility = "The Schism (Dual-Mind Isolation)";
let housePreference = "none";
let selectedSubjects = [];

function startQuiz() {
  const input = document.getElementById('player-name-input').value.trim();
  if (!input) {
    alert("Please enter your name to proceed into Hogwarts!");
    return;
  }
  playerName = input;
  document.getElementById('name-container').style.display = 'none';
  document.getElementById('quiz-container').style.display = 'block';
  renderQuestion();
}

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
  if (opt.blood) chosenBlood = opt.blood;
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

  availableSubjects.forEach((sub) => {
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
    selectedSubjects.push(checkbox.value);
  } else {
    selectedSubjects = selectedSubjects.filter(name => name !== checkbox.value);
  }
  document.getElementById('selected-count').innerText = selectedSubjects.length;
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
      noteText = `The Sorting Hat fully agrees with your inner instincts! You naturally and by personal choice belong to **${finalHouse}**.`;
    } else {
      noteText = `The Sorting Hat sensed strong **${naturalHouse}** traits — but the Hat honors personal choice. You have been placed in **${finalHouse}**.`;
    }
  } else {
    noteText = `The Sorting Hat searched your mind and made its decision without hesitation: **${finalHouse}**!`;
  }

  renderOutputs(finalHouse, noteText);
}

function renderOutputs(house, note) {
  const houseIcons = {
    Slytherin: "🐍",
    Gryffindor: "🦁",
    Ravenclaw: "🦅",
    Hufflepuff: "🦡"
  };

  document.getElementById('sheet-name').innerText = playerName;
  document.getElementById('sheet-blood').innerText = chosenBlood;
  document.getElementById('sheet-house').innerText = house;
  document.getElementById('sorting-hat-note').innerHTML = note;
  document.getElementById('sheet-wand').innerText = "12½ inches, Ebony Wood with Dragon Heartstring Core";
  document.getElementById('sheet-companion').innerText = chosenAnimal;
  document.getElementById('sheet-ability').innerText = chosenAbility;

  let subjectListHTML = "";
  if (selectedSubjects.length > 0) {
    subjectListHTML = selectedSubjects.map(subName => {
      const detail = availableSubjects.find(s => s.name === subName);
      return `<li><strong>${detail.name}:</strong> ${detail.desc}</li>`;
    }).join('');
  } else {
    subjectListHTML = "<li><em>No elective subjects chosen. Core curriculum assigned.</em></li>";
  }

  document.getElementById('sheet-subjects').innerHTML = subjectListHTML;

  document.getElementById('sheet-swot').innerHTML = `
    <li><strong>Strength:</strong> Deep adaptability combined with unique ${chosenAbility}.</li>
    <li><strong>Weakness:</strong> Susceptible to over-analysing decisions under critical pressure.</li>
    <li><strong>Opportunity:</strong> Ability to leverage ${chosenBlood} heritage to bridge magical arts.</li>
    <li><strong>Threat:</strong> Over-reliance on personal shields in unfamiliar environments.</li>
  `;

  // Student ID Card Fields
  document.getElementById('id-name').innerText = playerName;
  document.getElementById('id-house').innerText = house;
  document.getElementById('id-blood').innerText = chosenBlood;
  document.getElementById('id-electives-count').innerText = `${selectedSubjects.length} Enrolled`;
  document.getElementById('id-house-icon').innerText = houseIcons[house] || "⚡";

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
