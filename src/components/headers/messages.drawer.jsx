import { Drawer, Empty } from "antd"
import { GetAndUpdateContext } from "../../model/context.function"
import { TitleContent } from "../layout/title"
import styled from "styled-components"
import { useEffect, useRef, useState } from "react"
import { CardAnimation } from "../layout/card"
import RootAPi from "../../api/elwagyl"
import { useVirtualizer } from "@tanstack/react-virtual"
import moment from "moment"
import { Loading } from "../loading/loadingOther"

const Tab = styled.div`
   > button:hover {
    opacity:1;
   }

  > button:hover > div:last-child {
    background: #00D8FF;
  }
 
`

export const MassagesDrawer = () => {
    let root = RootAPi(["THREATSMAP_CYBER_ATTACK_THREATS"])

    const { setmaximize } = GetAndUpdateContext()
    const [tabActive, setTab] = useState(true)
    return <Drawer title={false} width={"100%"} placement="right" onClose={() => {
        setmaximize(d => ({ ...d, MESSAGES: !d.MESSAGES }))
        window.api.invoke('message-close')
    }} closable={false} open={true}>
        <TitleContent maximizeItem={"MESSAGES"} className={"pt-0"}>
            <div className="text-[24px] uppercase text-blue">MESSAGES</div>
        </TitleContent>
        <div className="flex-1 pt-4 ml-[-23px] mr-[-23px] flex flex-col w-full]">
            <Tab className="border border-[#152A36] grid grid-cols-2" active={tabActive} >
                <button className={`p-2 flex items-center justify-center border-r border-[#152A36] flex-col gap-3 text-xl ${tabActive ? "" : "opacity-60 "}`} onClick={() => setTab(true)}>
                    <div>ALERT NOTIFICATION</div>
                    <div className={`w-full border border-[#152A36] p-1 ${tabActive ? "bg-blue" : ""}`}></div>
                </button>
                <button className={`p-2 flex items-center justify-center flex-col gap-3 text-xl ${tabActive ? "opacity-60" : ""}`} onClick={() => setTab(false)}>
                    <div>GENERAL</div>
                    <div className={`w-full border border-[#152A36] p-1 ${tabActive ? "" : "bg-blue"}`}></div>
                </button>
            </Tab>
            <div className="flex-1 relative">
                <CardAnimation className="absolute h-full w-full">
                    {tabActive ? root.error ? "" : root.isLoading ? "" : <ThreatsAttackList data={root.data.THREATSMAP_CYBER_ATTACK_THREATS} props={root.props.THREATSMAP_CYBER_ATTACK_THREATS}></ThreatsAttackList> : <div className="py-8 text-blue flex justify-center items-center">
                        <Empty image={<img src='/assets/no-data.png' ></img>}></Empty>
                    </div>}
                </CardAnimation>
            </div>
        </div>
    </Drawer>
}



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
        estimateSize: () => 165,
        overscan: 10,
    });

    useEffect(() => {
        const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();
        if (!lastItem || lastItem.index < allRows.length - 1 || !hasNextPage || isFetchingNextPage) return;
        fetchNextPage();
    }, [rowVirtualizer.getVirtualItems(), hasNextPage, fetchNextPage, allRows.length, isFetchingNextPage]);

    if (status === 'loading') return <Loading></Loading>;

    if (status === 'error') return <span>Error: {error.message}</span>;

    return (
        <div ref={parentRef} className="absolute w-full h-full overflow-auto">
            <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}>
                {rowVirtualizer.getVirtualItems().map((virtualItem) => {
                    const post = allRows[virtualItem.index];
                    let color = getStatusColor(post?.status);
                    let date = post ? moment(post.date).format("LLLL") : "";
                    let late = post ? moment(post.date).fromNow() : "";
                    return (
                        <RowComponent key={virtualItem.key} virtualItem={virtualItem} post={post} color={color} date={date} hasNextPage={hasNextPage} status={post?.status} late={late} />
                    )
                })}
            </div>
        </div>
    );
}

// ... the rest of your code

const RowComponent = ({ virtualItem, post, color, date, hasNextPage, status, late }) => (
    <div className={`flex flex-col relative py-2 index-${virtualItem.index}`}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', transform: `translateY(${virtualItem.start}px)` }}>
        {post === undefined ? <LoaderComponent hasNextPage={hasNextPage} /> : <PostComponent post={post} color={color} date={date} status={status} late={late} />}
    </div>
);

const LoaderComponent = ({ hasNextPage }) => (
    hasNextPage ? <div className="p-4 flex justify-center w-full items-center">Loading more...</div>
        : <div className="p-4 flex justify-center w-full items-center">Nothing more to load</div>
);

const PostComponent = ({ post, color, date, status, late }) => (
    <>
        {/* <div className="flex items-center">
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
        </div> */}

        <div className="border grid grid-cols-3 border-[#152A36] border-l-4" style={{
            borderLeft: `3px solid ${color}`
        }}>
            <div className="border-r border-[#152A36] p-3 flex gap-4 items-center ">
                <div className="flex justify-center items-center">
                    <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 12H10V7H12M12 16H10V14H12M0 19H22L11 0L0 19Z" fill={color} />
                    </svg>
                </div>
                <div className="uppercase">
                    <span className="font-bold m-0">SEVERITY</span>
                    <br></br>{status}
                </div>
            </div>
            <div className="border-r border-[#152A36] p-3">
                <span className="font-bold m-0">IP ATTACKER</span> <br></br>{post.src_ip}
            </div>
            <div className="p-3">
                <span className="font-bold m-0"> IP TARGET </span>   <br></br>{post.dest_ip}
            </div>
            <div className="border-r border-[#152A36] p-3 col-span-2 border-t">
                <span className="font-bold m-0"> THREAT </span>   <br></br>
                <span style={{
                    color: color
                }}>
                    {post.description}
                </span>
            </div>
            <div className="border-t border-[#152A36] p-3">
                <span className="font-bold m-0">  {date}  </span> <br></br> {late}
            </div>
        </div>
    </>
);

const getStatusColor = (status) => {
    switch (status) {
        case "low": return "#00D8FF";
        case "medium": return "#FFBA08";
        case "high": return "#ED6A5E";
        case "critical": return "#ff0000";
        default: return "white";
    }
};
