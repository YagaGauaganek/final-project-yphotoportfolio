"use strict";

console.log("Pick your fav photo");

const photoContainer = document.querySelector("section");
const resultButton = document.querySelector("section + div");
const img1 = document.querySelector("section img:first-child");
const img2 = document.querySelector("section img:nth-child(2)");

let clicks = 0;
const maxClicksAllowed = 10;

let allPhotos = [];

function getRandomNumber() {
    return Math.floor(Math.random() * allPhotos.length);
}

function Film(name, src) {
    this.name = name;
    this.src = src;
    // this.alt = name;
    this.clicks = 0;
    this.views = 0;
    allPhotos.push(this);
}

function renderPhotos() {

    let photo1 = getRandomNumber();
    let photo2 = getRandomNumber();

    while (photo1 === photo2) {
        photo2 = getRandomNumber();
    }

    img1.src = allPhotos[photo1].src;
    img2.src = allPhotos[photo2].src;
    img1.alt = allPhotos[photo1].name;
    img2.alt = allPhotos[photo1].name;
    // img1.alt = allPhotos[photo1].alt;
    // img2.alt = allPhotos[photo2].alt;
    allPhotos[photo1].views++;
    allPhotos[photo2].views++;
}

function handlePhotoClicks(event) {
    if (event.target === photoContainer) {
        alert("Please pick your favourite");
    } else {
        clicks++;
        //console.log(clicks);
        let clickedPhoto = event.target.alt;
        for (let i = 0; i < allPhotos.length; i++) {
            if (clickedPhoto === allPhotos[i].name) {
                allPhotos[i].clicks++;
                break;
            }
        }
        if (clicks === maxClicksAllowed) {
            photoContainer.removeEventListener("click", handlePhotoClicks);
            photoContainer.className = "no-voting";
            resultButton.addEventListener("click", renderChart);
            resultButton.className = "clicks-allowed";
        } else {
            renderPhotos();
        }
    }

}

function renderResults() {
    //console.log("View results");
    let ul = document.querySelector("ul");
    for (let i = 0; i < allPhotos.length; i++) {
    let li = document.createElement("li");
    li.textContent = `${allPhotos[i].name} had ${allPhotos[i].views} views and was clicked ${allPhotos[i].clicks} times.`;
    ul.appendChild(li);
    }
}

const f1 = new Film("Fay-covering-face", "images/f1.jpg");
const a1 = new Film("Ayla-with-hands-up", "images/a1.jpg");
const all = new Film("Ala-within-dunes", "images/all.jpg");
const k2 = new Film("Karolina-in-flowers", "images/k2.jpg");
const l2 = new Film("Lauren-double-exposure", "images/l2.jpg");
const move2 = new Film("Roksana-on-move", "images/move2.jpg");
const shanice2 = new Film("Shanice-mushroom-girl", "images/shanice2.jpg");
const r6 = new Film("Roksana-lomochrome-turqoise", "images/r6.jpg");
const q4 = new Film("Quinn-on-the-box", "images/q2.jpg");
const p1 = new Film("Polly-with-cigarette", "images/p1.jpg");
const p3 = new Film("Polly-and-jar-with-eyes", "images/p3.jpg");

renderPhotos();

photoContainer.addEventListener("click", handlePhotoClicks);

function renderChart() {
    const photoNames = [];
    const photoViews = [];
    const photoClicks = [];

    for (let i = 0; i < allPhotos.length; i++) {
        photoNames.push(allPhotos[i].name);
        photoViews.push(allPhotos[i].views);
        photoClicks.push(allPhotos[i].clicks);
    }

    console.log(photoNames);
    console.log(photoViews);
    console.log(photoClicks);

    const data = {
        labels: photoNames,
        datasets: [
            {
                label: "clicks",
                data: photoClicks,
                backgroundColor: ["#DDE6ED"],
                borderColor: ["#526D82"],
                borderWidth: 1,

            },
            {
                label: "views",
                data: photoViews,
                backgroundColor: ["#526D82"],
                borderColor: ["#DDE6ED"], 
                bordercolor: 1,
            },
        ],
    };
    const config = {
        type: "bar",
        data: data,
    };

    const photoChart = document.getElementById("chart");
    const myChart = new Chart(photoChart, config);
    setLocalStorage();
}

function setLocalStorage() {
    localStorage.setItem("film", JSON.stringify(allPhotos));

}

function checkLocalStorage() {
    const localFilm = JSON.parse(localStorage.getItem("film"));
    //console.log(localFilm)
    if (localFilm) {
        allPhotos = localFilm;
    } else {
        console.log("new photo")
        const newFilmRange = [
        "f1.jpg",
      "a1.jpg",
      "all.jpg",
      "k2.jpg",
      "l2.jpg",
      "move2.jpg",
      "shanice2.jpg",
      "r6.jpg",
      "q4.jpg",
      "p1.jpg",
      "p3.jpg",
        ];
        for (let i = 0; i < newFilmRange.length; i++) {
            new Film(
                newFilmRange[i],
                // `images/${newFilmRange[i].toLowerCase().replace(/ /g, "-")}.jpg`
                `images/${newFilmRange[i]}`
            );
        }
    }
}
checkLocalStorage();
renderPhotos();



    