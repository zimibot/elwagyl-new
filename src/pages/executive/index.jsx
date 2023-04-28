import { useEffect, useState } from "react";
import styled from "styled-components";
import { DecompositionTreeGraphChart } from "../../components/chart/decomposition";
import { GaugeChart } from "../../components/chart/gauge";
import { ChartLineTooltip } from "../../components/chart/line.tooltip";
import { SquareFull } from "../../components/decoration/square";
import { FillterDay } from "../../components/fillter/fillter.day";
import { CardAnimation, CardBox } from "../../components/layout/card";
import { ColumnCenter, ColumnLeft, ColumnRight } from "../../components/layout/column.layout"
import { LayoutDashboard } from "../../components/layout/dashboard.layout"
import { SubtitleInfo } from "../../components/layout/subtitle.info";
import { TitleContent } from "../../components/layout/title";
import { OBSERVATION_SEVERITY_DESC } from "../../model/information";
import { TableCstm } from "./table";
import { ReloadOutlined } from '@ant-design/icons';
import { Tooltip } from "antd";
import { GetAndUpdateContext } from "../../model/context.function";
import { API_GET } from "../../api/elwagyl";
import { Loading } from "../../components/loading/loadingOther";
import { counting } from 'radash'
import { GaugeChartIndicator } from "../../components/chart/gauge.indicator";
import { LineNoLabel } from "../../components/chart/line.no.label";

export const ItemData = ({ d, arInactive, arActive, totalActive }) => ({
    id: d.ip,
    value: {
        title: d.name,
        items: [
            {
                text: `${d.services.length} PORT`,
            },
        ],
    },
    children: [
        {
            id: 'A1',
            value: {
                title: 'ACTIVE',
                type: "active",
                items: [

                    {
                        text: `${totalActive.true} PORT`,
                        icon: `./assets_globe/kotak-active.png`,
                        type: "active"
                    },
                ],
            },
            children: arActive.map(d => (
                {
                    id: d.portid,
                    value: {
                        title: 'PORT',
                        items: [
                            {
                                text: d.portid,
                                icon: `./assets_globe/kotak-active.png`,
                                type: "active"
                            },
                        ],
                    },
                }
            ))
        },
        {
            id: 'A2',
            value: {
                title: 'INACTIVE',
                type: "inactive",
                items: [
                    {
                        text: `${totalActive.false} PORT`,
                        icon: `./assets_globe/kotak-inactive.png`,
                        type: "inactive"
                    },
                ],
            },
            children: arInactive.map(d => (
                {
                    id: d.portid,
                    value: {
                        title: 'PORT',
                        items: [
                            {
                                text: d.portid,
                                icon: `./assets_globe/kotak-inactive.png`,
                                type: "inactive"
                            },
                        ],
                    },
                }
            ))

        },
    ],
})


