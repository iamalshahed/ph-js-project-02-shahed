const loadLesson = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";

  fetch(url) // return kore response er jonno.. promise of response. bole je vai thik ache ami tomake response dibo.. but direct kono data/value return kore na
    .then((res) => res.json()) // eita amake promise je ok vai ami tomake server theke pawa data-gulo json akare covert kore dibo!! 'kono value return kore na.. amake promise kore json data dewar jonno' --->> promise of json() data
    .then((json) => displayLesson(json.data)); // jei json data gulo pabo seigu ekta function er modde store kore diyechi.. eikhane 'json' name er parameter e sokol data store hobe
};

const loadLevelsWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelsWords(data.data));
};

// display levels words
const displayLevelsWords = (words) => {
  const wordContainer = document.getElementById("word__container");
  wordContainer.innerHTML = "";

  words.forEach((word) => {
    const wordCard = document.createElement("div");
    wordCard.innerHTML = `
    <p>card</p>
    `;
    wordContainer.append(wordCard);
  });
};

// datagulo ke display korte hobe
const displayLesson = (lessons) => {
  // 1. get the parent & empty innerHTML
  const levelContainer = document.getElementById("level__container");
  levelContainer.innerHTML = "";

  // 2. get into every lesson --->> loop chalano lagbe
  for (let lesson of lessons) {
    // 3. create an element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
        <button onclick="loadLevelsWord(${lesson.level_no})" class="btn btn-outline btn-primary">
            <span>
            <i class="ri-book-open-fill"></i>
            </span>
            Lesson - ${lesson.level_no}
        </button>
    `;

    // 4. appendChild --->> jei element ta create korlam seita ekhn parent div er sathe append kore ditesi
    levelContainer.appendChild(btnDiv);
  }
};

loadLesson();
