//tab switching from menu buttons
//profile tab
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
//education tab
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
//work tab
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
//skills tab
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

// profile inputs update resume in real time
let inputProfileUrl = document.getElementById("input-profile-url");
let resumeImg = document.getElementById("resume-img");
inputProfileUrl.addEventListener("input", () => {
    resumeImg.src = inputProfileUrl.value;
});
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

//helper to make new html element from form submission
function elementFromHTML(htmlString) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = htmlString.trim();
    return wrapper.firstElementChild;
}

// Education form submission
let formEducation = document.getElementById("form-education");
let educationCards = document.getElementById("education-cards");

formEducation.addEventListener("submit", (e) => {
    e.preventDefault();
    const logo = e.target.logo.value;
    const school = e.target.school.value;
    const date = e.target.date.value;
    const degree = e.target.degree.value;
    const field = e.target.field.value;
    const newCard = elementFromHTML(`
        <div class="education-card">
            <img src="${logo}" alt="${school} logo" />
            <div class="edu-name">${school}</div>
            <div class="edu-info">${date}</div>
            <div class="edu-info">${degree}</div>
            <div class="edu-info">${field}</div>
        </div>
    `);
    //allows deletion from clicking element
    newCard.addEventListener("click", () => {
        newCard.remove();
    });
    educationCards.appendChild(newCard);
    formEducation.reset();
});

// Work experience form submission
let formWork = document.getElementById("form-work");
let experienceCards = document.getElementById("experience-cards");

formWork.addEventListener("submit", (e) => {
    e.preventDefault();
    const company = e.target.company.value;
    const title = e.target.title.value;
    const start = e.target.start.value;
    let end = e.target.end.value.trim();
    const desc = e.target.desc.value;
    if (end === "") {
        end = "present";
    }
    const newWork = elementFromHTML(`
        <div class="work-entry">
            <div class="work-header">
                <div class="work-company">${company}</div>
                <div class="work-date">${start} - ${end}</div>
            </div>
            <div class="work-title">${title}</div>
            <div class="work-desc">${desc}</div>
        </div>
    `);
    //allows deletion from clicking element
    newWork.addEventListener("click", () => {
        newWork.remove();
    });
    experienceCards.appendChild(newWork);
    formWork.reset();
});

// Skills form submission
let formSkills = document.getElementById("form-skills");
let skillBadges = document.getElementById("skills-badges");
formSkills.addEventListener("submit", (e) => {
    e.preventDefault();
    const skill = e.target.skill.value;
    const level = e.target.level.value;
    const newSkill = elementFromHTML(`
        <div class="skill-card">
            <span>${skill}(${level})</span>
        </div>
    `);
    //allows deletion from clicking element
    newSkill.addEventListener("click", () => {
        newSkill.remove();
    });
    skillBadges.appendChild(newSkill);
    formSkills.reset();
});

// allows deletion of pre-existing data
let existingCards = document.querySelectorAll(".education-card, .work-entry, .skill-card");
for (let card of existingCards) {
    card.addEventListener("click", () => {
        card.remove();
    });
}

