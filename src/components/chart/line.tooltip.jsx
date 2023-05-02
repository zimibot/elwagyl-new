import { Line } from '@ant-design/plots';
import { ERRORCOMPONENT } from '../../model/information';
import barIcon from '../../assets/images/icon/bar-chart.png'
import moment from 'moment';
import { Formatter } from '../../helper/formater';

export const ChartLineTooltip = ({ height = 115, mode = "", className = "", data = [], date, xField = "date", yField = "count" }) => {

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
        renderer: 'svg',
        padding: [10, 30, 30, 45],
        stepType: mode,
        tooltip: {
            customContent: (title, data) => {
                let date = moment(title).format("lll")
                let value = Formatter(parseInt(data[0]?.value))
                return `<div class="bg-primary p-2 space-y-2">
                    <div>DATE: ${date  === "Invalid date"? title : date}</div>
                    <div>TOTAL: ${value }</div>
                </div>`;
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
        {data.length === 0 &&
            <div className="uppercase text-[white] w-full absolute items-center justify-center flex  flex-col gap-2">
                <img className="w-10" src={barIcon}></img>
                {ERRORCOMPONENT.dataNotAvailable}
            </div>
        }
        <Line smooth={true} animation={false} {...config} />
    </div>;
}