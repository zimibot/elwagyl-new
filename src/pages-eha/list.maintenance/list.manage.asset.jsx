import { CardBox } from "../../components/layout/card"
import { TitleContent } from "../../components/layout/title"
import { TableInline } from "../../components/table"
import { Form } from "../../components.eha/input";
import { EditFilled } from "@ant-design/icons";

const ListManageAsset = () => {
    return <CardBox className="flex-1 col-span-full pb-14">
        <TitleContent>
            <div className="text-[24px] uppercase text-blue">manage asset list platforms</div>
        </TitleContent>
        <div className="grid grid-cols-4 flex-1 pb-10">
            <div className="space-y-5 h-full relative flex-1 flex flex-col border-r pr-4 border-primary">
                <TitleContent>
                    <div className="text-[24px] uppercase text-blue">operating system</div>
                </TitleContent>
                <TableInline border paggination hoverDisable columns={[
                    {
                        key: 'check',
                        rowClass: "w-[50px]",
                        html: () => {
                            return (
                                <Form.check classRoot="!p-0"></Form.check>
                            )
                        }

                    },
                    {
                        title: 'OS NAME',
                        key: 'os_name',
                    },
                    {
                        title: 'ACTION',
                        key: 'action',
                        columnClass: "text-center",
                        rowClass: "w-[100px]",
                        html: () => {
                            return (<div className="flex w-full items-center justify-center"><EditFilled></EditFilled></div>)
                        }
                    },

                ]}
                    data={
                        new Array(20).fill({
                            os_name: "windows",

                        })
                    } />
            </div>
            <div className="space-y-5 h-full relative flex-1 flex flex-col border-r pr-4 border-primary">
                <TitleContent>
                    <div className="text-[24px] uppercase text-blue">web server</div>
                </TitleContent>
                <TableInline border paggination hoverDisable columns={[
                    {
                        key: 'check',
                        rowClass: "w-[50px]",
                        html: () => {
                            return (
                                <Form.check classRoot="!p-0"></Form.check>
                            )
                        }

                    },
                    {
                        title: 'OS NAME',
                        key: 'os_name',
                    },
                    {
                        title: 'ACTION',
                        key: 'action',
                        columnClass: "text-center",
                        rowClass: "w-[100px]",
                        html: () => {
                            return (<div className="flex w-full items-center justify-center"><EditFilled></EditFilled></div>)
                        }
                    },

                ]}
                    data={
                        new Array(20).fill({
                            os_name: "windows",

                        })
                    } />
            </div>
            <div className="space-y-5 h-full relative flex-1 flex flex-col border-r pr-4 border-primary">
                <TitleContent>
                    <div className="text-[24px] uppercase text-blue">development language</div>
                </TitleContent>
                <TableInline border paggination hoverDisable columns={[
                    {
                        key: 'check',
                        rowClass: "w-[50px]",
                        html: () => {
                            return (
                                <Form.check classRoot="!p-0"></Form.check>
                            )
                        }

                    },
                    {
                        title: 'OS NAME',
                        key: 'os_name',
                    },
                    {
                        title: 'ACTION',
                        key: 'action',
                        columnClass: "text-center",
                        rowClass: "w-[100px]",
                        html: () => {
                            return (<div className="flex w-full items-center justify-center"><EditFilled></EditFilled></div>)
                        }
                    },

                ]}
                    data={
                        new Array(20).fill({
                            os_name: "java",

                        })
                    } />
            </div>
            <div className="space-y-5 h-full relative flex-1 flex flex-col border-r pr-4 border-primary">
                <TitleContent>
                    <div className="text-[24px] uppercase text-blue">coding framework</div>
                </TitleContent>
                <TableInline border paggination hoverDisable columns={[
                    {
                        key: 'check',
                        rowClass: "w-[50px]",
                        html: () => {
                            return (
                                <Form.check classRoot="!p-0"></Form.check>
                            )
                        }

                    },
                    {
                        title: 'OS NAME',
                        key: 'os_name',
                    },
                    {
                        title: 'ACTION',
                        key: 'action',
                        columnClass: "text-center",
                        rowClass: "w-[100px]",
                        html: () => {
                            return (<div className="flex w-full items-center justify-center"><EditFilled></EditFilled></div>)
                        }
                    },

                ]}
                    data={
                        new Array(20).fill({
                            os_name: "spring",

                        })
                    } />
            </div>
        </div>
    </CardBox>
}

export default ListManageAsset