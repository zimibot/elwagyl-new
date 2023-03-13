import { GetAndUpdateContext } from "../../model/context.function"


export const GlobeGl = ({ status, position = "fixed" }) => {
    const { setvalue, value } = GetAndUpdateContext()
  
    return <div className={`fadein z-0  ${position}`} style={{
        width: "100%",
        height: "100%",
        top: status ? "30%" : "15%",

    }}>


        <iframe className="w-full h-full" style={{
            background: "transparent"
        }} allowtransparency="true" onLoad={async d => {

            var frame = d.target.contentDocument || d.target.document
            let fnc = d.target.contentWindow
            fnc.redirect = (e) => {
                console.log(e)
                let data = [e.lon, e.lat]
                const items = value.OPTIONALVIEW.map(
                    item => item.key === 1 ? { ...item, active: true } : { ...item, active: false }
                );

                  
                setvalue(d => ({
                    ...d, GLOBEVALUE: {
                        value: "detailview"
                    },

                    OPTIONALVIEW: [...items],
                    MAPS2DCONFIG: {
                        ...d.MAPS2DCONFIG,
                        center: [0, 0],
                        zoom: 1
                    }

                }))

                setTimeout(() => {
                    setvalue(d => ({
                        ...d,
                        MAPS2DCONFIG: {
                            ...d.MAPS2DCONFIG,
                            center: data,
                            zoom: 3
                        }
                    }))
                }, 300);
            }

            let arr = ["data.js", "globe.js"]
            var script = frame.createElement("script");
            arr.map((d, k) => {
                setTimeout(() => {
                    var script = frame.createElement("script");
                    script.src = d
                    frame.getElementsByTagName("HEAD")[0].appendChild(script);
                }, 200 * k);
            })
            script.append(`
                var peppers = {};
                window.langUrl = '/';
                window.authUser = 0;
                window.animateZoomIn = 60;
                window.animateZoomOut =150;
                window.userLang = 'en';
                window.dateMenu = [2020, 2030, 2040]
                window.currentCoordinate = {
                    lat: -6.200000,
                    lng: 106.816666
                }

                window.redirect;
            `)


            await frame.getElementsByTagName("BODY")[0].appendChild(script);


        }} src="globe/index.html"></iframe>

    </div>
}