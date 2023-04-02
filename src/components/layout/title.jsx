import { Tooltip } from "antd"
import { useCallback } from "react";
import { LineBorderTopBottom } from "../decoration/line.border"
import { GetAndUpdateContext } from "../../model/context.function";
export const TitleContent = ({ className, noBorder, children, date = "24H", subTitle = "A-1", search, maximizeItem, statusMinimize, searchType, showSearch = false, time, customButton }) => {
    const { setmaximize } = GetAndUpdateContext()

    let updateMaximize = useCallback(
        () => {
            setmaximize(d => ({ ...d, [maximizeItem]: !d[maximizeItem] }))
            window.api.invoke('message-close') 
        },
        [],
    )

    let updateSaerch = useCallback(
        () => {
            switch (searchType) {
                case "searchAlertType":
                    setmaximize(d => ({ ...d, SEARCHALERTSHOW: !d.SEARCHALERTSHOW }))
                    break;
                default:
                    break;
            }
        },
        [],
    )

    return <div className={`${className ? className : "pt-4"}`}>
        <div className={`relative w-full h-full p-4 flex justify-between items-center text-blue`}>
            {children}
            <div className="flex gap-3 items-center">
                {search && <Tooltip title="Search">
                    <button onClick={updateSaerch}>
                        <svg width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="27" height="25" stroke="#00D8FF" strokeOpacity="0.5" />
                            <path d="M18.2708 15.0833H17.6454L17.4238 14.8696C18.2264 13.9386 18.6675 12.7501 18.6667 11.5208C18.6667 10.5031 18.3649 9.50819 17.7994 8.66196C17.234 7.81574 16.4303 7.15618 15.4901 6.76671C14.5498 6.37723 13.5151 6.27532 12.5169 6.47388C11.5187 6.67243 10.6018 7.16252 9.88218 7.88218C9.16252 8.60184 8.67243 9.51874 8.47388 10.5169C8.27532 11.5151 8.37723 12.5498 8.76671 13.4901C9.15618 14.4303 9.81574 15.234 10.662 15.7994C11.5082 16.3649 12.5031 16.6667 13.5208 16.6667C14.7954 16.6667 15.9671 16.1996 16.8696 15.4238L17.0833 15.6454V16.2708L21.0417 20.2213L22.2213 19.0417L18.2708 15.0833ZM13.5208 15.0833C11.5496 15.0833 9.95834 13.4921 9.95834 11.5208C9.95834 9.54959 11.5496 7.95834 13.5208 7.95834C15.4921 7.95834 17.0833 9.54959 17.0833 11.5208C17.0833 13.4921 15.4921 15.0833 13.5208 15.0833Z" fill="#00D8FF" />
                        </svg>
                    </button>
                </Tooltip>}
                {showSearch && <div className="absolute w-full left-0  z-10 flex justify-between gap-3 backdrop-blur-xl px-4">
                    <input className="bg-border_primary border border-blue indent-2 text-blue w-full" placeholder="Search"></input>
                    <Tooltip title="Exit Search">
                        <button className="p-2 bg-primary" onClick={updateSaerch}>
                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 12.5L12 1" stroke="#ED6A5E" />
                                <path d="M12 12.5L0.5 1" stroke="#ED6A5E" />
                            </svg>
                        </button>
                    </Tooltip>
                </div>}
                {time &&
                    <Tooltip title="Time">
                        <div className=" px-2 bg-blue text-border_primary font-bold timer">
                            {date}
                        </div>
                    </Tooltip>
                }
                {maximizeItem && <Tooltip title={!statusMinimize ? "Exit Maximize" : "Maximize"}>
                    <button onClick={updateMaximize}>
                        {statusMinimize ? <svg className="rotate-180" width="24" height="17" viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="23" height="16" fill="#101C26" stroke="#00D8FF" />
                            <path d="M7 6L17 6L12 11L7 6Z" fill="#00D8FF" />
                        </svg> : <svg width="24" height="17" viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="17" fill="white" />
                            <path d="M7 6L17 6L12 11L7 6Z" fill="#101C26" />
                        </svg>
                        }

                    </button>
                </Tooltip>}
                {customButton}
                <div className="text-[24px]">
                    {subTitle}
                </div>
            </div>
            {!noBorder && <LineBorderTopBottom />}
        </div>
    </div>
}