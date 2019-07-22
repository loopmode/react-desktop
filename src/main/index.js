'use strict'
import env from '@/env'
import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import { format as formatUrl } from 'url'
import initDevTools from './dev/initDevTools'

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow

function createMainWindow() {
  const window = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      preload: path.resolve(`${__dirname}/../renderer/preload.js`)
    }
  })

  // the isMainWindow flag be picked up by renderer/env.js
  // it is only true for the root window, but not for any additionally opened windows
  window.isMainWindow = true

  if (env.isDevelopment) {
    initDevTools(window, true)
  }

  window.on('error', error => {
    console.error({ error })
  })
  window.on('closed', () => {
    mainWindow = null
  })
  window.loadURL(createURL())

  return window
}

function createURL() {
  if (env.isDevelopment) {
    return `http://localhost:${env.ELECTRON_WEBPACK_WDS_PORT}`
  }
  return formatUrl({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true
  })
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createMainWindow()
})

// if (module.hot) {
//   module.hot.accept()
// }
