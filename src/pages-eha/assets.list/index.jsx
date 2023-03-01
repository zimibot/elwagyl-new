import { ButtonComponents } from "../../components.eha/button"
import { CardBox } from "../../components/layout/card"
import { LayoutDashboard } from "../../components/layout/dashboard.layout"
import { TitleContent } from "../../components/layout/title"
import { TableInline } from "../../components/table"
import { ModalsComponent } from "../../components.eha/modal"
import { GetAndUpdateContext } from "../../model/context.function"
import { Form } from "../../components.eha/input"
import { useState } from "react"
import styled from "styled-components"
import moment from "moment/moment"


const AssetsList = () => {
    const { setStatus } = GetAndUpdateContext()

    const [arrInput, setArrInput] = useState([

    ])

    console.log(arrInput)
    return (
        <LayoutDashboard className="bg-[#101C26] text-[16px]">
            <div className="col-span-full flex-1 flex flex-col pb-10">
                <CardBox className="!p-0">
                    <div className="p-8 flex items-center gap-10 border-b border-primary">
                        <div>ASSET LIST</div>
                        <div className="space-x-4">
                            <ButtonComponents>
                                IMPORT
                            </ButtonComponents>
                            <ButtonComponents>
                                EXPORT
                            </ButtonComponents>
                            <ButtonComponents click={() => {
                                setStatus(d => ({
                                    ...d,
                                    ADDASSET: !d.ADDASSET
                                }))
                            }}>
                                [ + ] ADD
                            </ButtonComponents>
                            <ButtonComponents>
                                NET DISCOVERY
                            </ButtonComponents>
                        </div>
                    </div>
                </CardBox>
                <CardBox className="flex-1">
                    <TitleContent>
                        <div className="text-[24px] uppercase">DETAIL PROTECTED SITE A</div>
                    </TitleContent>
                    <TableInline border paggination hoverDisable columns={[
                        {
                            title: 'ID',
                            key: 'id',
                            rowClass: "w-[50px]"
                        },
                        {
                            title: 'NAME',
                            key: 'name',
                            rowClass: "w-[150px]"
                        },
                        {
                            title: 'IP/DOMAIN',
                            rowClass: "w-[150px]",
                            key: 'ip',
                        },
                        {
                            title: 'PROTECTED SITE',
                            rowClass: "w-[200px]",
                            key: 'protect',
                        },
                        {
                            title: 'LAST SCAN',
                            key: 'lastScan',
                            rowClass: "w-[100px]",
                        },
                        {
                            title: 'ARCHIVED',
                            rowClass: "text-center w-[100px]",
                            columnClass: "text-center",
                            key: 'archived',
                        },
                        {
                            title: null,
                            key: null,
                        },
                        {
                            title: 'CRIT',
                            rowClass: "w-[80px] text-center",
                            columnClass: "text-center",
                            key: 'crit',
                        },
                        {
                            title: 'HIGH',
                            rowClass: "w-[80px] text-center",
                            columnClass: "text-center",
                            key: 'high',
                        },
                        {
                            title: 'MEDIUM',
                            rowClass: "w-[80px] text-center",
                            columnClass: "text-center",
                            key: 'med',
                        },
                        {
                            title: 'LOW',
                            rowClass: "w-[80px] text-center",
                            columnClass: "text-center",
                            key: 'low',
                        },
                        {
                            title: 'VIEW',
                            rowClass: "w-[100px] text-center",
                            columnClass: "text-center",
                            html: () => {
                                return <button className="flex items-center justify-center gap-4 w-full ">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V16C0 16.5304 0.210714 17.0391 0.585786 17.4142C0.960859 17.7893 1.46957 18 2 18H16C17.1 18 18 17.1 18 16V2C18 1.46957 17.7893 0.960859 17.4142 0.585786C17.0391 0.210714 16.5304 0 16 0ZM16 16H2V4H16V16ZM9 7.5C10.84 7.5 12.48 8.46 13.34 10C12.48 11.54 10.84 12.5 9 12.5C7.16 12.5 5.52 11.54 4.66 10C5.52 8.46 7.16 7.5 9 7.5ZM9 6C6.27 6 3.94 7.66 3 10C3.94 12.34 6.27 14 9 14C11.73 14 14.06 12.34 15 10C14.06 7.66 11.73 6 9 6ZM9 11.5C8.17 11.5 7.5 10.83 7.5 10C7.5 9.17 8.17 8.5 9 8.5C9.83 8.5 10.5 9.17 10.5 10C10.5 10.83 9.83 11.5 9 11.5Z" fill="#00D8FF" />
                                    </svg>

                                    VIEW
                                </button>
                            }
                        }
                    ]}
                        data={
                            new Array(20).fill({
                                id: "EH-1",
                                name: "ASSETNAME_1",
                                ip: "HTTP://192.168.1.1",
                                protect: "PROTECTED SITE A",
                                lastScan: "2023/02/14",
                                archived: "false",
                                crit: 2,
                                high: 2,
                                med: 2,
                                low: 2,
                            })
                        }></TableInline>
                </CardBox>
            </div>
            <ModalsComponent width={null} style={`
                width: 100%;
                min-width: 100%;
                padding: 20px!important;
                .ant-modal-content {
                    width: 100%;
                    min-width: 100%;
                }
            `} modalName={"ADDASSET"}>
                <CardBox className={"gap-9"}>
                    <TitleContent>
                        <div className="text-[24px] uppercase">add new asset</div>
                    </TitleContent>
                    <div className="grid grid-cols-3 gap-7">
                        <div className="space-y-8">
                            <Form.input label={"Asset Name"} />
                            <Form.input label={"business unit *"} />
                            <Form.input label={"contains pii data"} />
                            <Form.input label={"select existing system owner"} />
                            <Form.input label={"brand"} />
                            <Form.input label={"server"} />
                            <Form.texarea label={"description"}></Form.texarea>
                        </div>
                        <div className="space-y-8">
                            <Form.input label={"asset ip / url *"} />
                            <Form.input label={"asset risk group *"} />
                            <Form.input label={"system owner"} />
                            <Form.input label={"hostname (fqdn)"} />
                            <Form.input label={"application criticality"} />
                            <Form.input label={"tags"} />
                            <Form.texarea label={"available scanning windows"}></Form.texarea>
                        </div>
                        <div className="space-y-8 flex flex-col">
                            <Form.input label={"asset id / tag"} />
                            <Form.input label={"environment"} />
                            <Form.input label={"system owner email *"} />
                            <Form.input label={"mac address"} />
                            <Form.input label={"frontend / backend"} />
                            <div className="flex-1">
                                <div className="w-full h-full flex items-end justify-end">

                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-5 gap-6 col-span-full">
                            <div></div>
                            <div className="col-span-4 space-y-6">
                                {arrInput.map((d, k) => {
                                    return (
                                        <ListInput key={k} className="grid grid-cols-4 gap-6 relative">
                                            {d.inputRow.map((d, k) => <div key={k}><Form.input label={d.label} /></div>)}
                                            <div className="col-span-full flex justify-end">
                                                <div className="delete">
                                                    <ButtonComponents click={() => {
                                                        var filtered = arrInput.filter(function (el) { return el.id != d.id; });

                                                        setArrInput(filtered)
                                                    }}>DELETE</ButtonComponents>
                                                </div>
                                            </div>
                                        </ListInput>
                                    )
                                })}
                                <div className="col-span-full">
                                    <ButtonComponents className="w-full flex items-center justify-center" click={() => {
                                        let inputs = `inputRow`
                                        let momtent = moment().valueOf()
                                        setArrInput(d => ([
                                            ...d,
                                            {
                                                id: momtent,
                                                [inputs]: [
                                                    {
                                                        label: "CATEGORIES",
                                                        type: "category"
                                                    },
                                                    {
                                                        label: "NAME",
                                                        type: "name"
                                                    },
                                                    {
                                                        label: "PORT",
                                                        type: "port"
                                                    },
                                                    {
                                                        label: "VERSION",
                                                        type: "version"
                                                    },
                                                ]
                                            }
                                        ]))
                                    }}>
                                        <div className="flex items-center gap-4 py-2 px-5">
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6 14V8H0V6H6V0H8V6H14V8H8V14H6Z" fill="#00D8FF" />
                                            </svg>

                                            <div>
                                                add platform
                                            </div>
                                        </div>
                                    </ButtonComponents>
                                </div>
                            </div>

                        </div>
                    </div>
                </CardBox>
            </ModalsComponent>
        </LayoutDashboard>
    )
}

const ListInput = styled.div`

`

export default AssetsList