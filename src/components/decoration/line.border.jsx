export const LineBorderLeft = ({ className = "" }) => {
    return <div className={`absolute left-0 h-full w-2 top-0 flex flex-col items-center gap-1 py-1 line-left ${className}`}>
        <div className="w-[5px] h-[5px] bg-[#0B5567]"></div>
        <div className="w-[2px] bg-[#0B5567] flex-1 bg-opacity-70"></div>
        <div className="w-[5px] h-[5px] bg-[#0B5567]"></div>
    </div>
}

export const LineBorderRight = ({ className = "" }) => {
    return <div className={`absolute right-0 h-full w-1 top-0 flex flex-col items-center gap-1 py-1 line-right ${className}`}>
        <div className="w-[5px] h-[5px] bg-[#0B5567]"></div>
        <div className="w-[2px] bg-[#0B5567] flex-1 bg-opacity-70"></div>
        <div className="w-[5px] h-[5px] bg-[#0B5567]"></div>
    </div>
}

export const LineBorderTopBottom = ({ className = "" }) => {
    return <>
        <div className={`absolute right-0 w-full h-1 top-0 flex items-center gap-1 py-1 line-top ${className}`}>
            <div className="w-[5px] h-[5px] bg-[#0B5567]"></div>
            <div className="h-[2px] bg-[#0B5567] flex-1 bg-opacity-70"></div>
            <div className="w-[5px] h-[5px] bg-[#0B5567]"></div>
        </div>
        <div className={`absolute bottom-0 right-0 w-full h-1 flex items-center gap-1 py-1 line-bottom ${className}`}>
            <div className="w-[5px] h-[5px] bg-[#0B5567]"></div>
            <div className="h-[2px] bg-[#0B5567] flex-1 bg-opacity-70"></div>
            <div className="w-[5px] h-[5px] bg-[#0B5567]"></div>
        </div>
    </>
}
