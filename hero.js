// Cache DOM elements and check window width once
const heroSection = document.querySelector(".heroSection");
const heroTitle = document.querySelector(".herotitle");
const isMobile = window.innerWidth < 600;

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
    radius: isMobile ? 180 : 29,
    maxRadius: 49,
    speed: 0.2,
    opacity: isMobile ? 0.8 : 0.2,
    maxOpacity: 1,
    opacityStep: 0.1
  }
};

// Pre-construct static parts of gradient strings
const gradientPrefix = 'radial-gradient(circle at top center, rgba(255, 255, 255,';
const divGradientSuffix = '), rgba(0, 0, 0, 0.8)';
const textGradientSuffix = '), rgba(64, 51, 51)';

function animateGradientDiv() {
  const { div } = config;
  
  div.radius += div.speed;
  div.opacity = Math.min(div.opacity + div.opacityStep, div.maxOpacity);

  heroSection.style.background = `${gradientPrefix} ${div.opacity}${divGradientSuffix} ${div.radius}%)`;

  if (div.radius < div.maxRadius) {
    requestAnimationFrame(animateGradientDiv);
  } else {
    animateTextGradient();
  }
}

function animateTextGradient() {
  const { text } = config;
  
  text.radius += text.speed;
  text.opacity = Math.min(text.opacity + text.opacityStep, text.maxOpacity);

  // Set styles in batch to minimize reflows
  Object.assign(heroTitle.style, {
    background: `${gradientPrefix} ${text.opacity}${textGradientSuffix} ${text.radius}%)`,
    webkitBackgroundClip: "text",
    webkitTextFillColor: "transparent"
  });

  if (text.radius < text.maxRadius) {
    requestAnimationFrame(animateTextGradient);
  }
}

animateGradientDiv();