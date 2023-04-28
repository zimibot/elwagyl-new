import moment from "moment/moment"
import RootAPi, { API_GET } from "../../../api/elwagyl"
import { GetAndUpdateContext } from "../../../model/context.function"
import { LIST_SOURCE_IP, STASTISTIC_ALERT_DESC } from "../../../model/information"
import { TableInline } from "../../table"
import { SubtitleInfo } from "../subtitle.info"
import { Loading } from "../../loading/loadingOther"
import { ErrorItems } from "../../../pages/cyber.deck"

export const GlobalListSource = ({ h = "350px", className = "", otherClass, tableClass }) => {
    const root = RootAPi(['LISTATTACK'])
    const { setvalue, value } = GetAndUpdateContext()

    return <div className={className}>
        <div className={otherClass}>
            <SubtitleInfo title={'list source attacker'}>
                {LIST_SOURCE_IP}
            </SubtitleInfo>
            {root.error ? <ErrorItems></ErrorItems> : root.isLoading ? <Loading></Loading> : <TableInline hoverDisable className={tableClass} columns={[
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
            ]} data={root.data.LISTATTACK?.data} totalPages={root.data.LISTATTACK?.pagination?.total_page} onChange={s => {
                setvalue(d => ({
                    ...d,
                    PAGECOUNT: s
                }))
            }} currentPage={value.PAGECOUNT} error={root.error} Loading={root.isLoading} paggination={true} height={h} />}

        </div>
    </div>
    // return APILISTATTACK.error ? "ERROR" : APILISTATTACK.isLoading ? <Loading></Loading> : 

}