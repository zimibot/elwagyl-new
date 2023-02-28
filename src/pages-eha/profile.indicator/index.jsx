import { EditFilled } from "@ant-design/icons"
import { Tooltip } from "antd"
import { InputCheck } from "../../components.eha/input.check"
import { InputNumbers } from "../../components.eha/input.number"
import { ModalsComponent } from "../../components.eha/modal"
import { SelectComponent } from "../../components.eha/select"
import { CardBox } from "../../components/layout/card"
import { LayoutDashboard } from "../../components/layout/dashboard.layout"
import { TableInline } from "../../components/table"
import { GetAndUpdateContext } from "../../model/context.function"

const ProfileIndicator = () => {
    const { setStatus } = GetAndUpdateContext()

    return <LayoutDashboard>
        <div className="grid grid-cols-5 col-span-full text-[16px] bg-[#101C26] gap-6">
            <div className="col-span-2 flex flex-col border-r border-primary py-4">
                <CardBox className={"flex-1 pb-9"}>
                    <div className="flex items-center justify-between">
                        <div>
                            ASSET GROUP
                        </div>
                        <button className="flex justify-center items-center relative">
                            <span className="absolute">( + ) ADD PROFILE</span>
                            <svg width="135" height="26" viewBox="0 0 135 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="135" height="26" fill="#152A36" />
                                <path d="M5 0.5H0.5V5" stroke="#00D8FF" />
                                <path d="M5 25.5H0.5V21" stroke="#00D8FF" />
                                <path d="M134.5 5L134.5 0.5L130.5 0.5" stroke="#00D8FF" />
                                <path d="M134.5 21L134.5 25.5L130 25.5" stroke="#00D8FF" />
                            </svg>

                        </button>
                    </div>
                    <TableInline
                        border
                        hoverDisable
                        paggination={true}
                        columns={
                            [
                                {
                                    title: 'EDIT',
                                    key: 'edit',
                                    rowClass: 'w-[50px]',
                                    html: () => {
                                        return <Tooltip title="EDIT">
                                            <button>
                                                <EditFilled></EditFilled>
                                            </button>
                                        </Tooltip>
                                    }
                                },
                                {
                                    title: 'NAME',
                                    key: 'name',
                                },
                                {
                                    title: 'DESCRIPTION',
                                    key: 'description',
                                },
                                {
                                    title: 'RISK',
                                    key: 'risk',
                                },

                            ]
                        }
                        data={
                            new Array(20).fill({
                                name: "DEFAULT RISK PROFILE",
                                description: "Default risk profile (no DEADLINE ADJUSTMENT)",
                                risk: "medium"
                            })
                        }
                        style={{
                            row: {
                                fontSize: "16px"
                            },
                            columns: {
                                fontSize: "16px"
                            }
                        }}></TableInline>
                </CardBox>
            </div>
            <div className="col-span-3 border-l border-primary">
                <CardBox className={" mx-[-13px]"}>
                    <div>
                        <div className="space-y-6 px-4 py-4 border-b border-primary">
                            <div>RISK PROFILE</div>
                            <div>
                                <b>LOW VULNERABILITY RISK LEVEL</b>
                            </div>
                        </div>
                        <div className="px-4 py-6 border-b border-primary">
                            <div className="grid grid-cols-3 gap-8">
                                <div className="grid grid-cols-2 items-center">
                                    <div>
                                        LOW ASSET GROUP
                                        <br></br>
                                        RISK SCORE
                                    </div>
                                    <div className="space-y-2">
                                        <p>RISK LEVEL</p>
                                        <div>
                                            <SelectComponent width={"100%"}></SelectComponent>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 items-center">
                                    <div className=" text-yellow-400">
                                        MEDIUM ASSET
                                        <br></br>
                                        GROUP RISK SCORE
                                    </div>
                                    <div className="space-y-2">
                                        <p>RISK LEVEL</p>
                                        <div>
                                            <SelectComponent width={"100%"}></SelectComponent>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 items-center">
                                    <div className=" text-red-400">
                                        HIGH ASSET
                                        <br></br>
                                        GROUP RISK SCORE
                                    </div>
                                    <div className="space-y-2">
                                        <p>RISK LEVEL</p>
                                        <div>
                                            <SelectComponent width={"100%"}></SelectComponent>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-6 border-b border-primary">
                            <b>MEDIUM VULNERABILITY RISK LEVEL</b>
                        </div>
                        <div className="px-4 py-6 border-b border-primary">
                            <div className="grid grid-cols-3 gap-8">
                                <div className="grid grid-cols-2 items-center">
                                    <div>
                                        LOW ASSET GROUP
                                        <br></br>
                                        RISK SCORE
                                    </div>
                                    <div className="space-y-2">
                                        <p>RISK LEVEL</p>
                                        <div>
                                            <SelectComponent width={"100%"}></SelectComponent>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 items-center">
                                    <div className=" text-yellow-400">
                                        MEDIUM ASSET
                                        <br></br>
                                        GROUP RISK SCORE
                                    </div>
                                    <div className="space-y-2">
                                        <p>RISK LEVEL</p>
                                        <div>
                                            <SelectComponent width={"100%"}></SelectComponent>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 items-center">
                                    <div className=" text-red-400">
                                        HIGH ASSET
                                        <br></br>
                                        GROUP RISK SCORE
                                    </div>
                                    <div className="space-y-2">
                                        <p>RISK LEVEL</p>
                                        <div>
                                            <SelectComponent width={"100%"}></SelectComponent>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-6 border-b border-primary">
                            <b>HIGH VULNERABILITY RISK LEVEL</b>
                        </div>
                        <div className="px-4 py-6 border-b border-primary">
                            <div className="grid grid-cols-3 gap-8">
                                <div className="grid grid-cols-2 items-center">
                                    <div>
                                        LOW ASSET GROUP
                                        <br></br>
                                        RISK SCORE
                                    </div>
                                    <div className="space-y-2">
                                        <p>RISK LEVEL</p>
                                        <div>
                                            <SelectComponent width={"100%"}></SelectComponent>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 items-center">
                                    <div className=" text-yellow-400">
                                        MEDIUM ASSET
                                        <br></br>
                                        GROUP RISK SCORE
                                    </div>
                                    <div className="space-y-2">
                                        <p>RISK LEVEL</p>
                                        <div>
                                            <SelectComponent width={"100%"}></SelectComponent>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 items-center">
                                    <div className=" text-red-400">
                                        HIGH ASSET
                                        <br></br>
                                        GROUP RISK SCORE
                                    </div>
                                    <div className="space-y-2">
                                        <p>RISK LEVEL</p>
                                        <div>
                                            <SelectComponent width={"100%"}></SelectComponent>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-6 border-b border-primary">
                            <b>CRITICAL VULNERABILITY RISK LEVEL</b>
                        </div>
                        <div className="px-4 py-6 border-b border-primary">
                            <div className="grid grid-cols-3 gap-8">
                                <div className="grid grid-cols-2 items-center">
                                    <div>
                                        LOW ASSET GROUP
                                        <br></br>
                                        RISK SCORE
                                    </div>
                                    <div className="space-y-2">
                                        <p>RISK LEVEL</p>
                                        <div>
                                            <SelectComponent width={"100%"}></SelectComponent>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 items-center">
                                    <div className=" text-yellow-400">
                                        MEDIUM ASSET
                                        <br></br>
                                        GROUP RISK SCORE
                                    </div>
                                    <div className="space-y-2">
                                        <p>RISK LEVEL</p>
                                        <div>
                                            <SelectComponent width={"100%"}></SelectComponent>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 items-center">
                                    <div className=" text-red-400">
                                        HIGH ASSET
                                        <br></br>
                                        GROUP RISK SCORE
                                    </div>
                                    <div className="space-y-2">
                                        <p>RISK LEVEL</p>
                                        <div>
                                            <SelectComponent width={"100%"}></SelectComponent>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-6 border-b border-primary">
                            <b>REMEDIATION DEADLINE ADJUSTMENT</b>
                        </div>
                        <div className="px-4 py-6">
                            <div className="grid grid-cols-3 gap-8">
                                <div className="grid grid-cols-2 items-center">
                                    <div>
                                        LOW ASSET GROUP
                                        <br></br>
                                        RISK SCORE
                                    </div>
                                    <div className="space-y-2">
                                        <p>RISK LEVEL</p>
                                        <div>
                                            <InputNumbers></InputNumbers>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 items-center">
                                    <div className=" text-yellow-400">
                                        MEDIUM ASSET
                                        <br></br>
                                        GROUP RISK SCORE
                                    </div>
                                    <div className="space-y-2">
                                        <p>RISK LEVEL</p>
                                        <div>
                                            <InputNumbers></InputNumbers>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 items-center">
                                    <div className=" text-red-400">
                                        HIGH ASSET
                                        <br></br>
                                        GROUP RISK SCORE
                                    </div>
                                    <div className="space-y-2">
                                        <p>RISK LEVEL</p>
                                        <div>
                                            <InputNumbers></InputNumbers>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end p-4">
                            <button className="bg-primary w-[150px] py-6"
                                onClick={() => {
                                    setStatus(d => ({
                                        ...d,
                                        SAVEMODAL: !d["SAVEMODAL"]
                                    }))
                                }}>SAVE</button>
                        </div>
                    </div>
                </CardBox>
            </div>
        </div>
        <ModalsComponent modalName={"SAVEMODAL"}>
            <div> HOW WOULD YOU LIKE TO ENTER THE RISK SCORE FOR THE NEW ASSET RISK GROUP ?</div>
            <div className="space-y-4">
                <div>
                    <InputCheck text="HOW WOULD YOU LIKE TO ENTER THE RISK SCORE FOR THE NEW ASSET RISK GROUP ?"></InputCheck>
                </div>
                <div>
                    <InputCheck text={"ENTERED MANUALLY"}></InputCheck>
                </div>
            </div>
        </ModalsComponent>
    </LayoutDashboard>
}

export default ProfileIndicator