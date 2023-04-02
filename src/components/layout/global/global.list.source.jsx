import moment from "moment/moment"
import { API_GET } from "../../../api"
import { GetAndUpdateContext } from "../../../model/context.function"
import { LIST_SOURCE_IP, STASTISTIC_ALERT_DESC } from "../../../model/information"
import { TableInline } from "../../table"
import { SubtitleInfo } from "../subtitle.info"

export const GlobalListSource = ({ h = "350px", className = "", otherClass, tableClass }) => {

    let APILISTATTACK = API_GET.LISTATTACK()
    const { setvalue, value } = GetAndUpdateContext()

    return <div className={className}>
        <div className={otherClass}>
            <SubtitleInfo title={'list source attacker'}>
                {LIST_SOURCE_IP}
            </SubtitleInfo>
            <TableInline hoverDisable className={tableClass} columns={[
                {
                    title: "Location",
                    key: "region",
                    rowClass: "w-[100px]"
                },
                {
                    title: "SOURCE IP",
                    key: "ip_address"
                },
                {
                    title: "DATE",
                    key: "date",
                    html: (d) => {
                        return <span>
                            {moment(d).format("L")}
                        </span>
                    }
                },
                {
                    title: "TIME",
                    key: "date",
                    html: (d) => {
                        return <span>
                            {moment(d).format("LTS")}
                        </span>
                    }
                },
            ]} data={APILISTATTACK?.data?.data} totalPages={APILISTATTACK.data?.pagination?.total_page} onChange={s => {
                setvalue(d => ({
                    ...d,
                    PAGECOUNT: s
                }))
            }} currentPage={value.PAGECOUNT} Loading={APILISTATTACK.isLoading} paggination={true} height={h} />
        </div>
    </div>
    // return APILISTATTACK.error ? "ERROR" : APILISTATTACK.isLoading ? <Loading></Loading> : 

}