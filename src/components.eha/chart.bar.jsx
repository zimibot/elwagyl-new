import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/plots';

export const ColumnChartComponent = () => {
    const data = [
        {
            date: 'JAN',
            total: 52,
        },
        {
            date: 'FEB',
            total: 12,
        },
        {
            date: 'MAR',
            total: 32,
        },
        {
            date: 'APR',
            total: 22,
        },
        {
            date: 'MAY',
            total: 55,
        },
        {
            date: 'JUN',
            total: 26,
        },
        {
            date: 'JUL',
            total: 17,
        },
        {
            date: 'AUG',
            total: 32,
        },
        {
            date: 'SEP',
            total: 82,
        },
        {
            date: 'OCT',
            total: 12,
        },
        {
            date: 'NOV',
            total: 11,
        },
        {
            date: 'DEC',
            total: 78,
        },

    ];
    const config = {
        data,
        xField: 'date',
        yField: 'total',
        color: "#0B5567",
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
    return <Column {...config} />;
};

