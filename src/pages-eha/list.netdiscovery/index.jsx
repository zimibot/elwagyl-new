import { ArrowLeftOutlined } from "@ant-design/icons"
import { ButtonComponents } from "../../components.eha/button"
import { CardBox } from "../../components/layout/card"
import { LayoutDashboard } from "../../components/layout/dashboard.layout"
import { TitleContent } from "../../components/layout/title"
import { useNavigate } from "react-router-dom"
import { TableInline } from "../../components/table"

export const NetDiscovery = () => {
    const prevPage = useNavigate()
    return <LayoutDashboard className="bg-[#101C26] text-[16px]">
        <div className="col-span-full space-y-4 flex flex-col">
            <CardBox className="!p-0 flex">
                <div className="p-8 flex items-center gap-10 border-b border-primary">
                    <div>
                        <ButtonComponents click={() => prevPage(-1)} className="flex gap-2 items-center">
                            <ArrowLeftOutlined></ArrowLeftOutlined>
                            <span>BACK TO ASSET DATA</span>
                        </ButtonComponents>
                    </div>
                    <div className="space-x-4 flex">
                        <ButtonComponents click={() => {
                            // setStatus(d => ({
                            //     ...d,
                            //     ADDASSET: !d.ADDASSET,
                            //     idAssets: null
                            // }))
                        }}>
                            [ + ] ADD
                        </ButtonComponents>
                    </div>

                </div>

            </CardBox>
            <CardBox className={"flex-1"}>


                <div className="flex-1 flex flex-col">
                    <div className="grid grid-cols-2 flex-1 gap-4">
                        <div className="flex flex-1 flex-col p-4 border border-border_second gap-4">
                            <TitleContent subTitle={false}>
                                <div className="flex items-center justify-between w-full">
                                    <div className="text-[24px] uppercase text-blue">NETWORK DISCOVERY</div>
                                </div>
                            </TitleContent>
                            <TableInline border hoverDisable paggination data={new Array(20).fill({
                                target: "192.168.1.1",
                                status: "Completed",
                                scheduled: "2023-09-23 5:21pm",
                                protected: "SITE A",
                                progress: "100%"
                            })} columns={[
                                {
                                    title: "Target",
                                    key: "target"
                                },
                                {
                                    title: "STATUS",
                                    key: "status"
                                },
                                {
                                    title: "SHCEDULED DATE",
                                    key: "scheduled"
                                },
                                {
                                    title: "PROTECTED SITE",
                                    key: "protected"
                                },
                                {
                                    title: "PROGRESS",
                                    key: "progress"
                                },
                            ]}></TableInline>
                        </div>
                        <div className="flex flex-1 flex-col p-4 border border-border_second gap-4">
                            <TitleContent subTitle={false}>
                                <div className="flex items-center justify-between w-full">
                                    <div className="text-[24px] uppercase text-blue">PORT SCANS</div>
                                </div>
                            </TitleContent>
                            <TableInline border hoverDisable paggination data={new Array(20).fill({
                                target: "192.168.1.1",
                                date: "2023-09-23 5:21pm",
                                protected: "SITE A",
                                ports: "135/TCP/EPMAP,139/TCP/SMB..."
                            })} columns={[
                                {
                                    title: "Target",
                                    key: "target"
                                },
                                {
                                    title: "PROTECTED SITE",
                                    key: "protected"
                                },
                                {
                                    title: "OPEN PORTS",
                                    key: "ports"
                                },
                                {
                                    title: "DATE",
                                    key: "date"
                                },
                            ]}></TableInline>
                        </div>
                    </div>
                </div>
            </CardBox>
        </div>
    </LayoutDashboard>
}