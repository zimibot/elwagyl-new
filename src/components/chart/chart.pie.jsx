import React, { useEffect, useRef, useState } from 'react';
import { Pie } from '@ant-design/plots';
import { sum } from 'radash'
import { Loadings } from '../loading'

export const PieChart = ({ data = [] }) => {
    const [config, setconfig] = useState();



    useEffect(() => {




        const color = (name) => {
            switch (name) {
                case "solved":
                    return '#fff';
                case "medium":
                    return '#FFBA08';
                case "high":
                    return '#ED6A5E';
                case "low":
                    return '#00D8FF';

                default:
                    return 'yellow';
            }
        }
        const config = {
            appendPadding: 10,
            data,
            autoFit: true,
            angleField: 'count',
            pieStyle: {
                stroke: "transparent"
            },

            radius: 1,
            innerRadius: 0.8,
            label: false,
            colorField: 'name', // or seriesField in some cases
            color: ({ name }) => {

                return color(name)
            },


            interactions: [
                {
                    name: 'element-selected',
                },
                {
                    name: 'element-active',
                },
            ],
            legend: false,
            statistic: {
                title: false,

                content: {
                    content: `<div class="overflow-hidden relative w-[120px] h-[120px]" ><img class="rotate transition-all absolute" width="120" height="120" src='assets_globe/eye.svg'></img></div>`,
                },
            },
        };

        setconfig(config)

        return () => {
            setconfig()
            // setvalue(d => ({
            //     ...d,
            //     PIECHARTVALUE: ({
            //         data: [],
            //         total: 0
            //     })
            // }))
        };
    }, [data]);
    return config ? <Pie {...config} animation={false} /> : "";
};

