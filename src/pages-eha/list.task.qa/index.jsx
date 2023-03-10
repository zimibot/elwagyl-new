import { CardBox } from "../../components/layout/card"
import { LayoutDashboard } from "../../components/layout/dashboard.layout"
import { TitleContent } from "../../components/layout/title"
import { TableInline } from "../../components/table"
import { Form } from "../../components.eha/input";
import { ButtonComponents } from "../../components.eha/button";

const TaskQA = () => {
    return <LayoutDashboard className="bg-[#101C26] text-[16px]">
        <CardBox className="flex-1 col-span-full pb-14">
            <TitleContent>
                <div className="text-[24px] uppercase">quality control</div>
            </TitleContent>
            <div className="flex gap-10 border-t border-primary pt-4">
                <Form.input rowColumn type="date" label={"start date"}></Form.input>
                <Form.input rowColumn type="date" label={"end date"}></Form.input>
                <div className="flex items-center">
                    <ButtonComponents>
                        apply
                    </ButtonComponents>
                </div>
            </div>
            <div className="grid grid-cols-3 flex-1">
                <div className="h-full relative flex-1 flex flex-col border-r pr-4 border-primary">
                    <TitleContent>
                        <div className="text-[24px] uppercase">Finding risk level (total: 0)</div>
                    </TitleContent>
                    <TableInline border paggination hoverDisable columns={[
                        {
                            key: 'check',
                            rowClass: "w-[50px]",
                            html: () => {
                                return (
                                    <Form.check classRoot="p-0"></Form.check>
                                )
                            }

                        },
                        {
                            title: 'EDIT',
                            key: 'edit',
                        },
                        {
                            title: 'REFERENCE',
                            key: 'edit',
                        },
                        {
                            title: 'FINDING NAME',
                            key: 'edit',
                        },
                        {
                            title: 'ASSET NAME',
                            key: 'edit',
                        },
                        {
                            title: 'PROTECTED SITE',
                            key: 'edit',
                        },

                    ]}
                        data={
                            new Array(20).fill({
                                edit: "-",

                            })
                        } />
                </div>
                <div className="space-y-5 h-full relative flex-1 flex flex-col px-4 border-r border-primary">
                    <TitleContent>
                        <div className="text-[24px] uppercase">FINDING AWAITING RESCAN (total: 0)</div>
                    </TitleContent>
                    <TableInline border paggination hoverDisable columns={[
                        {
                            key: 'check',
                            rowClass: "w-[50px]",
                            html: () => {
                                return (
                                    <Form.check classRoot="p-0"></Form.check>
                                )
                            }

                        },
                        {
                            title: 'EDIT',
                            key: 'edit',
                        },
                        {
                            title: 'asset id',
                            key: 'edit',
                        },
                        {
                            title: 'reference',
                            key: 'edit',
                        },
                        {
                            title: 'finding  name',
                            key: 'edit',
                        },
                        {
                            title: 'risk level',
                            key: 'edit',
                        },
                        {
                            title: 'stage',
                            key: 'edit',
                        },

                    ]}
                        data={
                            new Array(20).fill({
                                edit: "-",

                            })
                        } />
                </div>
                <div className="space-y-5 h-full relative flex-1 flex flex-col pl-4">
                    <TitleContent>
                        <div className="text-[24px] uppercase">FINDING RESCAN (total: 1)</div>
                    </TitleContent>
                    <TableInline border paggination hoverDisable columns={[
                        {
                            key: 'check',
                            rowClass: "w-[50px]",
                            html: () => {
                                return (
                                    <Form.check classRoot="p-0"></Form.check>
                                )
                            }

                        },
                        {
                            title: 'EDIT',
                            key: 'edit',
                        },
                        {
                            title: 'REFERENCE',
                            key: 'edit',
                        },
                        {
                            title: 'FINDING NAME',
                            key: 'edit',
                        },
                        {
                            title: 'risk level',
                            key: 'edit',
                        },
                        {
                            title: 'asset name',
                            key: 'edit',
                        },

                    ]}
                        data={
                            new Array(20).fill({
                                edit: "-",

                            })
                        } />
                </div>
            </div>
        </CardBox>
    </LayoutDashboard>
}

export default TaskQA