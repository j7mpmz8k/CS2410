// globals
const gallery = document.getElementById("gallery-container");
const catagoriesContainer = document.getElementById("categories");
const themeSelector = document.getElementById("theme-selector");
const homeLink = document.getElementById("home-link");
const url = "http://localhost:8000/";
const filename = "favs.txt";

let images = [];

async function init() {
    // check for theme in url and apply it
    const themeParts = window.location.search.split("theme=");
    if (themeParts[1]) {
        const theme = themeParts[1];
        document.body.dataset.theme = theme;
        const themeRadios = document.getElementsByClassName("theme-radio");
        for (const radio of themeRadios) {
            radio.checked = (radio.value === theme);
        }
    } else {
        document.body.dataset.theme = "light";
        const themeRadios = document.getElementsByClassName("theme-radio");
        for (const radio of themeRadios) {
            radio.checked = (radio.value === "light");
        }
    }

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
        card.querySelector("a").addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = `image.html?img=${img.url}&category=${img.category}&date=${img.dateAdded}&theme=${document.body.dataset.theme}`;
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

themeSelector.addEventListener("change", (e) => {
    document.body.dataset.theme = e.target.value;
});

homeLink.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "index.html?theme=" + document.body.dataset.theme;
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
