// JavaScript logic for Resume Maker

let buttonPofileTab = document.getElementById("btn-profile");
let formProfileDiv = document.getElementById("form-profile");

let buttonEducationTab = document.getElementById("btn-education");
let formEducationDiv = document.getElementById("form-education");

let buttonWorkTab = document.getElementById("btn-work");
let formWorkDiv = document.getElementById("form-work");

let buttonSkillsTab = document.getElementById("btn-skills");
let formSkillsDiv = document.getElementById("form-skills");

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

