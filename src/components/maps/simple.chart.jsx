import React from "react";
import { scaleLinear } from "d3-scale";
import {
    ComposableMap,
    Geographies,
    Geography,
} from "react-simple-maps";

const geoUrl =
    "api/world-countries.json"
const colorScale = scaleLinear()
    .domain([0.29, 0.68])
    .range(["#ffedea", "#ff5233"]);

const MapChart = () => {


    return (
        <ComposableMap
            projectionConfig={{
                rotate: [-10, 0, 0],
                scale: 147
            }}
        >
            {/* <Sphere stroke="#E4E5E6" strokeWidth={0.5} /> */}
            {/* <Graticule stroke="#E4E5E6" strokeWidth={0.5} /> */}
            <Geographies geography={geoUrl}>
                {({ geographies }) =>
                    geographies.map((geo) => {
                        //   const d = data.find((s) => s.ISO3 === geo.id);
                        //   console.log(d)
                        return (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                            // fill={d ? colorScale(d["2017"]) : "#F5F4F6"}
                            />
                        );
                    })
                }
            </Geographies>
        </ComposableMap>
    );
};

export default MapChart;
