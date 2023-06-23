import { CloseOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { isObject } from "radash"
import React from "react"

import AnimateHeight from 'react-animate-height';
import { CardAnimation } from "../layout/card";


export const Data = ({ items = [], column = [], onClick, style, setItem, htmlDropdown, classSubHtml, setcheck,setSubActiveCache }) => {

    return items.map((d, k) => {
        return <React.Fragment key={k}>
            <tr className="relative" onClick={() => onClick(d, k)}>
                {column.map((i, r) => {
                    let className = i ? i.rowClass : ""
                    const onOff = () => {
                        const index = items.findIndex((item) => item.id === d.id);
                        const updatedRiskLevel = [...items];

                        if (index !== -1) {
                            updatedRiskLevel[index] = { ...updatedRiskLevel[index], menuActive: !d.menuActive };
                        }
                        setItem(updatedRiskLevel);
                    }
                    if (i['html']) {
                        return <td style={{ ...style }} className={`${className} relative`} key={r} >{i['html'](d[i.key], d, k)}</td>
                    } else if (i["function"]) {
                        return <td style={{ ...style }} className={`${className} w-0 `} key={r} >
                            <Tooltip title="MENU">
                                <button onClick={onOff} className="bg-primary px-2 py-2 flex items-center"> <MenuFoldOutlined></MenuFoldOutlined></button>
                            </Tooltip>
                            <CardAnimation className={"!absolute right-0 h-full top-[0]"}>
                                {d.menuActive && <div className="absolute right-[0px] h-full top-0 items-center flex bg-primary  z-50 px-6 gap-4">
                                    {i['function']({
                                        fullData: d, key: k, current: d[i.key]
                                    })}
                                    | <Tooltip placement="left" title="CLOSE" onClick={onOff}>
                                        <button className="text-red-500 flex items-center"><CloseOutlined></CloseOutlined></button>
                                    </Tooltip>
                                </div>}
                            </CardAnimation>
                        </td>
                    } else if (i["htmlDropdown"]) {
                        return <td style={{ ...style }} className={`${className} relative`} key={r} >{i['htmlDropdown']({
                            fullData: d, key: k, current: d[i.key], subDropdown: () => {
                                return new Promise((resolve) => {
                                    const index = items.findIndex((item) => item.id === d.id);
                                    const updatedRiskLevel = [...items];
                            
                                    if (index !== -1) {
                                        updatedRiskLevel[index] = { ...updatedRiskLevel[index], subActive: !d.subActive };
                                    }
                            
                                    setcheck(w => w.filter(item => item.id !== parseInt(d.id)));
                                    setSubActiveCache(prevState => ({ ...prevState, [d.id]: updatedRiskLevel[index].subActive }));
                            
                                    setItem(updatedRiskLevel);
                            
                                    return resolve(d)
                                })

                            }
                        })}</td>
                    } else {
                        return <td key={r} style={{ ...style }} className={`${className} relative`}>{!isObject(d[i.key]) && d[i.key] ? d[i.key] : "-"}</td>
                    }
                })}

            </tr>
            {<tr className={`sub-html`}>
                <td colSpan={column.length} className="current-sub !border-0 relative !p-0" >
                    <AnimateHeight
                        id="example-panel"
                        className="bg-border_second"
                        duration={500}
                        height={d.subActive ? "auto" : 0} // see props documentation below
                    >
                        {d.subActive ? <div className={`flex w-full flex-col relative   ${classSubHtml ? classSubHtml : ""}`}>
                            { htmlDropdown ? htmlDropdown({ data: d, key: k, column }) : <div className="h-72 flex items-center justify-center bg-primary">
                            DATA NOT FOUND
                            </div>}
                        </div> : <div className="min-h-[100px]"></div>}

                    </AnimateHeight>

                </td>
            </tr>}




        </React.Fragment>
    })
}
