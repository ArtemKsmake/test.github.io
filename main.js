
console.log(Date.now())
if (localStorage.getItem('test')) {
  
} else {
  localStorage.setItem('test', Date.now());
}





// класс для создание таймера обратного отсчета
class CountdownTimer {
  constructor(deadline, cbChange, cbComplete) {
    this._deadline = deadline;
    this._cbChange = cbChange;
    this._cbComplete = cbComplete;
    this._timerId = null;
    this._out = {
      hours: "",
      minutes: "",
    };
    this._start();
  }

  _start() {
    this._calc();
    this._timerId = setInterval(this._calc.bind(this), 1000);
  }
  _calc() {
    const diff = this._deadline - new Date();
    const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
    const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
    this._out.hours = hours < 10 ? "0" + hours : hours;
    this._out.minutes = minutes < 10 ? "0" + minutes : minutes;
    this._cbChange ? this._cbChange(this._out) : null;
    if (diff <= 0) {
      clearInterval(this._timerId);
      this._cbComplete ? this._cbComplete() : null;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // .timer-1 (на минуту)
  const elDays1 = document.querySelector(".timer-1 .timer__days");
  const elHours1 = document.querySelector(".timer-1 .timer__hours");
  const elMinutes1 = document.querySelector(".timer-1 .timer__minutes");
  const deadline1 = new Date(Number(localStorage.getItem('test')) + (((24*60*60*  1000)-1000) + 999));
  new CountdownTimer(
    deadline1,
    (timer) => {
      elHours1.textContent = timer.hours;
      elMinutes1.textContent = timer.minutes;
    },
    () => {
      document.querySelector(".timer-1 .timer__result").textContent =
        "Time is up!";
    }
  );
});


