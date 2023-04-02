import { Collapse } from "antd"
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { LayoutDashboard } from "../../components/layout/dashboard.layout";
const { Panel } = Collapse;

const Link = ({ path, title, OtherPath }) => {
    return <NavLink
        className={"flex w-full h-full p-4 bg-primary  justify-center items-center hover:bg-opacity-70 "}
        to={`/ums/settings/${path}`}
        state={{
            title: `UMS // SETTINGS // ${OtherPath ? OtherPath : path}`,
            ums: true,
            key: "settings"
        }}>
        {title}
    </NavLink>
}

const Settings = () => {
    return <LayoutDashboard className="text-[16px]">
        <div className="col-span-full">
            <div className="grid grid-cols-4 p-4 gap-4">
                <div>
                    <Collapess defaultActiveKey={"1"}>
                        <Panel header="DASHBOARD" key="1">
                            <Link title={"OPEN MENU"} path="dashboard/ums_user" OtherPath={"DASHBOARD // USER"}></Link>
                        </Panel>
                    </Collapess>
                </div>
                <div>
                    <Collapess defaultActiveKey={"1"}>
                        <Panel header="ROLES" key="1">
                            OPEN MENU
                        </Panel>
                    </Collapess>
                </div>
                <div>
                    <Collapess defaultActiveKey={"1"}>
                        <Panel header="permissions" key="1">
                            OPEN MENU
                        </Panel>
                    </Collapess>
                </div>
                <div>
                    <Collapess defaultActiveKey={"1"}>
                        <Panel header="role permissions" key="1">
                            OPEN MENU
                        </Panel>
                    </Collapess>
                </div>
                <div>
                    <Collapess defaultActiveKey={"1"}>
                        <Panel header="menu" key="1">
                            OPEN MENU
                        </Panel>
                    </Collapess>
                </div>
                <div>
                    <Collapess defaultActiveKey={"1"}>
                        <Panel header="desktop" key="1">
                            OPEN MENU
                        </Panel>
                    </Collapess>
                </div>
                <div>
                    <Collapess defaultActiveKey={"1"}>
                        <Panel header="permissions setup" key="1">
                            OPEN MENU
                        </Panel>
                    </Collapess>
                </div>
                <div>
                    <Collapess defaultActiveKey={"1"}>
                        <Panel header="exceptions" key="1">
                            OPEN MENU
                        </Panel>
                    </Collapess>
                </div>
                <div>
                    <Collapess defaultActiveKey={"1"}>
                        <Panel header="ums log" key="1">
                            OPEN MENU
                        </Panel>
                    </Collapess>
                </div>
                <div>
                    <Collapess defaultActiveKey={"1"}>
                        <Panel header="service log" key="1">
                            OPEN MENU
                        </Panel>
                    </Collapess>
                </div>
                <div>
                    <Collapess defaultActiveKey={"1"}>
                        <Panel header="email log" key="1">
                            OPEN MENU
                        </Panel>
                    </Collapess>
                </div>
                <div>
                    <Collapess defaultActiveKey={"1"}>
                        <Panel header="reason code" key="1">
                            OPEN MENU
                        </Panel>
                    </Collapess>
                </div>
            </div>
        </div>
    </LayoutDashboard>
}

export default Settings


const Collapess = styled(Collapse)`
border:0px;
border-radius:0px;
font-size: 16px;
text-transform: uppercase;
font-weight: 600;
.ant-collapse-content {
    background: transparent;
    padding: 10px;
    color: #00D8FF;
    border:1px solid #1C3947;
    border-radius:0!important;
}

.ant-collapse-content-box {
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    padding:0!important;

}

.ant-collapse-item {
    border: 0!important;
}
.ant-collapse-item >.ant-collapse-header {
    border: 0px!important;
    border-radius: 0px!important;
    background:  #1C3947;
    color: #00D8FF;
}

`