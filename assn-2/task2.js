const form = document.getElementById("myForm");
const output = document.getElementById("output");

form.addEventListener("submit", e => {
    e.preventDefault();
    if (!e.target.exclamation.value) {
        output.innerHTML = `You must provide the exclamation!`;
    } else if (!e.target.articleOfClothing.value) {
        output.innerHTML = `You must provide the article of clothing!`;
    } else if (!e.target.adjective1.value) {
        output.innerHTML = `You must provide the first adjective!`;
    } else if (!e.target.adjective2.value) {
        output.innerHTML = `You must provide the second adjective!`;
    } else if (!e.target.verb1.value) {
        output.innerHTML = `You must provide the first verb!`;
    } else if (!e.target.verb2.value) {
        output.innerHTML = `You must provide the second verb!`;
    } else if (!e.target.place.value) {
        output.innerHTML = `You must provide the place!`;
    } else if (!e.target.occupation.value) {
        output.innerHTML = `You must provide the occupation!`;
    } else if (!e.target.pluralNoun.value) {
        output.innerHTML = `You must provide the plural noun!`;
    } else if (!e.target.number.value) {
        output.innerHTML = `You must provide the number!`;
    } else if (!e.target.adverb.value) {
        output.innerHTML = `You must provide the adverb!`;
    } else if (!e.target.animal.value) {
        output.innerHTML = `You must provide the animal!`;
    } else {
        output.innerHTML =
        `It was a ${e.target.adjective1.value} day, so I decided to walk to the local ${e.target.place.value}. 
        On the way, I saw a ${e.target.adjective2.value} ${e.target.animal.value} trying to ${e.target.verb1.value} a ${e.target.occupation.value}.
        When I finally got to the ${e.target.place.value}, the ${e.target.occupation.value} looked at me and yelled, "${e.target.exclamation.value.toUpperCase()}!" 
        I realized I had forgotten to wear my ${e.target.articleOfClothing.value}.
        I quickly grabbed some ${e.target.pluralNoun.value}, paid the ${e.target.occupation.value} ${e.target.number.value} dollars, and ran outside ${e.target.adverb.value}.
        Next time, I will make sure to ${e.target.verb2.value} before leaving the house.`
    }
});
