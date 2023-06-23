import React from 'react';
import { Menu } from 'antd';
import { useNavigate } from "react-router-dom";
import { HeadFunction } from './head';
import { GetAndUpdateContext } from '../../model/context.function';
import { path } from '../../api/elwagyl';
import { MENUDATA } from '../../model/information';
import { merge } from 'radash';
import { useQuery } from 'react-query';

const MenuItems = () => {
    const { setStatus, value } = GetAndUpdateContext()


    const MenuData = getMenu()?.data

    let MenuItems = MenuData ? MenuData : []




    const navi = useNavigate()
    const onClick = (e) => {
        let data = MenuItems
        let menuKey = data.findIndex(a => a.key === e.key)
        data = MenuItems[menuKey]
        const VALUEMENU = value.VALUEMENU

        HeadFunction(data, setStatus, VALUEMENU)

        let ums = data.label === "UMS" ? {
            key: "dashboard", ums: true,
        } : {}

        navi(e.key, { state: { ...ums, title: data.label, menuUrl: data.url, eha: data.label === "E.H.A" ? true : false } })
    };

    let linkeha = window.location.hash.replace("#", "").split("/")[1]
    let linkurl = linkeha === "eha" ? `/${linkeha}` : window.location.hash.replace("#", "")

    return <Menu style={{
        background: "transparent"
    }} onClick={onClick} className="h-full flex items-center font-normal justify-end" selectedKeys={[linkurl]} mode="horizontal" items={MenuItems} />;
};
export default MenuItems;

export const getMenu = () => {

    const { isLoading, data, error, refetch, isFetching } = useQuery(['menu'], () => fetch(`${path}/users/me`, {
        method: "GET", headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    }).then(res => { return res.json() }),)

    if (error) {
        return {
            data: [],
        }
    }

    if (!isLoading) {
        let item = data.permissions.pages.find(d => d.group === "ELWAGYL")
        let pages = item.pages.map((d, k) => ({
            label: d.name,
            key: d.url,
            icon: <div className="absolute w-full h-full left-0 top-0">
                <div className="absolute top-0 block px-1 !text-lg left-0" style={{
                    color: "rgba(0, 216, 255, 0.3)"
                }}>0{k + 1}</div>
                <div className="absolute left-[-3px]">
                    <svg width="6" height="19" viewBox="0 0 6 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 3L3 0V19L0 16V3Z" fill="#101C26" />
                        <path d="M6 3L3 0V19L6 16V3Z" fill="#101C26" />
                    </svg>
                </div>

            </div>
        }))

        let mergs = merge(pages, MENUDATA, d => d.key)
        return {
            data: mergs,
            isFetching: isFetching,
            refetch,
            error,
            isLoading
        }
    } else {
        return null
    }



}