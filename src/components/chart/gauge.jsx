import React, { useEffect, useState } from 'react';
import { Gauge, G2 } from '@ant-design/plots';

export const GaugeChart = ({
    ticks = [0, 1 / 3, 2 / 3, 1],
    ping,
    color = ['#00D8FF', '#FFBA08', '#ED6A5E'], height = 100, rangeWidth = 10, lineHeight = 31, fontSize = 16, offsetY, formatText = ({ percent }) => {
        return `${(percent * 100).toFixed(0)} MS`
    }
}) => {

    const [config, setconfig] = useState()
    const [percents, setpercents] = useState(0)

    let psd =  () => {
     

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
            // percent: pings,
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

            axis: false,
            statistic: {
                content: {
                    formatter: (d) => `${parseInt(d.percent * 100)} %`,
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

        setconfig(config)
    }

    useEffect(() => {
        psd()
    }, [])


    useEffect(() => {

        const pd =  () => {
            let da =  ping


            let pings = (da / 1000) * 3
            
            if (parseInt(pings) < 1) {
                setpercents(pings)
            } else {
                setpercents(1)
            }

        }
        if (ping) {
            pd()

        }

    }, [ping])




    return config ? <Gauge percent={percents} {...config} /> : <div className="h-28"></div>;
};