// globals
const gallery = document.getElementById("gallery-container");
const catagoriesContainer = document.getElementById("categories");
const url = "http://localhost:8000/";
const filename = "favs.txt";

let images = [];

async function init() {
    images = await loadFavorites();
    displayImages(images);
}

function displayImages (images) {
    gallery.innerHTML = "";
    for (const img of images) {
        const card = elementFromHTML(`
            <div class="card">
                <a href="image.html?img=${img.url}&category=${img.category}&date=${img.dateAdded}">
                    <img class="gallery-image" src="${img.url}" alt="${img.category}" referrerpolicy="no-referrer">
                </a>
                <p>Category: ${img.category}</p>
                <p>Added: ${img.dateAdded}</p>
                <button class="remove-btn">Remove</button>
            </div>
        `);
        card.querySelector(".remove-btn").addEventListener("click", () => {
            removeFavorite(img.url);
        });
        gallery.appendChild(card);
    }
}

async function removeFavorite(imgUrl) {
    images = images.filter(img => img.url !== imgUrl);
    await updateGallery();
    
    const category = getCategory();
    if (category === "all") {
        displayImages(images);
    } else {
        const filtered = images.filter(img => img.category === category);
        displayImages(filtered);
    }
}

catagoriesContainer.addEventListener("change", () => {
    const category = getCategory();
    if (category === "all") {
        displayImages(images);
    } else {
        const filtered = images.filter(img => img.category === category);
        displayImages(filtered);
    }
});

async function loadFavorites() {
    const data = await fetch(url + filename);
    const images = await data.json();
    return images;
}

async function updateGallery() {
    try {
        await fetch(url + "api/update-favs", {
            method: "PUT",
            body: JSON.stringify(images),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    } catch (err) {
        console.log("Failed to update favorites:", err);
    }
}

function elementFromHTML(htmlString) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = htmlString;
    return wrapper.firstElementChild;
}

function getCategory() {
    const filterRadios = document.getElementsByClassName("filter-radio");
    for (const radio of filterRadios) {
        if (radio.checked) {
            return radio.value;
        }
    }
}

init();
