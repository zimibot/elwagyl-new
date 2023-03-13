import React, { useEffect, useRef } from 'react';
import { RadialBar } from '@ant-design/plots';
import { GetAndUpdateContext } from '../../model/context.function';

export const ChartRadialBar = () => {
    const { setvalue } = GetAndUpdateContext()

    const refChart = useRef()
    const data = [
        {
            name: 'OVERDUE',
            count: 10,
            color: "#ED6A5E"
        },
        {
            name: 'ATTENTION',
            count: 6,
            color: "#FFBA08"
        },
        {
            name: 'SECURE',
            count: 5,
            color: "#00D8FF"
        },
    ];
    const config = {
        data,
        xField: 'name',
        yField: 'count',
        endAngle: 0,
        startAngle: 15.7,
        maxAngle: 360,
        //最大旋转角度,
        xAxis: false,
        tooltip: {
            formatter: (datum) => {
                return {
                    name: "TOTAL",
                    value: datum.count,
                };
            },
        },
        radius: 0.85,
        innerRadius: 0.6,
        colorField: "color",
        color: ({ color }) => {
            return data.find((d) => d.color === color).color;
        },
        barBackground: {},

        barStyle: {
            lineCap: 'cube',
        },
        annotations: [
            {
                type: 'html',
                position: ['31%', '65%'],
                html: (container, view) => {
                    console.log(view.options.data)
                    // const w = coord.polarRadius * coord.innerRadius * 1.15;

                    return `<div class="font-bold text-[24px] flex gap-4">
                    ${view.options.data.map(d => {
                        return `<div style="color:${d.color}">${d.count}</div>`
                    })
                        }
                     </div>`.replace(/,/g, "<span>|</span>");
                }
            },
        ],

    };

    useEffect(() => {
        if (refChart.current) {
            let chart = refChart.current.getChart()

            let data = chart.options.data

            setvalue(d => ({
                ...d,
                CHARTRADIAL: data
            }))

        }
    }, [])

    return <div className="h-80 ">
        <RadialBar {...config} ref={refChart} animation={false} />
    </div>;
};

