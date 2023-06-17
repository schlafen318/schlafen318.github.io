let time = 25 * 60;
let running = false;

function tick() {
    if (running) {
        time--;
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        postMessage(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
        if (time > 0) {
            setTimeout(tick, 1000);
        } else {
            running = false;
        }
    }
}

onmessage = function(event) {
    switch (event.data) {
        case 'start':
            if (!running) {
                running = true;
                tick();
            }
            break;
        case 'pause':
            running = false;
            break;
        case 'reset':
            time = 25 * 60;
            running = false;
            break;
    }
};
