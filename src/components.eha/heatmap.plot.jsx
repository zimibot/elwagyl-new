import React, { useState, useEffect } from 'react';
import { Heatmap } from '@ant-design/plots';
import { Empty } from 'antd';

export const HeatmapComponent = ({data = []}) => {

    // useEffect(() => {
    //     let day = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(s => {
    //         return [1, 2, 3, 4, 5].map(d => ({
    //             "WEEK": `${d} WEEK`,
    //             "DAYS": s,
    //             "TOTAL": parseInt(Math.random(256) * 1582)
    //         }))
    //     })

    //     let item = []
    //     for (const key in day) {
    //         item.push(...day[key])
    //     }

    //     setData(item)
    //     return () => {
    //         setData([])
    //         item = []
    //     };
    // }, []);


    console.log(data)

    if (data.length === 0) {
        return <div className="p-4"><Empty></Empty></div>
    }


    const config = {

        height: 200,
        data,
        xField: 'WEEKS',
        yField: 'DAYS',
        colorField: 'TOTAL',
        // color: ["#00D8FF", "#FFBA08", "#FF7A00", "#ED6A5E"],
        color: ({ TOTAL }) => {
            if (TOTAL < 250) {
                return "#00D8FF"
            } else if (TOTAL < 800) {
                return "#FFBA08"
            } else if (TOTAL < 1600) {
                return "#FF7A00"
            } 
            return "#ED6A5E";
        },
        // sizeField: 'TOTAL',
        heatmapStyle: {
            stroke: '#101C26',
            opacity: 1,
            lineWidth: 10,
        },
        yAxis: {
            grid: null,
            position: 'left',
            label: {
                style: {
                    fill: '#00D8FF',
                    fontSize: 16,
                }
            }
        },
        xAxis: {
            grid: null,
            position: 'bottom',
            label: {
                style: {
                    fill: '#00D8FF',
                    fontSize: 16,
                }
            }
        },

        // legend: {
        //     layout: 'vertical',
        //     position: 'right',

        //     label: {
        //         style: {
        //             fill: "#00D8FF",
        //         },
        //         spacing: 10,
        //         formatter: (d) => {
        //             return d
        //         }
        //     },


        // },

        meta: {
            'WEEK': {
                type: 'cat',
            },

        },
        tooltip: {
            showMarkers: false,
        },
        interactions: [
            {
                type: 'element-active',
            },
        ],
    };

    return <div>
        <Heatmap {...config} />
    </div>;
};

