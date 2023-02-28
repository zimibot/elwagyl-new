import { LayoutDashboard } from "../../components/layout/dashboard.layout"
import { TitleContent } from "../../components/layout/title"
import { SubtitleInfo } from "../../components/layout/subtitle.info"
import { ERRORCOMPONENT, OBSERVATION_SEVERITY_DESC, STASTISTIC_ALERT_DESC } from "../../model/information"
import { ProgressVertical } from "../../components/chart/progress.vertical"
import { CardAnimation, CardBox } from "../../components/layout/card"
import { TableInline } from "../../components/table"
import { ColumnCenter, ColumnLeft, ColumnRight } from "../../components/layout/column.layout"
import { ChartLineTooltip } from "../../components/chart/line.tooltip"
import { FillterDay } from "../../components/fillter/fillter.day"
import { SquareFull } from "../../components/decoration/square"
import Logo from "../../assets/logo.svg"
import { MapHighcharts } from "../../components/maps/higchart.map"
import { GlobeGl } from "../../components/globe"
import { SliderSlick } from "../../components/slider"
import { GlobalListSource } from "../../components/layout/global/global.list.source"
import { GetAndUpdateContext } from "../../model/context.function"


const CyberDeck = () => {
    const { value, maximize } = GetAndUpdateContext()
    return <LayoutDashboard>
        <ColumnLeft>
            <CardAnimation>
                {!maximize?.ALERTSHOW && <CardBox borderBottom={true}>
                    <TitleContent date={value.DATEVALUE.uniq} time={true}>
                        <div className="text-[24px] uppercase">Alert Severity</div>
                    </TitleContent>
                    <div>
                        <div>
                            <SubtitleInfo className="btn-information" title={'OBSERVATION SEVERITY'}>
                                {OBSERVATION_SEVERITY_DESC}
                            </SubtitleInfo>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <ProgressVertical title="Solved" />
                            <ProgressVertical title="low" color="#00D8FF" />
                            <ProgressVertical title="medium" color="#FFBA08" />
                            <ProgressVertical title="high" color="#ED6A5E" />
                        </div>
                    </div>
                </CardBox>}
            </CardAnimation>
            <CardBox className={"flex-1"}>
                <TitleContent date={value.DATEVALUE.uniq} time={true} statusMinimize={!maximize?.ALERTSHOW} showSearch={maximize?.SEARCHALERTSHOW} searchType={'searchAlertType'} maximizeItem={"ALERTSHOW"} search={true} subTitle={"A-2"}>
                    <div className="text-[24px] uppercase">Alert TYPE</div>
                </TitleContent>
                <SubtitleInfo title={'statistic alert'}>
                    {STASTISTIC_ALERT_DESC}
                </SubtitleInfo>
                <div>
                    <ChartLineTooltip />
                </div>
                <div className="flex-1 flex flex-col">
                    <SubtitleInfo title={'LIST threat'}>
                        {STASTISTIC_ALERT_DESC}
                    </SubtitleInfo>
                    <TableInline height={maximize?.ALERTSHOW ? 'auto' : "150px"} />
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
                                    <div className="text-[24px] uppercase">ALERT</div>
                                    <SquareFull onlyTop={true}></SquareFull>
                                </TitleContent>
                                <div className="relative">
                                    <SquareFull />
                                    <div className="py-8 flex items-center justify-center">
                                        <div className="text-[128px]" style={{
                                            lineHeight: 1
                                        }}>1207</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2 border-l-primary border-l border-r-primary border-r flex items-center justify-center">
                                <img src={Logo}></img>
                            </div>
                            <div className="col-span-3 ">
                                <TitleContent date={value.DATEVALUE.uniq} className={"border-b border-b-primary"} noBorder={true} subTitle={"E-1"}>
                                    <div className="text-[24px] uppercase">ENTITIES AT RISK</div>
                                    <SquareFull onlyTop={true}></SquareFull>
                                </TitleContent>
                                <div className="relative">
                                    <SquareFull />
                                    <div className="py-8 flex items-center justify-center">
                                        <div className="text-[128px]" style={{
                                            lineHeight: 1
                                        }}>300</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>}
                </CardAnimation>
            </div>
            <div className="border-t border-t-primary  flex justify-center items-center">
                <div className="w-full bg-[#000] bg-opacity-40 backdrop-blur-sm  p-4 z-10">
                    <TitleContent date={value.DATEVALUE.uniq} className={"z-10 w-full flex"} statusMinimize={!maximize?.GLOBESHOW} time={true} maximizeItem={"GLOBESHOW"}>
                        <div className="flex items-center flex-1 w-full">
                            <div className="text-[24px] uppercase">EL SENSE</div>
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
                    <div className="text-[24px] uppercase">ATTACKER</div>
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
                    <div className="text-[24px] uppercase">Affected Entity</div>
                </TitleContent>
                <SubtitleInfo title={'PROTOCOL ENTITY'}>
                    {STASTISTIC_ALERT_DESC}
                </SubtitleInfo>
                <SliderSlick />
            </CardBox>
        </ColumnRight>
    </LayoutDashboard >
}

const AttactCountry = ({ title = "top attack country source", limit }) => {
    let arr = new Array(50).fill("")

    return <>
        <SubtitleInfo title={title}>
            {STASTISTIC_ALERT_DESC}
        </SubtitleInfo>
        {arr.length === 0 || !arr ? <div className="text-center p-2 border uppercase text-[white]">
            {ERRORCOMPONENT.dataNotAvailable}
        </div> : <div className="max-h-[500px] overflow-y-auto overflow-x-hidden pb-1 pr-3">
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