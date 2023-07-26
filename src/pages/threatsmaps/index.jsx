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
import { ChartLineTooltip } from "../../components/chart/line.tooltip"
import { GetAndUpdateContext } from "../../model/context.function"
import RootAPi, { API_GET } from "../../api/elwagyl"
import { Loading } from "../../components/loading/loadingOther"
import { useVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useRef } from "react"
import moment from "moment"
import { totalSeverity } from "../cyber.deck"
import { Tooltip } from "antd"


const ThreatsMaps = ({ titlePath }) => {
    const { value } = GetAndUpdateContext()
    const root = RootAPi(["ALERT_SEVERITY", "THREATSMAP_CYBER_ATTACK_STATISTIC", "THREATSMAP_CYBER_ATTACK_THREATS", "DASHBOARD_STATUS"])
    // const API_GLOBE = API_GET.THREATSMAP_GLOBE()

    let severity = totalSeverity(root, value)

    return <LayoutDashboard titlePath={titlePath}>
        <ColumnLeft>
            <CardAnimation>
                <CardBox>
                    <TitleContent date={value.DATEVALUE.uniq} time={true} subTitle="T-1">
                        <div className="text-[24px] uppercase text-blue">threat Severity</div>
                    </TitleContent>
                    <SubtitleInfo title={'OBSERVATION SEVERITY'}>
                        {STASTISTIC_ALERT_DESC}
                    </SubtitleInfo>
                    {root.error ? "error" : root.isLoading ? <div className="p-4 flex items-center justify-center">Loading</div> : <div className="space-y-2">
                        <div className="grid grid-cols-4 border border-primary">
                            {severity.result.map((d, k) => {
                                return <div key={k} className="border-r border-primary p-3">
                                    <div className="font-bold uppercase" style={{ color: d.color }}>{d.name}</div>
                                    <div className="text-[24px] flex items-center gap-2" style={{
                                        color: d.color
                                    }}>
                                        <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 12H10V7H12M12 16H10V14H12M0 19H22L11 0L0 19Z" fill={d.color} />
                                        </svg>
                                        <span>{d.total}</span>
                                    </div>
                                </div>
                            })}


                        </div>
                        <div className="p-2 border border-primary flex ">
                            {severity.result.map((d, k) => {
                                return  <Tooltip  key={k} title={`Total : ${d.percentage}%`}>
                                    <div className="h-3" style={{
                                    background: d.color,
                                    width: `${d.percentage}%`
                                }}></div>
                                </Tooltip>
                            })}

                        </div>
                    </div>}

                </CardBox>
            </CardAnimation>
            <CardBox className={"flex-1 flex flex-col"}>
                <TitleContent date={value.DATEVALUE.uniq} time={true} subTitle={"T-2"}>
                    <div className="text-[24px] uppercase text-blue">threat CATCHER</div>
                </TitleContent>
                <SubtitleInfo title={'DEFINED THREAT BY SENSOR'}>
                    {STASTISTIC_ALERT_DESC}
                </SubtitleInfo>
                <div className="flex-1 flex flex-col">
                    <div className="bg-border_second py-2 px-4 flex justify-between">
                        <div>REAL-TIME THREAT</div>
                        {/* <div>{!root.isLoading && root.data.THREATSMAP_CYBER_ATTACK_THREATS.pages.length !== 0 && root.data.THREATSMAP_CYBER_ATTACK_THREATS.pages[0].data.length ? root.data.THREATSMAP_CYBER_ATTACK_THREATS.pages.length : 0} / {!root.isLoading && root.data.THREATSMAP_CYBER_ATTACK_THREATS.pages.length !== 0 ? root.data.THREATSMAP_CYBER_ATTACK_THREATS.pages[0].pagination.total_page : 0}</div> */}
                    </div>
                    <div className="flex-1 relative">
                        <ThreatsAttackList data={root.data.THREATSMAP_CYBER_ATTACK_THREATS} props={root.props.THREATSMAP_CYBER_ATTACK_THREATS} />
                    </div>
                </div>
            </CardBox>
        </ColumnLeft>
        <ColumnCenter>
            <FillterDay data={value.OPTIONALDATE} keyText={"OPTIONALDATE"}></FillterDay>

            <div className="border-t border-t-primary  flex justify-center items-center">
                <div className="w-full  bg-opacity-40 backdrop-blur-sm  p-4 z-10">
                    <TitleContent date={value.DATEVALUE.uniq} className={"z-10 w-full flex"} time={true}>
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
                    <GlobeGl status={false} />
                    : <MapHighcharts valueReset={value.GLOBEVALUE.value} />}

            </div>
        </ColumnCenter>
        <ColumnRight>
            <CardBox borderBottom={true}>
                <TitleContent date={value.DATEVALUE.uniq} time={true} >
                    <div className="text-[24px] uppercase text-blue">ATTACKER</div>
                </TitleContent>
                <CardAnimation>
                    <GlobalListSource />
                </CardAnimation>
            </CardBox>
            <CardBox className={"flex-1 max-h-[500px]"}>
                <TitleContent date={value.DATEVALUE.uniq} time={true} >
                    <div className="text-[24px] uppercase text-blue">THREAT STATISTIC</div>
                </TitleContent>
                <SubtitleInfo title={'STATISTIC TIMELINE'}>
                    {STASTISTIC_ALERT_DESC}
                </SubtitleInfo>
                <div className="relative flex-1 flex flex-col ">
                    <div className="absolute w-full h-full">
                        {root.error ? "ERROR" : root.isLoading ? <Loading></Loading> : <ChartLineTooltip data={root.data.THREATSMAP_CYBER_ATTACK_STATISTIC.data} className="h-full w-full flex flex-col items-center justify-center" height={"auto"} />}
                    </div>
                </div>
            </CardBox>
        </ColumnRight>
    </LayoutDashboard >
}


