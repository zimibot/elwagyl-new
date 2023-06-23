import styled from 'styled-components';
import { Data } from './data';
import { Pagination, Tooltip } from 'antd';
import { ERRORCOMPONENT } from '../../model/information';
import { useEffect, useRef, useState } from 'react';
import { useMemo } from 'react';
import { DownOutlined, LoadingOutlined, UpOutlined } from '@ant-design/icons';
import { CardAnimation } from '../layout/card';
import { Form } from '../../components.eha/input';
import { toast } from 'react-hot-toast';

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
            title: 'STATISTIC',
            key: 'statistics',
            columnClass: "",
            rowClass: "w-[160px]",
            html: (d) => {
                return <div className="w-full h-2 bg-primary static">
                    <div className="h-full bg-blue" style={{ width: `${d}%` }}></div>
                </div>
            },
            htmlDropdown: "",
            function: "",
            htmlTitle: () => {

            }
        },
    ], data = [
        {
            no: '01',
            threat: 'BRUTE FORCE ATTACK',
            statistics: 32,
            total: 1240,
        },
    ], height = "auto", isload, name, ischeck, checkFunction, currentPage = 1, onChange, custom, pageSize = 1, hoverDisable, paggination, borderLast, tooltip, style = { columns: {}, row: {} }, htmlDropdown, className = "flex-auto flex flex-col", classTable, onClick = () => { }, border, active = null, totalPages = 30, classSubHtml }) => {


    const [item, setItem] = useState(null)
    const [dcolumns, setColumns] = useState([])
    const [check, setcheck] = useState([])
    const [checkAll, setcheckAll] = useState(false)
    const [checkCache, setCheckCache] = useState({}); // Menyimpan status checked untuk setiap item
    const [subActiveCache, setSubActiveCache] = useState({}); // Menyimpan status subActive untuk setiap item

    useEffect(() => {
        if (checkFunction) {
            checkFunction(check)
        }
    }, [check])

    useEffect(() => {
        if (item && item.length > 0) {
            if (check.length === item.length) {
                setcheckAll(true)
            }
        }

    }, [item, check])

    useEffect(() => {
        if (item) {
            const newSubActiveCache = {};
            item.forEach(item => {
                newSubActiveCache[item.id] = item.subActive;
            });
            setSubActiveCache(newSubActiveCache);
        }
    }, [item, Loading]);

    useEffect(() => {
        if (checkAll) {
            const newCheckCache = {};
            item.forEach(item => newCheckCache[item.id] = true);
            setCheckCache(newCheckCache);
        } else {
            setCheckCache({});
        }
    }, [checkAll, Loading]);


    useEffect(() => {

        setItem(null)
        if (data) {
            const newCheck = [];
            const newItem = data.map(d => {
                const checked = checkCache.hasOwnProperty(d.id) ? checkCache[d.id] : false;
                const subActive = subActiveCache.hasOwnProperty(d.id) ? subActiveCache[d.id] : false;
                if (checked) newCheck.push(d);
                return { ...d, checked, subActive };
            });
            setItem(newItem);
            setcheck(newCheck);
        }

        return () => {
            setItem(null)
            setcheck([])
        }



    }, [Loading, isload]);


    let sate = htmlDropdown || checkFunction ? {
        key: "dropdown",
        rowClass: "w-[50px]",
        columnClass: "w-[50px]",
        htmlTitle: () => {
            return <Form.check checked={checkAll} onChange={(a) => {
                var targetCheck = a.target.checked;

                if (targetCheck) {
                    setcheck(item);

                } else {
                    setcheck([]);
                }
                setcheckAll(targetCheck)
                setItem(prevState => prevState.map(item =>
                    ({ ...item, checked: targetCheck })
                ))
            }}></Form.check>
        },
        htmlDropdown: ({ subDropdown, fullData }) => {
            return <button className="items-center flex">
                <CardAnimation>
                    {fullData.subActive ? <UpOutlined onClick={subDropdown}></UpOutlined> : !ischeck ? <Form.check checked={fullData.checked ? fullData.checked : false} value={fullData.id} onChange={(a) => {

                        const targetCheck = a.target.checked;
                        const targetValue = a.target.value;

                        setItem(prevState => prevState.map(item =>
                            item.id === parseInt(targetValue)
                                ? { ...item, checked: targetCheck }
                                : item
                        ));

                        if (targetCheck) {
                            // menambahkan nilai ke array jika checkbox dicentang
                            setcheck(d => ([...d, fullData]));
                            setCheckCache(prevState => ({ ...prevState, [fullData.id]: true }));
                        } else {
                            // menghapus nilai dari array jika checkbox tidak dicentang
                            setcheck(d => d.filter(item => item.id !== parseInt(targetValue)));
                            setCheckCache(prevState => {
                                const newState = { ...prevState };
                                delete newState[fullData.id];
                                return newState;
                            });
                            setcheckAll(false);
                        }
                    }} /> : <DownOutlined onClick={subDropdown}></DownOutlined>}
                </CardAnimation>
            </button>
        }
    } : {
        rowClass: "w-[0] !p-0 text-transparent",
        columnClass: "w-[2px] !p-0",
    }


    useMemo(() => {
        setColumns(([sate, ...columns]))

        return () => {
            setColumns([])
        }
    }, [columns, checkAll, Loading])



    return (
        <div className={`${className} relative flex-col`} style={{
            height: height
        }}>
            <div className={`flex flex-col flex-1 relative text-blue  ${classTable ? classTable : ""}`} >
                {<div className="absolute w-full h-full overflow-auto  table-scroll">
                    <Tables hoverDisable={hoverDisable} border={border} borderLast={borderLast} className="text-left w-full table-fixed break-words" active={active}>
                        <thead className="sticky top-0 z-50">
                            <tr>
                                {dcolumns.map((column, index) => {
                                    return (
                                        <th className={column?.columnClass} key={index} style={{
                                            ...style.columns
                                        }}>{column.htmlTitle ? column.htmlTitle(item) : column.title}</th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {!item ? <tr className="!border-primary" >
                                <td colSpan={dcolumns.length}>
                                    <div className="text-center py-4">
                                        <div className="py-2">LOADING</div>
                                    </div>
                                </td>
                            </tr> : item && item.length === 0 ? <tr>
                                <td colSpan={dcolumns.length}>
                                    <div className="text-center py-4 text-[#fff]">
                                        <div className="py-2">{ERRORCOMPONENT.dataNotAvailable}</div>
                                    </div>
                                </td>
                            </tr> : <Data Loading={Loading} setSubActiveCache={setSubActiveCache} setcheck={setcheck} setItem={setItem} classSubHtml={classSubHtml} htmlDropdown={htmlDropdown} style={style.row} tooltip={tooltip} border={border} items={item} onClick={onClick} column={dcolumns}></Data>}
                        </tbody>
                    </Tables>
                </div>}

            </div>

            {paggination &&
                <div className="bg-primary px-2 py-1 flex text-[16px] justify-center ">
                    <Pagination onChange={(d => {
                        if (custom) {
                            let data = {
                                [name]: d
                            }
                            onChange(data)
                        } else {

                            onChange(d)
                        }
                    })} simple defaultCurrent={currentPage} pageSize={pageSize} total={totalPages} />
                </div>
            }
        </div>
    )
}