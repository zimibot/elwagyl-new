import styled from 'styled-components';
import { Data } from './data';
import { Pagination, Tooltip } from 'antd';
import { ERRORCOMPONENT } from '../../model/information';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import { ErrorItems } from '../../pages/cyber.deck';

const Tables = styled.table`
    border-collapse: inherit;
    border-spacing: 0px 0.5rem;
    min-width: max-content;
    font-weight: 600;
    th {
        padding: 10px;
        vertical-align: middle;
    }

    thead {
        background: #152A36;
        text-transform: uppercase;
    }
    ${props => !props.hoverDisable && (`
        tr:hover {
            background: #00D8FF;
            color: black;
            opacity: 1;
            cursor: pointer;
        }

    `)}
    
    ${props => props.border && (`
        td {
            border-top: 1px solid #0B5567;
            border-bottom: 1px solid #0B5567;
            
        }
        ${props.borderLast ? `
            td:last-child {
                border-left: 1px solid #0B5567;
                border-top: 0px;
                border-bottom: 0px;
            }
        ` : `
        
            td:last-child {
                border-right: 1px solid #0B5567;
            }

        `}
        

        td:first-child {
            border-left: 1px solid #0B5567;
        }

    
    `)}

    ${props => props.active &&
        `
        tr:nth-child(${props.active}) > td {
            background: #00D8FF;
            color: black;
            opacity: 1;
        }
    `}

    td {
        padding: 10px;
        vertical-align: middle;
        text-transform: uppercase;
    }
`

export const TableInline = ({
    Loading,
    columns = [
        {
            title: 'No',
            key: 'no',
        },
        {
            title: 'THREAT CATEGORIES',
            key: 'threat',
        },
        {
            title: 'STATISTIC',
            key: 'statistics',
            columnClass: "",
            rowClass: "w-[160px]",
            html: (d) => {
                return <div className="w-full h-2 bg-primary static">
                    <div className="h-full bg-blue" style={{ width: `${d}%` }}></div>
                </div>
            },
        },
        {
            title: 'TOTAL',
            key: 'total',
        },
    ], data = [
        {
            no: '01',
            threat: 'BRUTE FORCE ATTACK',
            statistics: 32,
            total: 1240,
        },
        {
            no: '01',
            threat: 'BRUTE FORCE ATTACK',
            statistics: 32,
            total: 1240,
        },
        {
            no: '01',
            threat: 'BRUTE FORCE ATTACK',
            statistics: 32,
            total: 1240,
        },
        {
            no: '01',
            threat: 'BRUTE FORCE ATTACK',
            statistics: 32,
            total: 1240,
        },
    ], height = "auto", error, name, currentPage = 1, onChange, custom, pageSize = 1, infiniteScroll, hoverDisable, paggination, borderLast, tooltip, style = { columns: {}, row: {} }, onLoad = () => { }, className = "flex-auto flex flex-col", classTable, onClick = () => { }, border, active = null, totalPages = 30 }) => {


    const parentRef = useRef()

    // The virtualizer
    const rowVirtualizer = useVirtualizer({
        count: !data ? 0 : data.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 50,
    })


    return (
        <div className={`${className} relative flex-col`} style={{
            height: height
        }}>
            <div className={`flex flex-col flex-1 relative text-blue ${classTable ? classTable : ""}`} >
                {infiniteScroll ? <div className="flex flex-1 flex-col absolute w-full h-full gap-2 overflow-auto table-scroll">
                    <div className="grid bg-primary px-5 py-4 gap-4 uppercase border-primary " style={{
                        gridTemplateColumns: `repeat(${columns.length}, minmax(0, 2fr))`,
                    }}>
                        {columns.map((d, k) => {
                            return <div key={k} className={`${d.columnClass}`} style={{
                                ...style.columns
                            }}>{d.title}</div>
                        })}
                    </div>
                    <div className=" overflow-y-auto overflow-x-hidden space-y-2 " ref={parentRef}>
                        <div
                            style={{
                                height: `${rowVirtualizer.getTotalSize()}px`,
                                width: '100%',
                                position: 'relative',
                            }}
                        >
                            {rowVirtualizer.getVirtualItems().map((virtualItem) => (
                                <div
                                    key={virtualItem.key}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: `${virtualItem.size}px`,
                                        transform: `translateY(${virtualItem.start}px)`,
                                    }}
                                >
                                    <div className="grid gap-4 p-4 border border-primary" style={{
                                        gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`
                                    }}>
                                        {columns.map(s => {
                                            return s["html"] ? <div key={s.key} className='overflow-hidden text-ellipsis  whitespace-nowrap'>
                                                <Tooltip placement="left" title={data[virtualItem.index][s.key]}>
                                                    {s['html'](data[virtualItem.index][s.key], d)}
                                                </Tooltip>
                                            </div> : <div key={s.key} className='overflow-hidden text-ellipsis whitespace-nowrap'>
                                                <Tooltip placement="left" title={data[virtualItem.index][s.key]}>
                                                    {data[virtualItem.index][s.key]}
                                                </Tooltip>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            ))}
                            {/* {data.map((d, k) => {
                                return 
                            })} */}
                        </div>

                    </div>
                </div> : error ? <ErrorItems></ErrorItems> : <div className="absolute w-full h-full overflow-auto  table-scroll">
                    <Tables hoverDisable={hoverDisable} border={border} borderLast={borderLast} className="text-left w-full" active={active}>
                        <thead className="sticky top-0 z-10">
                            <tr>
                                {columns.map((column, index) => {
                                    return (
                                        <th className={column.columnClass} key={index} style={{
                                            ...style.columns
                                        }}>{column.title}</th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {Loading ? <tr className="!border-primary" >
                                <td colSpan={columns.length}>
                                    <div className="text-center py-4">
                                        <div className="py-2">LOADING</div>
                                    </div>
                                </td>
                            </tr> : !data || data.length === 0 ? <tr>
                                <td colSpan={columns.length}>
                                    <div className="text-center py-4 text-[#fff]">
                                        <div className="py-2">{ERRORCOMPONENT.dataNotAvailable}</div>
                                    </div>
                                </td>
                            </tr> : <Data onLoad={onLoad} style={style.row} tooltip={tooltip} border={border} items={data} onClick={onClick} column={columns}></Data>}


                        </tbody>
                    </Tables>
                </div>}

            </div>

            {paggination &&
                <div className="bg-primary px-2 py-1 flex text-[16px] justify-center ">
                    {error ? "" : !Loading ? <Pagination onChange={(d => {
                        if (custom) {
                            let data = {
                                [name]: d
                            }
                            onChange(data)
                        } else {

                            onChange(d)
                        }
                    })} simple defaultCurrent={currentPage} pageSize={pageSize} total={totalPages} /> : "LOADING"}
                </div>
            }
        </div>
    )
}