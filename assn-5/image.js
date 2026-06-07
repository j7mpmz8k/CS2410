// globals
const singleImage = document.getElementById("single-image");
const imageCategory = document.getElementById("image-category");
const imageDate = document.getElementById("image-date");
const backBtn = document.getElementById("back-btn");
const unfavoriteBtn = document.getElementById("unfavorite-btn");

const url = "http://localhost:8000/";
const filename = "favs.txt";

let favoritedImages = [];
let currentImg = null;

// gets img data from url
const queryArray = window.location.search.split("&");
const imgUrl = queryArray[0].split("=")[1];
const imgCategory = queryArray[1].split("=")[1];
const imgDate = queryArray[2].split("=")[1].split("%20").join(" ");

async function init() {
    singleImage.src = imgUrl;
    imageCategory.innerText = imgCategory;
    imageDate.innerText = imgDate;
}

// back to gallery button
backBtn.addEventListener("click", () => {
    history.back();
});

// remove favorite button
unfavoriteBtn.addEventListener("click", async () => {
    favoritedImages = await loadFavorites();
    favoritedImages = favoritedImages.filter(img => img.url !== imgUrl);
    await updateGallery();
    // back to the gallery
    window.location.href = "gallery.html";
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
            body: JSON.stringify(favoritedImages),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    } catch (err) {
        console.log("Failed to update favorites:", err);
    }
}

init();
