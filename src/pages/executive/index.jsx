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


const Executive = () => {
    const { value, maximize } = GetAndUpdateContext()
 
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
                                <div className="text-[24px] uppercase">SERVICE ALIVE</div>
                            </TitleContent>
                            <SubtitleInfo className="btn-information" title={'service statistic'}>
                                {OBSERVATION_SEVERITY_DESC}
                            </SubtitleInfo>
                            <ChartLineTooltip height={150} mode={'vh'} />
                        </>
                    }
                </CardAnimation>

            </CardBox>
            <CardBox className={"flex-1"}>
                <TitleContent date={value.DATEVALUE.uniq} time={true} statusMinimize={!maximize.SERVICESTATUS} maximizeItem={"SERVICESTATUS"} subTitle={"S-2"}>
                    <div className="text-[24px] uppercase">SERVICE STATUS</div>
                </TitleContent>
                <SubtitleInfo className="btn-information" title={'List Service'}>
                    {OBSERVATION_SEVERITY_DESC}
                </SubtitleInfo>
                <div className="flex-1 flex flex-col border-r border-r-primary">
                    <div className="bg-primary p-1 px-4">GAUGE SERVICE CONNECTION</div>
                    <div className="overflow-auto flex-1 relative">
                        <div className="grid grid-cols-3 gap-4 p-3 absolute left-0 top-0  w-full">
                            {new Array(10).fill("").map((d, k) => {
                                return <div key={k} className="p-2 border border-primary">
                                    <div className="uppercase">
                                        CORTEX XSOAR
                                    </div>
                                    <div className="px-3">
                                        <GaugeChart />
                                    </div>
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
                    <div className="grid grid-cols-8 bg-[#000] bg-opacity-40 backdrop-blur-sm z-10 border-b border-b-primary">
                        <div className="col-span-3 flex flex-col">
                            <TitleContent date={value.DATEVALUE.uniq} className={"border-b border-b-primary"} noBorder={true} subTitle={"A-1"}>
                                <div className="text-[24px] uppercase">ALIVE TIME</div>
                                <SquareFull onlyTop={true}></SquareFull>
                            </TitleContent>
                            <div className="relative flex-1 flex items-center justify-center">
                                <SquareFull />
                                <div className="py-8 flex items-center justify-center">
                                    <div className="text-[6vw]" style={{
                                        lineHeight: 1
                                    }}>54D:7H</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2 border-l-primary border-l border-r-primary border-r flex flex-col">
                            <TitleContent date={value.DATEVALUE.uniq} className={"border-b border-b-primary"} noBorder={true} subTitle={false}>
                                <div className="text-[24px] uppercase">service INDICATOR</div>
                            </TitleContent>
                            <div className="flex-1 items-center justify-center flex flex-col">
                                <div className="flex items-center justify-center flex-1 py-4">
                                    <GaugeChart ticks={[0, 1]} color={['l(0) 0:#F4664A 0.5:#FAAD14 1:#00D8FF']} formatText={(d) => {
                                        return "8/0"
                                    }} rangeWidth={15} fontSize={24} lineHeight={30} offsetY={-80} height={150} />
                                </div>
                                <div className="grid grid-cols-3 gap-2 px-3 py-3 w-full">
                                    <div className="py-1 text-center bg-primary opacity-60">SHUT DOWN</div>
                                    <div className="py-1 text-center bg-primary opacity-60">PARTLY ON</div>
                                    <div className="py-1 text-center border font-bold">ALL ACTIVE</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-3 flex flex-col">
                            <TitleContent date={value.DATEVALUE.uniq} className={"border-b border-b-primary"} noBorder={true} subTitle={"E-1"}>
                                <div className="text-[24px] uppercase">TOTAL services</div>
                                <SquareFull onlyTop={true}></SquareFull>
                            </TitleContent>
                            <div className="relative flex-1 flex items-center justify-center">
                                <SquareFull />
                                <div className="py-8 flex items-center justify-center">
                                    <div className="text-[128px]" style={{
                                        lineHeight: 1
                                    }}>08</div>
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
                    <div className="text-[24px] uppercase">SERVICE PORT</div>
                </TitleContent>
                <SubtitleInfo className="btn-information" title={'Decomposition Tree Graph PORT'}>
                    {OBSERVATION_SEVERITY_DESC}
                </SubtitleInfo>
                <div className="flex-1 relative">
                    <BoXChart className="absolute w-full h-full top-0">
                        <DecompositionTreeGraphChart refresh={!maximize.SERVICEPORT} otherRefresh={refresh.status} />
                    </BoXChart>
                </div>
            </CardBox>
        </ColumnCenter>
        <ColumnRight>
            <CardBox className={"flex-1"}>
                <CardAnimation>
                    {!maximize.SERVICEHOST && <>
                        <TitleContent date={value.DATEVALUE.uniq} time={true} subTitle={"S-4"}>
                            <div className="text-[24px] uppercase">SERVICE HISTORY</div>
                        </TitleContent>
                        <SubtitleInfo className="btn-information" title={'HISTORY STATISTIC'}>
                            {OBSERVATION_SEVERITY_DESC}
                        </SubtitleInfo>
                        <ChartLineTooltip height={150} mode={'vh'} />
                    </>
                    }
                </CardAnimation>

                <TitleContent date={value.DATEVALUE.uniq} time={true} subTitle={"S-5"} statusMinimize={!maximize.SERVICEHOST} maximizeItem={"SERVICEHOST"}>
                    <div className="text-[24px] uppercase">SERVICE HOST</div>
                </TitleContent>
                <SubtitleInfo className="btn-information" title={'list source HOST'}>
                    {OBSERVATION_SEVERITY_DESC}
                </SubtitleInfo>
                <div className="flex-1 flex-col flex relative">
                    <TableCstm />
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