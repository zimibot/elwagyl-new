export const SquareMedium = () => {
    return (<>
        <div className="absolute top-0 left-0">
            <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 0.5H0.5V5" stroke="#00D8FF" />
            </svg>
        </div>
        <div className="absolute top-0 right-0">
            <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0.5H4.5V5" stroke="#00D8FF" />
            </svg>

        </div>
        <div className="absolute bottom-0 left-0">
            <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 4.5H0.5V0" stroke="#00D8FF" />
            </svg>

        </div>
        <div className="absolute bottom-0 right-0">
            <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 4.5H4.5V0" stroke="#00D8FF" />
            </svg>
        </div>
    </>)
}

export const SquareFull = ({ count = 4, onlyTop, onlyBottom }) => {
    let html = ({ type, key }) => (<div key={key} className={`absolute left-[-2px] ${type === "top" ? "top-[-3px]" : "bottom-[-3px]"}  flex justify-between`} style={{
        width: `calc(100% + 5px)`,
    }}>
        <div className="w-[5px] h-[5px] bg-blue"></div>
        <div className="w-[5px] h-[5px] bg-blue"></div>
    </div>)


    let data = new Array(count).fill(null)
    return <>
        {data.map((x, i) => {
            if (onlyTop) {
                if (i % 2) {
                    return html({ type: "top", key: i })
                }
            } else if (onlyBottom) {
                if (i % 2) {
                    return html({ type: "bottom", key: i })
                }
            } else {
                if (i % 2) {
                    return html({ type: "top", key: i })
                } else {
                    return html({ type: "bottom", key: i })
                }
            }

        })}
    </>
}