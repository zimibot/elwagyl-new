import { Line } from '@ant-design/plots';
import { useEffect, useState } from 'react';
import { ERRORCOMPONENT } from '../../model/information';
import barIcon from '../../assets/images/icon/bar-chart.png'

export const ChartLineTooltip = ({ height = 115, mode = "", className="" }) => {
    const [data, setData] = useState([]);


    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };

    height = height === "auto" ? {
        autoFit: true,
    } : {
        height
    }
    const config = {
        data,
        ...height,
        xField: 'Date',
        yField: 'scales',
        color: "#00D8FF",
        tooltip: false,
        renderer: 'svg',
        padding: [10, 30, 30, 45],
        stepType: mode,
        lineStyle: {
            lineWidth: 1,
            // lineDash: [3, 3],
        },
        yAxis: {
            tickCount: 5,
            label: {
                style: {
                    fill: '#00D8FF',
                    opacity: 0.6,
                    fontSize: 14
                },
                rotate: false
            },
            grid: {
                line: {
                    style: {
                        stroke: '#193745',
                        lineWidth: 1,
                        lineDash: [2, 2],
                        cursor: 'pointer'
                    }
                }
            }
        },
        xAxis: {
            tickCount: 4,
            // tickMethod: 'wilkinson-extended',
            label: {
                style: {
                    fill: '#00D8FF',
                    opacity: 0.6,
                    fontSize: 14
                },
                rotate: false
            },
        },

    };

    return <div className={`relative ${className}`}>
        {data.length === 0 &&
            <div className="uppercase text-[white] w-full absolute items-center justify-center flex  flex-col gap-2">
                <img className="w-10" src={barIcon}></img>
                {ERRORCOMPONENT.dataNotAvailable}
            </div>
        }
        <Line smooth={true} animation={false} {...config} />
    </div>;
}