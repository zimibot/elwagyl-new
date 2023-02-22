import { TinyColumn } from '@ant-design/plots';
import { useEffect, useState } from 'react';
import { shift } from 'radash'


export const LineNoLabel = ({ ping = [] }) => {
    const [items, setitems] = useState([]);
    const [config, setconfig] = useState();

    useEffect(() => {
        let fill = new Array(75).fill(0)

        if (ping.length > 75) {
            let d = shift(ping, (ping.length + 100)).slice(0, 75)
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
            color: "#00D8FF",
            columnWidthRatio: 0.7,
        };

        setconfig(config)
        return () => {
            setconfig()
        };
    }, []);



    return <div className="border px-1 border-primary w-full  left-0 absolute">
        {config && <TinyColumn tooltip={false} data={items}  {...config} />}
    </div>;
}