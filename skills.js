import { skillsData } from "./constant.js";

// Cache DOM elements and data
const mainContent = document.getElementById('mainContent');
const boxes = Array.from(document.querySelectorAll('.skillpara'));

// Pre-compile content map for faster lookups
const contentMap = new Map(
  boxes.map(box => [
    box,
    skillsData[box.getAttribute('data-content')]
  ])
);

// Event handler functions
const showContent = ({ target }) => {
  mainContent.innerHTML = contentMap.get(target);
  // Use classList.toggle for better performance
  mainContent.classList.toggle('active', true);
};

const hideContent = () => {
  mainContent.classList.toggle('active', false); 
};

// Use event delegation for better performance
const container = boxes[0].parentElement;
container.addEventListener('mouseover', (e) => {
  if (e.target.classList.contains('skillpara')) {
    showContent(e);
  }
});

container.addEventListener('mouseout', (e) => {
  if (e.target.classList.contains('skillpara')) {
    hideContent();
  }
});