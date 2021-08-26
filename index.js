window.onload = () => {
  if (navigator.getGamepads()[0]) {
    if (navigator.getGamepads()[0].buttons[0].pressed) {
      loadOnce();
      console.log('press');
    }
  }

  document.addEventListener('click', () => loadOnce());

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') loadOnce();
  });
};

let reload = true;
function loadOnce() {
  if (reload) Game.init();

  reload = false;
}
