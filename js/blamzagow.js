(function () {
  // Configurable values
  const dampener = 20; // Lower values will make the effect more subtle
  const transitionSpeed = 0.1; // Transition speed in seconds

  // Apply initial styles for transition
  document.querySelectorAll('.lookatme').forEach(element => {
    element.style.transition = `transform ${transitionSpeed}s ease-out`;
  });

  function updateElementTransform(element, mouseX, mouseY) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;
    const rotateX = -deltaY / dampener; // Invert the Y rotation to tilt towards the mouse
    const rotateY = deltaX / dampener; // Invert the X rotation to tilt towards the mouse

    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  let mouseX = 0;
  let mouseY = 0;

  function onMouseMove(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
  }

  function animate() {
    const elements = document.querySelectorAll('.lookatme');
    elements.forEach(element => {
      updateElementTransform(element, mouseX, mouseY);
    });
    requestAnimationFrame(animate);
  }

  document.addEventListener('mousemove', onMouseMove);
  requestAnimationFrame(animate);
})();
