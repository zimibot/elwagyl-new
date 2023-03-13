import moment from "moment/moment"
import { API_GET } from "../../../api"
import { STASTISTIC_ALERT_DESC } from "../../../model/information"
import { Column, Row } from "../../../pages/cyber.deck/data"
import { Loading } from "../../loading/loadingOther"
import { TableInline } from "../../table"
import { SubtitleInfo } from "../subtitle.info"

export const GlobalListSource = ({ h = "350px", className = "", otherClass, tableClass }) => {

    let APILISTATTACK = API_GET.LISTATTACK()
    console.log(APILISTATTACK)

    return APILISTATTACK.error ? "ERROR" : APILISTATTACK.isLoading ? <Loading></Loading> : <div className={className}>
        <div className={otherClass}>
            <SubtitleInfo title={'list source attacker'}>
                {STASTISTIC_ALERT_DESC}
            </SubtitleInfo>
            <TableInline className={tableClass} columns={[
                {
                    title: "Location",
                    key: "region"
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
            ]} data={APILISTATTACK.data.data} paggination={true} height={h} />
        </div>
    </div>
}