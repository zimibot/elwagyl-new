import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/plots';

export const ColumnChartComponent = ({ data = []}) => {
    
    let last = data.slice(-1)[0]
    const config = {
        data,
        xField: 'date',
        yField: 'total',
        color: (d) => {

            if (d.date === last.date) {
                return "#00D8FF"
            } else {
                return "#0B5567"
            }
        },
        label: {
            // 可手动配置 label 数据标签位置
            position: 'middle',
            // 'top', 'bottom', 'middle',
            // 配置样式
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        xAxis: {
            tickCount: 5,

            grid: {
                line: {
                    style: {
                        stroke: '#0B5567',
                        lineWidth: 2,
                    }
                }
            },

            label: {
                style: {
                    fill: '#00D8FF',
                    fontSize: 14,
                    autoHide: true,
                    autoRotate: false,
                }
            }
        },
        minColumnWidth: 20,
        maxColumnWidth: 20,
        yAxis: {
            tickCount: 12,

            grid: {
                line: {
                    style: {
                        stroke: '#0B5567',
                        lineWidth: 2,
                    }
                }
            },
            label: {
                style: {
                    fill: '#00D8FF',
                    fontSize: 16,
                }
            }
        },

    };
    return <Column {...config} animation={false}/>;
};

