import { EditFilled } from "@ant-design/icons"
import { Tooltip } from "antd"
import { CardBox } from "../../components/layout/card"
import { TitleContent } from "../../components/layout/title"
import { TableInline } from "../../components/table"

export const ListManageScan = () => {
    return (
        <CardBox className="flex-1">
            <TitleContent>
                <div className="text-[24px] uppercase">manage scan profiles</div>
            </TitleContent>
            <TableInline border paggination hoverDisable columns={[
                {
                    title: 'Name',
                    key: 'name',
                    rowClass: "w-[250px]",
                },
                {
                    title: 'scanning tools',
                    key: 'scanning_tools',
                    rowClass: "w-[150px]",
                },
            
                {
                    title: 'role',
                    key: 'role',
                    rowClass: "w-[150px]",
                },
                {
                    title: 'status',
                    key: 'status',
                    rowClass: "w-[150px]",
                },
                {
                    title: null,
                    key: null,
                },
                {
                    title: 'action',
                    key: 'action',
                    rowClass: "w-[50px]",
                    html: () => {
                        return <Tooltip title="EDIT">
                            <button className="flex items-center justify-center w-full text-[1.2rem]">
                                <EditFilled></EditFilled>
                            </button>
                        </Tooltip>
                    }
                },

            ]}
                data={
                    new Array(20).fill({
                        name: "NESSUS DARKLAB",
                        scanning_tools: "NESSUS",
                        role: "administrator",
                        status: "active",
                        action: 1
                    })
                } />
        </CardBox>
    )
}