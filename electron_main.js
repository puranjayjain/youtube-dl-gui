const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
// initializing comms
const {ipcMain} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
  // Someone tried to run a second instance, we should focus our window.
  if(mainWindow) {
    if(mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
  }
})

if(shouldQuit) {
  app.quit()
  return
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
    // TODO change it to the actual path on build
    icon: '/Users/Puranjay/Documents/Youtube-dl-gui/src/assets/icon.png'
  })

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/build/index.html')
  // FIXME remove me or keep me it's your choice mainWindow.loadURL('http://localhost:3000')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if(process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if(mainWindow === null) {
    createWindow()
  }
})

// TODO send errors to console of the renderer
process.on('uncaughtException', (error) => {
  console.error(error)
})

// set window progrss bar via ipcmessage
// for more info see http://electron.atom.io/docs/all/#winsetprogressbarprogress
ipcMain.on('progressBar', (event, progress) => {
  mainWindow.setProgressBar(progress)
})
