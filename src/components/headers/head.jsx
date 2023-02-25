
import { useEffect, useState } from "react"
import { LineBorderLeft, LineBorderRight } from "../decoration/line.border";
import Banner from "../../assets/images/banner.svg";
import { LineNoLabel } from "../chart/line.no.label";
import { SquareMedium } from "../decoration/square";
import { SwitchCustom } from "../form.input";
import { MENUDATA } from "../../model/information";
import { useLocation, useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
import { GetAndUpdateContext } from "../../model/context.function";
import { MenuEha } from "../../components.eha/menu";

export const Heads = ({ eha }) => {

    return <div className="w-full border-t border-t-border_primary border-b border-b-border_second max-w-[2500px] mx-auto z-50 bg-black backdrop-blur bg-opacity-50">
        <HeadTop eha={eha}></HeadTop>
        <HeadBottom eha={eha}></HeadBottom>
    </div>
}

export const HeadFunction = (menu, setStatus, VALUEMENU) => {
    if (menu.url) {
        setStatus(d => ({ ...d, headHidden: true, loading: false }))

        setTimeout(() => {
            setStatus(d => ({ ...d, loading: true }))
            let height

            if (VALUEMENU.data > 150) {
                height = VALUEMENU.data - 55
            } else {
                height = VALUEMENU.data + 15
            }
            window.api.invoke('routesItem', {
                url: menu.url,
                size: {
                    y: height,
                    width: window.outerWidth,
                    height: window.outerHeight - height
                }
            })
        }, 50);

    } else {
        setStatus(d => ({ ...d, headHidden: false, loading: false }))
        window.api.invoke('routesItem', {
            url: null,
            size: {
                y: 0,
                width: 0,
                height: 0
            }
        })
    }
}

const HeadTop = ({ eha }) => {
    const { setStatus, value } = GetAndUpdateContext()
    const [show, setShow] = useState(false);
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const Menu = MENUDATA
    let menuIndex = Menu.findIndex(d => d.key === pathname)
    let VALUEMENU = value.VALUEMENU
    const onPrev = () => {
        if (menuIndex > 0) {
            let menu = Menu[menuIndex - 1]
            navigate(menu.key)
            HeadFunction(menu, setStatus, VALUEMENU)
        }
    }

    const onNext = () => {
        if (Menu.length !== menuIndex) {
            let menu = Menu[menuIndex + 1]
            navigate(menu.key)
            HeadFunction(menu, setStatus, VALUEMENU)
        }
    }

    return (
        <div className="grid grid-cols-11 gap-1 border-t border-t-border_primary border-b border-b-border_second">
            <div className="col-span-3 flex items-center gap-5 relative pr-4">
                <div className="flex gap-[1px] menu-prev">
                    <Tooltip placement="bottom" title="Previous Pages">
                        <button className={`w-[72px] h-[43px] flex items-center justify-center ${menuIndex === 0 ? "bg-opacity-50 cursor-no-drop" : "hover:bg-[#fff]"} bg-primary `} onClick={onPrev}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825L13.425 18.6L12 20Z" fill="#101C26" />
                                <path d="M12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825L13.425 18.6L12 20Z" fill="#111D27" />
                            </svg>
                        </button>
                    </Tooltip>
                    <Tooltip placement="bottom" title="Next Pages">
                        <button className={`w-[72px] h-[43px] flex items-center justify-center  bg-primary ${menuIndex === Menu.length ? "bg-opacity-50 cursor-no-drop" : "hover:bg-[#fff]"}`} onClick={
                            onNext
                        }>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 20L20 12L12 4L10.575 5.4L16.175 11H4V13H16.175L10.575 18.6L12 20Z" fill="#101C26" />
                                <path d="M12 20L20 12L12 4L10.575 5.4L16.175 11H4V13H16.175L10.575 18.6L12 20Z" fill="#101C26" />
                            </svg>
                        </button>
                    </Tooltip>
                </div>
                <div className="text-ellipsis overflow-hidden title-page">
                    <span className="text-[24px]"> {menuIndex !== -1 && ` ${('0' + (menuIndex + 1)).slice(-2)} // ${Menu[menuIndex].label}`}</span>
                </div>
                <LineBorderRight />
            </div>
            <div className="col-span-5 p-1">
                {!eha && <div className="w-full py-2 px-4 bg-primary h-full flex items-center gap-16">
                    <div> SYSTEM HEALTH INDICATOR</div>
                    <div className="flex items-center gap-14 flex-1">
                        <div className="flex items-center gap-2">
                            <div className="h-[13px] w-[13px] bg-[#666666]"></div>
                            <span className="text-[16px] top-[1px] relative">NORMAL</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-[13px] w-[13px] bg-blue"></div>
                            <span className="font-bold  text-[16px] top-[1px] relative">SECURE</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-[13px] w-[13px] bg-[#614A11]"></div>
                            <span className="text-[16px] top-[1px] relative">ATTENTION</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-[13px] w-[13px] bg-[#682E29]"></div>
                            <span className="text-[16px] top-[1px] relative">RED-CODE</span>
                        </div>
                    </div>
                </div>}

            </div>
            <div className="col-span-3 pr-4 relative pl-4">
                <div className="grid gap-2 grid-cols-2 h-full items-center">
                    <div className="text-[24px]">PROTECTION DURATION</div>
                    <div className="h-full items-center relative justify-center flex pregress-license" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
                        <div className="w-full bg-[#152A36] text-border_primary font-bold">
                            <div className={`bg-blue h-full px-3 w-1/2 relative  ${show ? "" : "h-3"}`}>
                                {show && <span>Expired: 100 Days</span>}
                            </div>
                        </div>
                    </div>
                </div>
                <LineBorderLeft />
            </div>
        </div>
    )
}
const HeadBottom = ({ eha }) => {
    const { status, setStatus } = GetAndUpdateContext()

    const [ping, setping] = useState([]);
    const [pingCount, setpingCount] = useState(0);
    const [timeOut, settimeOut] = useState(0);
    const [isTime, setisTime] = useState(true);


    var incomeTicker = 10;

    useEffect(() => {
        let pmnd = setInterval(() => {
            if (pingCount === "error") {
                if (incomeTicker > 0) {
                    incomeTicker--;
                    settimeOut(incomeTicker)
                    setisTime(true)
                }
                if (incomeTicker <= 0) {
                    incomeTicker = 10
                    setisTime(false)
                }
            } else {
                clearInterval(pmnd)
            }
        }, 1000);

        return () => {
            settimeOut(0)
            clearInterval(pmnd)
            setisTime(true)

        };
    }, [pingCount]);


    useEffect(() => {
        let int = setInterval(() => {
            if (isTime) {
                window.api.invoke('ping-window').then(d => {
                    if (d.alive) {
                        let data = parseInt(d.avg)
                        setpingCount(data)
                        setping(d => ([...d, data]))
                    } else {
                        setping([])
                        setpingCount("error")
                        clearInterval(int)
                    }
                })
            }
        }, 1000);

        window.api.invoke('ping-window').then(d => {

            setStatus(s => ({
                ...s,
                STATUSPING: d.alive
            }))
        })

        return () => {
            setping([])
            setpingCount(0)
            clearInterval(int)
        };
    }, [isTime]);


    return (!status.headHidden ?
        <div className="grid grid-cols-11 gap-1">
            <div className="col-span-3 flex items-center gap-5 relative px-7">
                <div>
                    <div>PING</div>
                    <div className="text-[24px]">{pingCount} <span className="text-[11px]">MS</span></div>
                </div>
                <div className="p-1 flex-[0.90] relative h-full flex items-center justify-center">
                    <LineNoLabel ping={ping} />
                    {pingCount === "error" || pingCount === 0 ? <div className="absolute w-full h-full flex items-center justify-center left-0 top-0 z-20"> {pingCount === 0 ? "RECONNECT" : `TIME OUT ${timeOut}s`}</div> : ""}
                </div>
                <div style={{
                    lineHeight: 1.2
                }}>
                    <div>HIGH <span>150++</span></div>
                    <div>AVG <span>30-120</span></div>
                    <div>LOW <span>1-30</span></div>
                </div>
                <LineBorderLeft className="ml-[11px]" />
                <LineBorderRight />
            </div>
            {eha && <MenuEha></MenuEha>}
            {!eha && <>
                <div className="col-span-5 p-1">
                    <div className="relative flex items-center justify-center h-full">

                        <img src={Banner} className="w-full"></img>
                        <div className="absolute w-full h-full left-0 top-0 items-center flex justify-center text-[48px] text-border_primary font-bold">
                            SYSTEM SECURE
                        </div>
                    </div>
                </div>
                <div className="col-span-3 pr-4 relative pl-4">
                    <div className="h-full w-full flex items-center gap-3">
                        <div className="border border-primary p-2 relative switch-item">
                            <SquareMedium></SquareMedium>
                            <SwitchCustom></SwitchCustom>
                        </div>
                        <div>
                            <div className="space-x-2 font-bold">
                                <span className="border-r border-l px-1">ON</span>
                                <span>SOAR MODE</span>
                            </div>
                            <div className="space-x-2">
                                <span className="border-r border-l px-1">OFF </span>
                                <span>SIEM MODE</span>
                            </div>
                        </div>
                    </div>
                    <LineBorderLeft />
                </div>
            </>}

        </div> : ""
    )
}