import { API_GET } from "../../api/elwagyl";
import { GaugeChart } from "../../components/chart/gauge";
import { LineNoLabel } from "../../components/chart/line.no.label";
import { CardAnimation } from "../../components/layout/card";

export const HostRealtime = ({ switchHide }) => {
    const API_HOST_LIST_REALTIME = API_GET.EXECUTIVE_HOST_REALTIME()

    let status = switchHide?.status
    return API_HOST_LIST_REALTIME.error ? "ERROR" : API_HOST_LIST_REALTIME.isLoading ? "LOADING" : API_HOST_LIST_REALTIME.items.map((d, k) => {
        let percent = d.ping.length === 0 ? 0 : (d.ping.slice(-1)[0] / 500) * 100;
        percent = Math.min(percent, 100);

        return <div key={k} className={`p-2 border border-primary space-y-4`}>
            <div className="uppercase flex justify-between">
                <span>

                    {d.hostname}
                </span>
                {d.alive && status && <span>
                    {d.lastData} MS
                </span>}

            </div>
            <CardAnimation className="relative  h-28 flex items-end">
                {!d.alive ? <div className="w-full h-full flex justify-center items-center text-center">AWAITING CONNECTION</div> : <CardAnimation className={`w-full h-full absolute bottom-0 left-0 flex justify-between py-4 ${status ? "border-t" : ""}  border-primary`}>
                    <div className={` ${status ? "w-36" : "w-full"}  h-full`}>
                        <GaugeChart ping={parseInt(d.lastData)}></GaugeChart>
                    </div>
                    {status && <div className="flex-1 relative">
                        <LineNoLabel border={false} ping={d.ping}></LineNoLabel>
                    </div>}

                </CardAnimation>
                }

            </CardAnimation>
        </div>
    })
}