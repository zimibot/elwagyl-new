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

const UserManagement = () => {
    const { setStatus } = GetAndUpdateContext()
    return <LayoutDashboard>
        <CardBox className="col-span-full">
            <TitleContent subTitle={false}>
                <div className="flex justify-between w-full items-center">
                    <div className="text-[24px] uppercase text-blue">LIST USER</div>
                    <ButtonComponents click={() => {
                        setStatus((d) => ({
                            ...d,
                            user_add: true
                        }))
                    }}>ADD USER</ButtonComponents>
                </div>
            </TitleContent>
            <TableInline classTable={"text-[16px]"} border hoverDisable columns={[
                {
                    title: 'Full name',
                    key: 'fullname',
                    rowClass: "w-[150px]"
                },
                {
                    title: 'Username',
                    key: 'username',
                    rowClass: "w-[100px]"
                },
                {
                    title: 'email',
                    key: 'email',
                    rowClass: "w-[150px]"
                },
                {
                    title: 'roles',
                    key: 'roles',
                    columnClass: "text-center",
                    rowClass: "w-[100px] text-center"
                },
                {},
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
                email: "pendekar@gmail.com",
                roles: "admin",
            })} />
        </CardBox>
        <AddUser />
    </LayoutDashboard>
}

const AddUser = () => {
    const { setStatus } = GetAndUpdateContext()

    const { register, control, handleSubmit } = useForm()

    const onSubmit = () => {

    }

    return <ModalsComponent modalName={"user_add"} title={"add new user"}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Form.input label={"full name"}></Form.input>
            <Form.input label={"email"}></Form.input>
            <Form.input label={"username"}></Form.input>
            <Form.input type="password" label={"password"}></Form.input>
            <SelectComponent data={[
                {
                    label: "admin",
                    value: 0
                },
                {
                    label: "user",
                    value: 1
                },
            ]} width={"100%"} height={45} control={control} name={"roles"} label={"roles"}></SelectComponent>
            <div className="flex justify-end gap-4 pt-10">
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

export default UserManagement