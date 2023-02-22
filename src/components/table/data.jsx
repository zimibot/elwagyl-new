
export const Data = ({ data = [], column = [], onClick }) => {

    return data.map((d, k) => {

        return <tr key={k} onClick={() => onClick(d, k)}>
            {column.map((i, r) => {
                if (i['html']) {
                    return <td className={i.rowClass} key={r} >{i['html'](d[i.key])}</td>
                } else {
                    return <td key={r} className={i.rowClass}>{d[i.key]}</td>
                }
            })}

        </tr>
    })
}
