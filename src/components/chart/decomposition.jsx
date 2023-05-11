import React, { useEffect, useState } from 'react';
import { DecompositionTreeGraph } from '@ant-design/graphs';
import { GetAndUpdateContext } from '../../model/context.function';

export const DecompositionTreeGraphChart = ({ defaultData }) => {

    const { value, maximize } = GetAndUpdateContext()
    const [state, setstate] = useState({
        config: null
    });

    const [items, setItems] = useState()
    const [loading, setloading] = useState(false)
    useEffect(() => {
        setItems(value.SERVICEPORT?.data)

        const config = {
            autoFit: true,
            onReady: (graph) => {
                // Zoom 0.5x and set the center to [100,100]
                if (defaultData) {
                    const nodeIdToFocus = value.SERVICEPORT?.data ? value.SERVICEPORT?.data.id : defaultData.id;
                    graph.zoom(2.5);
                    graph.focusItem(nodeIdToFocus);
                }
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
                            // group 内唯一字段
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

                    // 行高
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

        setstate({
            config: config
        })


        setloading(false)
        setTimeout(() => {
            setloading(true)
        }, 400);

        return () => {
            setstate({
                config: null
            })
            setItems()
            setloading(false)
        };
    }, [value.SERVICEPORT, maximize.SERVICEPORT]);


    return loading && state.config && defaultData ? <DecompositionTreeGraph data={items ? items : defaultData} {...state.config} animate={true} /> : <div className="absolute w-full h-full flex items-center justify-center">
        Loading...
    </div>;
};

