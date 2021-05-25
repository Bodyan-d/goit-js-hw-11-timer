class CountdownTimer {
    constructor({ selector, targetDate }) {
        this.elementsRefs = this.getElements(selector);
        this.date = targetDate;
        this.render(this.elementsRefs);
        this.run();
    }

    getElements(timerId) {
        const refs = {
            dayCell: document.querySelector(`${timerId} [data-value="days"]`),
            hourCell: document.querySelector(`${timerId} [data-value="hours"]`),
            minCell: document.querySelector(`${timerId} [data-value="mins"]`),
            secsCell: document.querySelector(`${timerId} [data-value="secs"]`),
        };

        return refs;
    };

    countDate() {
        const time = new Date(this.date) - Date.now();
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((time % (1000 * 60)) / 1000);
        return { days, hours, mins, secs };
    }

    render({ daysCell, hoursCell, minsCell, secsCell }) {
        const time = this.countDate();
        console.log(this.elementsRefs);
        daysCell.textContent = String(time.days).padStart(2, '0');
        hoursCell = String(time.hours).padStart(2, '0');
        minsCell = String(time.mins).padStart(2, '0');
        secsCell = String(time.secs).padStart(2, '0');
    }
    run() {
        const deadline = Date.parse(this.date) <= Date.parse(new Date());
        this.timerId = setInterval(() => {
            if (deadline) {
                this.stop();
                return;
            }
            this.render();
        }, 1000);
    }
    stop() {
        clearInterval(this.timerId);
    }
}
const timer = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Jul 17, 2021'),
});