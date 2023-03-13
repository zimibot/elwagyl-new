import { GetAndUpdateContext } from "../../model/context.function"
import Logo from "../../assets/logo.svg"

export const LoadingOther = () => {
    const { status } = GetAndUpdateContext()

    return !status.loading ? <div className="h-full w-full absolute flex items-center justify-center">
        <div className="progress-circle-pulse">
            <div className="big-circle"></div>
            <div className="small-circle"></div>
            <img className="absolute" width={100} height={100} src={Logo}></img>
        </div>
    </div> : ""
}

export const Loading = () => {
    return <div className="text-center h-64 col-span-full flex items-center justify-center">
        LOADING
    </div>
}