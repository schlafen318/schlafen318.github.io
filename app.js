// Create a new worker
let worker = new Worker('worker.js');

// Handle messages from the worker
worker.onmessage = function(event) {
    // Update the timer display with the data from the worker
    document.getElementById('timer').innerText = event.data;
};

// Add event listeners for the buttons
document.getElementById('start').addEventListener('click', function() {
    worker.postMessage('start');
});

document.getElementById('pause').addEventListener('click', function() {
    worker.postMessage('pause');
});

document.getElementById('reset').addEventListener('click', function() {
    worker.postMessage('reset');
});

