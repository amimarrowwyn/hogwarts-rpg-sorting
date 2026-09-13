const quizQuestions = [
  {
    title: "1. Under high pressure or conflict, what is your natural reaction?",
    options: [
      { text: "Stay calm, analyze the situation, and seek the most strategic/informed answer.", house: "Ravenclaw" },
      { text: "Act quickly and stand brave to defend your friends.", house: "Gryffindor" },
      { text: "Keep distance, protect personal boundary, and identify opponent weaknesses.", house: "Slytherin" },
      { text: "Seek peace and ensure everyone is safe and accounted for.", house: "Hufflepuff" }
    ]
  },
  {
    title: "2. In HexRPG, which practical magic subject interests you most?",
    options: [
      { text: "Herbology & Charms — Theoretical mastery and plant/incantation magic.", house: "Ravenclaw", sub: "Herbology & Charms" },
      { text: "Defense Against the Dark Arts & Curses — Combat techniques & self-defense.", house: "Slytherin", sub: "DADA & Curses" },
      { text: "Potions & Transfiguration — Precision and survival alchemy.", house: "Slytherin", sub: "Potions & Transfiguration" },
      { text: "Healing & Magic Cooking — Care arts and everyday practical spellwork.", house: "Hufflepuff", sub: "Healing & Magic Cooking" }
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
      { text: "The Schism (Dual-Living) — Ability to isolate reality and magic minds seamlessly.", ability: "The Schism (Dual-Mind Isolation)" },
      { text: "The Sight — Intuitive foresight to sense danger before it happens.", ability: "The Sight (Intuitive Foresight)" },
      { text: "Wild Resonance — Natural ability to communicate with magical flora.", ability: "Wild Resonance (Botanical Empathy)" }
    ]
  },
  {
    title: "5. Final Choice: Is there a specific House YOU WANT to belong to?",
    options: [
      { text: "Slytherin — I know where I belong.", pref: "Slytherin" },
      { text: "Ravenclaw — Where minds are sharpest.", pref: "Ravenclaw" },
      { text: "Gryffindor — Where the brave reside.", pref: "Gryffindor" },
      { text: "Hufflepuff — Where loyalty comes first.", pref: "Hufflepuff" },
      { text: "Let the Sorting Hat decide based on my answers.", pref: "none" }
    ]
  }
];

let currentQuestion = 0;
let scores = { Slytherin: 0, Ravenclaw: 0, Gryffindor: 0, Hufflepuff: 0 };
let chosenSubject = "Herbology & Charms";
let chosenAnimal = "Black Barn Owl";
let chosenAbility = "The Schism (Dual-Mind Isolation)";
let housePreference = "none";

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
  if (opt.sub) chosenSubject = opt.sub;
  if (opt.animal) chosenAnimal = opt.animal;
  if (opt.ability) chosenAbility = opt.ability;
  if (opt.pref) housePreference = opt.pref;

  currentQuestion++;
  if (currentQuestion < quizQuestions.length) {
    renderQuestion();
  } else {
    processFinalResults();
  }
}

function processFinalResults() {
  document.getElementById('quiz-container').style.display = 'none';
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

  document.getElementById('sheet-subjects').innerHTML = `
    <ul style="padding-left:18px; margin:5px 0;">
      <li><strong>Core Focus:</strong> ${chosenSubject} (Theoretical Mastery)</li>
      <li><strong>Defense Against the Dark Arts:</strong> Practical Combat</li>
      <li><strong>Potions & Transfiguration:</strong> Survival Alchemy</li>
      <li><strong>Magic Cooking & Healing:</strong> Specialized Craft</li>
    </ul>
  `;

  document.getElementById('sheet-swot').innerHTML = `
    <li><strong>Strength:</strong> Strong theoretical mind, mastery over Charms & Herbology.</li>
    <li><strong>Weakness:</strong> Tendency towards intense self-isolation and overthinking.</li>
    <li><strong>Opportunity:</strong> Dual-living ability bridges practical logic with magical prowess.</li>
    <li><strong>Threat:</strong> Over-reliance on self-shielding mechanisms.</li>
  `;

  document.getElementById('id-name').innerText = "Ami";
  document.getElementById('id-house').innerText = house;
  document.getElementById('id-specialty').innerText = chosenSubject;

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
