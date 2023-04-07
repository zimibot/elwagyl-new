import { useCallback } from "react";
import { LineBorderLeft, LineBorderRight } from "../decoration/line.border"
import { SquareFull, SquareMedium } from "../decoration/square"
import { message } from 'antd';
import styled from "styled-components";
import { GetAndUpdateContext } from "../../model/context.function";

export const FillterDay = ({ text = "GLOBAL FILTER", globe, noBorder, decoration = true, slime, data = [], keyText }) => {
    const { setvalue, value } = GetAndUpdateContext()

    const [messageApi, contextHolder] = message.useMessage({
        duration: 100.5
    });

    let btnUpdate = useCallback(
        ({ key = 0, value, uniq }) => {

            if (value === "resetmaps") {
                messageApi.open({
                    type: 'success',
                    content: 'RESET LOCATION MAPS SUCCESS',
                    duration: 0,
                });
                // Dismiss manually and asynchronously
                setTimeout(messageApi.destroy, 3000);
                setTimeout(() => {
                    setvalue(d => ({
                        ...d, 
                        [keyText]: (d[keyText].map(
                            item => item.key === 2 ? { ...item, active: false } : item.key === 1 ? { ...item, active: true } : item.key === 0 && { ...item, active: false }
                        ))
                    }))
                }, 500);
                setvalue(d => ({
                    ...d, MAPS2DCONFIG: {
                        ...d.MAPS2DCONFIG,
                        center: [0, 0],
                        zoom: 1
                    }
                }))
            }

            setvalue(d => ({
                ...d, [keyText]: (d[keyText].map(
                    item => item.key === key ? { ...item, active: true } : { ...item, active: false }
                ))
            }))

            if (!globe) {
                setvalue(d => ({ ...d, DATEVALUE: { value: value, uniq: uniq } }))
            } else {
                setvalue(d => ({ ...d, GLOBEVALUE: { value: value } }))
            }

        },
        [setvalue, keyText],
    )


    

    return <div className={`${noBorder ? "" : "border-b border-b-primary"} flex justify-center items-center relative z-10 `}>
        {decoration && <SquareFull onlyTop={true} />}
        {contextHolder}
        <div className="flex items-center justify-center gap-9">
            <div className={`${slime ? "" : "py-3 "} px-5 flex gap-4 relative items-center`}>
                <div className="absolute left-[-5vw] text-blue">{text}</div>
                <LineBorderLeft />
                <LineBorderRight />
                {data.map((d, k) => {
                    if (d.value === "resetmaps") {
                        return value.MAPS2DCONFIG.zoom > 1 && d.type === "text" ? <CoreDay onClick={() => btnUpdate({ key: k, value: d.value, uniq: d.uniq })} key={d.key} className={`${d.active ? "font-bold" : ""} flex items-center gap-3 py-1 px-4 border border-primary relative`}>
                            <SquareMedium />
                            <div>
                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="13" height="13" fill={!d.active ? "#0B5567" : "#00D8FF"} />
                                </svg>
                            </div>
                            <div className="top-[1px] relative uppercase">{d.text}</div>
                        </CoreDay> : ""
                    } else {
                        return d.type === "text" ? <CoreDay onClick={() => btnUpdate({ key: k, value: d.value, uniq: d.uniq })} key={d.key} className={`${d.active ? "font-bold" : ""} flex items-center gap-3 py-1 px-4 border border-primary relative`}>
                            <SquareMedium />
                            <div>
                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="13" height="13" fill={!d.active ? "#0B5567" : "#00D8FF"} />
                                </svg>
                            </div>
                            <div className="top-[1px] relative uppercase text-blue">{d.text}</div>
                        </CoreDay> : ""
                    }
                })}


            </div>
        </div>
    </div>
}

const CoreDay = styled.button `
    :hover {
        div {
            color: #00D8FF;
            font-weight: bold;
        }
        svg {
            rect {
                fill: #00D8FF;
            }
        }
    }
`