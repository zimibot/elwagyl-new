import { useContext } from "react"
import { ContextGlobal } from "../helper/context"

export const GetAndUpdateContext = () => {
    const context = useContext(ContextGlobal)

    return { ...context.data, ...context.maximizeData, ...context.update }
}