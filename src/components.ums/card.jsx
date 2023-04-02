import { isArray } from "radash"
import { NavLink, useLocation } from "react-router-dom"

export const CardComponentsUms = ({ children }) => {
    let location = useLocation()
    let pathname = location.pathname
    let path = pathname.split("/")
    return (
        <div>
            <div className="bg-primary p-4 uppercase flex gap-1">
                {path.map((d, k) => {
                    return k === 0 || d === "ums" ? "" : <div className={`space-x-1 ${path.length === (k + 1) ? "font-bold" : ""}`}>
                        <span>/</span>
                        <span>{d.replace("_", " ")}</span>
                    </div>
                })}
            </div>
            <div className="border border-primary p-4 min-h-[120px] text-[28px] flex items-center">
                {children ? children : <span className="uppercase font-bold">{isArray(path) ? path.pop().replace("_", " ") : ""}</span>}
            </div>
        </div>
    )
}