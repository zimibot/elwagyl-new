import { FileFilled } from "@ant-design/icons"
import { CardBox } from "../../components/layout/card"
import { LayoutDashboard } from "../../components/layout/dashboard.layout"
import { TitleContent } from "../../components/layout/title"
import { TableInline } from "../../components/table"

const TargetReady = () => {
    return <LayoutDashboard className="bg-[#101C26] text-[16px]">
        <CardBox className="flex-1 col-span-full pb-14">
            <TitleContent>
                <div className="text-[24px] uppercase">targets ready for qa</div>
            </TitleContent>
            <TableInline border paggination hoverDisable columns={[
                {
                    title: 'protected site',
                    key: 'protected_site',
                    rowClass: "w-[250px]",
                },
                {
                    title: 'asset name',
                    key: 'asset_name',
                    rowClass: "w-[200px]",
                },
                {
                    title: 'target',
                    key: 'target',
                    rowClass: "w-[200px]",
                },
                {
                    title: 'critical risk',
                    key: 'critical_risk',
                    columnClass: "text-center",
                    rowClass: "w-[120px] text-center",
                },
                {
                    title: 'high risk',
                    key: 'high_risk',
                    columnClass: "text-center",
                    rowClass: "w-[100px] text-center",
                },
                {
                    title: 'medium risk',
                    key: 'medium_risk',
                    columnClass: "text-center",
                    rowClass: "w-[120px] text-center",
                },
                {
                    title: 'low risk',
                    key: 'low_risk',
                    columnClass: "text-center",
                    rowClass: "w-[100px] text-center",
                },
                {
                    title: 'internet facing',
                    key: 'internet_facing',
                    columnClass: "text-center",
                    rowClass: "w-[140px] text-center",
                },
                {
                    title: 'sla',
                    key: 'sla',
                },
                {
                    title: 'qa',
                    key: 'qa',
                    columnClass: "text-center",
                    rowClass: "w-[100px] text-center",
                    html: () => {
                        return <button>
                            <FileFilled></FileFilled>
                        </button>
                    }
                },

            ]}
                data={
                    new Array(20).fill({
                        protected_site: "SITE_A",
                        asset_name: "HTTP://192.168.1.1",
                        target: "HTTP://192.168.1.1",
                        critical_risk: 0,
                        high_risk: 0,
                        medium_risk: 0,
                        low_risk: 0,
                        internet_facing: "false",
                        sla: "NO DATE",
                    })
                } />
        </CardBox>
    </LayoutDashboard>
}

export default TargetReady