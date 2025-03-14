document.addEventListener('DOMContentLoaded', () => {
  const ships = document.querySelectorAll('.ship');
  const grid = document.querySelector('.battleship-grid');

  ships.forEach(ship => {
    ship.draggable = true;

    ship.addEventListener('dragstart', dragStart);
    ship.addEventListener('dragend', dragEnd);
  });

  grid.addEventListener('dragover', dragOver);
  grid.addEventListener('drop', drop);

  function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
      e.target.classList.add('hide');
    }, 0);
  }

  function dragEnd(e) {
    e.target.classList.remove('hide');
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function drop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text');
    const draggable = document.getElementById(id);
    const dropZone = e.target;

    if (dropZone.classList.contains('battleship-grid')) {
      const shipType = draggable.classList[1]; // Assuming the second class is the ship type
      const shipLength = parseInt(getComputedStyle(draggable).getPropertyValue('--width'));
      const shipHeight = parseInt(getComputedStyle(draggable).getPropertyValue('--height')) || 1;

      for (let i = 0; i < shipLength; i++) {
        const cell = document.createElement('div');
        cell.style.backgroundImage = draggable.style.backgroundImage;
        cell.style.backgroundSize = 'cover';
        cell.style.backgroundPosition = 'center';
        cell.classList.add('placed');
        dropZone.appendChild(cell);
      }

      draggable.remove();
    }
  }
});