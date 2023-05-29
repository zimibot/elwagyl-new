import { GetAndUpdateContext } from "../../model/context.function"
import Logo from "../../assets/logo.svg"
import { Result } from "antd"
import { CardAnimation } from "../layout/card"

export const LoadingOther = () => {
    const { status } = GetAndUpdateContext()


    return <CardAnimation className={"w-full absolute h-full col-span-full"}>
        {
            !status.loading ? <div className="h-full w-full absolute flex items-center justify-center">
            <div className="progress-circle-pulse">
                <div className="big-circle"></div>
                <div className="small-circle"></div>
                <img className="absolute" width={100} height={100} src={Logo}></img>
            </div>
        </div> : status?.otherPages === "offline" ? <div className="w-full h-full flex justify-center items-center">
            <Result status="error" title="ERROR LOAD PAGES" subTitle={<div className="text-blue uppercase text-[20px]">Page loading failed. Please ensure that your internet connection or VPN connection is established </div>}>
            </Result>
        </div> : ""
        }
    </CardAnimation>
}

export const Loading = () => {
    return <div className="text-center h-64 col-span-full flex items-center justify-center">
        LOADING
    </div>
}