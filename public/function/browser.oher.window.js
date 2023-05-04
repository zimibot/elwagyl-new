const { BrowserView, screen } = require("electron");

function OtherView() {
    const { width } = screen.getPrimaryDisplay().size;

    let zoomFactor;
    if (width <= 1280) {
        zoomFactor = 0.6; // HD
    } else if (width <= 1920) {
        zoomFactor = 0.8; // FHD
    } else if (width <= 2560) {
        zoomFactor = 1.0; // QHD/2K
    } else {
        zoomFactor = 1.3; // UHD/4K
    }

    const other = new BrowserView({
        transparent: true,
        webPreferences: {
            backgroundColor: "#00000000",
            transparent: true,
            zoomFactor,
        },
    });

    return other;
}

module.exports = OtherView;