const { app, BrowserWindow, screen } = require('electron');

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


// Hot reload; to install, run "npm install --save-dev electron-reload" in your project if it doesnt work automatically
require('electron-reload')(__dirname);

// VARIABLES
var appHeight = 200 + 30 + 80;
var appWidth =  180;

// FUNCTIONS

function main() {
  createWindow();
}

function createWindow () {
  // Find the x and y coordinates for the window
  let display = screen.getPrimaryDisplay();
  let newWindowY = 0; //display.bounds.height - appHeight;
  let newWindowX = display.bounds.width - appWidth;

  // Create the browser window.
  const win = new BrowserWindow({
    width: appWidth,
    height: appHeight,
    x: newWindowX,
    y: newWindowY,
    transparent: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  })
// For testing purposes, we'll just increment
// this and send it out to the console.
  var justSomeNumber = 0;

// Define the work to be done
  var doWork = function() {
    console.log(++justSomeNumber);
  };

// Define what to do if something goes wrong
  var doError = function() {
    console.warn('The drift exceeded the interval.');
  };



// (The third argument is optional)
  var ticker = new Incrementor(doWork, 1000, doError);

  ticker.start();


  // and load the index.html of the app.
  win.loadFile('templates/index.html')



  // Open the DevTools.
  // If the devtools are open, the window will not be transparent
  //win.webContents.openDevTools()
  document.getElementById("cat").style.width = "100px";
  document.getElementById("cat").style.height = "100px";
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(main)