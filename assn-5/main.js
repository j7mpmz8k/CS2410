// globals & classes
const nextBtn = document.getElementById("next-btn");
const favBtn = document.getElementById("fav-btn");
const unFavBtn = document.getElementById("unfav-btn");
const imgElement = document.getElementById("main-image");
const apiUrlElement = document.getElementById("api-url");
const imageUrlElement = document.getElementById("image-url");
const catagoriesContainer = document.getElementById("categories");
const themeSelector = document.getElementById("theme-selector");
const galleryLink = document.getElementById("gallery-link");

const url = "http://localhost:8000/";
const filename = "favs.txt";
let imgQueue = {
    nature: [],
    space: [],
    anime: []
}
let favoritedImages = [];
let seenURLs = [];
let currentImg = null;

class Img {
    constructor(url, category) {
        this.category = category;
        this.url = url;
        this.dateAdded = null;
        this.isFavorite = false;
    }
}

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

    favoritedImages = await loadFavorites();
    showNextImg(getCategory());
}

async function showNextImg(category) {
    try {
        currentImg = await getNextImg(category);
        imgElement.src = currentImg.url;
        apiUrlElement.innerText = `https://corsproxy.io/?https://wallhaven.cc/api/v1/search?q=${category}&sorting=random`;
        imageUrlElement.innerText = currentImg.url;
        if (isFavorite(currentImg)) {
            favBtn.hidden = true;
            unFavBtn.hidden = false;
        } else {
            favBtn.hidden = false;
            unFavBtn.hidden = true;
        }
    } catch (err) {
        console.log("Failed to load image:", err);
    }
}

function updateGallary() {
    //adds to running list of favorited images to favs.txt file
    fetch(url + "api/update-favs", {
        method: "PUT",
        body: JSON.stringify(favoritedImages),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).catch(err => {
        console.log("Failed to favorite image:", err);
    });
}

nextBtn.addEventListener("click",  () => {
    showNextImg(getCategory());
});

favBtn.addEventListener("click", () => {
    currentImg.isFavorite = true;
    currentImg.dateAdded = Date().slice(0, 15);
    favoritedImages.push(currentImg);
    favBtn.hidden = true;
    unFavBtn.hidden = false;
    updateGallary();
});

unFavBtn.addEventListener("click", () => {
    currentImg.isFavorite = false;
    removeFavorite(currentImg);
    favBtn.hidden = false;
    unFavBtn.hidden = true;
    updateGallary();
});

catagoriesContainer.addEventListener("change", () => {
    showNextImg(getCategory());
});

themeSelector.addEventListener("change", (e) => {
    document.body.dataset.theme = e.target.value;
});

galleryLink.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "gallery.html?theme=" + document.body.dataset.theme;
});

async function loadFavorites() {
    const data = await fetch(url + filename);
    const images = await data.json();
    return images;
}

async function fetchImages(category) {
    const imgList = [];
    while (imgList.length === 0) {
        const data = await fetch(`https://corsproxy.io/?https://wallhaven.cc/api/v1/search?q=${category}&sorting=random`);
        const json = await data.json();
        for (const img of json.data) {
            if (!seenURLs.includes(img.path)) {
                imgList.push(new Img(img.path, category));
            }
        }
    }
    return imgList;
}

async function getNextImg(category) {
    if (imgQueue[category].length === 0) {
        imgQueue[category] = await fetchImages(category);
    }
    const nextImg = imgQueue[category].pop();
    seenURLs.push(nextImg.url);
    return nextImg;
}

function isFavorite(img) {
    for (const fav of favoritedImages) {
        if (fav.url === img.url) {
            return true;
        }
    }
    return false;
}

function removeFavorite(img) {
    if (!img) return;
    favoritedImages = favoritedImages.filter(fav => fav.url !== img.url);
}

function getCategory() {
    const categoryRadios = document.getElementsByClassName("category-radios");
    for (const radio of categoryRadios) {
        if (radio.checked) {
            return radio.value;
        }
    }
}

init();
