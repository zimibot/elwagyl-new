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
import { API_GET } from "../../api"
import { Loading } from "../../components/loading/loadingOther"
import { useVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useRef } from "react"
import moment from "moment"


const ThreatsMaps = ({ titlePath }) => {
    const { value } = GetAndUpdateContext()
    const THREAT_SEVERITY = API_GET.ALERT_SEVERITY()
    const API_CYBER_ATTACK = API_GET.THREATSMAP_CYBER_ATTACK_STATISTIC()
    const API_CYBER_ATTACK_THREATS = API_GET.THREATSMAP_CYBER_ATTACK_THREATS()
    const API_GLOBE = API_GET.THREATSMAP_GLOBE()
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
                    {THREAT_SEVERITY.error ? "error" : THREAT_SEVERITY.isLoading ? "LOADING" : <div className="space-y-2">
                        <div className="grid grid-cols-3 border border-primary">
                            {THREAT_SEVERITY.item.map((d, k) => {
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
                            {THREAT_SEVERITY.item.map((d, k) => {
                                return <div key={k} className="h-3" style={{
                                    background: d.color,
                                    width: `${d.percentage}%`
                                }}></div>
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
                        <div>{API_CYBER_ATTACK_THREATS.status === "success" && API_CYBER_ATTACK_THREATS.data.pages.length !== 0 && API_CYBER_ATTACK_THREATS.data.pages[0].data.length ? API_CYBER_ATTACK_THREATS.data.pages.length : 0} / {API_CYBER_ATTACK_THREATS.status === "success" && API_CYBER_ATTACK_THREATS.data.pages.length !== 0 ? API_CYBER_ATTACK_THREATS.data.pages[0].pagination.total_page : 0}</div>
                    </div>
                    <div className="flex-1 relative">
                        <ThreatsAttackList dataItem={API_CYBER_ATTACK_THREATS} />
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
            <CardBox className={"flex-1"}>
                <TitleContent date={value.DATEVALUE.uniq} time={true} >
                    <div className="text-[24px] uppercase text-blue">THREAT STATISTIC</div>
                </TitleContent>
                <SubtitleInfo title={'STATISTIC TIMELINE'}>
                    {STASTISTIC_ALERT_DESC}
                </SubtitleInfo>
                <div className="relative flex-1 flex flex-col">
                    <div className="absolute w-full h-full">
                        {API_CYBER_ATTACK.error ? "ERROR" : API_CYBER_ATTACK.isLoading ? <Loading></Loading> : <ChartLineTooltip data={API_CYBER_ATTACK.data.data} className="h-full w-full flex flex-col items-center justify-center" height={"auto"} />}
                    </div>
                </div>
            </CardBox>
        </ColumnRight>
    </LayoutDashboard >
}


export default ThreatsMaps

const ThreatsAttackList = ({ dataItem }) => {

    const { status,
        error,
        data,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage } = dataItem

    const allRows = data ? data.pages.flatMap((d) => d.data) : []
    // const allPage = data ? data.pages.flatMap((d) => d.pagination) : []
    const parentRef = useRef()
    const rowVirtualizer = useVirtualizer({
        count: hasNextPage ? allRows.length + 1 : allRows.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 90,
        overscan: 5,
    })

    useEffect(() => {
        if (allRows.length !== 0) {
            const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse()

            if (!lastItem) {
                return
            }

            if (
                lastItem.index >= allRows.length - 1 &&
                hasNextPage &&
                !isFetchingNextPage
            ) {
                fetchNextPage()
            }
        }

    }, [rowVirtualizer.getVirtualItems(), hasNextPage, fetchNextPage, allRows.length, isFetchingNextPage])

    return status === 'loading' ? <Loading></Loading> : status === 'error' ? (
        <span>Error: {error.message}</span>
    ) : <div ref={parentRef} className="absolute w-full h-full overflow-auto text-blue border-l border-primary">
        <div
            style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                width: '100%',
                position: 'relative',
            }}
        >

            {rowVirtualizer.getVirtualItems().map((virtualItem) => {
                const isLoaderRow = virtualItem.index > allRows.length - 1
                const post = allRows[virtualItem.index]
                // const pages = allPage[virtualItem.index]
                // let kelipatan = virtualItem.index % 10 === 0
                // let calc = kelipatan && virtualItem.index / 10
                let color
                switch (post?.status) {
                    case "low":
                        color = "#00D8FF"
                        break;
                    case "medium":
                        color = "#FFBA08"
                        break;
                    case "high":
                        color = "#ED6A5E"
                        break;
                    default:
                        color = "white"
                        break;
                }

                let date = post ? moment(post.date).format("LLLL") : ""

                return (<div className={`flex flex-col py-2 index-${virtualItem.index}`}
                    key={virtualItem.key}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        // height: `${virtualItem.size}px`,
                        transform: `translateY(${virtualItem.start}px)`,
                    }}>
                    {allRows.length === 0 ? <div>DATA NOT FOUND</div> : isLoaderRow
                        ? hasNextPage
                            ? <div className="p-4 flex justify-center w-full items-center">Loading more...</div>
                            : <div className="p-4 flex justify-center w-full items-center">Nothing more to load</div>
                        : <>
                            <div className="flex items-center">
                                <div className="flex justify-center p-4">
                                    <svg width="25" height="22" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 12H10V7H12M12 16H10V14H12M0 19H22L11 0L0 19Z" fill={color} />
                                    </svg>
                                </div>
                                <div className="px-2 flex flex-col justify-center gap-2">
                                    <div>
                                        {post.description}
                                    </div>
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

                            {/* {virtualItem.index !== 0 && kelipatan && <div className=" flex mt-1 py-1 justify-center w-full items-center border-b border-t bg-primary border-primary">
                                PAGES {allPage[calc]?.current_page}
                            </div>} */}

                        </>}

                </div>

                )
            }
            )}

        </div>
    </div>
}