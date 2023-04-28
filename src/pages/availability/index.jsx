import { BarChartOutlined, CaretLeftFilled, CaretRightFilled, PauseOutlined } from "@ant-design/icons"
import { Popover } from "antd"
import RootAPi, { API_GET } from "../../api/elwagyl"
import { PieChart } from "../../components/chart/chart.pie"
import { TinyLineChart } from "../../components/chart/chart.tinyLine"
import { GaugeChartIndicator } from "../../components/chart/gauge.indicator"
import { ChartLineTooltip } from "../../components/chart/line.tooltip"
import { SquareFull } from "../../components/decoration/square"
import { FillterDay } from "../../components/fillter/fillter.day"
import { GlobeGl } from "../../components/globe"
import { CardAnimation, CardBox } from "../../components/layout/card"
import { ColumnCenter, ColumnLeft, ColumnRight } from "../../components/layout/column.layout"
import { LayoutDashboard } from "../../components/layout/dashboard.layout"
import { GlobalListSource } from "../../components/layout/global/global.list.source"
import { SubtitleInfo } from "../../components/layout/subtitle.info"
import { TitleContent } from "../../components/layout/title"
import { Loading } from "../../components/loading/loadingOther"
import { TableInline } from "../../components/table"
import { GetAndUpdateContext } from "../../model/context.function"
import { OBSERVATION_SEVERITY_DESC } from "../../model/information"
import { Pagination } from "./pagination"
import { ErrorItems } from "../cyber.deck"
import { Loadings } from "../../components/loading"



