class CountdownTimer {
    constructor({ selector, targetDate }) {
        this.selector = selector;
        this.date = targetDate;
        this.render(this.elementsRefs);
        this.run();
    }

    getElements(timerId) {

        const dayCell = document.querySelector(`${timerId} [data-value="days"]`);
        const hourCell = document.querySelector(`${timerId} [data-value="hours"]`);
        const minCell = document.querySelector(`${timerId} [data-value="mins"]`);
        const secsCell = document.querySelector(`${timerId} [data-value="secs"]`);


        return { dayCell, hourCell, minCell, secsCell };
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

    render() {
        const time = this.countDate();
        const elementsRefs = this.getElements(this.selector);
        elementsRefs.dayCell.textContent = String(time.days).padStart(2, '0');
        elementsRefs.hourCell.textContent = String(time.hours).padStart(2, '0');
        elementsRefs.minCell.textContent = String(time.mins).padStart(2, '0');
        elementsRefs.secsCell.textContent = String(time.secs).padStart(2, '0');
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