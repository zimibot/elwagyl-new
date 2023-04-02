import React from 'react';
import { Gauge, G2 } from '@ant-design/plots';

export const GaugeChartIndicator = ({
    ticks = [0, 1 / 3, 2 / 3, 1],
    ping = 0.2,
    color = ['#00D8FF', '#14697E', '#ED6A5E'], height = 100, rangeWidth = 10, lineHeight = 31, fontSize = 16, offsetY, formatText = ({ percent }) => {
        return `${(percent * 100).toFixed(0)} MS`
    }
}) => {

    const { registerShape, Util } = G2; // 自定义 Shape 部分
    registerShape('point', 'custom-gauge-indicator', {
        draw(cfg, container) {
            // 使用 customInfo 传递参数
            const { indicator, defaultColor } = cfg.customInfo;
            const { pointer } = indicator;
            const group = container.addGroup(); // 获取极坐标系下画布中心点

            const center = this.parsePoint({
                x: 0,
                y: 0,
            }); // 绘制指针

            if (pointer) {
                const { startAngle, endAngle } = Util.getAngle(cfg, this.coordinate);
                const radius = this.coordinate.getRadius();
                const midAngle = (startAngle + endAngle) / 2;
                const { x: x1, y: y1 } = Util.polarToCartesian(center.x, center.y, radius / 15, midAngle + 1 / Math.PI);
                const { x: x2, y: y2 } = Util.polarToCartesian(center.x, center.y, radius / 15, midAngle - 1 / Math.PI);
                const { x, y } = Util.polarToCartesian(center.x, center.y, radius * 0.65, midAngle);
                const path = [['M', center.x, center.y], ['L', x1, y1], ['L', x, y], ['L', x2, y2], ['Z']]; // pointer

                group.addShape('path', {
                    name: 'pointer',
                    attrs: {
                        path,
                        fill: defaultColor,
                        ...pointer.style,
                    },
                });
            }

            return group;
        },
    });
    const config = {
        percent: ping,
        autoFit: true,
        height: height,
        renderer: 'svg',
        range: {
            ticks: ticks,
            color: color,
            width: rangeWidth
        },
        indicator: {
            shape: 'custom-gauge-indicator',
            pointer: {
                style: {
                    stroke: '#00D8FF',
                    lineWidth: 2,
                    fill: '#00D8FF',
                },
            },
        },
        // indicator: {
        //     pointer: {
        //         style: {
        //             stroke: '#00D8FF',
        //             lineWidth: 4,
        //         },
        //     },
        //     pin: {
        //         style: {
        //             stroke: '#00D8FF',
        //             fill: "transparent",
        //             lineWidth: 2,
        //         },
        //     },
        // },
        axis: false,
        statistic: {
            content: {
                formatter: (d) => formatText(d),
                //  ({ percent }) => `${(percent * 100).toFixed(0)} MS`,
                offsetY: offsetY,
                style: {
                    color: "#00D8FF",
                    fontSize: `${fontSize}px`,
                    lineHeight: `${lineHeight}px`,
                },
            },
        },
    };




    return <Gauge  {...config} />;
};