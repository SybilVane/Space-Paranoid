let reload = true;

function loadOnce() {
    if (reload) Game.init();

    reload = false;
}

window.onload = () => {

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Enter') loadOnce();

    });

    document.addEventListener('touchstart', (e) => {
       if (e.changedTouches[0].pageY) loadOnce();

    });

};

if (navigator.getGamepads) {
    if (navigator.getGamepads()[0]?.buttons[0].pressed) console.log('Secret message!')
}