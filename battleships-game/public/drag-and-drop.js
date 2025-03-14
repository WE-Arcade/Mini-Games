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
    dropZone.appendChild(draggable);
    draggable.style.position = 'absolute';
    draggable.style.left = `${e.offsetX - draggable.offsetWidth / 2}px`;
    draggable.style.top = `${e.offsetY - draggable.offsetHeight / 2}px`;
    updateShipImage(draggable);
    draggable.classList.add('placed');
    }
  }

  function updateShipImage(ship) {
    const shipType = ship.classList[1]; // Assuming the second class is the ship type
    switch (shipType) {
      case 'destroyer-container':
        ship.style.backgroundImage = "url('/images/two-train.png')";
        break;
      case 'submarine-container':
        ship.style.backgroundImage = "url('/images/three-train-1.png')";
        break;
      case 'cruiser-container':
        ship.style.backgroundImage = "url('/images/three-train-2.png')";
        break;
      case 'battleship-container':
        ship.style.backgroundImage = "url('/images/four-train.png')";
        break;
      case 'carrier-container':
        ship.style.backgroundImage = "url('/images/five-train.png')";
        break;
      default:
        break;
    }
    ship.style.backgroundSize = 'cover';
    ship.style.backgroundPosition = 'center';
  }
});