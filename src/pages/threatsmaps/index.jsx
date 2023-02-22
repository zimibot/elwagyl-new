import { LayoutDashboard } from "../../components/layout/dashboard.layout"
import { TitleContent } from "../../components/layout/title"
import { SubtitleInfo } from "../../components/layout/subtitle.info"
import { STASTISTIC_ALERT_DESC } from "../../model/information"
import { CardAnimation, CardBox } from "../../components/layout/card"
import { ColumnCenter, ColumnLeft, ColumnRight } from "../../components/layout/column.layout"
import { FillterDay } from "../../components/fillter/fillter.day"
import { MapHighcharts } from "../../components/maps/higchart.map"
import { GlobeGl } from "../../components/globe"
import { GlobalListSource } from "../../components/layout/global/global.list.source"
import { LimitText } from "../../components/limitText"
import { ChartLineTooltip } from "../../components/chart/line.tooltip"
import { GetAndUpdateContext } from "../../model/context.function"


const ThreatsMaps = ({ titlePath }) => {
    const { value } = GetAndUpdateContext()

    return <LayoutDashboard titlePath={titlePath}>
        <ColumnLeft>
            <CardAnimation>
                <CardBox>
                    <TitleContent date={value.DATEVALUE.uniq} time={true} subTitle="T-1">
                        <div className="text-[24px] uppercase">threat Severity</div>
                    </TitleContent>
                    <SubtitleInfo title={'OBSERVATION SEVERITY'}>
                        {STASTISTIC_ALERT_DESC}
                    </SubtitleInfo>
                    <div className="space-y-2">
                        <div className="grid grid-cols-4 border border-primary">
                            <div className="border-r border-primary p-2">
                                <div className="font-bold">NORMAL</div>
                                <div className="text-[24px] flex items-center gap-2 text-[white]">
                                    <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 12H10V7H12M12 16H10V14H12M0 19H22L11 0L0 19Z" fill="white" />
                                    </svg>
                                    <span>179</span>
                                </div>
                            </div>
                            <div className="border-r border-primary p-2">
                                <div className="font-bold">LOW</div>
                                <div className="text-[24px] flex items-center gap-2 ">
                                    <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 12H10V7H12M12 16H10V14H12M0 19H22L11 0L0 19Z" fill="#00D8FF" />
                                    </svg>
                                    <span>179</span>
                                </div>
                            </div>
                            <div className="border-r border-primary p-2">
                                <div className="font-bold">MEDIUM</div>
                                <div className="text-[24px] flex items-center gap-2 text-[#FFBA08]">
                                    <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 12H10V7H12M12 16H10V14H12M0 19H22L11 0L0 19Z" fill="#FFBA08" />
                                    </svg>
                                    <span>179</span>
                                </div>
                            </div>
                            <div className="p-2">
                                <div className="font-bold">HIGH</div>
                                <div className="text-[24px] flex items-center gap-2 text-[#ED6A5E]">
                                    <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 12H10V7H12M12 16H10V14H12M0 19H22L11 0L0 19Z" fill="#ED6A5E" />
                                    </svg>
                                    <span>179</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 border border-primary flex  gap-2">
                            <div className="h-3 w-[25%] bg-[white]"></div>
                            <div className="h-3 w-[25%] bg-blue"></div>
                            <div className="h-3 w-[25%] bg-[#FFBA08]"></div>
                            <div className="h-3 w-[25%] bg-[#ED6A5E]"></div>
                        </div>
                    </div>
                </CardBox>
            </CardAnimation>
            <CardBox className={"flex-1 flex flex-col"}>
                <TitleContent date={value.DATEVALUE.uniq} time={true} subTitle={"T-2"}>
                    <div className="text-[24px] uppercase">threat CATCHER</div>
                </TitleContent>
                <SubtitleInfo title={'DEFINED THREAT BY SENSOR'}>
                    {STASTISTIC_ALERT_DESC}
                </SubtitleInfo>
                <div className="flex-1 flex flex-col">
                    <div className="bg-border_second py-1 px-4">
                        REAL-TIME THREAT
                    </div>
                    <div className="flex-1 relative">
                        <div className="absolute w-full h-full overflow-auto">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(d => {
                                return <div className="flex py-2" key={d}>
                                    <div className="flex justify-center p-4">
                                        <svg width="25" height="22" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 12H10V7H12M12 16H10V14H12M0 19H22L11 0L0 19Z" fill="#00D8FF" />
                                        </svg>
                                    </div>
                                    <div className="px-2">
                                        <div>
                                            <LimitText text={`‘'_csp File Extension' Ransomware’ GENERATED BY XDR AGENT testorien`} />
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span>192.168.100.1</span>
                                            <div>
                                                <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11 7L0.5 13.0622L0.500001 0.937822L11 7Z" fill="#00D8FF" />
                                                </svg>
                                            </div>
                                            <span>192.167.12.50</span>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </CardBox>
        </ColumnLeft>
        <ColumnCenter>
            <FillterDay data={value.OPTIONALDATE} keyText={"OPTIONALDATE"}></FillterDay>

            <div className="border-t border-t-primary  flex justify-center items-center">
                <div className="w-full bg-[#000] bg-opacity-40 backdrop-blur-sm  p-4 z-10">
                    <TitleContent date={value.DATEVALUE.uniq} className={"z-10 w-full flex"} time={true}>
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
                    <GlobeGl status={false} />
                    : <MapHighcharts valueReset={value.GLOBEVALUE.value} />}

            </div>
        </ColumnCenter>
        <ColumnRight>
            <CardBox borderBottom={true}>
                <TitleContent date={value.DATEVALUE.uniq} time={true} >
                    <div className="text-[24px] uppercase">ATTACKER</div>
                </TitleContent>
                <CardAnimation>
                    <GlobalListSource />
                </CardAnimation>
            </CardBox>
            <CardBox className={"flex-1"}>
                <TitleContent date={value.DATEVALUE.uniq} time={true} >
                    <div className="text-[24px] uppercase">THREAT STATISTIC</div>
                </TitleContent>
                <SubtitleInfo title={'STATISTIC TIMELINE'}>
                    {STASTISTIC_ALERT_DESC}
                </SubtitleInfo>
                <div className="relative flex-1 flex flex-col">
                    <div className="absolute w-full h-full">
                        <ChartLineTooltip className="h-full w-full" height={"auto"} />
                    </div>
                </div>
            </CardBox>
        </ColumnRight>
    </LayoutDashboard >
}


export default ThreatsMaps