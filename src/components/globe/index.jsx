import { GetAndUpdateContext } from "../../model/context.function"
import { API_GET } from "../../api";
import styled from "styled-components";

const Earth = styled.div`
    position: relative;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: transparent url("/assets/globe.png");
    background-size: cover;
    box-shadow: inset 0px -20px 50px 10px #00ffff80,
        0px 0px 30px 6px #00ffff70;
    transform-style: preserve-3d;
    transform: rotate(20deg);
    animation: rotate 15s linear infinite;

    
    @keyframes rotate {
        0% {
            background-position: 0 0;
        }

        100% {
            background-position: 530px 0;
        }
    }

`

export const GlobeGl = ({ status, position = "fixed" }) => {
    const { setvalue, value } = GetAndUpdateContext()
    let API_SEVERITY = API_GET.ALERT_SEVERITY()
    let API_GLOBE = API_GET.THREATSMAP_GLOBE()


    return API_GLOBE.error ? "ERROR" :  API_GLOBE.isLoading ? <div className="flex w-full h-full bottom-0 absolute items-center justify-center text-[24px]">
        <div className="space-y-6 text-center">
            <Earth></Earth>
            <div>LOADING GLOBE DATA</div>
        </div>
    </div> : <div className={`fadein z-0  ${position}`} style={{
        width: "100%",
        height: "100%",
        top: status ? "30%" : "15%",

    }}>

        {API_SEVERITY.isLoading || API_SEVERITY.props.isRefetching ? "" : <iframe className="w-full h-full fadein" style={{
            background: "transparent"
        }} allowtransparency={"true"} onLoad={async d => {

            var frame = d.target.contentDocument || d.target.document
            let fnc = d.target.contentWindow
            fnc.redirect = (e) => {
                let data = [e.lon, e.lat]
                const items = value.OPTIONALVIEW.map(
                    item => item.key === 1 ? { ...item, active: true } : { ...item, active: false }
                );


                setvalue(d => ({
                    ...d, 
                    GLOBEVALUE: {
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
                            // zoom: 3
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
            let color = API_SEVERITY.system.color.replace("#", "")
            script.append(`
                var peppers = {};
                window.langUrl = '/';
                window.authUser = 0;
                window.color=0x${color};
                window.animateZoomIn = 60;
                window.animateZoomOut =80;
                window.userLang = 'en';
                window.dateMenu = [2020, 2030, 2040]
                window.dataGlobe= ${JSON.stringify(API_GLOBE.item)}
                window.currentCoordinate = {
                    lat: -6.200000,
                    lng: 106.816666
                }

                window.redirect;
            `)


            await frame.getElementsByTagName("BODY")[0].appendChild(script);


        }} src="globe/index.html" />}


    </div>
}