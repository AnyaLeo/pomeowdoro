const { app, BrowserWindow } = require('electron');
// Hot reload; to install, run "npm install --save-dev electron-reload" in your project if it doesnt work automatically
require('electron-reload')(__dirname);

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
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
  win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)