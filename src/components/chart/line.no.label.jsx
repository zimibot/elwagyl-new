import { TinyColumn } from '@ant-design/plots';
import { useEffect, useState } from 'react';
import { shift } from 'radash'


export const LineNoLabel = ({ ping = [] }) => {
    const [items, setitems] = useState([]);
    const [config, setconfig] = useState();
    useEffect(() => {
        let fill = new Array(30).fill(0)
        if (ping.length > fill.length) {
            let d = shift(ping, (ping.length + fill.length)).slice(0, fill.length)
            setitems([...d])
        } else {
            for (const key in fill) {
                setitems(d => ([...d, ping[key] === undefined ? 0 : ping[key]]))
            }
        }
        return () => {
            setitems([])
        }
    }, [ping])


    useEffect(() => {
        const config = {
            autoFit: true,
            height: 50,
            animation: false,
            colorField: 'y',
            color: (d) => {
                let int = parseInt(d.x)

                return items[int] > 100 && items[int] < 200 ? "#FFBA08" : items[int] > 200 ? "#ED6A5E" : "#00D8FF"
            },
            columnWidthRatio: 0.7,
            smooth: true,
            yAxis: {
                max: 500,
                min: 0,
            },
            line: {
                style: {
                    stroke: "#00D8FF"
                }
            },
        };

        setconfig(config)
        return () => {
            setconfig()
        };
    }, [items]);

    let percent = ping.length === 0 ? 0 : (ping.slice(-1)[0] / 500) * 100


    return <div className="border px-1 border-primary w-full  left-0 absolute overflow-hidden">

        <div className="absolute w-full h-1 bottom-0 left-0 transition-all" style={{
            width: `${percent}%`,
            background: `${parseInt(percent) > 30 && parseInt(percent) < 60 ? "#FFBA08" : parseInt(percent) > 60  ? "#ED6A5E" : "#00D8FF"}`
        }}></div>
        {config && <TinyColumn tooltip={false} data={items}  {...config} />}
    </div>;
}