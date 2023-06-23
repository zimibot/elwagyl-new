import { DeleteOutlined, EditFilled } from "@ant-design/icons"
import { Popconfirm, Popover, Tooltip } from "antd"
import { CardBox } from "../../components/layout/card"
import { TitleContent } from "../../components/layout/title"
import { TableInline } from "../../components/table"
import { GET_API_EHA } from "../../api/eha/GET"
import { ErrorHtml, Loading } from "."
import { ButtonComponents } from "../../components.eha/button"
import { GetAndUpdateContext } from "../../model/context.function"
import { ModalsComponent } from "../../components.eha/modal"
import { Form } from "../../components.eha/input"
import { SelectComponent } from "../../components.eha/select"
import { useForm } from "react-hook-form"
import { POST_API } from "../../api/eha/POST"
import { useEffect } from "react"
import { UPDATE_API } from "../../api/eha/UPDATE"
import { DELETE_API } from "../../api/eha/DELETE"
import { GET_API_UMS } from "../../api/ums/GET"

export const ListManageScan = () => {
    const api = GET_API_EHA.root([
        {
            active: "scanTools"
        },
        {
            active: "scanToolsDetail"
        },
        {
            active: "toolsScanner"
        },
    ])

    const { setStatus } = GetAndUpdateContext()
    return (
        <CardBox className="flex-1">
            <TitleContent className="justify-between" subTitle={false}>
                <div className="flex justify-between w-full items-center">
                    <div className="text-[24px] uppercase text-blue">manage scan profiles</div>
                    {/* <ButtonComponents click={() => {
                        setStatus(d => ({
                            ...d,
                            editScanTools: true,
                            getData: null
                        }))
                    }}>ADD SCAN TOOLS</ButtonComponents> */}
                </div>

            </TitleContent>
            {api.msg || api.error ? <ErrorHtml error={api.msg}></ErrorHtml> : api.loading ? <Loading /> : <TableInline border hoverDisable columns={[
                {
                    title: 'Name',
                    key: 'name',
                    rowClass: "w-[250px]",
                    html: (d) => {
                        var find = "Nessus Staging";

                        var regex = new RegExp(find, "g");
                        return d.replace(regex, "E.H.A")
                    }
                },
                {
                    title: 'scanning tools',
                    key: 'scanning_tools',
                    rowClass: "w-[250px]",
                    html: (d) => {
                        var find = "Nessus";

                        var regex = new RegExp(find, "g");

                        return d?.replace(regex, "E.H.A Engine")
                    }
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
                // {
                //     title: 'EDIT',
                //     key: 'id',
                //     rowClass: "w-[50px]",
                //     columnClass: "w-[50px]",
                //     html: (id) => {
                //         return <Tooltip title="EDIT">
                //             <button className="flex items-center justify-center w-full text-[1.2rem]" onClick={async () => {
                //                 let data = await api.scanToolsDetail({ idScan: id })
                //                 let { name, scanning_tools, role, status, created_by, updated_by } = data.items.result
                //                 let update = {
                //                     "id": id,
                //                     "name": name,
                //                     "scanning_tools": scanning_tools,
                //                     "role": role,
                //                     "status": status,
                //                     "created_by": created_by,
                //                     "updated_by": created_by
                //                 }

                //                 console.log(id)
                //                 setStatus((d) => ({
                //                     ...d,
                //                     editScanTools: true,
                //                     getData: update
                //                 }))
                //             }}>
                //                 <EditFilled></EditFilled>
                //             </button>
                //         </Tooltip>
                //     }
                // },
                // {
                //     title: 'DELETE',
                //     key: 'id',
                //     rowClass: "w-[100px]",
                //     columnClass: "w-[100px] text-center",
                //     html: (id, full) => {
                //         return <Popconfirm cancelText="CANCEL" okText="DELETE" onConfirm={async () => {
                //             DELETE_API.deleteScanManage({
                //                 site_name: full.name,
                //                 id: id,
                //                 name: full.created_by
                //             }, setStatus)
                //         }} title="Delete the task"
                //             description="Are you sure to delete this task?"
                //         >
                //             <button className="flex items-center justify-center w-full text-[1.2rem]" >
                //                 <DeleteOutlined></DeleteOutlined>
                //             </button>
                //         </Popconfirm>
                //     }
                // },

            ]}
                data={
                    api.data.scanTools.result
                } />}

            <EditAndAdd data={api.data.toolsScanner.result}></EditAndAdd>
        </CardBox>
    )
}


const EditAndAdd = (data) => {
    const { setStatus, status } = GetAndUpdateContext()
    const elwagylAPi = GET_API_UMS.root(["UserGetRoles", "UserGetUser"])

    console.log(elwagylAPi)
    const { register, handleSubmit, control, reset, setValue, formState: { errors } } = useForm();
    const onSubmit = data => {
        data = {
            ...data,
            created_by: localStorage.getItem("user")
        }
        status.getData ? UPDATE_API.updateScanManage(status.getData.id, data, setStatus) : POST_API.addScanManage(data, reset, setStatus)
    };

    useEffect(() => {

        if (status.getData) {
            let data = status.getData
            for (const key in data) {
                setValue(key, data[key])
            }
        }

    }, [status.getData])


    return <ModalsComponent modalName={"editScanTools"}>
        <TitleContent className="justify-between" subTitle={false}>
            <div className="flex justify-between w-full items-center">
                <div className="text-[24px] uppercase text-blue">{status.getData ? "EDIT" : "ADD"} manage scan profiles</div>
            </div>

        </TitleContent>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* <Form.input register={register("name", { required: true })} label={"Name"} /> */}
            <SelectComponent onChangeData={(data) => {
                let findItem = elwagylAPi.data.UserGetUser.data.find(d => d.username === data)
                setValue("role", findItem.role.name)
            }} error={errors.name} control={control} name={"name"} className={"w-full"} width={"100%"} height={"45"} label={"name"}
                data={elwagylAPi.data.UserGetUser.data ? elwagylAPi.data.UserGetUser.data.map(d => ({
                    label: d.username,
                    value: d.username
                })) : []}
            ></SelectComponent>
            {/* <Form.input register={register("scanning_tools", { required: true })} label={"Scanning tools"} /> */}
            <SelectComponent error={errors.scanning_tools} control={control} name={"scanning_tools"} className={"w-full"} width={"100%"} height={"45"} label={"Scanning tools"}
                data={data.data ? data.data : []}
            ></SelectComponent>
            <Form.input disabled placeholder="Please First Select Name" error={errors.role} register={register("role", { required: true })} label={"role"} />

            {/* <SelectComponent control={control} name={"role"} className={"w-full"} width={"100%"} height={"45"} label={"role"}
                data={[
                    {
                        value: "admin",
                        label: "admin"
                    },
                    {
                        value: "user",
                        label: "user"
                    },
                    {
                        value: "guest",
                        label: "guest"
                    },
                    {
                        value: "security analyst",
                        label: "SECURITY ANALYST"
                    },
                ]}
            ></SelectComponent> */}
            <SelectComponent control={control} name={"status"} className={"w-full"} width={"100%"} height={"45"} label={"status"}
                data={[
                    {
                        value: "success",
                        label: "SUCCESS"
                    },
                    {
                        value: "active",
                        label: "active"
                    },
                    {
                        value: "pending",
                        label: "PENDING"
                    },
                    {
                        value: "fail",
                        label: "FAIL"
                    },
                ]}
            ></SelectComponent>



            {/* <Form.input label={"status"} /> */}
            {/* <Form.input register={register("created_by", { required: true })} label={"Created By"} /> */}
            <div className="flex justify-end gap-4">
                <ButtonComponents>SUBMIT</ButtonComponents>
                <ButtonComponents nonSubmit className="text-red-500" click={() => {
                    reset()
                    setStatus(d => ({
                        ...d,
                        editScanTools: false
                    }))
                }}>CANCEL</ButtonComponents>
            </div>
        </form>
    </ModalsComponent>
}