export default ThreatsMaps

const ThreatsAttackList = ({ props, data }) => {
    if (!props || !data) {
        return "Data or props are not provided"
    }

    const { status, error, isFetchingNextPage, fetchNextPage, hasNextPage } = props;
    const allRows = data ? data.pages.flatMap((d) => d.data) : [];

    if (allRows.length === 0) {
        return "DATA EMPTY"
    }

    const parentRef = useRef();

    const rowVirtualizer = useVirtualizer({
        count: hasNextPage ? allRows.length + 1 : allRows.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 90,
        overscan: 5,
    });

    useEffect(() => {
        const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();
        if (!lastItem || lastItem.index < allRows.length - 1 || !hasNextPage || isFetchingNextPage) return;
        fetchNextPage();
    }, [rowVirtualizer.getVirtualItems(), hasNextPage, fetchNextPage, allRows.length, isFetchingNextPage]);

    if (status === 'loading') return <Loading></Loading>;

    if (status === 'error') return <span>Error: {error.message}</span>;

    return (
        <div ref={parentRef} className="absolute w-full h-full overflow-auto text-blue border-l border-primary">
            <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}>
                {rowVirtualizer.getVirtualItems().map((virtualItem) => {
                    const isLoaderRow = virtualItem.index > allRows.length - 1;
                    const post = allRows[virtualItem.index];
                    let color = getStatusColor(post?.status);
                    let date = post ? moment(post.date).format("LLLL") : "";
                    return (
                        <RowComponent key={virtualItem.key} virtualItem={virtualItem} post={post} color={color} date={date} hasNextPage={hasNextPage} />
                    )
                })}
            </div>
        </div>
    );
}

// ... the rest of your code

const RowComponent = ({ virtualItem, post, color, date, hasNextPage }) => (
    <div className={`flex flex-col relative py-2 index-${virtualItem.index}`}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', transform: `translateY(${virtualItem.start}px)` }}>
        {post === undefined ? <LoaderComponent hasNextPage={hasNextPage} /> : <PostComponent post={post} color={color} date={date} />}
    </div>
);

const LoaderComponent = ({ hasNextPage }) => (
    hasNextPage ? <div className="p-4 flex justify-center w-full items-center">Loading more...</div>
        : <div className="p-4 flex justify-center w-full items-center">Nothing more to load</div>
);

const PostComponent = ({ post, color, date }) => (
    <>
        <div className="flex items-center">
            <div className="flex justify-center p-4">
                <svg width="25" height="22" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12H10V7H12M12 16H10V14H12M0 19H22L11 0L0 19Z" fill={color} />
                </svg>
            </div>
            <div className="px-2 flex flex-col justify-center gap-2">
                <div>{post.description}</div>
                <div className="flex items-center gap-4">
                    <span>{post.src_ip}</span>
                    <div>
                        <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 7L0.5 13.0622L0.500001 0.937822L11 7Z" fill="#00D8FF" />
                        </svg>
                    </div>
                    <span>{post.dest_ip}</span>
                </div>
                <div>{date}</div>
            </div>
        </div>
    </>
);

const getStatusColor = (status) => {
    switch (status) {
        case "low": return "#00D8FF";
        case "medium": return "#FFBA08";
        case "high": return "#ED6A5E";
        default: return "white";
    }
};
