// Removed random placement for floating-card badges; now handled by CSS only.

document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('.image-wrapper');
  const cards = Array.from(document.querySelectorAll('.floating-card'));
  if (!wrapper || cards.length === 0) return;
  const wrapperRect = wrapper.getBoundingClientRect();
  const usedPositions = [];
  cards.forEach((card, i) => {
    // Safe area: avoid left 0-40% (text), stay within wrapper
    const minX = wrapperRect.width * 0.45;
    const maxX = wrapperRect.width * 0.85 - card.offsetWidth;
    const minY = wrapperRect.height * 0.05;
    const maxY = wrapperRect.height * 0.75 - card.offsetHeight;
    let x, y, tries = 0;
    do {
      x = Math.random() * (maxX - minX) + minX;
      y = Math.random() * (maxY - minY) + minY;
      tries++;
    } while (usedPositions.some(pos => Math.abs(pos.x - x) < 120 && Math.abs(pos.y - y) < 60) && tries < 10);
    usedPositions.push({x, y});
    card.style.left = x + 'px';
    card.style.top = y + 'px';
    card.style.right = 'auto';
    card.style.bottom = 'auto';
    // Add a random animation delay for floating effect
    card.style.animationDelay = (Math.random() * 2) + 's';
  });
}); 