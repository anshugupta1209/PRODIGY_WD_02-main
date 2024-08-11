let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = ms % 1000;

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
}

function updateDisplay() {
    const display = document.getElementById('display');
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    display.textContent = formatTime(elapsedTime);
}

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        document.getElementById('startStopBtn').textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateDisplay, 10);
        isRunning = true;
        document.getElementById('startStopBtn').textContent = 'Stop';
    }
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    document.getElementById('display').textContent = '00:00:00';
    document.getElementById('startStopBtn').textContent = 'Start';
    laps = [];
    document.getElementById('laps').innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        laps.push(lapTime);
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${laps.length}: ${lapTime}`;
        document.getElementById('laps').appendChild(lapElement);
    }
}

document.getElementById('startStopBtn').addEventListener('click', startStop);
document.getElementById('resetBtn').addEventListener('click', reset);
document.addEventListener('keypress', (e) => {
    if (e.code === 'Space') {
        recordLap();
    }
});
