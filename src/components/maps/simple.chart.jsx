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
        <div className="absolute w-full h-full overflow-hidden top-0">
            <ComposableMap
                projectionConfig={{
                    rotate: [0, 0, 0],
                    // scale: 147
                }}
            >
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map((geo) => {
                            //   const d = data.find((s) => s.ISO3 === geo.id);
                            //   console.log(d)
                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill={"red"}
                                // fill={d ? colorScale(d["2017"]) : "#F5F4F6"}
                                />
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>
        </div>
    );
};

export default MapChart;
