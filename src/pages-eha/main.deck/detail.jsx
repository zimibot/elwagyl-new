import { PieChart } from "../../components.eha/chart.pie"
import { DrawerMenu } from "../../components.eha/drawer.menu"
import { ChartRose } from "../../components.eha/chart.rose"
import { TitleContent } from "../../components/layout/title"
import { TableInline } from "../../components/table"
import { SelectComponent } from "../../components.eha/select";
import { columnItem, dataItems, columnItemRequire } from "./data";
import { GetAndUpdateContext } from "../../model/context.function"

export const DetailDeck = () => {
    const { setvalue } = GetAndUpdateContext()
    return <> <DrawerMenu name={"detail"}>
        <div className="flex flex-col gap-4 text-[16px] flex-1">
            <TitleContent className={"pt-0"}>
                <div className="text-[24px] uppercase text-blue">PROTECTED SITE A</div>
            </TitleContent>
            <div className="grid grid-cols-7 gap-6 flex-1">
                <div className="col-span-4">
                    <div className="w-full grid grid-cols-3">
                        <div className="p-4 border border-r-0 border-primary">
                            <ChartRose></ChartRose>
                        </div>
                        <div className="flex relative h-full space-y-8 flex-col p-4 border border-r-0 border-primary">
                            <div>TARGET REQUIRE IMMEDIATE ACTIONS</div>
                            <TableInline border={true} columns={columnItemRequire} data={dataItems}></TableInline>
                        </div>
                        <div>
                            <div className="p-4 border border-primary space-y-8">
                                <div>TOP 3 FINDING CATEGORIES</div>
                                <div className="flex items-center justify-between">
                                    <span>RISK LEVEL</span>
                                    <div>
                                        <SelectComponent></SelectComponent>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>CROSS SITE <br></br> SCRIPTING</div>
                                    <div className="text-[36px]">20</div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>HTML FORM WITHOUT <br></br> CSRF PROTECTION</div>
                                    <div className="text-[36px]">20</div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>DIRECTORY <br></br> LISTING</div>
                                    <div className="text-[36px]">20</div>
                                </div>
                            </div>
                            <div className="p-4 border border-primary space-y-8">
                                <div>TOP 3 DEVELOPERS BY FINDING</div>
                                <div className="flex items-center justify-between">
                                    <span>RISK LEVEL</span>
                                    <div>
                                        <SelectComponent></SelectComponent>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>ADMIN1</div>
                                    <div className="text-[36px]">20</div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>ADMIN2</div>
                                    <div className="text-[36px]">20</div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>ADMIN3</div>
                                    <div className="text-[36px]">20</div>
                                </div>
                            </div>
                            <div className="p-4 border border-primary space-y-8">
                                <div>TOP 3 DEVELOPERS BY RESCANS</div>
                                <div className="flex items-center justify-between">
                                    <span>RISK LEVEL</span>
                                    <div>
                                        <SelectComponent></SelectComponent>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>ADMIN1</div>
                                    <div className="text-[36px]">20</div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>ADMIN2</div>
                                    <div className="text-[36px]">20</div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>ADMIN3</div>
                                    <div className="text-[36px]">20</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 space-y-6 flex flex-col">
                    <div className="border border-primary grid grid-cols-3">
                        <div className="col-span-2 flex justify-between flex-col p-4">
                            <div className="space-y-4">
                                <div>
                                    ASSETS
                                </div>
                                <div className="h-10 w-full bg-primary flex">
                                    <div className="w-1/4 bg-[#152A36] h-full"></div>
                                    <div className="w-1/4 bg-[#1C3947] h-full"></div>
                                    <div className="w-1/4 bg-[#0B5567] h-full"></div>
                                    <div className="w-1/4 bg-blue h-full"></div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-4 border border-blue bg-[#152A36] rounded-full"></div>
                                        <div>UNSCHEDULED</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-4 border border-blue bg-[#1C3947] rounded-full"></div>
                                        <div>SCHEDULED</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-4 border border-blue bg-[#0B5567] rounded-full"></div>
                                        <div>SCANNING</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-4 border border-blue bg-blue rounded-full"></div>
                                        <div>COMPLETED</div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    ASSETS
                                </div>
                                <div className="h-10 w-full bg-primary flex">
                                    <div className="w-1/4 bg-red-800 h-full"></div>
                                    <div className="w-1/4 bg-red-700 h-full"></div>
                                    <div className="w-1/4 bg-red-600 h-full"></div>
                                    <div className="w-[20%] bg-red-500 h-full"></div>
                                    <div className="w-[5%] bg-white h-full"></div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-4 border bg-red-800 rounded-full"></div>
                                        <div>DRAFT</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-4 border bg-red-700 rounded-full"></div>
                                        <div>VERIFIED</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-4 border bg-red-600 rounded-full"></div>
                                        <div>RESCAN SCHEDULED</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-4 border bg-red-500 rounded-full"></div>
                                        <div>RESCANNING</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-4 border bg-white rounded-full"></div>
                                        <div>CLOSED</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 border-l border-primary p-4 space-y-3">
                            <div>SCANS</div>
                            <PieChart></PieChart>
                        </div>
                    </div>
                    <div className="flex flex-col flex-1 gap-4 pb-4">
                        <TitleContent className={"pt-0"}>
                            <div className="text-[24px] uppercase text-blue">ASSETS</div>
                        </TitleContent>
                        <div className="relative flex flex-col flex-1">
                            <TableInline hoverDisable={true} columns={columnItem({
                                data: {
                                    show: (v) => {
                                        setvalue(d => ({
                                            ...d,
                                            subdetail: {
                                                show: !d.subdetail?.show,
                                                value: v
                                            }
                                        }))
                                    }
                                }
                            })} data={dataItems} borderLast={true} border={true}></TableInline>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </DrawerMenu>
        <SubDetail></SubDetail>
    </>
}


const SubDetail = () => {
    const column = [
        {
            title: "REFERENCE",
            key: "reference",
            columnClass: "text-center",
            rowClass: "w-[100px] text-center"
        },
        {
            title: "RISK LEVEL",
            key: "risklevel",
            columnClass: "text-center",
            rowClass: "w-[150px] text-center"
        },
        {
            title: "FINDING NAME",
            key: "findingname",
        },
        {
            title: "STAGE",
            key: "stage",
            rowClass: "w-[300px]"
        },
        {
            title: "PROTECTED SITE",
            key: "protectedsite",
            rowClass: "w-[250px]"
        },
        {
            title: "SITE OWNER",
            key: "siteowner",
            columnClass: "text-center",
            rowClass: "w-[250px] text-center"
        },
        {
            title: "DEADLINE",
            key: "deadline",
            rowClass: "w-[250px]"
        },
        {
            title: "RESCAN",
            key: "rescan",
            columnClass: "text-center",
            rowClass: "w-[100px] text-center"
        },
        {
            title: "EDIT",
            key: "edit",
            columnClass: "text-center",
            rowClass: "w-[150px] text-center",
            html: () => {
                return <button className="flex gap-3 items-center justify-center w-full">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V16C0 16.5304 0.210714 17.0391 0.585786 17.4142C0.960859 17.7893 1.46957 18 2 18H16C17.1 18 18 17.1 18 16V2C18 1.46957 17.7893 0.960859 17.4142 0.585786C17.0391 0.210714 16.5304 0 16 0ZM16 16H2V4H16V16ZM9 7.5C10.84 7.5 12.48 8.46 13.34 10C12.48 11.54 10.84 12.5 9 12.5C7.16 12.5 5.52 11.54 4.66 10C5.52 8.46 7.16 7.5 9 7.5ZM9 6C6.27 6 3.94 7.66 3 10C3.94 12.34 6.27 14 9 14C11.73 14 14.06 12.34 15 10C14.06 7.66 11.73 6 9 6ZM9 11.5C8.17 11.5 7.5 10.83 7.5 10C7.5 9.17 8.17 8.5 9 8.5C9.83 8.5 10.5 9.17 10.5 10C10.5 10.83 9.83 11.5 9 11.5Z" fill="#00D8FF" />
                    </svg>

                    <span>EDIT</span>
                </button>
            }
        },
    ]

    const data = new Array(15).fill({
        reference: "H74",
        risklevel: "HIGH",
        findingname: "PHP unsupport",
        stage: "Awaiting remediation",
        protectedsite: "192.24.22.561",
        siteowner: "Username",
        deadline: "overdue 415 day(s)",
        rescan: 2,
        edit: 4
    })


    return (
        <DrawerMenu placement="right" name={"subdetail"}>
            <TitleContent className={"pt-0"}>
                <div className="text-[24px] uppercase text-blue">DETAIL PROTECTED SITE A</div>
            </TitleContent>
            <TitleContent className={"pt-0"}>
                <div className="text-[24px] uppercase text-blue">192.24.22.561</div>
            </TitleContent>
            <div className="flex-1 flex flex-col pb-4">
                <TableInline
                    columns={column}
                    data={data}
                    paggination={true}
                    hoverDisable={true} style={{
                        row: {
                            fontSize: "20px"
                        },
                        columns: {
                            fontSize: "20px"
                        }
                    }} border={true}></TableInline>
            </div>
        </DrawerMenu>
    )
}