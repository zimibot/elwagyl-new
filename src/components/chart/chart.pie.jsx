import React, { useEffect, useRef, useState } from 'react';
import { Pie } from '@ant-design/plots';
import { sum } from 'radash'
import { Loadings } from '../loading'
import { GetAndUpdateContext } from '../../model/context.function';

export const PieChart = () => {
    const [config, setconfig] = useState();
    const { setvalue } = GetAndUpdateContext()

    const [isLoad, setisLoad] = useState();


    useEffect(() => {
        const data = [
            {
                type: 'solved',
                value: 27,
            },
            {
                type: 'low',
                value: 100,
            },
            {
                type: 'high',
                value: 18,
            },
            {
                type: 'medium',
                value: 15,
            },
        ];

        let totalRes = sum(data, f => f.value)


        data.map(s => {
            setvalue(d => ({
                ...d, PIECHARTVALUE: ({
                    data: [...d.PIECHARTVALUE.data, {
                        value: s.value, type: s.type, color: color(s.type)
                    }],
                    total: totalRes
                })
            }))
        })



        const color = (type) => {
            switch (type) {
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
            angleField: 'value',
            pieStyle: {
                stroke: "transparent"
            },

            radius: 1,
            innerRadius: 0.8,
            label: false,
            colorField: 'type', // or seriesField in some cases
            color: ({ type }) => {

                return color(type)
            },


            interactions: [
                {
                    type: 'element-selected',
                },
                {
                    type: 'element-active',
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

        let tm = setTimeout(() => {
            setisLoad(true)
            setconfig(config)
        }, 1000);

        return () => {
            clearTimeout(tm)
            setconfig({})
            setvalue(d => ({
                ...d,
                PIECHARTVALUE: ({
                    data: [],
                    total: 0
                })
            }))
        };
    }, []);
    return isLoad ? <Pie {...config} animation={false} /> : <div className='h-full w-full flex items-center justify-center'><Loadings></Loadings></div>;
};

