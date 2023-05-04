import React from "react";
import { scaleLinear } from "d3-scale";
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup,
    Marker
} from "react-simple-maps";
import { isArray, sift } from "radash";
import { Tooltip } from "antd";
import { GetAndUpdateContext } from "../../model/context.function";
import { PatternLines } from "@vx/pattern";
import { ButtonComponents } from "../../components.eha/button";
import { CloseOutlined } from "@ant-design/icons";

const geoUrl =
    "api/world-countries.json"
const colorScale = scaleLinear()
    .domain([0, 1])
    .range(["#ffedea", "#faad14"]);

const MapChart = ({ data }) => {
    const { value, setvalue } = GetAndUpdateContext()


    console.log(value.MAPSEHA)

    if (isArray(data.result) && data.result.length > 0) {
        let items = data.result.map(d => {
            if (d.country_code) {
                return {
                    ...d,
                }
            }
        })

        let currentData = sift(items) || []
        let style = {
          
            pressed: {
                fill: "#00D8FF",
            },
        }

        return (
            <div className="absolute w-full h-full overflow-hidden top-0">
                <ComposableMap
                    projection="geoMercator"
                    projectionConfig={{
                        center: [0, 0],
                        scale: value.MAPSEHA.scale
                    }}>
                    <PatternLines
                        id="lines"
                        height={6}
                        width={6}
                        stroke="#fff"
                        strokeWidth={0.5}
                        background="#00bddf"
                        orientation={["diagonal"]}
                    />
                    <ZoomableGroup center={[value.MAPSEHA.lon, value.MAPSEHA.lat]} zoom={value.MAPSEHA.zoom}>
                        <Geographies stroke="black"
                            strokeWidth={0.2} geography={geoUrl}>
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    const d = currentData.find((s) => s.country_code === geo.properties['Alpha-2']);
                                    if (value.MAPSEHA.id) {
                                        if (geo.id === value.MAPSEHA.id) {

                                            return <Tooltip title={<div>{geo.properties.name}</div>}>
                                                <Geography
                                                    className="cursor-pointer"
                                                    key={geo.rsmKey}
                                                    geography={geo}
                                                    fill={"url('#lines')"}
                                                    style={style}
                                                    onClick={() => {
                                                        setvalue(d => ({
                                                            ...d, MAPSEHA: {
                                                                ...d.MAPSEHA,
                                                                status: true
                                                            }
                                                        }))
                                                    }}
                                                />
                                            </Tooltip>
                                        }
                                    } else {
                                        if (d) {
                                            return (<Tooltip title={<div>{geo.properties.name}</div>} key={geo.rsmKey}>
                                                <Geography
                                                    className="cursor-pointer"
                                                    geography={geo}
                                                    fill={"url('#lines')"}
                                                    id={geo.id}
                                                    lat={d.latitude}
                                                    lon={d.longitude}
                                                    onClick={(items) => {
                                                        let data = currentData.filter(d => d.country_code === geo.properties['Alpha-2'])
                                                        setvalue(porps => ({
                                                            ...porps, MAPSEHA: {
                                                                scale: 150,
                                                                zoom: 6,
                                                                id: items.target.id,
                                                                lat: items.target.attributes.lat.value,
                                                                lon: items.target.attributes.lon.value,
                                                                data: data,
                                                                status: true,
                                                                marker: data.map((d, k) => ({
                                                                    id: k,
                                                                    markerOffset: -15,
                                                                    name: d.city,
                                                                    coordinates: [parseFloat(d.longitude), parseFloat(d.latitude)]
                                                                }))

                                                            }
                                                        }))
                                                    }}
                                                // fill={d ? colorScale(d["2017"]) : "#F5F4F6"}
                                                />
                                            </Tooltip>
                                            );
                                        } else {
                                            return <Geography
                                                key={geo.rsmKey}
                                                geography={geo}
                                                fill={"#008199"}
                                            // fill={d ? colorScale(d["2017"]) : "#F5F4F6"}
                                            />
                                        }
                                    }




                                })
                            }
                        </Geographies>
                        {value.MAPSEHA.marker && value.MAPSEHA.marker.map(({ coordinates, name, id }) => {

                            console.log()
                            let randomNumber = (Math.floor(Math.random() * 11) + 10) / 10;

                            return <Marker key={id} coordinates={coordinates}>
                                <circle r={0.8} fill={colorScale(randomNumber)} stroke="#fff" strokeWidth={0.2} />
                                <text
                                    textAnchor="middle"
                                    y={-2}
                                    style={{ fontSize: 2, fill: "white" }}
                                >
                                    {name}
                                </text>
                            </Marker>
                        })}

                    </ZoomableGroup>
                </ComposableMap>
                {value.MAPSEHA.marker && <div className="absolute top-[90px] right-[15px] flex gap-4">
                    <ButtonComponents click={() => setvalue(d => ({ ...d, MAPSEHA: { ...d.MAPSEHA, status: true } }))}> DETAIL</ButtonComponents>
                    <Tooltip title="CLOSE ZOOM">
                        <button onClick={() => setvalue(d => ({ ...d, MAPSEHA: {
                              scale: 100,
                              zoom: 1,
                              id: null,
                              status: false,
                              lat: 0,
                              lon: 0,
                              data: null,
                              marker: null
                        }}))} className="p-3 bg-primary text-red-500 flex items-center"><CloseOutlined></CloseOutlined></button>
                    </Tooltip>

                </div>}

            </div>
        );
    } else {
        return ""
    }
};

export default MapChart;
