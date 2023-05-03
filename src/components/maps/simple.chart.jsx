import React from "react";
import { scaleLinear } from "d3-scale";
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup
} from "react-simple-maps";
import { isArray, sift } from "radash";
import { Tooltip } from "antd";
import { useState } from "react";
import { Motion, spring } from "react-motion";

const geoUrl =
    "api/world-countries.json"
const colorScale = scaleLinear()
    .domain([0, 1])
    .range(["#ffedea", "#ff5233"]);

const MapChart = ({ data }) => {
    const [countrySelect, setCountrySelect] = useState({
        zoom: 1,
        id: null,
        lat: 0,
        lon: 0,
    })
    if (isArray(data.result) && data.result.length > 0) {
        let items = data.result.map(d => {
            if (d.country_code) {
                return {
                    ...d,
                }
            }
        })

        let currentData = sift(items) || []

        return (
            <div className="absolute w-full h-full overflow-hidden top-0">
                <Motion
                    key={1}
                    defaultStyle={{
                        zoom: countrySelect.zoom,
                        x: countrySelect.lon,
                        y: countrySelect.lat
                    }}
                    style={{
                        zoom: spring(countrySelect.zoom, { stiffness: 30, damping: 10 }),
                        x: spring(countrySelect.lon, { stiffness: 30, damping: 10 }),
                        y: spring(countrySelect.lat, { stiffness: 30, damping: 10 })
                    }}
                >
                    {({ zoom, x, y }) => (
                        <ComposableMap
                            // projection="geoEqualEarth"
                            projectionConfig={{
                                scale: 150,
                                center: [0, 0]
                            }}>

                            <ZoomableGroup center={[x, y]} zoom={zoom} zoomAndPan={[]}>
                                <Geographies geography={geoUrl}>
                                    {({ geographies }) =>
                                        geographies.map((geo) => {
                                            const d = currentData.find((s) => s.country_code === geo.properties['Alpha-2']);

                                            console.log(d)
                                            if (countrySelect.id) {
                                                if (geo.id === countrySelect.id) {
                                                    return <Geography
                                                        key={geo.rsmKey}
                                                        geography={geo}
                                                        fill={"red"}
                                                    // fill={d ? colorScale(d["2017"]) : "#F5F4F6"}
                                                    />
                                                }
                                            } else {
                                                if (d) {
                                                    return (<Tooltip title={<div>{geo.properties.name}</div>} key={geo.rsmKey}>
                                                        <Geography
                                                            geography={geo}
                                                            fill={"#00D8FF"}
                                                            id={geo.id}
                                                            lat={d.latitude}
                                                            lon={d.longitude}
                                                            onClick={(items) => {

                                                                setCountrySelect({ zoom: 6, id: items.target.id, lat: items.target.attributes.lat.value, lon: items.target.attributes.lon.value })
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
                            </ZoomableGroup>

                        </ComposableMap>)}
                </Motion>
            </div>
        );
    } else {
        return ""
    }
};

export default MapChart;
