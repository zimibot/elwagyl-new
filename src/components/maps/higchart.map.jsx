import { ComposableMap, Geographies, Geography, ZoomableGroup, Line, Marker } from "react-simple-maps"
import { Motion, spring } from "react-motion";
import {  useState } from "react";
import { API_GET } from "../../api/elwagyl";
import { GetAndUpdateContext } from "../../model/context.function";

const geoUrl =
    "api/world-countries.json"

export const MapHighcharts = ({ className = "fixed" }) => {
    const API = API_GET.THREATSMAP_GLOBE()
    const { value } = GetAndUpdateContext()

    console.log(value)

    const [open, setOpen] = useState({
        active: false,
        content: null
    });





    const showDrawer = (desc, preview) => {
        setOpen(({
            content: { desc, preview },
            active: true
        }));
    };


    return API.error ? "ERROR" : API.isLoading ? "" : <div className={`${className} w-full left-0 top-0 h-full maps fadein overflow-hidden`}>
        <Motion
            key={1}
            defaultStyle={{
                zoom: value.MAPS2DCONFIG.zoom,
                x: value.MAPS2DCONFIG.x,
                y: value.MAPS2DCONFIG.y
            }}
            style={{
                zoom: spring(value.MAPS2DCONFIG.zoom, { stiffness: 30, damping: 10 }),
                x: spring(value.MAPS2DCONFIG.center[0], { stiffness: 30, damping: 10 }),
                y: spring(value.MAPS2DCONFIG.center[1], { stiffness: 30, damping: 10 })
            }}
        >
            {({ zoom, x, y }) => (
                <ComposableMap
                    key={1}
                    projection="geoEqualEarth"
                    projectionConfig={{
                        scale: 150,
                        center: [0, 0]
                    }}>
                    <ZoomableGroup center={[x, y]} zoom={zoom}>
                        <Geographies
                            geography={geoUrl}
                            fill="#00D8FF"
                            stroke="black"
                            strokeWidth={0.5}
                        >
                            {({ geographies }) =>
                                geographies.map((geo) => (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        style={{
                                            default: {
                                                fill: "#00D8FF",
                                                outline: "none"
                                            },
                                            hover: {
                                                fill: "white",
                                                outline: "none"
                                            },
                                            pressed: {
                                                fill: "#E42",
                                                outline: "none"
                                            }
                                        }}
                                    />
                                ))
                            }
                        </Geographies>


                        {API.map2d.map(({ name, coordinates, markerOffset, color, desc, preview }, k) => {

                            const Markers = <Marker className="marker-custom" coordinates={coordinates} onClick={() => showDrawer(desc, preview)}>
                                <circle id="radar" r={2} fill={`${color}ad`} strokeWidth={0} />
                                <circle id="core" r={2} fill={`${color}`} strokeWidth={0} />

                                <text
                                    textAnchor="middle"
                                    y={markerOffset + 3}
                                    style={{ fill: "white", fontSize: 6, fontWeight: 600 }}
                                >
                                    {name}
                                </text>
                            </Marker>

                            if (name === "Jakarta") {
                                return Markers
                            } else {

                                return (<svg key={k}>
                                    <Line
                                        className="line cursor-pointer"
                                        style={{
                                            animationDuration: `2000ms`
                                        }}
                                        from={[106.816666, -6.200000]}
                                        to={coordinates}
                                        stroke={`${color}`}
                                        strokeWidth={2}
                                    />
                                    {Markers}
                                </svg>
                                )
                            }
                        })}
                    </ZoomableGroup>
                </ComposableMap>
            )}
        </Motion>
    </div>
}

