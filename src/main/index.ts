import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { downloadVideo, getVideoTitle } from 'yt-get'
import NodeID3 from 'node-id3'

ipcMain.handle('download-song', async (_event, arg) => {
  arg ? await downloadVideo(arg) : ''

  const title = arg ? await getVideoTitle(arg) : ''

  const tags = {
    title: 'aaaa',
    artist: 'bbbb',
    album: 'cccccc',
    APIC: 'https://i.pinimg.com/736x/ea/1f/64/ea1f64668a0af149a3277db9e9e54824.jpg',
    comment: {
      language: 'eng',
      text: 'Some comment',

      shortText: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    },
  }

  const path = await process.cwd()

  const filePath = path + '/music/' + title + '.mp3'
  setTimeout(async () => {
    await NodeID3.write(tags, filePath, function (err) {
      if (err) throw err
      console.log('Metadata written to file!')

      const tags = NodeID3.read(filePath)

      console.log(tags)
    })
  }, 2000)

  return { title, path: process.cwd() }
})

ipcMain.handle('get-path', async () => {
  const path = await process.cwd()
  const fstext = process.env.NODE_ENV === 'development' ? '/@fs/' : ''

  return fstext + path + '/music/'
})

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.openDevTools()

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
