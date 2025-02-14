import { summaryData } from "./constant.js";

// Cache window dimensions and derived values
const isMobile = window.innerWidth < 580;
const variable = isMobile ? 55 : 50;
const radius = isMobile ? 130 : 155;

// Pre-calculate constants
const DEG_TO_RAD = Math.PI / 180;
const CIRCLE_SPACING = 60;
const FADE_DURATION = 300;

// Cache DOM elements
const circles = Array.from(document.querySelectorAll(".circle")); 
const elements = {
  centerCircle: document.getElementById("center_circle"),
  heading: document.getElementById("title"),
  titleWord: document.getElementById("tiitleWord"),
  subtitleWord: document.getElementById("subtitleWord"),
  paragraphLines: document.getElementById("paragraphLines"),
  summaryDetails: document.querySelector(".summary-details")
};

// Pre-calculate trig functions
const calculatePosition = angle => ({
  left: Math.cos(angle * DEG_TO_RAD) * radius + variable,
  top: Math.sin(angle * DEG_TO_RAD) * radius + variable
});

// Position circles efficiently
const positionCircles = (startAngle = 0) => {
  circles.forEach((circle, i) => {
    const pos = calculatePosition(startAngle + (i * CIRCLE_SPACING));
    Object.assign(circle.style, {
      left: `${pos.left}px`,
      top: `${pos.top}px`
    });
  });
};

// Track state
let currentIndex = 0;
let clickCount = 1;

// Update content with optimized animations
const updateContent = () => {
  const data = summaryData[currentIndex];
  const elementsToAnimate = [
    elements.heading,
    elements.paragraphLines, 
    elements.titleWord,
    elements.subtitleWord
  ];

  // Batch DOM operations
  elementsToAnimate.forEach(el => el.classList.add("fade-out"));

  setTimeout(() => {
    circles[clickCount % summaryData.length].style.border = "1px solid #ffffff";
    
    // Batch content updates
    Object.assign(elements.heading, {innerHTML: data.innterText});
    Object.assign(elements.paragraphLines, {innerHTML: data.paragraphLines});
    Object.assign(elements.titleWord, {innerHTML: data.tiitleWord});
    Object.assign(elements.subtitleWord, {innerHTML: data.subtitleWord});

    // Batch class updates
    elementsToAnimate.forEach(el => {
      el.classList.remove("fade-out");
      el.classList.add("fade-in");
    });

    currentIndex = (currentIndex + 1) % summaryData.length;
    clickCount++;
  }, FADE_DURATION);
};

// Initialize and add event listener
positionCircles();

if (elements.summaryDetails) {
  elements.summaryDetails.addEventListener("click", () => {
    positionCircles(45 * clickCount);
    updateContent();
  });
}
