export const ProgressVertical = ({ title = "Solved", color = "white", percent = 90, total = 150 }) => {
    let data = new Array(8).fill("")
    let t = (data.length / 95) * 100


    return <div className="w-full h-full relative p-4 space-y-3" style={{ color: color }}>
        <div className="flex justify-between">
            <div className="uppercase">{title}</div>
            <div>{percent}%</div>
        </div>
        <div className="flex items-center">
            <div className=" h-[95px] w-[40px] flex flex-col-reverse gap-2">
                {data.map((d, k) => {
                    let perSquare = (((k ) / data.length) * 100)
                    if (percent <= perSquare) {
                        return <div key={k} className="bg-[#152A36]" style={{ height: `${t}%` }}></div>
                    } else {
                        return <div key={k} style={{ height: `${t}%`, background: color }} ></div>
                    }
                })}
            </div>
            <div className="text-[48px] flex-1 flex items-center justify-center">
                {total}
            </div>
        </div>
        <div className="absolute top-0 right-0 h-full">
            <svg width="13" style={{ height: "100%" }} viewBox="0 0 13 146" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.59886e-07 0.52002L12 0.52002V145H2.59886e-07" stroke="#01D8FF" strokeOpacity="0.5" />
            </svg>
        </div>
        <div className="absolute top-0 left-0 h-full">
            <svg width="12" style={{ height: "100%" }} viewBox="0 0 12 146" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0.52002H1V145H12" stroke="#01D8FF" strokeOpacity="0.5" />
            </svg>
        </div>
    </div>
}