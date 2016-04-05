var app = require('app'),
  BrowserWindow = require('browser-window'),
  ipc = require('electron').ipcMain,
  saml = require('logrr-electron-auth').saml,
  samlElecton = require('logrr-electron-auth').samlElectron;
app.commandLine.appendSwitch('disable-http-cache');

var mainWindow = null;

var samlSettings = {
  validateInResponseTo: false,
  issuer: 'logrr-saml',
  entryPoint: '-- Logrr auth application specific here --',
  cert: '-- base64 public key to validate assertions --'
};
var samlElectonSettings = {
  app: app,
  ipc: ipc,
  browserWindow: BrowserWindow,
  authenticationSucceeded: function(profile) {
    mainWindow.webContents.send('authentication-ok', profile.nameID);
  }
};
saml.setParams(samlSettings);
samlElecton.setParams(samlElectonSettings);

ipc.on('logrr-login', function(event, login) {
  samlElecton.openLogrrLoginWindow(login);
});

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });
  // On Mac, data is stored into Users/NAME/Library/Caches/APPNAME
  mainWindow.setMenu(null);
  mainWindow.webContents.session.clearStorageData(function() {
    mainWindow.loadURL('file://' + __dirname + '/index.html');
  });
  mainWindow.on('closed', function() {
    mainWindow = null;
    app.quit();
  });
});