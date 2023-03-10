import React, { useEffect, useState } from 'react';
import { DecompositionTreeGraph } from '@ant-design/graphs';

export const DecompositionTreeGraphChart = ({ refresh, otherRefresh }) => {
    const [state, setstate] = useState({
        config: null
    });
    useEffect(() => {
        const data = {
            id: 'A0',
            value: {
                title: 'CORTEX XSOAR',
                items: [
                    {
                        text: '8 PORT',
                    },
                ],
                percent: 0.8,
            },
            children: [
                {
                    id: 'A1',
                    value: {
                        title: 'ACTIVE',
                        type: "active",
                        items: [

                            {
                                text: '4 PORT',
                                icon: `./assets_globe/kotak-active.png`,
                                type: "active"
                            },
                        ],
                    },
                    children: [
                        {
                            id: 'A11',
                            value: {
                                title: 'PORT',
                                items: [
                                    {
                                        text: '22',
                                        icon: `./assets_globe/kotak-active.png`,
                                        type: "active"
                                    },
                                ],
                            },
                        },
                        {
                            id: 'A12',
                            value: {
                                title: 'PORT',
                                items: [
                                    {
                                        text: '23',
                                        icon: `./assets_globe/kotak-active.png`,
                                        type: "active"
                                    },
                                ],
                            },
                        },
                        {
                            id: 'A13',
                            value: {
                                title: 'PORT',
                                items: [
                                    {
                                        text: '8000',
                                        icon: `./assets_globe/kotak-active.png`,
                                        type: "active"
                                    },
                                ],
                            },
                        },
                    ],
                },
                {
                    id: 'A2',
                    value: {
                        title: 'INACTIVE',
                        type: "inactive",
                        items: [
                            {
                                text: '4 PORT',
                                icon: `./assets_globe/kotak-inactive.png`,
                                type: "inactive"
                            },
                        ],
                    },
                    children: [
                        {
                            id: 'A22',
                            value: {
                                title: 'PORT',
                                items: [
                                    {
                                        text: '22',
                                        icon: `./assets_globe/kotak-inactive.png`,
                                        type: "inactive"
                                    },
                                ],
                            },
                        },
                        {
                            id: 'A23',
                            value: {
                                title: 'PORT',
                                items: [
                                    {
                                        text: '23',
                                        icon: `./assets_globe/kotak-inactive.png`,
                                        type: "inactive"
                                    },
                                ],
                            },
                        },
                        {
                            id: 'A24',
                            value: {
                                title: 'PORT',
                                items: [
                                    {
                                        text: '8000',
                                        icon: `./assets_globe/kotak-inactive.png`,
                                        type: "inactive"
                                    },
                                ],
                            },
                        },
                    ],
                },
            ],
        };

        const config = {
            data,
            autoFit: true,
            onReady: (graph) => {
                // Zoom 0.5x and set the center to [100,100]
                graph.zoom(1.2);
            },

            nodeCfg: {
                customContent: (item, group, cfg) => {
                    const { startX, startY } = cfg;
                    const { text, value, icon, trend, type } = item;
                    text &&
                        group?.addShape('text', {
                            attrs: {
                                textBaseline: 'top',
                                x: startX,
                                y: startY + 5,
                                text,
                                fill: type === "inactive" ? '#ED6A5E' : "#00D8FF",
                            },
                            // group ???????????????
                            name: `text-${Math.random()}`,
                        });
                    value &&
                        group?.addShape('text', {
                            attrs: {
                                textBaseline: 'top',
                                x: startX + 60,
                                y: startY,
                                text: value,
                                fill: '#000',
                            },
                            name: `value-${Math.random()}`,
                        });
                    icon &&
                        group?.addShape('image', {
                            attrs: {
                                x: startX + 20,
                                y: startY - 63,
                                width: 150,
                                height: 150,
                                img: icon,
                            },
                            name: `image-${Math.random()}`,
                        });
                    trend &&
                        group?.addShape('text', {
                            attrs: {
                                textBaseline: 'top',
                                x: startX + 110,
                                y: startY,
                                text: trend,
                                fill: '#f00',
                            },
                            name: `value-${Math.random()}`,
                        });

                    // ??????
                    return 14;
                },
                size: [140, 25],

                items: {
                    containerStyle: {
                        fill: 'transparent',
                    },
                    padding: 4,
                },
                nodeStateStyles: {
                    hover: {
                        lineWidth: 2,
                    },
                },
                title: {
                    containerStyle: {
                        fill: '#183645',
                    },
                    style: (ed) => {
                        return {
                            fill: '#00D8FF',
                            fontSize: 14,
                        }
                    },
                },
                style: () => {
                    return {
                        fill: 'transparent',
                        radius: 1,
                        stroke: '#183645',
                    };
                },
            },
            edgeCfg: {
                label: {
                    style: () => {
                        // console.log(d.cfg.data.children)
                        return {
                            fill: '#00D8FF',
                            fontSize: 12,
                            fillOpacity: 1,
                        }
                    }
                },
                style: (edge) => {
                    return {
                        stroke: '#00D8FF',
                        strokeOpacity: 0.5,
                    };
                },

                endArrow: {
                    fill: '#00D8FF',
                },
                edgeStateStyles: {
                    hover: {
                        strokeOpacity: 1,
                    },
                },
            },


            markerCfg: (cfg) => {
                const { children } = cfg;
                return {
                    show: children?.length,
                    style: {
                        fill: 'black',
                        stroke: '#00D8FF',
                        strokeOpacity: 1,
                        strokeWidth: 3,

                    }
                };
            },
            behaviors: ['drag-canvas', 'zoom-canvas'],
        };

        setTimeout(() => {
            setstate({
                config: config
            })
        }, 1000);

        return () => {
            setstate({
                config: null
            })
        };
    }, [refresh, otherRefresh]);


    return state.config ? <DecompositionTreeGraph  {...state.config} /> : <div className="absolute w-full h-full flex items-center justify-center">
        Loading...
    </div>;
};

