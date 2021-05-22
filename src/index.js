const daysRef = document.querySelector('[data-value="days"]');
const hoursRef = document.querySelector('[data-value="hours"]');
const minsRef = document.querySelector('[data-value="mins"]');
const secsRef = document.querySelector('[data-value="secs"]');


class CountdownTimer {
    constructor({ selector, targetDate, onTick }) {
        this.selector = selector;
        this.targetDate = targetDate;
        this.intervalId = null;
        this.onTick = onTick;
    };

    start() {
        const dateNow = Date.now();

        this.intervalId = setInterval(() => {
            const deltaTime = this.targetDate - dateNow;
            const time = getTimeComponents(deltaTime);
            this.onTick(time);

        }, 1000);
    };

};

const timer = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Jul 17, 2021'),
    onTick: updateClockface,
});

timer.start()

function pad(velue) { return String(velue).padStart(2, '0') };

function getTimeComponents(deltaTime) {


    const days = pad(Math.floor(deltaTime / (1000 * 60 * 60 * 24)));
    const hours = pad(Math.floor((deltaTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = pad(Math.floor((deltaTime % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = pad(Math.floor((deltaTime % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
};

function updateClockface({ days, hours, mins, secs }) {
    daysRef.textContent = days;
    hoursRef.textContent = hours;
    minsRef.textContent = mins;
    secsRef.textContent = secs;
};