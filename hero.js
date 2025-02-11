// Cache DOM elements
const heroSection = document.querySelector(".heroSection");
const heroTitle = document.querySelector(".herotitle");

// Animation configuration
const config = {
  div: {
    radius: 5,
    maxRadius: 29,
    speed: 0.3,
    opacity: 0,
    maxOpacity: 0.2,
    opacityStep: 0.05
  },
  text: {
    radius: window.innerWidth < 600 ? 180 : 29,
    maxRadius: 49,
    speed: 0.2,
    opacity: window.innerWidth < 600 ? 0.8 : 0.2,
    maxOpacity: 1,
    opacityStep: 0.1
  }
};

function animateGradientDiv() {
  const { div } = config;
  
  div.radius += div.speed;
  if (div.opacity <= div.maxOpacity) {
    div.opacity += div.opacityStep;
  }

  heroSection.style.background = `radial-gradient(
    circle at top center, 
    rgba(255, 255, 255, ${div.opacity}), 
    rgba(0, 0, 0, 0.8) ${div.radius}%
  )`;

  if (div.radius < div.maxRadius) {
    requestAnimationFrame(animateGradientDiv);
  } else {
    animateTextGradient();
  }
}

function animateTextGradient() {
  const { text } = config;
  
  text.radius += text.speed;
  if (text.opacity <= text.maxOpacity) {
    text.opacity += text.opacityStep;
  }

  heroTitle.style.background = `radial-gradient(
    circle at top center, 
    rgba(255, 255, 255, ${text.opacity}), 
    rgba(64, 51, 51) ${text.radius}%
  )`;
  heroTitle.style.webkitBackgroundClip = "text";
  heroTitle.style.webkitTextFillColor = "transparent";

  if (text.radius < text.maxRadius) {
    requestAnimationFrame(animateTextGradient);
  }
}

animateGradientDiv();