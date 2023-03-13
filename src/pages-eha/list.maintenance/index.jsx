import { TabsMenu, TabsContent } from "./tab"
import { CardBox } from "../../components/layout/card"
import { LayoutDashboard } from "../../components/layout/dashboard.layout"
import { ListProtectedSite } from "./list.protected.site"
import { GetAndUpdateContext } from "../../model/context.function"
import { ListEmailManage } from "./list.manage.email"
import { ListManageScan } from "./list.manage.scan"
import ListManageAsset from "./list.manage.asset"

const ListMaintenance = () => {
    const { setStatus } = GetAndUpdateContext()

    let Item = [
        {
            key: 1,
            title: "protected site",
            content: <ListProtectedSite />
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
            title: " manage asset",
            content: <ListManageAsset />
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