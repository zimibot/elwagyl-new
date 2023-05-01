import { MailFilled } from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const MainMenu = styled(Menu)`
    background: transparent;

 .ant-menu-item-selected {
    background: #0B5567;
    border-radius: 0;
}
 .ant-menu-item {
    font-size: 16px;
    text-transform: uppercase;
    height: 65px;
    margin: 0;
    width: 100%;
    border-bottom: 2px solid #101C26;
    border-radius: 0px;
 }
`

export const SidebarMenu = () => {
    let right = <svg width="5" className="relative right-[-1px]" height="19" viewBox="0 0 3 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 3L3 0V19L0 16V3Z" fill="#101C26" />
    </svg>;
    let left = <svg width="5" className="relative left-[-1px]" height="19" viewBox="0 0 3 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3L0 0V19L3 16V3Z" fill="#101C26" />
    </svg>

    const items = [
        {
            label: <>
                <div className="absolute w-full h-full items-center flex justify-between top-0 left-0">
                    {left}
                    {right}
                </div>
                <div>USER MANAGEMENT</div>
            </>,
            key: 'user management',
        },
        {
            label: <>
                <div className="absolute w-full h-full items-center flex justify-between top-0 left-0 ">
                    {left}
                    {right}
                </div>
                <div>SETTINGS</div>
            </>,
            key: 'settings',
        },

    ];

    let navi = useNavigate()
    let locations = useLocation().state
    const onClick = (e) => {
        console.log('click ', e);
        navi(`/ums/${e.key}`, { state: {title: `UMS // ${e.key}`, key: e.key, ums: true } })
    };
    return <div className="bg-primary">
        <MainMenu rootClassName="text-blue" style={{ width: 256 }} onClick={onClick} selectedKeys={[locations?.key]} theme="dark" mode="inline" items={items} />
    </div>
}