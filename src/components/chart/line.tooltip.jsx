import { Line } from '@ant-design/plots';
import moment from 'moment';
import { Formatter } from '../../helper/formater';
import { Empty } from 'antd';

export const ChartLineTooltip = ({ height = 115, mode = "", className = "", data = [], date, xField = "date", yField = "count", customTextTooltip, seriesField, }) => {

    height = height === "auto" ? {
        autoFit: true,
    } : {
        height
    }
    const config = {
        data,
        ...height,
        xField: xField,
        yField: yField,
        color: "#00D8FF",
        seriesField,
        smooth: true,
        // @TODO 后续会换一种动画方式

        renderer: 'svg',
        padding: [10, 30, 30, 45],
        stepType: mode,
        tooltip: {
            customContent: (title, data) => {
                let date = moment(title).format("lll")
                let items = data.map((d, k) => {
                    return (`<div key="${k}"><span>${d.name}</span> : <span>${d.value}</span></div>`)
                })

                if (data.length > 1) {
                    return `<div class="bg-primary p-2 space-y-2">
                    <div>DATE: ${date === "Invalid date" ? title : date}</div>
                    <div>
                        ${items}
                    </div>
                </div>`.replace(/,/g, "");
                } else {
                    let value = Formatter(parseInt(data[0]?.value))
                    return `<div class="bg-primary p-2 space-y-2">
                        <div>DATE: ${date === "Invalid date" ? title : date}</div>
                        <div>${customTextTooltip ? customTextTooltip : "TOTAL"}: ${value}</div>
                    </div>`;
                }

            }
        },
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
                formatter: (d) => {
                    return Formatter(d)
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
            // tickMethod: 'time-cat'   ,
            label: {
                style: {
                    fill: '#00D8FF',
                    opacity: 0.6,
                    fontSize: 14
                },
                formatter: (d) => {
                    let time = date ? moment(d).format("l") : moment(d).format("LTS")
                    return time === "Invalid date" ? d : time
                },
                rotate: false
            },
        },

    };


    return <div className={`relative ${className}`}>
        {data.length === 0 ?
            <div className="flex justify-center items-center">
                <Empty className="w-24" image={<img src='/assets/no-data.png' ></img>}></Empty>

            </div> : <Line legend={false} smooth={true} animation={false} {...config} />
        }

    </div>;
}