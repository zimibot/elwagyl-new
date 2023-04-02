import { LayoutDashboard } from "../../components/layout/dashboard.layout"
import { TitleContent } from "../../components/layout/title"
import { SubtitleInfo } from "../../components/layout/subtitle.info"
import { ERRORCOMPONENT, LIST_THREATS, OBSERVATION_SEVERITY_DESC, STASTISTIC_ALERT_DESC, TOP_ATTACK } from "../../model/information"
import { ProgressVertical } from "../../components/chart/progress.vertical"
import { CardAnimation, CardBox } from "../../components/layout/card"
import { TableInline } from "../../components/table"
import { ColumnCenter, ColumnLeft, ColumnRight } from "../../components/layout/column.layout"
import { ChartLineTooltip } from "../../components/chart/line.tooltip"
import { FillterDay } from "../../components/fillter/fillter.day"
import { SquareFull } from "../../components/decoration/square"
import { ReactSVG } from 'react-svg'
import Logo from "../../assets/logo.svg"
import { MapHighcharts } from "../../components/maps/higchart.map"
import { GlobeGl } from "../../components/globe"
import { SliderSlick } from "../../components/slider"
import { GlobalListSource } from "../../components/layout/global/global.list.source"
import { GetAndUpdateContext } from "../../model/context.function"
import { API_GET } from "../../api"
import { Tooltip } from "antd"
import { Loading } from "../../components/loading/loadingOther"
import { Formatter } from "../../helper/formater"


