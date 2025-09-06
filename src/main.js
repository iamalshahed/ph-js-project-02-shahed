const createElements = (arr) => {
  const htmlElems = arr.map((elm) => `<span class='btn'>${elm}</span>`);
  return htmlElems.join(" ");
};

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word__container").classList.add("hidden");
  } else {
    document.getElementById("word__container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const loadLesson = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";

  fetch(url) // return kore response er jonno.. promise of response. bole je vai thik ache ami tomake response dibo.. but direct kono data/value return kore na
    .then((res) => res.json()) // eita amake promise je ok vai ami tomake server theke pawa data-gulo json akare covert kore dibo!! 'kono value return kore na.. amake promise kore json data dewar jonno' --->> promise of json() data
    .then((json) => displayLesson(json.data)); // jei json data gulo pabo seigu ekta function er modde store kore diyechi.. eikhane 'json' name er parameter e sokol data store hobe
};

const removeActiveCls = () => {
  const btnLesson = document.querySelectorAll(".btn__lesson");
  btnLesson.forEach((btn) => btn.classList.remove("btn__active"));
};

const loadLevelsWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveCls(); // remove all active class
      const btnClicked = document.getElementById(`btn__lesson${id}`);
      btnClicked.classList.add("btn__active");
      displayLevelsWords(data.data);
    });
};

const loadWordDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayWordDetails(data.data));
};

/*
{
    "word": "Jubilant",
    "meaning": "আনন্দিত",
    "pronunciation": "জুবিলান্ট",
    "level": 6,
    "sentence": "The team was jubilant after winning the match.",
    "points": 4,
    "partsOfSpeech": "adjective",
    "synonyms": [
        "joyful",
        "elated",
        "ecstatic"
    ],
    "id": 10
}
*/

const displayWordDetails = (word) => {
  const detailsContainer = document.getElementById("details__container");
  detailsContainer.innerHTML = `
    <h1 class="text-4xl font-semibold">
      ${word.word} 
      (<i class="ri-mic-line"></i> : ${word.pronunciation})
    </h1>
    <div class="">
      <h3 class="text-2xl font-semibold">Meaning</h3>
      <p class="text-2xl font-medium">${word.meaning}</p>
    </div>
    <div class="">
      <h3 class="text-2xl font-semibold">Example</h3>
      <p class="text-2xl font-normal">${word.sentence}</p>
    </div>
    <div class="">
      <h3 class="text-2xl font-medium">সমার্থক শব্দ গুলো</h3>
      <div class="">${createElements(word.synonyms)}</div>
    </div>
  `;
  document.getElementById("word__modal").showModal();
};

// display levels words
const displayLevelsWords = (words) => {
  const wordContainer = document.getElementById("word__container");
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = `
      <div class="space-y-3 col-span-full text-center font-bn">
        <img src="/alert-error.png" alt="err" class="mx-auto">
        <p class="text-stone-500 text-sm font-normal">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h1 class="text-stone-500 text-4xl font-medium">নেক্সট Lesson এ যান</h1>
      </div>
    `;
    manageSpinner(false);
    return;
  }

  words.forEach((word) => {
    /*
    {
    "id": 5,
    "level": 1,
    "word": "Eager",
    "meaning": "আগ্রহী",
    "pronunciation": "ইগার"
    }
    */
    const wordCard = document.createElement("div");
    wordCard.innerHTML = `
        <div class="p-4 sm:p-14 bg-white rounded-xl h-full flex flex-col justify-between">
            <div class="space-y-6 text-center">
                <h2 class="text-black text-3xl font-bold">${
                  word.word ? word.word : "শব্দ পাওয়া যায়নি"
                }</h2>
                <p class="text-black text-xl font-medium">Meaning / Pronounciation</p>
                <h1 class="text-zinc-900 text-3xl font-semibold">${
                  word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"
                } / ${
      word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"
    }</h1>
            </div>
            <div class="mt-14 flex items-center justify-between">
                <button onclick='loadWordDetails(${
                  word.id
                })' class="text-2xl text-slate-700 px-4 py-3 rounded-lg bg-sky-500/10 cursor-pointer hover:bg-sky-100">
                <i class="ri-information-2-fill"></i>
                </button>
                <button class="text-2xl text-slate-700 px-4 py-3 rounded-lg bg-sky-500/10 cursor-pointer hover:bg-sky-100">
                <i class="ri-volume-down-fill"></i>
                </button>
            </div>
        </div>
    `;
    wordContainer.append(wordCard);
  });
  manageSpinner(false);
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
        <button id='btn__lesson${lesson.level_no}' onclick="loadLevelsWord(${lesson.level_no})" class="btn btn-outline btn-primary btn__lesson">
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
