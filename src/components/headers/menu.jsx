import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { useNavigate } from "react-router-dom";
import { MENUDATA } from '../../model/information';
import { HeadFunction } from './head';
import { GetAndUpdateContext } from '../../model/context.function';

const MenuItems = () => {
    const { setStatus, value } = GetAndUpdateContext()
    const [menu, setMenu] = useState(MENUDATA)

    const VALUEMENU = value.VALUEMENU

    useEffect(() => {

        if (document.body.getAttribute("key")) {
            let keys = document.body.getAttribute("key")
            let menuKey = MENUDATA.findIndex(a => a.key === keys)
            setMenu([MENUDATA[menuKey]])
        }
    }, [])

    const navi = useNavigate()
    const onClick = (e) => {
        let menuKey = MENUDATA.findIndex(a => a.key === e.key)
        let menu = MENUDATA[menuKey]

        HeadFunction(menu, setStatus, VALUEMENU)

        navi(e.key, { state: { title: menu.label, menuUrl: menu.url, eha: menu.label === "EHA" ? true : false } })
    };

    let linkeha = window.location.hash.replace("#", "").split("/")[1]
    let linkurl = linkeha === "eha" ? `/${linkeha}` : window.location.hash.replace("#", "")

    return <Menu style={{
        background: "transparent"
    }} onClick={onClick} className="h-full flex items-center font-normal justify-end" selectedKeys={[linkurl]} mode="horizontal" items={menu} />;
};
export default MenuItems;