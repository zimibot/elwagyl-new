import moment from "moment/moment"
import RootAPi from "../../../api/elwagyl"
import { GetAndUpdateContext } from "../../../model/context.function"
import { LIST_SOURCE_IP } from "../../../model/information"
import { SubtitleInfo } from "../subtitle.info"
import { Loading } from "../../loading/loadingOther"
import { useRef } from "react"
import { useEffect } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"

export const GlobalListSource = ({ h = "350px", className = "", otherClass, tableClass }) => {
    const root = RootAPi(['THREATSMAP_CYBER_ATTACK_THREATS'])
    return <div className={className}>
        <div className={otherClass}>
            <SubtitleInfo title={'list source attacker'}>
                {LIST_SOURCE_IP}
            </SubtitleInfo>
            <div className="min-h-[400px] overflow-hidden relative flex-1">
                <ThreatsAttackList data={root.data.THREATSMAP_CYBER_ATTACK_THREATS} control={root.props.THREATSMAP_CYBER_ATTACK_THREATS} />
            </div>
        </div>
    </div>
    // return APILISTATTACK.error ? "ERROR" : APILISTATTACK.isLoading ? <Loading></Loading> : 

}




const ThreatsAttackList = ({ control, data }) => {
    if (!control || !data) {
        return <div className="flex justify-center items-center p-4">Data or props are not provided</div>
    }

    const { status, error, isFetchingNextPage, fetchNextPage, hasNextPage } = control;
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
        <div ref={parentRef} className="absolute w-full h-full overflow-auto text-blue border-l border-primary px-2">
            <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}>
                {rowVirtualizer.getVirtualItems().map((virtualItem) => {
                    const isLoaderRow = virtualItem.index > allRows.length - 1;
                    const post = allRows[virtualItem.index];
                    let color = getStatusColor(post?.status);
                    let date = post ? moment(post.date).format("ll") : "";
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

const PostComponent = ({ post, color, date }) => {
    return (
        <div className="border-l-4 grid grid-cols-3 border-b border-t border-r" style={{
            borderColor: color
        }}>
            <div className="p-4">
                <div className="font-bold">IP ATTACKER</div>
                <div style={{
                    color: color
                }}>{post.src_ip}</div>
            </div>
            <div className="p-4">
                <div className="font-bold">IP TARGET</div>
                <div>{post.dest_ip}</div>
            </div>
            <div className="p-4">
                <div className="font-bold">DATE</div>
                <div>{date}</div>
            </div>
        </div>
    )
};

const getStatusColor = (status) => {
    switch (status) {
        case "low": return "#00D8FF";
        case "medium": return "#FFBA08";
        case "high": return "#ED6A5E";
        default: return "white";
    }
};
