const { app, BrowserWindow, screen } = require('electron');

// Hot reload; to install, run "npm install --save-dev electron-reload" in your project if it doesnt work automatically
require('electron-reload')(__dirname);

// VARIABLES
var appHeight = 200 + 30 + 50;
var appWidth =  180;

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