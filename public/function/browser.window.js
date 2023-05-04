const { initialize, enable } = require('@electron/remote/main');
const { BrowserWindow, screen } = require('electron');
const path = require('path');

// Disable security warnings
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

// Initialize remote module
initialize();


// Create window configuration function
module.exports = function createWindowConfig(mainConfig = {}, webPreferences = {}) {

  // Define screen resolutions
  const resolutions = {
    HD: { width: 1280, height: 720, zoomFactor: 0.8 },
    UHD: { width: 1920, height: 1080, zoomFactor: 1 },
    "2k": { width: 2560, height: 1440, zoomFactor: 1.3 },
    "4k": { width: 3840, height: 2160, zoomFactor: 1.7 }
  };

  // Get primary display size
  const { width, height } = screen.getPrimaryDisplay().size;

  // Set screen resolution based on display width
  let screenResolution = "HD";
  if (width >= resolutions["4k"].width) {
    screenResolution = "4k";
  } else if (width >= resolutions["2k"].width) {
    screenResolution = "2k";
  } else if (width >= resolutions.UHD.width) {
    screenResolution = "UHD";
  }

  // Set zoom factor based on screen resolution
  const zoomFactor = resolutions[screenResolution].zoomFactor;

  const windowConfig = {
    minWidth: resolutions[screenResolution].width,
    minHeight: resolutions[screenResolution].height,
    show: false,
    autoHideMenuBar: true,
    frame: false,
    transparent: false,
    backgroundColor: "#101C26",
    ...mainConfig,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: true,
      zoomFactor,
      preload: path.join(__dirname, "../preload.js"), // path to your preload.js file
      ...webPreferences,
    },
  };

  // Create and enable remote module for window
  const window = new BrowserWindow(windowConfig);
  enable(window);

  return window;
};