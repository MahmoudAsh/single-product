const slider = document.getElementById("slider");
const dots = document.querySelectorAll(".dot");

let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let currentIndex = 0;

// Add touch and mouse event listeners
slider.addEventListener("mousedown", startDrag);
slider.addEventListener("touchstart", startDrag);

slider.addEventListener("mouseup", endDrag);
slider.addEventListener("touchend", endDrag);

slider.addEventListener("mouseleave", endDrag);

slider.addEventListener("mousemove", drag);
slider.addEventListener("touchmove", drag);

// Start Drag
function startDrag(event) {
  isDragging = true;
  startPos = getPosition(event);
  slider.style.transition = "none";
}

// End Drag
function endDrag() {
  isDragging = false;
  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100 && currentIndex < dots.length - 1) {
    currentIndex += 1;
  }

  if (movedBy > 100 && currentIndex > 0) {
    currentIndex -= 1;
  }

  setSliderPositionByIndex();
  slider.style.transition = "transform 0.3s ease-in-out";
  updateDots();
}

// Dragging
function drag(event) {
  if (!isDragging) return;

  const currentPosition = getPosition(event);
  currentTranslate = prevTranslate + currentPosition - startPos;
  setSliderPosition();
}

// Get Position (Mouse or Touch)
function getPosition(event) {
  return event.type.includes("mouse") ? event.clientX : event.touches[0].clientX;
}

// Set Slider Position
function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`;
}

// Set Slider Position By Index
function setSliderPositionByIndex() {
  currentTranslate = currentIndex * -slider.offsetWidth;
  prevTranslate = currentTranslate;
  setSliderPosition();
}

// Update Dots
function updateDots() {
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

// Click on Indicator Dots
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentIndex = index;
    setSliderPositionByIndex();
    updateDots();
  });
});

// Initialize First Dot as Active
updateDots();
