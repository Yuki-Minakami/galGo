const electron = require('electron')
var fs = require("fs");
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const ipcMain = require('electron').ipcMain;

var commonTxt = require("./scenario/common.js")

var commonCG = require("./controller/CGController.js");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
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
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on("load",function(event,arg){
  console.log("get load");
  var content = fs.readFileSync("./sl/list.json");
  var obj = JSON.parse(content.toString());
  event.sender.send("loadCallback",obj);
})

ipcMain.on("save",function(event,arg){
  var content = fs.readFileSync("./sl/list.json");
  var obj = JSON.parse(content.toString());
  event.sender.send("saveCallback",obj);
})

ipcMain.on("saveFinished",function(event,arg){
  console.log(arg);
  var content = fs.readFileSync("./sl/list.json");
  var obj = JSON.parse(content.toString());
  obj[arg.count][0] = "p"+arg.BG;
  console.log(JSON.stringify(obj));
  fs.writeFileSync("./sl/list.json",JSON.stringify(obj))

})

ipcMain.on("qSave",function(event,arg){
  var content = fs.readFileSync("./sl/list.json");
  var obj = JSON.parse(content.toString());
  obj["qSave"][0] = "p"+arg.BG;
  fs.writeFileSync("./sl/list.json",JSON.stringify(obj))

  event.sender.send("qSaveCallback"," ");

})


ipcMain.on("qLoad",function(event,arg){
  var content = fs.readFileSync("./sl/list.json");
  var obj = JSON.parse(content.toString());
  var qLoadObj = obj.qSave;
  event.sender.send("qLoadCallback",qLoadObj)
})


ipcMain.on("reqTxt",function(event,arg){
  var BGTxt = commonTxt["p"+arg.BG];
  console.log(arg.BG);
  console.log(BGTxt);
  event.sender.send("reqTxtCallback",BGTxt);

})

ipcMain.on("reqCG",function(event,arg){
  var status = arg.BG;
  var CGList = commonCG["p"+status];
  console.log(CGList);
  event.sender.send("reqCGCallback",CGList);

})