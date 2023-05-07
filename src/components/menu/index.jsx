import { CloseOutlined, UserOutlined } from "@ant-design/icons"
import { NavLink } from "react-router-dom"
import styled from "styled-components"
import { GetAndUpdateContext } from "../../model/context.function"

const Button = styled.button`
    -webkit-app-region: no-drag;
`


export const MenuPopup = () => {
    return <div className="absolute w-full h-full flex flex-col uppercase">
        <div className="w-full p-4 bg-primary flex justify-between items-center" style={{
            "-webkit-user-select": "none",
            "-webkit-app-region": "drag",
        }}>
            <div>MENU SYSTEM</div>
            <Button className="text-red-500 menu-no-drag"><CloseOutlined></CloseOutlined></Button>
        </div>
        <div className="flex-1 flex items-center justify-center text-[20px] gap-3">
            <div className="text-[16px]"><UserOutlined></UserOutlined></div>
            <div>{window.localStorage.getItem("user")}</div>
        </div>
        <div className=" flex-1 border-t border-border_second flex justify-end flex-col">

            {MenuArray().map((d, k) => {

                return (<button onClick={() => {
                    if (d.click) {
                        d.click(d.label)
                    }
                }} key={k} className="border-b p-4 hover:bg-blue hover:text-black font-bold border-border_second w-full bg-primary text-left ">
                    {d.label}
                </button>)

            })}

            {/* <button className="border-b p-4 hover:bg-blue hover:text-black font-bold border-border_second w-full bg-primary text-left ">
                PROFILE
            </button>
            <NavLink onClick={() => {
                window.api.invoke('routesItem', {
                    url: null,
                    status: true,
                    size: {
                        y: 0,
                        width: 0,
                        height: 0
                    }
                })
            }} state={{ ums: true, title: "USER MANAGEMENT", key: "dashboard" }} to={"/ums/user management"} className="border-b p-4 hover:bg-blue hover:text-black font-bold border-border_second w-full bg-primary text-left ">
                USER MANAGEMENT
            </NavLink>
            <button className="border-b p-4 hover:bg-blue hover:text-black font-bold border-border_second w-full bg-primary text-left ">
                LOG OUT
            </button> */}
        </div>
    </div>
}

export const MenuArray = () => {

    const { setvalue, value } = GetAndUpdateContext()
    console.log(value)
    return [
        {
            label: "LICENSE",
            click: (d) => {

            }
        },
        {
            label: "PROFILE",
            click: (d) => {

            }
        },
        {
            label: "USER MENEGEMENT",
            click: (d) => {
                setvalue(s => ({
                    ...s,
                    MENUPOPUP: "wwwa"
                }))
            }
        },
        {
            label: "LOGOUT",
            click: (d) => {
                setvalue(s => ({
                    ...s,
                    MENUPOPUP: "asa"
                }))
            }
        },
    ]
}