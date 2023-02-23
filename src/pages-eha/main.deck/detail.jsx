import { PieChart } from "../../components.eha/chart.pie"
import { DrawerMenu } from "../../components.eha/drawer.menu"
import { ChartRose } from "../../components.eha/chart.rose"
import { TitleContent } from "../../components/layout/title"
import { TableInline } from "../../components/table"
import { SelectComponent } from "../../components.eha/select";
import { columnItem, dataItems, columnItemRequire } from "./data";

export const DetailDeck = () => {

    return <DrawerMenu>
        <div className="flex flex-col gap-4 text-[16px] flex-1">
            <TitleContent className={"pt-0"}>
                <div className="text-[24px] uppercase">PROTECTED SITE A</div>
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
                            <div className="text-[24px] uppercase">ASSETS</div>
                        </TitleContent>
                        <div className="relative flex flex-col flex-1">
                            <TableInline hoverDisable={true} columns={columnItem} data={dataItems} borderLast={true} border={true}></TableInline>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </DrawerMenu>
}
