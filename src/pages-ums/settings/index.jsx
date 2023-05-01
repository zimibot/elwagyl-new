import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { CardBox } from "../../components/layout/card"
import { LayoutDashboard } from "../../components/layout/dashboard.layout"
import { TitleContent } from "../../components/layout/title"
import { TableInline } from "../../components/table"
import { ModalsComponent } from "../../components.eha/modal"
import { ButtonComponents } from "../../components.eha/button"
import { GetAndUpdateContext } from "../../model/context.function"
import { Form } from "../../components.eha/input"
import { SelectComponent } from "../../components.eha/select"
import { useForm } from "react-hook-form"
import { Result } from "antd"

const Settings = () => {
    const { setStatus } = GetAndUpdateContext()
    return <LayoutDashboard>
        <CardBox className="col-span-full">
            <TitleContent subTitle={false}>
                <div className="flex justify-between w-full items-center">
                    <div className="text-[24px] uppercase text-blue">PERMISSION PAGE</div>
                    <ButtonComponents click={() => {
                        setStatus((d) => ({
                            ...d,
                            user_add: true
                        }))
                    }}>[ + ] ADD</ButtonComponents>
                </div>
            </TitleContent>
            <TableInline classTable={"text-[16px]"} border hoverDisable columns={[
                {
                    title: 'Username',
                    key: 'username',
                    rowClass: "w-[150px]"
                },
                {
                    title: 'roles',
                    key: 'roles',
                    columnClass: "text-center",
                    rowClass: "w-[100px] text-center"
                },
                {
                    title: 'ALLOWED ACCESS PAGE',
                    key: 'allowed',
                },
                {
                    title: 'DATE CREATED',
                    key: 'date',
                    columnClass: "text-center",
                    rowClass: "w-[150px] text-center"
                },
                {
                    title: 'edit',
                    key: 'id',
                    columnClass: "text-center",
                    rowClass: "w-[100px] text-center",
                    html: () => {
                        return <EditOutlined></EditOutlined>
                    }
                },
                {
                    title: 'delete',
                    key: 'id',
                    rowClass: "w-[100px] text-center",
                    columnClass: "text-center",
                    html: () => {
                        return <DeleteOutlined></DeleteOutlined>
                    }
                },

            ]} data={new Array(10).fill({
                fullname: 'Roka aslo',
                username: 'pendekar',
                allowed: "MAIN DECK, EXECUTE,  AVAILABILITY,....",
                roles: "admin",
            })} />
        </CardBox>
        <AddUser />
    </LayoutDashboard>
}

const AddUser = () => {
    const { setStatus } = GetAndUpdateContext()

    const { register, control, handleSubmit, watch } = useForm()

    const onSubmit = () => {

    }

    let input = watch()

    console.log(input)


    return <ModalsComponent width={"100%"} heightContent={"inherit"} style={{
        height: "100%",
        padding: "20px!important"
    }} modalName={"user_add"} title={"add USER PERMISSION"}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 flex-col justify-between flex-1">
            <div className="grid grid-cols-3  flex-1">
                <div className="space-y-4 border-r  border-primary  pr-4">
                    <div className="grid grid-cols-2 gap-4">
                        <SelectComponent data={[
                            {
                                label: "kusuma",
                                value: 1
                            },
                            {
                                label: "hadi    ",
                                value: 2
                            },
                        ]} width={"100%"} height={45} control={control} name={"username"} label={"username"}></SelectComponent>
                        <Form.input disabled label={"roles"}></Form.input>
                    </div>
                    <SelectComponent data={[
                        {
                            label: "ELWAGYL",
                            value: 1
                        },
                        {
                            label: "e.h.a",
                            value: 2
                        },
                    ]} mode="multiple" width={"100%"} height={45} control={control} name={"group_access"} label={"GROUP ACCESS"}></SelectComponent>
                </div>
                {input.group_access ? input.group_access.map((d, k) => {
                    return <TableAccess keyId={input.group_access} input={input} control={control} key={d} id={d}></TableAccess>
                }) : <div className="col-span-2 flex items-center justify-center">
                    <div className="border border-blue p-4">
                        PLEASE SELECT GROUP ACCESS
                    </div>
                </div>}
            </div>
            <div className="flex justify-end gap-4">
                <ButtonComponents nonSubmit className="py-4 w-48 text-red-500" click={() => {
                    setStatus((d) => ({
                        ...d,
                        user_add: false
                    }))
                }}>CANCEL</ButtonComponents>
                <ButtonComponents className="py-4 w-48">SUBMIT</ButtonComponents>
            </div>
        </form>
    </ModalsComponent>

}