const AvailabilityPages = () => {
    const { value, maximize } = GetAndUpdateContext()
    const root = RootAPi(['AVAILABILITY_ANOMALIES_SUMMARY', 'ALERT_SEVERITY', 'AVAILABILITY_ASSET_LIST', 'AVAILABILITY_SENSOR', 'AVAILABILITY_SERVER_LIST'])
    console.log(root)
    return <LayoutDashboard>
        <ColumnLeft>
            <CardBox className={"flex-1 "}>
                <CardAnimation className={"space-y-2"}>
                    {!maximize.ASSETLIST && <> <TitleContent time={true}  >
                        <div className="text-[24px] uppercase text-blue">ATTACK TYPE</div>
                    </TitleContent>
                        <SubtitleInfo className="btn-information" title={'THREAT TABLE'}>
                            {OBSERVATION_SEVERITY_DESC}
                        </SubtitleInfo>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="col-span-2 flex flex-col">
                                {root.error ? <ErrorItems></ErrorItems> : root.isLoading ? <Loading></Loading> : <TableInline hoverDisable data={root.data.AVAILABILITY_ANOMALIES_SUMMARY} columns={[
                                    {
                                        title: "THREAT CATEGORIES",
                                        key: "name"
                                    },
                                    {
                                        title: "TOTAL",
                                        key: "total",
                                        columnClass: "text-center",
                                        rowClass: "text-center w-[100px]"
                                    },
                                    {
                                        key: "data",
                                        html: (data) => {
                                            return <Popover placement="right" content={
                                                <div className="w-[450px] h-[200px]  mx-[-30px]">
                                                    <ChartLineTooltip className="h-full flex items-center flex-col justify-center" data={data} date xField="timestamp"></ChartLineTooltip>
                                                </div>
                                            }>
                                                <button className="text-[16px] w-full ">
                                                    <BarChartOutlined></BarChartOutlined>
                                                </button>
                                            </Popover>
                                        }
                                    }


                                ]} height={"200px"} />}

                            </div>

                        </div> </>}
                </CardAnimation>

                <TitleContent time={true} search={true} statusMinimize={!maximize.ASSETLIST} maximizeItem={"ASSETLIST"}>
                    <div className="text-[24px] uppercase text-blue">ASSET LIST</div>
                </TitleContent>
                <SubtitleInfo className="btn-information" title={'PROTECTED ASSET TABLE'}>
                    {OBSERVATION_SEVERITY_DESC}
                </SubtitleInfo>
                {root.error ? <ErrorItems></ErrorItems> : root.isLoading ? <Loading></Loading> : <TableInline className="flex flex-1" data={root.data.AVAILABILITY_ASSET_LIST.data} columns={[
                    {
                        title: "Name",
                        key: "name",
                    },
                    {
                        title: "IP Address",
                        key: "ip",
                        rowClass: "w-[120px]"
                    },
                ]}></TableInline>}

            </CardBox>
        </ColumnLeft>
        <ColumnCenter>
            <CardAnimation>
                {!maximize?.AVAILABLESENSORLIST && <>
                    <FillterDay data={value.OPTIONALDATE} keyText={"OPTIONALDATE"}></FillterDay>
                    <div className="grid grid-cols-8">
                        <div className="col-span-3">
                            <TitleContent className={"border-b border-b-primary"} noBorder={true} subTitle={"A-3"}>
                                <div className="text-[24px] uppercase text-blue">EL SIGHT</div>
                                <SquareFull onlyTop={true}></SquareFull>
                            </TitleContent>
                            <div className="relative">
                                <SquareFull />
                                <div className="flex items-center justify-center">
                                    <div className="flex w-full justify-between">
                                        <div className=" flex flex-col border-r border-r-primary">
                                            {root.error ? "ERROR" : root.isLoading ? <Loadings></Loadings> : root.data.ALERT_SEVERITY.map((d, k) => {
                                                return <div className="px-6 border-b gap-3 border-border_primary flex items-center justify-center flex-1 text-lg" key={k}>
                                                    <div>{d.total}</div>
                                                    <div className="w-4 h-4 rounded-full" style={{
                                                        backgroundColor: d.color
                                                    }}></div>
                                                </div>
                                            })}
                                        </div>
                                        <div className="p-3 flex-1 border-b border-border_primary flex justify-center items-center">
                                            <CardAnimation className="w-[220px] h-[220px]">
                                                {root.error ? <ErrorItems></ErrorItems> : root.isLoading ? <Loading></Loading> : <PieChart data={root.data.ALERT_SEVERITY} />}
                                            </CardAnimation>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2 border-l-primary border-l border-b border-primary border-r-primary border-r flex flex-col">
                            <TitleContent className={"border-b border-b-primary"} noBorder={true} subTitle={false}>
                                <div className="flex justify-center items-center w-full">
                                    <div className="text-[24px] uppercase text-blue">SERPENT NERVE</div>
                                </div>
                            </TitleContent>
                            <div className="p-4 flex-1 flex flex-col">
                                <div className="grid grid-cols-2 border border-primary flex-1">
                                    <div className="p-4 border-b col-span-2 gap-3 border-b-primary flex items-center justify-center flex-col" style={{
                                        lineHeight: 1.2,
                                    }}>
                                        <div>FOUND ASSETS</div>
                                        <div className="text-[48px]">{root.error ? "ERROR" : root.isLoading ? 0 : root.data.AVAILABILITY_ASSET_LIST?.total}</div>
                                    </div>
                                    <div>
                                        <div className="p-4 border-r border-r-primary gap-3 flex items-center justify-center flex-col" style={{
                                            lineHeight: 1.2,
                                        }}>
                                            <div>SENSOR <b>ON</b></div>
                                            <div className="text-[48px]">{root.error ? "ERROR" : root.isLoading ? 0 : root.data.AVAILABILITY_SENSOR.sensors.alive}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="p-4 flex items-center gap-3 justify-center flex-col" style={{
                                            lineHeight: 1.2,
                                        }}>
                                            <div>SENSOR <b className="text-[#ED6A5E]">OFF</b> </div>
                                            <div className="text-[48px] text-[#ED6A5E]">{root.error ? "ERROR" : root.isLoading ? 0 : root.data.AVAILABILITY_SENSOR.sensors.total - root.data.AVAILABILITY_SENSOR.sensors.alive}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-3 flex flex-col border-b border-primary">
                            <TitleContent className={"border-b border-b-primary"} noBorder={true} subTitle={"E-1"}>
                                <div className="text-[24px] uppercase text-blue">EL SENSE</div>
                                <SquareFull onlyTop={true}></SquareFull>
                            </TitleContent>
                            <div className="relative flex-1">
                                <SquareFull />
                                <div className="h-full items-center justify-center relative">
                                    <GlobeGl position="absolute !top-0"></GlobeGl>
                                </div>
                            </div>
                        </div>
                    </div></>}
            </CardAnimation>
            <CardBox className={"flex-1"}>
                    <TitleContent statusMinimize={!maximize.AVAILABLESENSORLIST} maximizeItem={"AVAILABLESENSORLIST"}>
                        <div className="text-[24px] uppercase text-blue">AVAILABLE SENSOR LIST</div>
                    </TitleContent>
                    <div className="grid grid-cols-7 gap-3 flex-1">
                        <div className="col-span-7 space-y-3 flex flex-col">
                            <div className="flex justify-between items-center">
                                ACTIVE SENSOR
                                {/* <Pagination data={root.data.AVAILABILITY_SERVER_LIST}></Pagination> */}
                            </div>
                            <div className="relative flex-1">
                                <div className="grid grid-cols-3 gap-3 absolute w-full h-full overflow-auto pr-4">
                                    {root.error ? <ErrorItems></ErrorItems> : root.isLoading ? <Loading></Loading> : root.data.AVAILABILITY_SERVER_LIST.data.map((d, k) => {
                                        return (
                                            <div key={k}>
                                                <div className="bg-primary py-1 px-3 flex items-center justify-between text-blue">
                                                    <div>{d.name} | {d.ip}</div>
                                                    <div className="px-5 border py-1 font-bold border-blue text-blue" style={{
                                                        lineHeight: 1
                                                    }}>ACTIVE</div>
                                                </div>
                                                {d.ping ? <div className="flex w-full">
                                                    <div className="w-32 px-3 border-l border-b border-primary"> <GaugeChartIndicator /></div>
                                                    <div className="flex-1 border-b border-primary border-r border-l relative">
                                                        <div className="absolute w-full h-full">
                                                            <div className="absolute right-0 p-3">
                                                                <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M7.83204 0.494787C7.74573 0.344423 7.62126 0.219497 7.47122 0.132622C7.32117 0.0457471 7.15086 0 6.97748 0C6.8041 0 6.6338 0.0457471 6.48375 0.132622C6.33371 0.219497 6.20924 0.344423 6.12292 0.494787L0.14362 10.6684C-0.254884 11.3468 0.222972 12.2092 0.99818 12.2092H12.9559C13.7311 12.2092 14.2099 11.346 13.8105 10.6684L7.83204 0.494787ZM6.97574 3.48924C7.44226 3.48924 7.80763 3.8921 7.76054 4.35688L7.45534 7.41498C7.44509 7.53512 7.39012 7.64703 7.30131 7.72858C7.2125 7.81013 7.09631 7.85539 6.97574 7.85539C6.85517 7.85539 6.73898 7.81013 6.65017 7.72858C6.56136 7.64703 6.50639 7.53512 6.49614 7.41498L6.19094 4.35688C6.17998 4.24721 6.19211 4.13646 6.22656 4.03176C6.261 3.92707 6.31699 3.83075 6.39093 3.74901C6.46486 3.66728 6.5551 3.60193 6.65582 3.55719C6.75655 3.51245 6.86553 3.4893 6.97574 3.48924ZM6.97748 8.72124C7.20875 8.72124 7.43055 8.81311 7.59408 8.97664C7.75761 9.14017 7.84948 9.36197 7.84948 9.59324C7.84948 9.8245 7.75761 10.0463 7.59408 10.2098C7.43055 10.3734 7.20875 10.4652 6.97748 10.4652C6.74621 10.4652 6.52442 10.3734 6.36089 10.2098C6.19736 10.0463 6.10548 9.8245 6.10548 9.59324C6.10548 9.36197 6.19736 9.14017 6.36089 8.97664C6.52442 8.81311 6.74621 8.72124 6.97748 8.72124Z" fill="#0B5567" />
                                                                </svg>
                                                            </div>
                                                            <TinyLineChart />
                                                        </div>
                                                    </div>
                                                </div> : <div className="p-4 h-28 flex items-center justify-center  border-l border-b border-primary border-r">ICMP NOT REPLY</div>}

                                            </div>
                                        )
                                    })}

                                </div>
                            </div>
                        </div>
                    </div>

                </CardBox>
        </ColumnCenter>
        <ColumnRight>
            <CardBox className={"flex flex-1 h-full flex-col relative"}>
                <TitleContent>
                    <div className="text-[24px] uppercase text-blue">ATTACKER</div>
                </TitleContent>
                <GlobalListSource otherClass={"absolute h-full w-full flex-1 flex flex-col"} tableClass={"flex-1 w-full flex flex-col"} className="relative flex-1 w-full" h="100%" />
            </CardBox>
        </ColumnRight>
    </LayoutDashboard>
}

export default AvailabilityPages