const remote = require("electron").remote;
const path = require("path");

function openModal() {
  const modal = new remote.BrowserWindow({
    center: true,
    transparent: true,
    frame: false,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
    },
  });

  modal.loadFile(path.join(__dirname, "modal.html"));
  modal.setFullScreen(true);

  // modal.webContents.openDevTools();
}

function closeModal() {
  const win = remote.getCurrentWindow();
  win.close();
}
