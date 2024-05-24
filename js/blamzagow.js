(function () {
  // Configurable values
  const dampener = 20; // Lower values will make the effect more subtle
  const transitionSpeed = 0.1; // Transition speed in seconds
  const scaleFactor = 2000; // Factor to scale down elements based on distance
  const perspectiveValue = 2000; // Perspective value to control intensity
  const dampeningFactor = 1; // Factor to adjust the overall intensity of the dampening effect

  // Apply initial styles for transition
  document.querySelectorAll('.lookatme').forEach(element => {
    element.style.transition = `transform ${transitionSpeed}s ease-out, border-color ${transitionSpeed}s ease-out`;
    element.style.borderStyle = 'solid'; // Ensure border style is set
    element.style.borderWidth = '4px'; // Set a default border width
    element.style.boxSizing = 'border-box'; // Ensure border size does not affect element size
    element.style.transform = `perspective(${perspectiveValue}px) rotateX(0deg) rotateY(0deg) scale(1)`; // Ensure initial forward-facing state
  });

  let targetTransforms = new Map();

  function updateElementTransform(element, mouseX, mouseY) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const rotateX = -deltaY / (dampener * dampeningFactor); // Adjust rotation with dampening factor
    const rotateY = deltaX / (dampener * dampeningFactor); // Adjust rotation with dampening factor
    const scale = Math.max(0.5, 1 - distance / scaleFactor); // Scale down based on distance, but not smaller than 0.5

    targetTransforms.set(element, `perspective(${perspectiveValue}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`);
    updateElementStyles(element, distance);
  }

  function resetElementTransform(element) {
    targetTransforms.set(element, `perspective(${perspectiveValue}px) rotateX(0deg) rotateY(0deg) scale(1)`);
    element.style.borderColor = 'rgba(255, 0, 0, 1)'; // Set border color to full opacity red
  }

  function updateElementStyles(element, distance) {
    // Customize additional style changes here
    const maxDistance = 1000; // Maximum distance for full border color change
    const borderColorIntensity = 1 - Math.min(distance / maxDistance, 1); // Calculate border color intensity based on distance
    const borderColor = `rgba(255, 0, 0, ${borderColorIntensity})`; // Example: Red border color with variable opacity

    element.style.borderColor = borderColor;
  }

  let mouseX = 0;
  let mouseY = 0;
  let isInGrid = false;

  function onMouseMove(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
  }

  function onMouseEnter() {
    isInGrid = true;
  }

  function onMouseLeave() {
    isInGrid = false;
    const elements = document.querySelectorAll('.lookatme');
    elements.forEach(element => {
      resetElementTransform(element);
    });
  }

  function animate() {
    const elements = document.querySelectorAll('.lookatme');
    elements.forEach(element => {
      if (isInGrid) {
        updateElementTransform(element, mouseX, mouseY);
      }
      const targetTransform = targetTransforms.get(element);
      if (targetTransform) {
        element.style.transform = targetTransform;
      }
    });
    requestAnimationFrame(animate);
  }

  const gridContainer = document.querySelector('.grid'); // Use the 'grid' class as the parent container
  if (gridContainer) {
    gridContainer.addEventListener('mouseenter', onMouseEnter);
    gridContainer.addEventListener('mousemove', onMouseMove);
    gridContainer.addEventListener('mouseleave', onMouseLeave);
  }

  requestAnimationFrame(animate);
})();
