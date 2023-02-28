import { Drawer, Tooltip } from "antd";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import Logo from "../../assets/images/full.logo.svg";
import { GetAndUpdateContext } from "../../model/context.function";
import { TitleContent } from "../layout/title";
import { Heads } from "./head";
import MenuItems from "./menu";
import { TabItem } from "./tab.item";

export const HeadersTop = ({ eha, background }) => {
    const { maximize, setmaximize, setvalue, status } = GetAndUpdateContext()
    const refMenu = useRef(null)
    let date = moment().format("DD/MM/YY")
    const [time, settime] = useState();

    useEffect(() => {

        const timers = () => {
            let ml = moment().format("HH:mm:ss")
            settime(ml)
        }

        timers()

        let int = setInterval(timers, 1000);

        return () => {
            clearInterval(int)
            settime()
        };
    }, []);
    useEffect(() => {
        let current = refMenu.current
        if (current) {
            let data = current.clientHeight
            setvalue(d => ({
                ...d, VALUEMENU: {
                    ...d.VALUEMENU,
                    data
                }
            }))
        } else {
            setvalue(d => ({
                ...d, VALUEMENU: null
            }))
        }
        return () => {
            setvalue(d => ({
                ...d, VALUEMENU: null
            }))
        };
    }, [status.loading]);
    return <>
        <div ref={refMenu} className="z-20" style={{
            background
        }}>
            <div className="bg-primary border-t border-t-border_primary flex z-20 relative" >
                <div className="w-full px-4 flex justify-between items-center max-w-[2500px] mx-auto">
                    <div className="pr-4">
                        <img src={Logo}></img>
                    </div>
                    <div className="flex-auto h-20 relative flex main-menu">
                        <div className="absolute w-full h-full">
                            <MenuItems />
                        </div>
                    </div>
                    <div className="flex justify-start flex-[0.235] h-full border-l border-l-border_primary items-center">
                        <div className="h-full min-w-[70px] flex items-center justify-center px-1 border-r border-r-border_primary relative">
                            <Tooltip title="MESSAGES">
                                <button className="alert-notif w-full h-full items-center justify-center flex  border-b-[6px] border-border_primary" onClick={() => {
                                    setmaximize(d => ({ ...d, MESSAGES: !d.MESSAGES }))
                                }}>
                                    <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 12H10V7H12M12 16H10V14H12M0 19H22L11 0L0 19Z" fill="#00D8FF" />
                                    </svg>
                                </button>
                            </Tooltip>
                            <div className="absolute left-[-3px]">
                                <svg width="6" height="19" viewBox="0 0 6 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 3L3 0V19L0 16V3Z" fill="#101C26" />
                                    <path d="M6 3L3 0V19L6 16V3Z" fill="#101C26" />
                                </svg>
                            </div>
                        </div>
                        <div className="h-full min-w-[70px] flex items-center justify-center px-1 border-r border-r-border_primary relative">
                            <button className="menu-setting w-full h-full items-center justify-center flex  border-b-[6px] border-border_primary">
                                <svg width="22" height="19" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 12H18V10H0V12ZM0 7H18V5H0V7ZM0 0V2H18V0H0Z" fill="#00D8FF" />
                                </svg>
                            </button>
                            <div className="absolute left-[-3px]">
                                <svg width="6" height="19" viewBox="0 0 6 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 3L3 0V19L0 16V3Z" fill="#101C26" />
                                    <path d="M6 3L3 0V19L6 16V3Z" fill="#101C26" />
                                </svg>
                            </div>
                        </div>
                        <div className="h-full w-full relative flex items-center">
                            <div className="absolute left-[-4px]">
                                <svg width="3" height="19" viewBox="0 0 3 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 3L3 0V19L0 16V3Z" fill="#101C26" />
                                </svg>
                            </div>
                            <div className="pl-4 py-4 w-full h-full">
                                <div className="bg-border_primary w-full h-full flex items-center p-2 gap-3 justify-between">
                                    {time &&
                                        <>
                                            <div className="text-[24px]">{time}</div>
                                            <div className="text-[24px]">{date}</div>
                                        </>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Heads eha={eha} />
        </div>
        <Drawer title={false} width={610} placement="right" onClose={() => {
            setmaximize(d => ({ ...d, MESSAGES: !d.MESSAGES }))
        }} closable={false} open={maximize.MESSAGES}>
            <TitleContent maximizeItem={"MESSAGES"} className={"pt-0"}>
                <div className="text-[24px] uppercase">MESSAGES</div>
            </TitleContent>
            <div className="flex-1 pt-4 ml-[-23px] mr-[-23px] flex flex-col">
                <TabItem></TabItem>
            </div>
        </Drawer>
    </>
}