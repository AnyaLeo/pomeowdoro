
function Incrementor (workFunc, interval, errorFunc) {
    var that = this;
    var expected, timeout;
    this.interval = interval;

    this.start = function() {
        expected = Date.now() + this.interval;
        timeout = setTimeout(step, this.interval);
    }

    this.stop = function() {
        clearTimeout(timeout);
    }

    function step() {
        var drift = Date.now() - expected;
        if (drift > that.interval) {
            // You could have some default stuff here too...
            if (errorFunc) errorFunc();
        }
        workFunc();
        expected += that.interval;
        timeout = setTimeout(step, Math.max(0, that.interval-drift));
    }
}

function Time (seconds, minutes, hours) {
    this.second = seconds;
    this.minutes = minutes;
    this.hours = hours;

    this.totalSeconds = function() {
        var sec = seconds + minutes * 60 + hours * 60 * 60;
        return sec;
    }

    this.countDownFinished = function(countDownSeconds) {
        return (this.totalSeconds() === countDownSeconds);
    }

    this.getSecond = function() {
        return this.second;
    }

    this.getMinutes = function() {
        return this.minutes;
    }

    this.getHours = function() {
        return this.hours;
    }

}


var justSomeNumber = 0;
var timeSet = 20;

var doError = function() {
    console.warn('The drift exceeded the interval.');
};

// FUNCTIONS
var doWork = function() {
    if((timeSet - justSomeNumber) <= 0) {
        ticker.stop();
    } else {
        console.log(++justSomeNumber);
        document.getElementById('timer').textContent = "Timer: " + (timeSet - justSomeNumber);
    }

};

var ticker = new Incrementor(doWork, 1000, doError);
ticker.start();
document.getElementById('timer').textContent = "Timer: " + (timeSet - justSomeNumber);

