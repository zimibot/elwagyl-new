import React from 'react';
import { Pie } from '@ant-design/plots';

export const PieChart = () => {
    const data = [
        {
            type: 'REQUEST',
            value: 27,
        },
        {
            type: 'ATTACKING',
            value: 25,
        },

    ];
    const config = {
        appendPadding: 10,
        height: 220,
        data,
        angleField: 'value',
        colorField: 'type',
        color: ["#ED6A5E", "#00D8FF"],
        radius: 1,
        pieStyle: {
            lineWidth: 0,
            shadowBlur: 5,
            shadowOffsetX: 5,
            shadowOffsetY: 5,
            cursor: 'pointer'
        },
        innerRadius: 0.8,
        legend: {
            layout: 'horizontal',
            position: 'bottom',
            itemName: {
                style: {
                    fill: "#00D8FF",
                    fontSize: 16
                }
            }

        },
        label: false,
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
        statistic: {
            title: false,
            content: {
                style: {
                    whiteSpace: 'pre-wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                },
                content: `<div class="text-[36px] relative top-[-18px]">
            <span class="text-blue">10</span></br><span class="text-red-500">10</span>
            </div>`,
            },
        },
    };
    return <Pie {...config} />;
};

