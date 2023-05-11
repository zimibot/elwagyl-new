import { NavLink, useMatch, useResolvedPath } from "react-router-dom"
import { Dropdown } from 'antd';
import { DownOutlined, FileProtectOutlined } from "@ant-design/icons";
import { useState } from "react";


const NavPage = ({ to, title, dropdown, noTop, icons = () => { }, ...param }) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });
    let matchUrl = match?.pathname === to
    return <NavLink state={{ title: `10 // eha // ${title}`, eha: true }} to={to} {...param}>

        <div className="flex items-center gap-4">
            {icons({ match: matchUrl })}
            <div className="relative" style={{
                top: !noTop && 2
            }}>{title}</div>

        </div>
        {dropdown &&
            <div className="text-[14px]">
                <DownOutlined></DownOutlined>
            </div>
        }

    </NavLink>
}



export const MenuEha = () => {
    const [open, setopen] = useState(false);
    const handleOpenChange = (flag) => {
        setopen(flag);
    };
    const handleMenuClick = (d) => {
        setopen(true);
    };
    const items = [
        {
            label: <NavPage
                to={"/eha/task/qc"}
                title=" quality control"
                noTop
                icons={({ match }) => {
                    return <FileProtectOutlined />
                }}
                className={({ isActive }) =>
                    isActive ? 'py-3 px-4 flex items-center gap-4 text-[18px] uppercase bg-blue !text-primary font-bold' : 'py-3 px-4 flex items-center gap-4 text-[18px] uppercase '
                }></NavPage>,
            key: '0',
        },
        {
            label: <NavPage
                to={"/eha/task/target"}
                title="targets ready for qa"
                noTop
                icons={({ match }) => {
                    return <FileProtectOutlined />
                }}
                className={({ isActive }) =>
                    isActive ? 'py-3 px-4 flex items-center gap-4 text-[18px] uppercase bg-blue !text-primary font-bold' : 'py-3 px-4 flex items-center gap-4 text-[18px] uppercase '
                }></NavPage>,
            key: '1',
        },

    ];

    return <div className="w-full col-span-8 p-2">
        <div className="grid grid-cols-6 gap-3">
            <NavPage
                to={"/eha/home"}
                title="Main Deck"
                icons={({ match }) => {
                    return <svg width="20" height="20" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 17V11H12V17H17V9H20L10 0L0 9H3V17H8Z" fill={!match ? '#00D8FF' : '#152A36'} />
                    </svg>
                }}
                className={({ isActive }) =>
                    isActive ? 'py-4 px-5 flex items-center gap-4 text-[18px] uppercase bg-blue text-primary font-bold' : 'py-4 px-5 flex items-center gap-4 text-[18px] uppercase bg-primary'
                }></NavPage>
            <NavPage
                to={"/eha/profile-indicator"}
                title="PROFILE INDICATOR"
                icons={({ match }) => {
                    return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.14 10.94C17.18 10.64 17.2 10.33 17.2 10C17.2 9.68003 17.18 9.36003 17.13 9.06003L19.16 7.48003C19.2474 7.40793 19.3072 7.30772 19.3291 7.19649C19.351 7.08527 19.3336 6.96989 19.28 6.87003L17.36 3.55003C17.3034 3.44959 17.2132 3.3724 17.1052 3.33214C16.9972 3.29187 16.8785 3.29112 16.77 3.33003L14.38 4.29003C13.88 3.91003 13.35 3.59003 12.76 3.35003L12.4 0.810027C12.3823 0.695557 12.3241 0.591234 12.236 0.516003C12.1479 0.440772 12.0358 0.399623 11.92 0.400027H8.07996C7.83996 0.400027 7.64996 0.570027 7.60996 0.810027L7.24996 3.35003C6.65996 3.59003 6.11996 3.92003 5.62996 4.29003L3.23996 3.33003C3.01996 3.25003 2.76996 3.33003 2.64996 3.55003L0.739964 6.87003C0.619964 7.08003 0.659964 7.34003 0.859964 7.48003L2.88996 9.06003C2.83996 9.36003 2.79996 9.69003 2.79996 10C2.79996 10.31 2.81996 10.64 2.86996 10.94L0.839964 12.52C0.752488 12.5921 0.692718 12.6923 0.670837 12.8036C0.648955 12.9148 0.666317 13.0302 0.719964 13.13L2.63996 16.45C2.75996 16.67 3.00996 16.74 3.22996 16.67L5.61996 15.71C6.11996 16.09 6.64996 16.41 7.23996 16.65L7.59996 19.19C7.64996 19.43 7.83996 19.6 8.07996 19.6H11.92C12.16 19.6 12.36 19.43 12.39 19.19L12.75 16.65C13.34 16.41 13.88 16.09 14.37 15.71L16.76 16.67C16.98 16.75 17.23 16.67 17.35 16.45L19.27 13.13C19.39 12.91 19.34 12.66 19.15 12.52L17.14 10.94ZM9.99996 13.6C8.01996 13.6 6.39996 11.98 6.39996 10C6.39996 8.02003 8.01996 6.40003 9.99996 6.40003C11.98 6.40003 13.6 8.02003 13.6 10C13.6 11.98 11.98 13.6 9.99996 13.6Z" fill={!match ? '#00D8FF' : '#152A36'} />
                    </svg>

                }}
                className={({ isActive }) =>
                    isActive ? 'py-4 px-5 flex items-center gap-4 text-[18px] uppercase bg-blue text-primary font-bold' : 'py-4 px-5 flex items-center gap-4 text-[18px] uppercase bg-primary'
                }></NavPage>
            <NavPage
                to={"/eha/assets"}
                title="ASSET"
                icons={({ match }) => {
                    return <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 0L0 4V10C0 15.55 3.84 20.74 9 22C14.16 20.74 18 15.55 18 10V4L9 0Z" fill={!match ? '#00D8FF' : '#152A36'} />
                    </svg>
                }}
                className={({ isActive }) =>
                    isActive ? 'py-4 px-5 flex items-center gap-4 text-[18px] uppercase bg-blue text-primary font-bold' : 'py-4 px-5 flex items-center gap-4 text-[18px] uppercase bg-primary'
                }></NavPage>
            <Dropdown
                rootClassName="custom-dropdown"
                menu={{
                    items,
                    onClick: handleMenuClick,
                }}
                open={open}
                arrow={true}
                onOpenChange={handleOpenChange}
                trigger={['click']}
            >
                <div>
                    <NavPage
                        to={"/eha/task/scan"}
                        title="SCAN"
                        // dropdown
                        icons={({ match }) => {
                            return <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 3.18L8.59 14.6L4.35 10.36L5.76 8.95L8.59 11.78L18.59 1.78L20 3.18ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C11.57 2 13.04 2.46 14.28 3.25L15.73 1.8C14.049 0.628213 12.0491 -1.60602e-05 10 3.07927e-10C4.48 3.07927e-10 0 4.48 0 10C0 15.52 4.48 20 10 20C11.73 20 13.36 19.56 14.78 18.78L13.28 17.28C12.28 17.74 11.17 18 10 18ZM17 13H14V15H17V18H19V15H22V13H19V10H17V13Z" fill={!match ? '#00D8FF' : '#152A36'} />
                            </svg>
                        }}
                        className={({ isActive }) =>
                            isActive ? 'py-4 px-5 w-full justify-between flex items-center gap-4 text-[18px] uppercase bg-blue text-primary font-bold' : 'py-4 px-5 w-full justify-between flex items-center gap-4 text-[18px] uppercase bg-primary'
                        }></NavPage>
                </div>
            </Dropdown>



            <NavPage
                to={"/eha/vulnerability"}
                title="VULNERABILITY"
                icons={({ match }) => {
                    return <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 5H13.19C12.739 4.21774 12.1168 3.54767 11.37 3.04L13 1.41L11.59 0L9.42 2.17C8.96 2.06 8.49 2 8 2C7.51 2 7.04 2.06 6.59 2.17L4.41 0L3 1.41L4.62 3.04C3.88 3.55 3.26 4.22 2.81 5H0V7H2.09C2.04 7.33 2 7.66 2 8V9H0V11H2V12C2 12.34 2.04 12.67 2.09 13H0V15H2.81C3.85 16.79 5.78 18 8 18C10.22 18 12.15 16.79 13.19 15H16V13H13.91C13.96 12.67 14 12.34 14 12V11H16V9H14V8C14 7.66 13.96 7.33 13.91 7H16V5ZM10 13H6V11H10V13ZM10 9H6V7H10V9Z" fill={!match ? '#00D8FF' : '#152A36'} />
                    </svg>
                }}
                className={({ isActive }) =>
                    isActive ? 'py-4 px-5 flex items-center gap-4 text-[18px] uppercase bg-blue text-primary font-bold' : 'py-4 px-5 flex items-center gap-4 text-[18px] uppercase bg-primary'
                }></NavPage>
            <NavPage
                to={"/eha/maintenance"}
                title="MAINTENANCE"
                icons={({ match }) => {
                    return <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.0298 2.55999C16.3598 1.16999 14.2898 0.259988 11.9998 0.0499878V2.05999C13.7298 2.24999 15.3098 2.93999 16.6098 3.97999L18.0298 2.55999ZM9.9998 2.05999V0.0499878C7.7098 0.249988 5.6398 1.16999 3.9698 2.55999L5.3898 3.97999C6.71255 2.9145 8.31179 2.24844 9.9998 2.05999ZM3.9798 5.38999L2.5598 3.96999C1.1698 5.63999 0.259805 7.70999 0.0498047 9.99999H2.0598C2.2498 8.26999 2.9398 6.68999 3.9798 5.38999ZM19.9398 9.99999H21.9498C21.7398 7.70999 20.8298 5.63999 19.4398 3.96999L18.0198 5.38999C19.0853 6.71274 19.7513 8.31197 19.9398 9.99999ZM5.9998 11L9.4398 12.56L10.9998 16L12.5598 12.56L15.9998 11L12.5598 9.43999L10.9998 5.99999L9.4398 9.43999L5.9998 11Z" fill={!match ? '#00D8FF' : '#152A36'} />
                        <path d="M11 20C9.5232 19.9997 8.06937 19.6343 6.76786 18.9365C5.46635 18.2386 4.35751 17.2299 3.54 16H6V14H0V20H2V17.3C3.99 20.14 7.27 22 11 22C15.87 22 20 18.83 21.44 14.44L19.48 13.99C18.25 17.48 14.92 20 11 20Z" fill={!match ? '#00D8FF' : '#152A36'} />
                    </svg>
                }}
                className={({ isActive }) =>
                    isActive ? 'py-4 px-5 flex items-center gap-4 text-[18px] uppercase bg-blue text-primary font-bold' : 'py-4 px-5 flex items-center gap-4 text-[18px] uppercase bg-primary'
                }></NavPage>
        </div>
    </div>
}