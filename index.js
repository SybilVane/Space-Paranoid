window.onload = () => {
  document.addEventListener('click', () => loadOnce());

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') loadOnce();
  });
};

let reload = true;
function loadOnce() {
  if (reload) Game.init();

  reload = false;
}
