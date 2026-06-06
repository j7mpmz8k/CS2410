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

// gets direct wallhaven image url
const imgUrl = window.location.search.split("img=")[1];

async function init() {
    favoritedImages = await loadFavorites();
    //finds Img obj from favs.txt based on matching url
    for (const img of favoritedImages) {
        if (img.url === imgUrl) {
            currentImg = img;
            break;
        }
    }

    singleImage.src = currentImg.url;
    imageCategory.innerText = currentImg.category;
    imageDate.innerText = currentImg.dateAdded;
}

// back to gallery button
backBtn.addEventListener("click", () => {
    history.back();
});

// remove favorite button
unfavoriteBtn.addEventListener("click", async () => {
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
