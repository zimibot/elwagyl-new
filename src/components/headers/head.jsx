
import { useEffect, useState } from "react"
import { LineBorderLeft, LineBorderRight } from "../decoration/line.border";
import { ReactSVG } from 'react-svg'
import Banner from "../../assets/images/banner.svg";
import { LineNoLabel } from "../chart/line.no.label";
import { SquareMedium } from "../decoration/square";
import { SwitchCustom } from "../form.input";
import { MENUDATA } from "../../model/information";
import { useLocation, useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
import { GetAndUpdateContext } from "../../model/context.function";
import { MenuEha } from "../../components.eha/menu";
import { API_GET, path } from "../../api";

export const Heads = () => {

    return <div className="w-full border-t border-t-border_primary border-b border-b-border_second text-blue mx-auto z-50 ">
        <HeadTop></HeadTop>
        <HeadBottom></HeadBottom>
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

const HeadTop = () => {
    const { setStatus, value } = GetAndUpdateContext()
    const [show, setShow] = useState(false);
    const { pathname, state } = useLocation()
    const navigate = useNavigate()
    const Menu = MENUDATA
    let menuIndex = Menu.findIndex(d => d.key === pathname)
    let VALUEMENU = value.VALUEMENU
    let API_SEVERITY = API_GET.ALERT_SEVERITY()
    let location = useLocation().state
    const onPrev = () => {
        if (menuIndex > 0) {
            let menu = Menu[menuIndex - 1]
            navigate(menu.key, { state: { title: menu.label } })
            HeadFunction(menu, setStatus, VALUEMENU)
        }
    }

    const onNext = () => {
        if (Menu.length !== menuIndex) {
            let menu = Menu[menuIndex + 1]
            navigate(menu.key, { state: { title: menu.label } })
            HeadFunction(menu, setStatus, VALUEMENU)
        }
    }

    let param = API_SEVERITY.error ? "ERROR" : API_SEVERITY.isLoading ? "" : API_SEVERITY.system.name
    let color = API_SEVERITY.error ? "ERROR" : API_SEVERITY.isLoading ? "" : API_SEVERITY.system.color

    return (
        <div className="grid grid-cols-11 gap-1 border-t border-t-border_primary border-b border-b-border_second">
            <div className={` ${location?.ums ? "col-span-8" : "col-span-3"} flex items-center gap-5 relative pr-4`}>
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
                    <span className="text-[24px] uppercase text-blue"> {menuIndex !== -1 ? ` ${('0' + (menuIndex + 1)).slice(-2)} // ${Menu[menuIndex].label}` : state?.title}</span>
                </div>
                {!location?.ums && <LineBorderRight />}
                
            </div>
            <div className={location?.ums ? "hidden"  :"col-span-5 p-1"}>
                {!location?.eha && !location?.ums && <div className="w-full py-2 px-4 bg-primary h-full flex items-center gap-16">
                    <div> SYSTEM HEALTH INDICATOR</div>
                    <div className="flex items-center gap-14 flex-1">

                        <div className="flex items-center gap-2">
                            <div className="h-[13px] w-[13px] bg-[#666666]"></div>
                            <span className="text-[16px] top-[1px] relative">NORMAL</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className={`h-[13px] w-[13px] bg-blue ${param === "low" ? "" : "bg-opacity-60"} `}></div>
                            <span className={` ${param === "low" ? "font-bold" : ""}  text-[16px] top-[1px] relative`}>SECURE</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-[13px] w-[13px] bg-[#614A11]" style={{
                                backgroundColor: param === "medium" ? color : ""
                            }}></div>
                            <span className={` ${param === "medium" ? "font-bold" : ""}  text-[16px] top-[1px] relative`}>ATTENTION</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-[13px] w-[13px] bg-[#682E29]" style={{
                                backgroundColor: param === "high" ? color : ""
                            }}></div>
                            <span className={` ${param === "high" ? "font-bold" : ""}  text-[16px] top-[1px] relative`}>RED-CODE</span>
                        </div>
                    </div>
                </div>}

            </div>
            <div className="col-span-3 pr-4 relative pl-4">
                <div className="grid gap-2 grid-cols-2 h-full items-center">
                    <div className="text-[24px]">PROTECTION DURATION</div>
                    <div className="h-full items-center relative justify-center flex pregress-license" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
                        <div className="w-full bg-primary text-border_primary font-bold">
                            <div className={`bg-blue h-full px-3 w-1/2 relative  ${show ? "" : "h-3"}`}>
                                {show && <span>Expired: 100 Days</span>}
                            </div>
                        </div>
                    </div>
                </div>
                {!location?.ums && <LineBorderLeft />}

                
            </div>
        </div>
    )
}
const HeadBottom = () => {
    const { status, setvalue } = GetAndUpdateContext()
    let API_SEVERITY = API_GET.ALERT_SEVERITY()
    const param = API_SEVERITY.error ? "ERROR" : API_SEVERITY.isLoading ? "" : API_SEVERITY.system.name
    const indicator = param === "high" ? "RED-CODE" : param === "medium" ? "ATTENTION" : param === "low" ? "SECURE" : "NORMAL"
    const [ping, setping] = useState([]);
    const [pingCount, setpingCount] = useState(0);
    const [timeOut, settimeOut] = useState(0);
    const [isTime, setisTime] = useState(true);
    const [isSwitch, setisSwitch] = useState({
        soar: "off",
        siem: "on",
        status: true
    });

    let location = useLocation().state


    var incomeTicker = 10;

    const PING_API = API_GET.API_PING()


    useEffect(() => {
        let pmnd = setInterval(() => {
            if (pingCount === "error" || pingCount > 600) {
                setisTime(false)
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
                setisTime(true)
            }
        }, 800);

        return () => {
            settimeOut(0)
            clearInterval(pmnd)
            setisTime(true)

        };
    }, [pingCount]);


    useEffect(() => {
        let ip = import.meta.env.VITE_CURRENT_IP
        let int = setInterval(() => {
            if (isTime) {
                window.api.invoke('ping-window', ip).then(d => {
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


        return () => {
            setping([])
            setpingCount(0)
            clearInterval(int)
        };
    }, [isTime]);

    let onSwitch = (d) => {

        if (d) {
            setisSwitch({
                soar: "off",
                siem: "on",
                status: d
            })
            setvalue(d => ({
                ...d,
                APIURLDEFAULT: {
                    ip: path,
                    timeType: "time_range"
                }
            }))
        } else {
            setisSwitch({
                soar: "on",
                siem: "off",
                status: d
            })
            setvalue(d => ({
                ...d,
                APIURLDEFAULT: {
                    ip: `${path}/xsoar`,
                    timeType: "time_range"
                }
            }))
        }
    }


    return (!status.headHidden ?
        <div className="grid grid-cols-11 gap-1 ">
            {!location?.ums && <div className="col-span-3 flex items-center gap-5 relative px-7 py-2">
                <div>
                    <div>PING</div>
                    <div className="text-[24px]">{pingCount} <span className="text-[11px]">MS</span></div>
                </div>
                <div className="p-1 flex-[0.90] relative h-full flex items-center justify-center">
                    <LineNoLabel ping={ping} />
                    {pingCount === "error" || pingCount === 0 ? <div className="absolute w-full h-full flex items-center justify-center left-0 top-0 z-20"> {pingCount === 0 ? "CONNECTED" : `RECONNECT ${timeOut}s`}</div> : ""}
                </div>
                <div style={{
                    lineHeight: 1.2
                }}>
                    <div className="text-red-400">HIGH <span>200++</span></div>
                    <div className="text-yellow-400">MEDIUM <span>100-200</span></div>
                    <div>LOW <span>3-100</span></div>
                </div>
                <LineBorderLeft className="ml-[11px]" />
                <LineBorderRight />
            </div>}

            {location?.eha && <MenuEha></MenuEha>}
            {!location?.eha && !location?.ums && <>
                <div className="col-span-5 p-1">
                    <div className="relative flex items-center justify-center h-full">
                        <ReactSVG src={Banner} className="banner" />
                        <div className="absolute w-full h-full left-0 top-0 items-center flex justify-center text-[48px] text-border_primary font-bold">
                            SYSTEM {indicator}
                        </div>
                    </div>
                </div>
                <div className="col-span-3 pr-4 relative pl-4">
                    <div className="h-full w-full flex items-center gap-3">
                        <div className="border border-primary p-2 relative switch-item">
                            <SquareMedium></SquareMedium>
                            <SwitchCustom onChange={onSwitch}></SwitchCustom>
                        </div>
                        <div>

                            <div className={`space-x-2 ${isSwitch.status ? "" : "font-bold"}`}>
                                <span className="border-r border-l border-primary px-1 uppercase">{isSwitch.soar}</span>
                                <span>SOAR MODE</span>
                            </div>
                            <div className={`space-x-2 ${isSwitch.status ? "font-bold" : ""}`}>
                                <span className="border-r border-l border-primary px-1 uppercase">{isSwitch.siem}</span>
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