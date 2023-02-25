const { BrowserView, screen } = require("electron")

module.exports = function OtherView () {
    let innerScreen = screen.getPrimaryDisplay()
    let size = innerScreen.size
    let other = new BrowserView({
        transparent: true,
        webPreferences: {
            backgroundColor: '#00000000',
            transparent: true,
            zoomFactor: size.width < 1500 ? 0.64 : size.width < 2000 ? 0.89 : size.width < 3000 ? 1.1 : 1.4,
        }
    })
    

    return other

}
