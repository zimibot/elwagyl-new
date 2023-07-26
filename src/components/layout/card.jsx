import autoAnimate from "@formkit/auto-animate"
import { useEffect, useRef } from "react"

export const CardBox = ({ borderBottom, children, className }) => {
    return <div className={`px-4 flex flex-col space-y-2 pb-3 ${className ? className : ""} ${borderBottom ? 'border-b border-b-primary' : ''}`}>
        {children}
    </div>
}

export const CardAnimation = ({ children, className, duration= 100, ...props }) => {
    const parent = useRef(null)

    useEffect(() => {
        parent.current && autoAnimate(parent.current, {duration: duration})
    }, [parent])


    return <div {...props} className={`${className ? className : ""} z-10`} ref={parent}>
        {children}
    </div>
}