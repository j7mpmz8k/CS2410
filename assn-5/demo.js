const input = document.getElementById("input-text");
const submitBtn = document.getElementById("submit-btn");
const updateBtn = document.getElementById("update-btn");
const outputDiv = document.getElementById("output");

const url = "http://localhost:8000/";
const filename = "favs.txt";

submitBtn.addEventListener("click", () => {
    const data = {
        message: input.value,
    }
    
    fetch(url + "api/update-favs", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
});

updateBtn.addEventListener("click", () => {
    fetch(url + filename)
    .then(res => res.json())
    .then(res => {
        outputDiv.innerText = res.message;
    });
});
