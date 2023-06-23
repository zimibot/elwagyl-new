import { ArrowLeftOutlined } from "@ant-design/icons"
import { ButtonComponents } from "../../components.eha/button"
import { CardBox } from "../../components/layout/card"
import { LayoutDashboard } from "../../components/layout/dashboard.layout"
import { TitleContent } from "../../components/layout/title"
import { useNavigate } from "react-router-dom"
import { TableInline } from "../../components/table"
import { ModalsComponent } from "../../components.eha/modal"
import { GetAndUpdateContext } from "../../model/context.function"
import { Form } from "../../components.eha/input"
import { SelectComponent } from "../../components.eha/select"
import { useForm } from "react-hook-form"
import { GET_API_EHA } from "../../api/eha/GET"
import { useEffect } from "react"
import { POST_API } from "../../api/eha/POST"
import { ErrorHtml } from "../list.maintenance"

const ModalDiscovery = () => {
    const { setStatus } = GetAndUpdateContext()
    const API = GET_API_EHA.root([
        {
            active: "protectedSite"
        },
        {
            active: "scanDetails"
        },
        {
            active: "toolsScanner"
        },
        {
            active: "scanTools"
        },
        {
            active: "scan",
            query: "type=host-discovery"
        },
    ])


    const { register, reset, setValue, control, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = (data) => {
        data = {
            ...data,
            created_by: localStorage.getItem("user"),
            attachment: "",
            is_draft: false
        }

        POST_API.addscanAssets(data, reset, API.data.scan.refetch)

        // console.log(data)

    }

    useEffect(() => {
        reset()
    }, [])
    return <ModalsComponent title={"new discovery scan"} modalName={"modalDiscovery"}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Form.input error={errors.target} label={"target IP RANGE"} register={register("target", { required: true })} placeholder="192.0.0.0/24 or 192.0.0.0 - 192.0.0.255"></Form.input>
            <Form.input error={errors.recipient_email} label={"Email"} register={register("recipient_email", { required: true })} placeholder="Email"></Form.input>
            <Form.input error={errors.remarks} label={"remarks"} register={register("remarks", { required: true })}></Form.input>

            <SelectComponent data={API.data.protectedSite?.result?.map(d => ({
                label: d.site_name,
                value: d.id
            })) || []} error={errors.protected} required width={"100%"} height={45} control={control} name={"protected"} label={"PROTECTED SITE"}></SelectComponent>

            <div className="grid grid-cols-2 gap-4">
                <SelectComponent error={errors.scanning_tools} required width={"100%"} height={45} control={control} name={"scanning_tools"} label={"SCANNING TOOL"} data={API.data.toolsScanner?.result?.map(d => ({
                    label: d === "Nessus" ? "E.H.A ENGINE" : "",
                    value: d
                })) || []}></SelectComponent>
                <SelectComponent error={errors.tool_scanner_id} required loading={API.loading} data={API.data.scanTools?.result?.map(d => {
                    return ({
                        label: d.name,
                        value: d.id
                    })
                })} control={control} name={"tool_scanner_id"} width={"100%"} height={45} label={"Select scanner"}></SelectComponent>
            </div>

            {/* <Form.check text={"START SCAN NOW"}></Form.check> */}
            <div className="flex justify-end gap-4">
                <ButtonComponents nonSubmit click={() => {
                    setStatus(d => ({
                        ...d,
                        modalDiscovery: false,
                    }))
                }} className="py-4 text-red-500">cancel</ButtonComponents>
                <ButtonComponents className="py-4">SUBMIT</ButtonComponents>
            </div>
        </form>
    </ModalsComponent>
}




export const NetDiscovery = () => {
    const { setStatus } = GetAndUpdateContext()
    const prevPage = useNavigate()

    const API = GET_API_EHA.root([
        {
            active: "scan",
            query: "type=host-discovery"
        },
    ])




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
                            setStatus(d => ({
                                ...d,
                                modalDiscovery: !d.ADDASSET,
                            }))
                        }}>
                            [ + ] ADD
                        </ButtonComponents>
                    </div>

                </div>

            </CardBox>
            <CardBox className={"flex-1"}>
                <div className="flex-1 flex flex-col">
                    <div className="flex flex-col flex-1 gap-4">
                        <div className="flex flex-1 flex-col p-4 border border-border_second gap-4">
                            <TitleContent subTitle={false}>
                                <div className="flex items-center justify-between w-full">
                                    <div className="text-[24px] uppercase text-blue">NETWORK DISCOVERY</div>
                                </div>
                            </TitleContent>
                            {API.error ? <ErrorHtml></ErrorHtml> : <TableInline Loading={API.loading || API.isFetching} border hoverDisable data={API.data.scan?.result} columns={[
                                {
                                    title: "Target",
                                    key: "target"
                                },
                              
                                {
                                    title: "SHCEDULED DATE",
                                    key: "scheduled_start_date"
                                },
                                {
                                    title: "PROTECTED SITE",
                                    key: "protected"
                                },
                                {
                                    title: "tool scanner",
                                    key: "tool_scanner",
                                    html: (data) => {
                                        return data?.name
                                    }
                                },
                                {
                                    title: "STATUS",
                                    key: "status"
                                },
                            
                            ]}></TableInline>}

                        </div>
                        {/* <div className="flex flex-1 flex-col p-4 border border-border_second gap-4">
                            <TitleContent subTitle={false}>
                                <div className="flex items-center justify-between w-full">
                                    <div className="text-[24px] uppercase text-blue">PORT SCANS</div>
                                </div>
                            </TitleContent>
                            <TableInline border hoverDisable data={new Array(0).fill({
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
                        </div> */}
                    </div>
                </div>
            </CardBox>
        </div>
        <ModalDiscovery></ModalDiscovery>
    </LayoutDashboard>
}
