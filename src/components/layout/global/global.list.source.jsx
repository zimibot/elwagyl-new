import { STASTISTIC_ALERT_DESC } from "../../../model/information"
import { Column, Row } from "../../../pages/cyber.deck/data"
import { TableInline } from "../../table"
import { SubtitleInfo } from "../subtitle.info"

export const GlobalListSource = ({ h = "350px", className = "", otherClass, tableClass }) => {
    return <div className={className}>
        <div className={otherClass}>
            <SubtitleInfo title={'list source attacker'}>
                {STASTISTIC_ALERT_DESC}
            </SubtitleInfo>
            <TableInline className={tableClass} columns={Column} data={Row} paggination={true} height={h} />
        </div>
    </div>
}