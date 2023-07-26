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
import RootAPi  from "../../api/elwagyl"
import { Tooltip } from "antd"
import { Loading } from "../../components/loading/loadingOther"
import { Formatter } from "../../helper/formater"
import { Typography } from 'antd';
import { sum } from "radash"

const { Text } = Typography;

export const ErrorItems = () => {
    return <div className="flex justify-center items-center p-4 col-span-full text-red-500 h-20 text-1xl">ERROR CONNECTION SERVER</div>
}

export const totalSeverity = (root, value) => {

    const { isLoading, error, data } = root;
    const { ALERT_SEVERITY, DASHBOARD_STATUS } = data;

    if (error) {
        return { result: "ERROR" };
    }

    if (isLoading) {
        return {
            loading: isLoading,
            result: null,
        };
    }

    if (value.APIURLDEFAULT.type !== "siem") {
        return {
            loading: isLoading,
            result: ALERT_SEVERITY
        };
    }

    try {
        let totalScore = DASHBOARD_STATUS;
        let total = sum(ALERT_SEVERITY, d => d.count);
        let remaining = totalScore.alert - total;

        ALERT_SEVERITY.push({
            "name": "info",
            "color": "white",
            "count": remaining,
            "total": Formatter(remaining),
        });

        let sas = ALERT_SEVERITY.map(d => ({
            ...d,
            percentage: parseFloat(((d.count / totalScore.alert) * 100).toFixed(2))
        }));

        return {
            loading: isLoading,
            result: sas
        };
    } catch (error) {
        return {
            result: null
        };
    }
};

const CyberDeck = () => {
    const { value, maximize } = GetAndUpdateContext()
    let root = RootAPi(['ALERT_SEVERITY', 'ALERT_TYPE', 'DASHBOARD_STATUS', 'AFFECTED_ENTITY', "ALERT_GROUP_STATISTIC"])



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
                            {root.error ? <ErrorItems></ErrorItems> : root.isLoading ? <Loading></Loading> : totalSeverity(root, value)?.result.map((d, k) => {
                                return root.data.ALERT_SEVERITY.length !== 4 && k == 0 ? <div key={k} className="col-span-2">
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
                    {root.error ? <ErrorItems></ErrorItems> : root.isLoading ? <Loading></Loading> : <ChartLineTooltip data={root.data.ALERT_GROUP_STATISTIC} seriesField={"type"} xField="timestamp" />}

                </div>
                <div className="flex-1 flex flex-col">
                    <SubtitleInfo title={'LIST threat'}>
                        {LIST_THREATS}
                    </SubtitleInfo>
                    {root.error ? <ErrorItems></ErrorItems> : root.isLoading ? <Loading></Loading> :
                        <TableInline columns={[
                            {
                                title: "no",
                                key: "no",
                                rowClass: "w-[40px]",
                                columnClass: "w-[40px]"
                            },
                            {
                                title: "THREAT CATEGORIES",
                                key: "name",
                                rowClass: "w-[165px]",
                                columnClass: "w-[165px]"
                            },
                            {
                                title: 'STATISTIC',
                                key: 'percents',
                                columnClass: "w-[160px]",
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
                        ]} data={root.data.ALERT_TYPE} hoverDisable height={maximize?.ALERTSHOW ? 'auto' : "150px"} />}

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
                                                root.error ? 0 : root.isLoading ? 0 : Formatter(root.data.DASHBOARD_STATUS.alert)
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
                                        }}>{root.error ? 0 : root.isLoading ? 0 : Formatter(root.data.DASHBOARD_STATUS.entities_at_risk)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>}
                </CardAnimation>
            </div>
            <div className="border-t border-t-primary  flex justify-center items-center flex-1 relative">
                <div className="w-full  bg-opacity-40 backdrop-blur-sm  p-4 z-10 absolute top-0">
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
                    :
                    <div className="absolute w-full h-full top-0 left-0 flex flex-1">
                        <MapHighcharts className="absolute" valueReset={value.GLOBEVALUE.value} />
                    </div>
                }

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
                {root.error ? <ErrorItems></ErrorItems> : root.isLoading ? <Loading></Loading> : <SliderSlick data={root.data.AFFECTED_ENTITY} />}

            </CardBox>
        </ColumnRight>
    </LayoutDashboard >
}

const AttactCountry = ({ title = "top attack country source", limit }) => {
    let root = RootAPi(['ATTACK_GROUP'])

    let arr = new Array(50).fill("")
    return <>
        <SubtitleInfo title={title}>
            {TOP_ATTACK}
        </SubtitleInfo>
        {root.data.ATTACK_GROUP?.length === 0 || !root.data.ATTACK_GROUP ? <div className="text-center p-2 border uppercase text-[white]">
            {ERRORCOMPONENT.dataNotAvailable}
        </div> : <div className="max-h-[500px] text-blue overflow-y-auto overflow-x-hidden pb-1 pr-3">
            <CardAnimation className="grid grid-cols-3 gap-3">
                {root.error ? <ErrorItems></ErrorItems> : root.isLoading ? "Loading" : root.data.ATTACK_GROUP.length === 0 ? "Data not found" : root.data.ATTACK_GROUP.slice(0, limit ? 3 : root.ATTACK_GROUP?.data?.length).map((d, k) => {
                    return <div key={k} className="border border-primary px-2 py-1 flex justify-between items-center">
                        <Text className="text-blue" ellipsis={true}>{k + 1} // {d.region}</Text>
                        <div>{Formatter(d.count)}</div>
                    </div>
                })}

            </CardAnimation>
        </div>}

    </>
}

export default CyberDeck