const Executive = () => {
    const { value, maximize, setvalue } = GetAndUpdateContext()
    const API_SERVICE_ALIVE = API_GET.EXECUTIVE_SERVICE_ALIVE()
    const API_SERVICE_HISTORY = API_GET.EXECUTIVE_SERVICE_HISTORY()
    const API_SERVICE_LIST = API_GET.EXECUTIVE_SERVICE_LIST()
    const API_HOST_LIST = API_GET.EXECUTIVE_HOST_LIST()
    const API_HOST_LIST_REALTIME = API_GET.EXECUTIVE_HOST_REALTIME()
    const API__ACTIVE_TIME = API_GET.EXECUTIVE_ACTIVE_TIME()
    const API_HOST_TOTAL = API_GET.EXECUTIVE_TOTAL_SERVER()

    const [refresh, setrefresh] = useState({ status: false });
    const [Row, setRow] = useState([]);

    useEffect(() => {
        let data = new Array(10).fill().map((d, k) => ({
            no: <div>{k + 1}</div>,
            source: <div>88.210.293.12</div>,
            date: <div>21/DEC/22</div>,
            time: <div>10:15:49</div>,
        }))

        setRow(data)
        return () => {
            setRow([])
        };
    }, []);






    return <LayoutDashboard >
        <ColumnLeft>
            <CardBox>
                <CardAnimation>
                    {!maximize.SERVICESTATUS &&
                        <>
                            <TitleContent date={value.DATEVALUE.uniq} time={true} subTitle={"S-1"}>
                                <div className="text-[24px] uppercase text-blue">SERVICE ALIVE</div>
                            </TitleContent>
                            <SubtitleInfo className="btn-information" title={'service statistic'}>
                                {OBSERVATION_SEVERITY_DESC}
                            </SubtitleInfo>
                            {API_SERVICE_ALIVE.error ? "ERROR" : API_SERVICE_ALIVE.isLoading ? <Loading></Loading> : <ChartLineTooltip data={API_SERVICE_ALIVE.data.data} height={150} mode={'vh'} />}

                        </>
                    }
                </CardAnimation>

            </CardBox>
            <CardBox className={"flex-1"}>
                <TitleContent date={value.DATEVALUE.uniq} time={true} statusMinimize={!maximize.SERVICESTATUS} maximizeItem={"SERVICESTATUS"} subTitle={"S-2"}>
                    <div className="text-[24px] uppercase text-blue">SERVICE STATUS</div>
                </TitleContent>
                <SubtitleInfo className="btn-information" title={'List Service'}>
                    {OBSERVATION_SEVERITY_DESC}
                </SubtitleInfo>
                <div className="flex-1 flex flex-col border-r border-r-primary text-blue">
                    <div className="bg-primary p-1 px-4"> SERVICE CONNECTION</div>
                    <div className="overflow-auto flex-1 relative">
                        <div className="grid  gap-4 p-3 absolute left-0 top-0  w-full">
                            {API_HOST_LIST_REALTIME.error ? "ERROR" : API_HOST_LIST_REALTIME.isLoading ? "LOADING" : API_HOST_LIST_REALTIME.items.map((d, k) => {
                                let percent = d.ping.length === 0 ? 0 : (d.ping.slice(-1)[0] / 500) * 100;
                                percent = Math.min(percent, 100);
                               
                               return <div key={k} className="p-2 border border-primary space-y-4">
                                    <div className="uppercase flex justify-between">
                                        <span>

                                            {d.hostname}
                                        </span>
                                        {d.alive && <span>
                                            {d.lastData} MS
                                        </span>}

                                    </div>
                                    <CardAnimation className="px-3 relative  h-28 flex items-end">
                                        {!d.alive ? <div className="w-full h-full flex justify-center items-center">CONNECTED IP</div> : <div className="w-full h-full absolute bottom-0 left-0 flex justify-between py-4 border-t border-primary">
                                            <div className=" w-36 h-full">
                                                <GaugeChart ping={parseInt(d.lastData)}></GaugeChart>
                                            </div>
                                            <div className="flex-1 relative">
                                                <LineNoLabel border={false} ping={d.ping}></LineNoLabel>
                                            </div>
                                        </div>
                                        }

                                    </CardAnimation>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </CardBox>
        </ColumnLeft>
        <ColumnCenter>
            <CardAnimation>

                {!maximize.SERVICEPORT && <> <FillterDay data={value.OPTIONALDATE} keyText={"OPTIONALDATE"}></FillterDay>
                    <div className="grid grid-cols-8  bg-opacity-40 backdrop-blur-sm z-10 border-b border-b-primary">
                        <div className="col-span-3 flex flex-col">
                            <TitleContent date={value.DATEVALUE.uniq} className={"border-b border-b-primary"} noBorder={true} subTitle={"A-1"}>
                                <div className="text-[24px] uppercase text-blue">ALIVE TIME</div>
                                <SquareFull onlyTop={true}></SquareFull>
                            </TitleContent>
                            <div className="relative flex-1 flex items-center justify-center">
                                <SquareFull />
                                <div className="py-8 flex items-center justify-center">
                                    <div className="text-[80px]" style={{
                                        lineHeight: 1
                                    }}>{API__ACTIVE_TIME.data?.total_active_time}</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2 border-l-primary border-l border-r-primary border-r flex flex-col">
                            <TitleContent date={value.DATEVALUE.uniq} className={"border-b border-b-primary"} noBorder={true} subTitle={false}>
                                <div className="text-[24px] uppercase text-blue">service INDICATOR</div>
                            </TitleContent>
                            <div className="flex-1 items-center justify-center flex flex-col">
                                <div className="flex items-center justify-center flex-1 py-4">
                                    {API_HOST_TOTAL.error ? "ERROR" : API_HOST_TOTAL.isLoading ? <Loading></Loading> :
                                        <GaugeChartIndicator ticks={[0, 1]} color={['l(0) 0:#F4664A 0.5:#FAAD14 1:#00D8FF']}
                                            ping={API_HOST_TOTAL.data.percentage / 100}
                                            formatText={(d) => {
                                                return `${API_HOST_TOTAL.data.total_server}/${API_HOST_TOTAL.data.server_alive}`
                                            }} rangeWidth={15} fontSize={24} lineHeight={30} offsetY={-80} height={150} />

                                    }

                                </div>
                                {API_HOST_TOTAL.error ? "ERROR" : API_HOST_TOTAL.isLoading ? <Loading></Loading> :
                                    <div className="grid grid-cols-3 gap-2 px-3 py-3 w-full text-blue">
                                        <div className={`py-1 text-center ${API_HOST_TOTAL.data.server_alive === 0 ? "border-blue font-bold " : "bg-primary opacity-60"}`}>SHUT DOWN</div>
                                        <div className={`py-1 text-center ${API_HOST_TOTAL.data.total_server < API_HOST_TOTAL.data.server_alive && API_HOST_TOTAL.data.server_alive !== 0 ? "border-blue font-bold " : "bg-primary opacity-60"}`}>PARTLY ON</div>
                                        <div className={`py-1 text-center border ${API_HOST_TOTAL.data.server_alive === API_HOST_TOTAL.data.total_server ? "border-blue font-bold " : "bg-primary opacity-60"}`}>ALL ACTIVE</div>
                                    </div>}
                            </div>
                        </div>
                        <div className="col-span-3 flex flex-col">
                            <TitleContent date={value.DATEVALUE.uniq} className={"border-b border-b-primary"} noBorder={true} subTitle={"E-1"}>
                                <div className="text-[24px] uppercase text-blue">TOTAL services</div>
                                <SquareFull onlyTop={true}></SquareFull>
                            </TitleContent>
                            <div className="relative flex-1 flex items-center justify-center">
                                <SquareFull />
                                <div className="py-8 flex items-center justify-center">
                                    <div className="text-[128px]" style={{
                                        lineHeight: 1
                                    }}>{API_HOST_LIST?.dataitem?.length}</div>
                                </div>
                            </div>
                        </div>
                    </div> </>}
            </CardAnimation>
            <CardBox className={"flex-1"}>
                <TitleContent customButton={<Tooltip title="REFRESH">
                    <button className="px-2 py-1" onClick={() => {
                        setrefresh((d) => ({ status: !d.status }))
                    }}>
                        <ReloadOutlined />
                    </button>
                </Tooltip>} statusMinimize={!maximize.SERVICEPORT} maximizeItem={"SERVICEPORT"} subTitle={"S-3"}>
                    <div className="text-[24px] uppercase text-blue">SERVICE PORT</div>
                </TitleContent>
                <SubtitleInfo className="btn-information" title={'Decomposition Tree Graph PORT'}>
                    {OBSERVATION_SEVERITY_DESC}
                </SubtitleInfo>
                <div className="flex-1 relative">
                    <BoXChart className="absolute w-full h-full top-0">
                        <DecompositionTreeGraphChart defaultData={API_SERVICE_LIST.graph} refresh={!maximize.SERVICEPORT} otherRefresh={refresh.status} />
                    </BoXChart>
                </div>
            </CardBox>
        </ColumnCenter>
        <ColumnRight>
            <CardBox className={"flex-1"}>
                <CardAnimation>
                    {!maximize.SERVICEHOST && <>
                        <TitleContent date={value.DATEVALUE.uniq} time={true} subTitle={"S-4"}>
                            <div className="text-[24px] uppercase text-blue">SERVICE HISTORY</div>
                        </TitleContent>
                        <SubtitleInfo className="btn-information" title={'HISTORY STATISTIC'}>
                            {OBSERVATION_SEVERITY_DESC}
                        </SubtitleInfo>
                        {API_SERVICE_HISTORY.error ? "ERROR" : API_SERVICE_HISTORY.isLoading ? <Loading></Loading> : <ChartLineTooltip data={API_SERVICE_HISTORY.data.data} date height={150} mode={'vh'} />}

                    </>
                    }
                </CardAnimation>

                <TitleContent date={value.DATEVALUE.uniq} time={true} subTitle={"S-5"} statusMinimize={!maximize.SERVICEHOST} maximizeItem={"SERVICEHOST"}>
                    <div className="text-[24px] uppercase text-blue">SERVICE HOST</div>
                </TitleContent>
                <SubtitleInfo className="btn-information" title={'list source HOST'}>
                    {OBSERVATION_SEVERITY_DESC}
                </SubtitleInfo>
                <div className="flex-1 flex-col flex relative">
                    {API_SERVICE_LIST.error ? "ERROR" : API_SERVICE_LIST.isLoading ? "LOADING" : <TableCstm column={[
                        {
                            title: "HOST NAME",
                            key: "name"
                        },
                        {
                            title: "IP ADDRESS",
                            key: "ip"
                        },
                        {
                            title: "ACTIVE PORT",
                            key: "services",
                            columnClass: "text-center",
                            rowClass: "text-center",
                            html: (d) => {
                                let total = counting(d, g => g.alive)
                                return total.true
                            }
                        },
                        {
                            title: "INACTIVE PORT",
                            key: "services",
                            columnClass: "text-center",
                            rowClass: "text-center",
                            html: (d) => {
                                let total = counting(d, g => g.alive)
                                return total.false
                            }
                        }
                    ]} data={API_SERVICE_LIST.data.data} tableIndex={(!value.SERVICEPORT ? 1 : value.SERVICEPORT.index + 1)} onClick={(d, index) => {
                        let totalActive = counting(d.services, g => g.alive)
                        let arActive = d.services.filter(d => d.alive === true)
                        let arInactive = d.services.filter(d => d.alive === false)
                        let data = ItemData({ d, arActive, arInactive, totalActive })
                        setvalue(d => ({ ...d, SERVICEPORT: { data, index } }))
                    }} />}

                </div>
            </CardBox>
        </ColumnRight>
    </LayoutDashboard>
}

export default Executive

let BoXChart = styled.div`
    > div {
        background: transparent!important;
    }
`