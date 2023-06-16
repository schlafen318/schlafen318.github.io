let timer = {
    time: 25 * 60, // Starting with 25 minutes in seconds
    running: false,
    interval: null,

    start: function() {
        if (!this.running) {
            this.running = true;
            this.interval = setInterval(() => {
                this.time--;
                if (this.time <= 0) this.stop();
                updateDisplay();
            }, 1000);
        }
    },

    pause: function() {
        if (this.running) {
            clearInterval(this.interval);
            this.running = false;
        }
    },

    reset: function() {
        this.time = 25 * 60;
        this.pause();
        updateDisplay();
    },

    stop: function() {
        this.reset();
        // Notify user here
    }
};

function updateDisplay() {
    let minutes = Math.floor(timer.time / 60);
    let seconds = timer.time % 60;
    document.getElementById('time-display').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    let taskInput = document.getElementById('task-input');
    let newTask = document.createElement('li');
    newTask.textContent = taskInput.value;
    document.getElementById('task-list').appendChild(newTask);

    taskInput.value = ''; // Clear input field
});

document.getElementById('start').addEventListener('click', function() {
    timer.start();
});

document.getElementById('pause').addEventListener('click', function() {
    timer.pause();
});

document.getElementById('reset').addEventListener('click', function() {
    timer.reset();
});

function notifyUser(message) {
    if (!("Notification" in window)) {
        alert("This browser does not support system notifications");
    }
    else if (Notification.permission === "granted") {
        new Notification(message);
    }
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
            if (permission === "granted") {
                new Notification(message);
            }
        });
    }
}

// Call this function in the timer's stop method
timer.stop = function() {
    this.reset();
    notifyUser("Pomodoro session ended!");
};
