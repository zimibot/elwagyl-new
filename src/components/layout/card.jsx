import autoAnimate from "@formkit/auto-animate"
import { useEffect, useRef } from "react"

export const CardBox = ({ borderBottom, children, className }) => {
    return <div className={`px-4 flex flex-col space-y-2 pb-3 ${className ? className : ""} ${borderBottom ? 'border-b border-b-primary' : ''}`}>
        {children}
    </div>
}

export const CardAnimation = ({ children, className }) => {
    const parent = useRef(null)

    useEffect(() => {
        parent.current && autoAnimate(parent.current)
    }, [parent])


    return <div className={`${className ? className : ""} z-10`} ref={parent}>
        {children}
    </div>
}