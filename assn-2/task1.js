const exclamation = document.getElementById("exclamation");
const articleOfClothing = document.getElementById("articleOfClothing");
const adjective1 = document.getElementById("adjective1");
const adjective2 = document.getElementById("adjective2");
const verb1 = document.getElementById("verb1");
const verb2 = document.getElementById("verb2");
const place = document.getElementById("place");
const occupation = document.getElementById("occupation");
const pluralNoun = document.getElementById("pluralNoun");
const number = document.getElementById("number");
const adverb = document.getElementById("adverb");
const animal = document.getElementById("animal");

const button = document.getElementById("button")

const output = document.getElementById("output");

button.addEventListener("click", e => {
    if (!exclamation.value) {
        output.innerHTML = `You must provide the exclamation!`;
    } else if (!articleOfClothing.value) {
        output.innerHTML = `You must provide the article of clothing!`;
    } else if (!adjective1.value) {
        output.innerHTML = `You must provide the first adjective!`;
    } else if (!adjective2.value) {
        output.innerHTML = `You must provide the second adjective!`;
    } else if (!verb1.value) {
        output.innerHTML = `You must provide the first verb!`;
    } else if (!verb2.value) {
        output.innerHTML = `You must provide the second verb!`;
    } else if (!place.value) {
        output.innerHTML = `You must provide the place!`;
    } else if (!occupation.value) {
        output.innerHTML = `You must provide the occupation!`;
    } else if (!pluralNoun.value) {
        output.innerHTML = `You must provide the plural noun!`;
    } else if (!number.value) {
        output.innerHTML = `You must provide the number!`;
    } else if (!adverb.value) {
        output.innerHTML = `You must provide the adverb!`;
    } else if (!animal.value) {
        output.innerHTML = `You must provide the animal!`;
    } else {
        output.innerHTML =
        `It was a ${adjective1.value} day, so I decided to walk to the local ${place.value}. 
        On the way, I saw a ${adjective2.value} ${animal.value} trying to ${verb1.value} a ${occupation.value}.
        When I finally got to the ${place.value}, the ${occupation.value} looked at me and yelled, "${exclamation.value.toUpperCase()}!" 
        I realized I had forgotten to wear my ${articleOfClothing.value}.
        I quickly grabbed some ${pluralNoun.value}, paid the ${occupation.value} ${number.value} dollars, and ran outside ${adverb.value}.
        Next time, I will make sure to ${verb2.value} before leaving the house.`
    }
});
