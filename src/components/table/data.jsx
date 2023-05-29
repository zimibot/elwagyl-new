import { isObject } from "radash"

export const Data = ({ items = [], column = [], onClick, style, }) => {

    return items.map((d, k) => {
        return <tr key={k} onClick={() => onClick(d, k)}>
            {column.map((i, r) => {
                let className = i.rowClass ? i.rowClass : ""
                if (i['html']) {
                    return <td style={{ ...style }} className={`${className} relative`} key={r} >{i['html'](d[i.key], d, k)}</td>
                } else {
                    return <td key={r} style={{ ...style }} className={`${className} relative`}>{!isObject(d[i.key]) && d[i.key]}</td>
                }
            })}

        </tr>
    })
}
