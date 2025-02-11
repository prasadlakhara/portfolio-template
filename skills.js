import { skillsData } from "./constant.js";

// Cache DOM elements and data
const boxes = document.querySelectorAll('.skillpara');
const mainContent = document.getElementById('mainContent');

// Event handler functions
const showContent = (event) => {
  const content = event.target.getAttribute('data-content');
  mainContent.innerHTML = skillsData[content];
  mainContent.classList.add('active');
};

const hideContent = () => {
  mainContent.classList.remove('active');
};

// Add event listeners
boxes.forEach(box => {
  box.addEventListener('mouseover', showContent);
  box.addEventListener('mouseout', hideContent);
});