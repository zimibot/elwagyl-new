import styled from 'styled-components';
import { Data } from './data';
import { Pagination } from 'antd';
import { ERRORCOMPONENT } from '../../model/information';

const Tables = styled.table`
    border-collapse: inherit;
    border-spacing: 0px 0.5rem;
    min-width: max-content;
    font-weight: 600;
    th {
        padding: 5px;
        vertical-align: middle;
    }

    thead {
        background: #152A36;
        text-transform: uppercase;
    }

    tr:hover {
        background: #00D8FF;
        color: black;
        opacity: 1;
    }

    ${props => props.border && (`
        td {
            border-top: 1px solid;
            border-bottom: 1px solid;
            cursor: pointer;
        }

        td:last-child {
            border-right: 1px solid;
        }

        td:first-child {
            border-left: 1px solid;
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
        padding: 5px;
        vertical-align: middle;
        text-transform: uppercase;
    }
`

export const TableInline = ({
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
            rowClass: "w-[160px]",
            html: (d) => {
                return <div className="w-full h-2 bg-primary">
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
    ], height = "auto", paggination, count = 5, className = "flex-auto flex flex-col", classTable, onClick = () => { }, border, active = null }) => {


    return (
        <div className={`${className} relative`} style={{
            height: height
        }}>
            <div className={`flex flex-col flex-1 relative  ${classTable ? classTable : ""}`} >
                <div className="absolute w-full h-full overflow-auto  table-scroll">
                    <Tables border={border} className="text-left w-full" active={active}>
                        <thead className="sticky top-0">
                            <tr>
                                {columns.map((column, index) => {
                                    return (
                                        <th className={column.columnClass} key={index}>{column.title}</th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {!data || data.length === 0 ? <tr>
                                <td colSpan={columns.length}>
                                    <div className="text-center py-4 text-[#fff]">
                                        <div className="border py-2">{ERRORCOMPONENT.dataNotAvailable}</div>
                                    </div>
                                </td>
                            </tr> : <Data border={border} data={data} onClick={onClick} column={columns}></Data>}

                        </tbody>
                    </Tables>
                </div>
            </div>

            {data && data.length > count && data.length > 0 &&
                paggination &&
                <div className="bg-primary px-2 py-1 flex justify-end ">
                    <Pagination simple defaultCurrent={2} total={50} />
                </div>
            }
        </div>
    )
}