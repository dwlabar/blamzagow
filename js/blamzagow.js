(function () {
  // Configurable values
  const dampener = 20; // Lower values will make the effect more subtle
  const transitionSpeed = 0.1; // Transition speed in seconds
  const scaleFactor = 2000; // Factor to scale down elements based on distance

  // Apply initial styles for transition
  document.querySelectorAll('.lookatme').forEach(element => {
    element.style.transition = `transform ${transitionSpeed}s ease-out, border-color ${transitionSpeed}s ease-out`;
    element.style.borderStyle = 'solid'; // Ensure border style is set
    element.style.borderWidth = '4px'; // Set a default border width
  });

  function updateElementTransform(element, mouseX, mouseY) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const rotateX = -deltaY / dampener; // Invert the Y rotation to tilt towards the mouse
    const rotateY = deltaX / dampener; // Invert the X rotation to tilt towards the mouse
    const scale = Math.max(0.5, 1 - distance / scaleFactor); // Scale down based on distance, but not smaller than 0.5

    // Update the transform and other styles
    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
    updateElementStyles(element, distance);
  }

  function updateElementStyles(element, distance) {
    // Customize additional style changes here
    const maxDistance = 1000; // Maximum distance for full border color change
    const borderColorIntensity = 1 - Math.min(distance / maxDistance, 1); // Calculate border color intensity based on distance
    const borderColor = `rgba(255, 0, 0, ${borderColorIntensity})`; // Ex
    // const borderColor = `rgba(255, 0, 0, ${borderColorIntensity})`; // Example: Red border color with variable opacity

    element.style.borderColor = borderColor;
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
