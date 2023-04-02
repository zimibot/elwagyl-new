
export const Data = ({ data = [], column = [], onClick, style, onLoad, tooltip }) => {

    return data.map((d, k) => {
        onLoad(d, k)
        return <tr key={k}  onClick={() => onClick(d, k)}>
            {column.map((i, r) => {
                let className = i.rowClass ? i.rowClass : ""
                if (i['html']) {
                    return <td style={{ ...style }} className={`${className} relative`} key={r} >{i['html'](d[i.key])}</td>
                } else  {
                    return <td key={r} style={{ ...style }} className={`${className} relative`}>{d[i.key]}</td>
                }
            })}

        </tr>
    })
}
