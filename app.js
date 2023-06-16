let timer = {
    time: 25 * 60, // initial time in seconds
    running: false, // flag indicating if the timer is running

    start: function() {
        if (!this.running) {
            this.running = true;
            this.tick();
        }
    },

    pause: function() {
        this.running = false;
    },

    reset: function() {
        this.time = 25 * 60; // reset time to initial value
        this.running = false;
        this.updateDisplay();
    },

    tick: function() {
        if (this.running) {
            this.time--;
            if (this.time >= 0) {
                this.updateDisplay();
                setTimeout(this.tick.bind(this), 1000); // schedule the next tick
            } else {
                this.running = false; // stop the timer when it reaches 0
            }
        }
    },

    updateDisplay: function() {
        let minutes = Math.floor(this.time / 60);
        let seconds = this.time % 60;
        // assume that there is an HTML element with id "timer"
        document.getElementById('timer').innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
};

// assume that there are HTML elements with ids "start", "pause", and "reset"
document.getElementById('start').addEventListener('click', function() {
    timer.start();
});

document.getElementById('pause').addEventListener('click', function() {
    timer.pause();
});

document.getElementById('reset').addEventListener('click', function() {
    timer.reset();
});
