"use strict"

console.log("This is film photography portfolio page")

const slidesContainer = document.querySelector(".carousel-inner");
const slideWidth = 500;
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

nextButton.addEventListener("click", () => {
	slidesContainer.scrollLeft += slideWidth;
});

prevButton.addEventListener("click", () => {
	slidesContainer.scrollLeft -= slideWidth;
});
