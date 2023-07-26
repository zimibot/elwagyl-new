import { TabsMenu, TabsContent } from "./tab"
import { CardBox } from "../../components/layout/card"
import { LayoutDashboard } from "../../components/layout/dashboard.layout"
import { ListProtectedSite } from "./list.protected.site"
import { ListEmailManage } from "./list.manage.email"
import { ListManageScan } from "./list.manage.scan"
import ListManagePlatform from "./list.manage.platform"
import { Result } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { AuditLogs } from "./list.audit.logs"

export const Loading = () => {
    return <div className="absolute items-center justify-center flex w-full h-full">
        <Result
            icon={<div className="text-[35px]"><LoadingOutlined /></div>}
            title={<span className="uppercase">LOADING...</span>}
        />
    </div>
}

export const ErrorHtml = ({ error = "" }) => {

    return <div className="absolute items-center justify-center flex w-full h-full">
        <Result
            icon={<div className="w-full h-full items-center flex justify-center">
                <img className="w-40" src="/assets/error.svg"></img>
            </div>}
            title={<span className="uppercase">{error ? error : <div className="uppercase">There was an error fetching the data. <br></br>Please try again later or contact our support team if the problem persists.</div>}</span>}
        />
    </div>
}

const ListMaintenance = () => {
    // if (!API.error) {
    //     return <div className="absolute items-center justify-center flex w-full h-full">
    //         <Result
    //             status={"500"}
    //             title={<span className="uppercase">Unable to connect to server</span>}
    //         />
    //     </div>
    // }

    // if (!API.loading) {
    //     return <Loading></Loading>
    // }


    let Item = [
        {
            key: 1,
            title: "DATA CENTER",
            content: <ListProtectedSite ErrorHtml={ErrorHtml} HtmlLoading={Loading} />
        },
        // {
        //     key: 2,
        //     title: "register user",
        //     content: <ListRegisterUser />
        // },
        // {
        //     key: 3,
        //     title: "manage users",
        //     content: <ListManageUser />
        // },
        {
            key: 4,
            title: "manage scan",
            content: <ListManageScan />
        },
        {
            key: 5,
            title: "manage email",
            content: <ListEmailManage />
        },
        {
            key: 6,
            title: " manage platform",
            content: <ListManagePlatform />
        },
        {
            key: 7,
            title: "audit logs",
            content: <AuditLogs />
        },
    ]

    return (
        <LayoutDashboard className="bg-[#101C26] text-[16px]">
            <div className="col-span-full flex-1 flex flex-col pb-10">
                <CardBox className="!p-0">
                    <div className="p-8 flex items-center gap-10 border-b border-primary">
                        <div>FUNCTION</div>
                        <TabsMenu Item={Item}></TabsMenu>
                    </div>
                </CardBox>
                <TabsContent></TabsContent>
            </div>
        </LayoutDashboard>
    )
}

export default ListMaintenance