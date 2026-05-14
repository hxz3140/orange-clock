const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 500,
    height: 180,
    resizable: false,
    frame: false,
    transparent: true,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();
  ipcMain.on('resize-window', (e, { width, height }) => {
    if (win) win.setSize(width, height);
  });
});

app.on('window-all-closed', () => {
  app.quit();
});
