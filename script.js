import { summaryData } from "./constant.js";

// Get window dimensions
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

// Constants for positioning
let variable = windowWidth < 580 ? 55 : 50;
let radius = windowWidth < 580 ? 130 : 155;

// Element references
const circles = document.querySelectorAll(".circle");
const centerCircle = document.getElementById("center_circle");
const heading = document.getElementById("title");
const titleWord = document.getElementById("tiitleWord");
const subtitleWord = document.getElementById("subtitleWord");
const paragraphLines = document.getElementById("paragraphLines");
const summaryDetails = document.querySelector(".summary-details");

// Helper functions for trigonometric calculations
const calculateSin = degrees => Math.sin(degrees * (Math.PI / 180)) * radius + variable;
const calculateCos = degrees => Math.cos(degrees * (Math.PI / 180)) * radius + variable;

// Function to position circles
const positionCircles = (startAngle = 0) => {
  let angle = startAngle;
  circles.forEach(circle => {
    circle.style.left = `${calculateCos(angle)}px`;
    circle.style.top = `${calculateSin(angle)}px`;
    angle += 60;
  });
};

// Initial circle positioning
positionCircles();

let currentIndex = 0;
let clickCount = 1;

// Function to update text content
const updateContent = () => {
  const data = summaryData[currentIndex];

  // Apply fade-out effect
  [heading, paragraphLines, titleWord, subtitleWord].forEach(el => el.classList.add("fade-out"));

  setTimeout(() => {
    // Update content after fade-out
    circles[clickCount % summaryData.length].style.border = "1px solid #ffffff";
    heading.innerHTML = data.innterText;
    paragraphLines.innerHTML = data.paragraphLines;
    titleWord.innerHTML = data.tiitleWord;
    subtitleWord.innerHTML = data.subtitleWord;

    // Apply fade-in effect
    [heading, paragraphLines, titleWord, subtitleWord].forEach(el => {
      el.classList.remove("fade-out");
      el.classList.add("fade-in");
    });

    currentIndex = (currentIndex + 1) % summaryData.length;
    clickCount++;
  }, 300); // Matches the fade-out animation duration
};

// Event listener for content update on click
if (summaryDetails) {
  summaryDetails.addEventListener("click", () => {
    positionCircles(45 * clickCount);
    updateContent();
  });
}
