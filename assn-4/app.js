let buttonPofileTab = document.getElementById("btn-profile");
let formProfileDiv = document.getElementById("form-profile");
buttonPofileTab.addEventListener("click", () => {
    buttonPofileTab.className = "tab-button active";
    buttonEducationTab.className = "tab-button";
    buttonWorkTab.className = "tab-button";
    buttonSkillsTab.className = "tab-button";
    formProfileDiv.hidden = false;
    formEducationDiv.hidden = true;
    formWorkDiv.hidden = true;
    formSkillsDiv.hidden = true;
});
let buttonEducationTab = document.getElementById("btn-education");
let formEducationDiv = document.getElementById("form-education");
buttonEducationTab.addEventListener("click", () => {
    buttonPofileTab.className = "tab-button";
    buttonEducationTab.className = "tab-button active";
    buttonWorkTab.className = "tab-button";
    buttonSkillsTab.className = "tab-button";
    formProfileDiv.hidden = true;
    formEducationDiv.hidden = false;
    formWorkDiv.hidden = true;
    formSkillsDiv.hidden = true;
});
let buttonWorkTab = document.getElementById("btn-work");
let formWorkDiv = document.getElementById("form-work");
buttonWorkTab.addEventListener("click", () => {
    buttonPofileTab.className = "tab-button";
    buttonEducationTab.className = "tab-button";
    buttonWorkTab.className = "tab-button active";
    buttonSkillsTab.className = "tab-button";
    formProfileDiv.hidden = true;
    formEducationDiv.hidden = true;
    formWorkDiv.hidden = false;
    formSkillsDiv.hidden = true;
});
let buttonSkillsTab = document.getElementById("btn-skills");
let formSkillsDiv = document.getElementById("form-skills");
buttonSkillsTab.addEventListener("click", () => {
    buttonPofileTab.className = "tab-button";
    buttonEducationTab.className = "tab-button";
    buttonWorkTab.className = "tab-button";
    buttonSkillsTab.className = "tab-button active";
    formProfileDiv.hidden = true;
    formEducationDiv.hidden = true;
    formWorkDiv.hidden = true;
    formSkillsDiv.hidden = false;
});

// Profile Image updates
let inputProfileUrl = document.getElementById("input-profile-url");
let resumeImg = document.getElementById("resume-img");
inputProfileUrl.addEventListener("input", () => {
    resumeImg.src = inputProfileUrl.value;
});

// Text inputs updating the resume via innerHTML
let inputProfileName = document.getElementById("input-profile-name");
let resumeName = document.getElementById("resume-name");
inputProfileName.addEventListener("input", () => {
    resumeName.innerHTML = inputProfileName.value;
});

let inputProfilePhone = document.getElementById("input-profile-phone");
let resumePhone = document.getElementById("resume-phone");
inputProfilePhone.addEventListener("input", () => {
    resumePhone.innerHTML = inputProfilePhone.value;
});

let inputProfileEmail = document.getElementById("input-profile-email");
let resumeEmail = document.getElementById("resume-email");
inputProfileEmail.addEventListener("input", () => {
    resumeEmail.innerHTML = inputProfileEmail.value;
});

let inputProfileStreet = document.getElementById("input-profile-street");
let resumeStreet = document.getElementById("resume-street");
inputProfileStreet.addEventListener("input", () => {
    resumeStreet.innerHTML = inputProfileStreet.value;
});

let inputProfileCity = document.getElementById("input-profile-city");
let resumeCity = document.getElementById("resume-city");
inputProfileCity.addEventListener("input", () => {
    resumeCity.innerHTML = inputProfileCity.value;
});

let inputProfileState = document.getElementById("input-profile-state");
let resumeState = document.getElementById("resume-state");
inputProfileState.addEventListener("input", () => {
    resumeState.innerHTML = inputProfileState.value;
});

let inputProfileZip = document.getElementById("input-profile-zip");
let resumeZip = document.getElementById("resume-zip");
inputProfileZip.addEventListener("input", () => {
    resumeZip.innerHTML = inputProfileZip.value;
});

// Helper function to parse an HTML string into a DOM element
function elementFromHTML(htmlString) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = htmlString.trim();
    return wrapper.firstElementChild;
}

// Education form submission handler
let formEducation = document.getElementById("form-education");
let inputEduLogo = document.getElementById("input-edu-logo");
let inputEduName = document.getElementById("input-edu-name");
let inputEduDate = document.getElementById("input-edu-date");
let inputEduDegree = document.getElementById("input-edu-degree");
let inputEduField = document.getElementById("input-edu-field");
let educationCards = document.getElementById("education-cards");

formEducation.addEventListener("submit", (e) => {
    e.preventDefault();

    const newCard = elementFromHTML(`
        <div class="education-card">
            <img src="${inputEduLogo.value}" alt="${inputEduName.value} logo" />
            <div class="edu-name">${inputEduName.value}</div>
            <div class="edu-info">${inputEduDate.value}</div>
            <div class="edu-info">${inputEduDegree.value}</div>
            <div class="edu-info">${inputEduField.value}</div>
        </div>
    `);

    newCard.addEventListener("click", () => {
        newCard.remove();
    });

    educationCards.appendChild(newCard);

    formEducation.reset();
});

// Work experience form submission handler
let formWork = document.getElementById("form-work");
let inputWorkCompany = document.getElementById("input-work-company");
let inputWorkTitle = document.getElementById("input-work-title");
let inputWorkStart = document.getElementById("input-work-start");
let inputWorkEnd = document.getElementById("input-work-end");
let descInput = document.getElementById("desc-input");
let experienceCards = document.getElementById("experience-cards");

formWork.addEventListener("submit", (e) => {
    e.preventDefault();

    let endDate = inputWorkEnd.value.trim();
    if (endDate === "") {
        endDate = "present";
    }

    const newWork = elementFromHTML(`
        <div class="work-entry">
            <div class="work-header">
                <div class="work-company">${inputWorkCompany.value}</div>
                <div class="work-date">${inputWorkStart.value} - ${endDate}</div>
            </div>
            <div class="work-title">${inputWorkTitle.value}</div>
            <div class="work-desc">${descInput.value}</div>
        </div>
    `);

    newWork.addEventListener("click", () => {
        newWork.remove();
    });

    experienceCards.appendChild(newWork);

    formWork.reset();
});

// Skills form submission handler
let formSkills = document.getElementById("form-skills");
let inputSkillName = document.getElementById("input-skill-name");
let inputSkillLevel = document.getElementById("input-skill-level");
let skillBadges = document.getElementById("skills-badges");

formSkills.addEventListener("submit", (e) => {
    e.preventDefault();

    const newSkill = elementFromHTML(`
        <div class="skill-card">
            <span>${inputSkillName.value}(${inputSkillLevel.value})</span>
        </div>
    `);

    newSkill.addEventListener("click", () => {
        newSkill.remove();
    });

    skillBadges.appendChild(newSkill);

    formSkills.reset();
});

// Attach deletion listeners to pre-existing resume cards using a for...of loop
let existingCards = document.querySelectorAll(".education-card, .work-entry, .skill-card");
for (let card of existingCards) {
    card.addEventListener("click", () => {
        card.remove();
    });
}

