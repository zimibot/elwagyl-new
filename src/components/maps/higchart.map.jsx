import { ComposableMap, Geographies, Geography, ZoomableGroup, Line, Marker } from "react-simple-maps"
import { Modal, Tooltip } from 'antd';
import { Motion, spring } from "react-motion";
import { useEffect, useState } from "react";
import { API_DATAMAPS } from "../../api";
import { GetAndUpdateContext } from "../../model/context.function";

const geoUrl =
    "api/world-countries.json"

export const MapHighcharts = ({ className = "fixed" }) => {
    const API = API_DATAMAPS()
    const { value } = GetAndUpdateContext()

    const [state, setstate] = useState([]);
    const [open, setOpen] = useState({
        active: false,
        content: null
    });

    useEffect(() => {
        if (!API.isLoading && !API.error) {

            let data = API.data
            setstate(data.locations.map(d => ({
                ...d,
                color: "#aa1a0c",
                markerOffset: -10,
                coordinates: [d.planet_v, d.planet_u]
            })))
        }

        return () => {
            setstate([])
        }

    }, [API.data, API.error, API.isLoading]);


    const showDrawer = (desc, preview) => {
        setOpen(({
            content: { desc, preview },
            active: true
        }));
    };


    return <div className={`${className} w-full left-0 top-0 h-full maps fadein overflow-hidden`}>
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


                        {state.map(({ name, coordinates, markerOffset, color, desc, preview }, k) => {

                            const Markers = <Tooltip title="click to see details                            ">
                                <Marker className="marker-custom" coordinates={coordinates} onClick={() => showDrawer(desc, preview)}>
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
                            </Tooltip>

                            if (name === "Jakarta") {
                                return Markers
                            } else {

                                return (<svg key={k}>
                                    <Tooltip title={`${name} Attack Kejaksaan Jakarta`}>
                                        <Line
                                            className="line cursor-pointer"
                                            style={{
                                                animationDelay: `${k * 300}ms`,
                                                animationDuration: `${(k + 1) * 2000}ms`
                                            }}
                                            from={[106.816666, -6.200000]}
                                            to={coordinates}
                                            stroke={`${color}`}
                                            strokeWidth={2}
                                        />
                                    </Tooltip>
                                    {Markers}
                                </svg>
                                )
                            }
                        })}
                    </ZoomableGroup>
                </ComposableMap>
            )}
        </Motion>
        {/* <Drawer title={false} closable={false} width={600} placement="left" onClose={onClose} open={open.active}>
            <ContentPover open={open}></ContentPover>
        </Drawer> */}
        <Modal title={false} open={open.active} centered footer={false} onCancel={() => setOpen(d => ({ ...d, active: !d.active }))} closable={false}>
            <ContentPover open={open}></ContentPover>
            <div className="px-4 py-2 bg-primary">Total : 40 Item</div>
        </Modal>
    </div>
}


const ContentPover = ({ open }) => {
    if (!open.active) {
        return ""
    }

    let attack = open.content.desc.attack
    let list = attack.attack_list || []
    console.log(list)
    return <div>
        <div className="uppercase relative" >
            <div className="grid grid-cols-4 font-bold px-4 py-3 bg-primary text-[white] sticky">
                <div className="col-span-2">Name Attack</div>
                <div>Date</div>
                <div className="text-end">Type INDICATOR</div>
            </div>
            <div className="max-h-96 overflow-auto px-4 py-3">
                {list.map((d, k) => {
                    return <div className="grid grid-cols-4 py-1" key={k}>
                        <div className="col-span-2">{d.name}</div>
                        <div>20/01/2022 01:10</div>
                        <div className="flex items-center justify-end">
                            <div className="border py-1 px-4 border-[#a01e1e] text-[#a01e1e] text-sm">RED CODE</div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    </div>
}