const TableAccess = ({ id, control, input, keyId }) => {
    if (id === 1) {
        return <div className={`flex flex-col space-y-4 pl-4 pr-4 ${keyId.length === 1 ? "col-span-2" : ""}`}>
            <span> ELWAGYL</span>
            <TableInline border hoverDisable columns={[
                {
                    title: 'Page name',
                    key: 'page_name',
                },
                {
                    title: 'show',
                    key: 'id',
                    rowClass: "w-[120px]",
                    html: (id) => {
                        return <Form.switch checkedChildren="ON" unCheckedChildren="OFF" name={`switch-${id}`} control={control}></Form.switch>
                    }
                },
            ]} data={[
                {
                    page_name: "cyber deck",
                    id: 1
                },
                {
                    page_name: "EXECUTIVE",
                    id: 2
                },
                {
                    page_name: "AVAILABILITY",
                    id: 3
                },
                {
                    page_name: "THREAT MAP",
                    id: 4
                },
                {
                    page_name: "SOAR",
                    id: 5
                },
                {
                    page_name: "XDR",
                    id: 6
                },
                {
                    page_name: "FIREWALL",
                    id: 7
                },
                {
                    page_name: "SASE",
                    id: 8
                },
                {
                    page_name: "E.H.A",
                    id: 9
                },
            ]} classTable={"text-[15px]"} />
        </div>
    } else {
        return <div className={`flex flex-col space-y-4 pl-4  ${keyId.length === 1 ? "col-span-2" : ""}`}>
            <span> E.H.A</span>
            <TableInline border hoverDisable columns={[
                {
                    title: 'Page name',
                    key: 'page_name',
                },
                {
                    title: 'show',
                    key: 'id',
                    rowClass: "w-[120px]",
                    html: (id) => {
                        return <Form.switch checkedChildren="ON" unCheckedChildren="OFF" name={`eha-show-${id}`} control={control}></Form.switch>
                    }
                },
                {
                    title: 'ADD',
                    key: 'id',
                    rowClass: "w-[120px]",
                    html: (id) => {
                        return <Form.switch disabled={input[`eha-show-${id}`] ? false : true} checkedChildren="ON" unCheckedChildren="OFF" name={`add-${id}`} control={control}></Form.switch>
                    }
                },
                {
                    title: 'edit',
                    key: 'id',
                    rowClass: "w-[120px]",
                    html: (id) => {
                        return <Form.switch disabled={input[`eha-show-${id}`] ? false : true} checkedChildren="ON" unCheckedChildren="OFF" name={`edit-${id}`} control={control}></Form.switch>
                    }
                },
                {
                    title: 'delete',
                    key: 'id',
                    rowClass: "w-[120px]",
                    html: (id) => {
                        return <Form.switch disabled={input[`eha-show-${id}`] ? false : true} checkedChildren="ON" unCheckedChildren="OFF" name={`delete-${id}`} control={control}></Form.switch>
                    }
                },
            ]} data={[
                {
                    page_name: "main deck",
                    id: 1
                },
                {
                    page_name: "profile indicator",
                    id: 2
                },
                {
                    page_name: "asset",
                    id: 3
                },
                {
                    page_name: "scan",
                    id: 4
                },
                {
                    page_name: "vulnerability",
                    id: 5
                },
                {
                    page_name: "protected site",
                    id: 6
                },
                {
                    page_name: "manage scan",
                    id: 7
                },
                {
                    page_name: "manage email",
                    id: 8
                },
                {
                    page_name: "manage asset",
                    id: 9
                },
            ]} classTable={"text-[15px]"} />
        </div>
    }

}

export default Settings