const CyberDeck = () => {
    const { value, maximize } = GetAndUpdateContext()
    let API_SEVERITY = API_GET.ALERT_SEVERITY()
    let API_ALERT_TYPE = API_GET.ALERT_TYPE()
    let API_DASHBOARD_STATUS = API_GET.DASHBOARD_STATUS()
    let AFFECTED_ENTITY = API_GET.AFFECTED_ENTITY()

    return <LayoutDashboard>
        <ColumnLeft>
            <CardAnimation>
                {!maximize?.ALERTSHOW && <CardBox borderBottom={true}>
                    <TitleContent date={value.DATEVALUE.uniq} time={true}>
                        <div className="text-[24px] uppercase text-blue">Alert Severity</div>
                    </TitleContent>
                    <div>
                        <div>
                            <SubtitleInfo className="btn-information" title={'OBSERVATION SEVERITY'}>
                                {OBSERVATION_SEVERITY_DESC}
                            </SubtitleInfo>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {/* <ProgressVertical title="Solved" /> */}
                            {API_SEVERITY.error ? "ERROR" : API_SEVERITY.isLoading ? <Loading></Loading> : API_SEVERITY.item.map((d, k) => {
                                return API_SEVERITY.item.length !== 4 && k == 0 ? <div key={k} className="col-span-2">
                                    <ProgressVertical title={d.name} color={d.color} percent={d.percentage} total={d.total} />
                                </div> : <div key={k}>
                                    <ProgressVertical title={d.name} color={d.color} percent={d.percentage} total={d.total} />
                                </div>
                            })}


                        </div>
                    </div>
                </CardBox>}
            </CardAnimation>
            <CardBox className={"flex-1"}>
                <TitleContent date={value.DATEVALUE.uniq} time={true} statusMinimize={!maximize?.ALERTSHOW} showSearch={maximize?.SEARCHALERTSHOW} searchType={'searchAlertType'} maximizeItem={"ALERTSHOW"} search={true} subTitle={"A-2"}>
                    <div className="text-[24px] uppercase text-blue">Alert TYPE</div>
                </TitleContent>
                <SubtitleInfo title={'statistic alert'}>
                    {STASTISTIC_ALERT_DESC}
                </SubtitleInfo>
                <div>
                    <ChartLineTooltip />
                </div>
                <div className="flex-1 flex flex-col">
                    <SubtitleInfo title={'LIST threat'}>
                        {LIST_THREATS}
                    </SubtitleInfo>
                    {API_ALERT_TYPE.error ? "ERROR" : API_ALERT_TYPE.isLoading ? <Loading></Loading> :
                        <TableInline columns={[
                            {
                                title: "no",
                                key: "no"
                            },
                            {
                                title: "THREAT CATEGORIES",
                                key: "name",
                                rowClass: "w-[165px]",
                            },
                            {
                                title: 'STATISTIC',
                                key: 'percents',
                                columnClass: "",
                                rowClass: "w-[160px]",
                                html: (d) => {
                                    return <Tooltip title={`${!isNaN(d) ? d.toFixed(2) : 0}%`}>
                                        <div className="w-full h-2 bg-primary static">
                                            <div className="h-full bg-blue" style={{ width: `${!isNaN(d) ? d.toFixed(2) : 0}%` }}></div>
                                        </div>
                                    </Tooltip>
                                },
                            },
                            {
                                title: "TOTAL",
                                key: "total"
                            },
                        ]} data={API_ALERT_TYPE.dataItems} hoverDisable height={maximize?.ALERTSHOW ? 'auto' : "150px"} />}

                </div>
            </CardBox>
        </ColumnLeft>
        <ColumnCenter>
            <div className=" backdrop-blur z-30">
                <CardAnimation>
                    {!maximize?.GLOBESHOW && <>
                        <FillterDay data={value.OPTIONALDATE} keyText={"OPTIONALDATE"}></FillterDay>
                        <div className="grid grid-cols-8">
                            <div className="col-span-3">
                                <TitleContent date={value.DATEVALUE.uniq} className={"border-b border-b-primary"} noBorder={true} subTitle={"A-3"}>
                                    <div className="text-[24px] uppercase text-blue">ALERT</div>
                                    <SquareFull onlyTop={true}></SquareFull>
                                </TitleContent>
                                <div className="relative">
                                    <SquareFull />
                                    <div className="py-8 flex items-center justify-center">
                                        <div className="text-[128px]" style={{
                                            lineHeight: 1
                                        }}>{
                                                API_DASHBOARD_STATUS.isLoading ? 0 : Formatter(API_DASHBOARD_STATUS.data?.alert)
                                            }</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2 border-l-primary border-l border-r-primary border-r flex items-center justify-center">
                                <ReactSVG className="main-logo" src={Logo} />
                            </div>
                            <div className="col-span-3 ">
                                <TitleContent date={value.DATEVALUE.uniq} className={"border-b border-b-primary"} noBorder={true} subTitle={"E-1"}>
                                    <div className="text-[24px] uppercase text-blue">ENTITIES AT RISK</div>
                                    <SquareFull onlyTop={true}></SquareFull>
                                </TitleContent>
                                <div className="relative">
                                    <SquareFull />
                                    <div className="py-8 flex items-center justify-center">
                                        <div className="text-[128px]" style={{
                                            lineHeight: 1
                                        }}>{API_DASHBOARD_STATUS.isLoading ? 0 : Formatter(API_DASHBOARD_STATUS.data.entities_at_risk)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>}
                </CardAnimation>
            </div>
            <div className="border-t border-t-primary  flex justify-center items-center ">
                <div className="w-full  bg-opacity-40 backdrop-blur-sm  p-4 z-10">
                    <TitleContent date={value.DATEVALUE.uniq} className={"z-10 w-full flex"} statusMinimize={!maximize?.GLOBESHOW} time={true} maximizeItem={"GLOBESHOW"}>
                        <div className="flex items-center flex-1 w-full">
                            <div className="text-[24px] uppercase text-blue">EL SENSE</div>
                            <div className="flex-1 items-center flex justify-center">
                                <FillterDay globe={true} slime={true} decoration={false} noBorder={true} text={'OPTIONAL VIEW'} keyText={"OPTIONALVIEW"} data={value.OPTIONALVIEW}></FillterDay>
                            </div>
                        </div>
                    </TitleContent>
                </div>
                {value.GLOBEVALUE.value === "satelite" ?
                    // <Globe status={!maximize?.GLOBESHOW} /> 
                    <GlobeGl status={!maximize?.GLOBESHOW} />
                    : <MapHighcharts valueReset={value.GLOBEVALUE.value} />}

            </div>
        </ColumnCenter>
        <ColumnRight>
            <CardBox borderBottom={true}>
                <TitleContent date={value.DATEVALUE.uniq} time={true} search={true} maximizeItem={"ATTACKERLIST"} statusMinimize={!maximize.ATTACKERLIST}>
                    <div className="text-[24px] uppercase text-blue">ATTACKER</div>
                </TitleContent>
                <CardAnimation>
                    {!maximize.ATTACKERLIST &&
                        <GlobalListSource />
                    }
                </CardAnimation>
                <AttactCountry limit={!maximize.ATTACKERLIST}></AttactCountry>
            </CardBox>
            <CardBox>
                <TitleContent date={value.uniq} time={true}  >
                    <div className="text-[24px] uppercase text-blue">Affected Entity</div>
                </TitleContent>
                <SubtitleInfo title={'PROTOCOL ENTITY'}>
                    {STASTISTIC_ALERT_DESC}
                </SubtitleInfo>
                {AFFECTED_ENTITY.error ? "ERROR" : AFFECTED_ENTITY.isLoading ? <Loading></Loading> : <SliderSlick data={AFFECTED_ENTITY.item} />}

            </CardBox>
        </ColumnRight>
    </LayoutDashboard >
}

const AttactCountry = ({ title = "top attack country source", limit }) => {
    let arr = new Array(50).fill("")
    return <>
        <SubtitleInfo title={title}>
            {TOP_ATTACK}
        </SubtitleInfo>
        {arr.length === 0 || !arr ? <div className="text-center p-2 border uppercase text-[white]">
            {ERRORCOMPONENT.dataNotAvailable}
        </div> : <div className="max-h-[500px] text-blue overflow-y-auto overflow-x-hidden pb-1 pr-3">
            <CardAnimation className="grid grid-cols-3 gap-3">
                {
                    arr.slice(0, limit ? 3 : arr.length).map((d, k) => {
                        return <div key={k} className="border border-primary px-2 py-1 flex justify-between">
                            <div>{k + 1} // RU</div>
                            <div>{(k + 1) * 24}</div>
                        </div>
                    })
                }
            </CardAnimation>
        </div>}

    </>
}

export default CyberDeck