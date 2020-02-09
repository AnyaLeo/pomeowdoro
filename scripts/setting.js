electron = require('electron')
const { BrowserWindow } = electron
const setting = document.getElementById('popupSetting');

setting.addEventListener('mousedown', function() {
    console.log("setting");
    //const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;
    //console.log(width + height);
    createSettingWindow();
});

function createSettingWindow(){
    const remote = electron.remote;
    const Window = remote.BrowserWindow;
    const win = new Window({
      height: 200,
      width: 300
    });

    win.loadURL(`file://${__dirname}/settings.html`);
}