import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { CardAnimation, CardBox } from "../../components/layout/card"
import { LayoutDashboard } from "../../components/layout/dashboard.layout"
import { TitleContent } from "../../components/layout/title"
import { TableInline } from "../../components/table"
import { ModalsComponent } from "../../components.eha/modal"
import { ButtonComponents } from "../../components.eha/button"
import { GetAndUpdateContext } from "../../model/context.function"
import { Form } from "../../components.eha/input"
import { SelectComponent } from "../../components.eha/select"
import { useForm } from "react-hook-form"
import { GET_API_UMS } from "../../api/ums/GET"
import { useState } from "react"
import { Popconfirm } from "antd"
import styled from "styled-components"
import axios from "axios"
import { path } from "../../api/elwagyl"
import { toast } from "react-hot-toast"
import { useEffect } from "react"

const UserManagement = () => {
    const { setStatus } = GetAndUpdateContext()
    const api = GET_API_UMS.root(["UserGetUser"])


    return <LayoutDashboard>
        <CardBox className="col-span-full">
            <TitleContent subTitle={false}>
                <div className="flex justify-between w-full items-center">
                    <div className="text-[24px] uppercase text-blue">LIST USER</div>
                    <ButtonComponents click={() => {
                        setStatus((d) => ({
                            ...d,
                            id_user: null,
                            user_modal: true
                        }))
                    }}>ADD USER</ButtonComponents>
                </div>
            </TitleContent>
            {api.error ? "" : api.loading ? "" : <TableInline classTable={"text-[16px]"} border hoverDisable columns={[
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
                    key: 'name',
                    columnClass: "text-center",
                    rowClass: "w-[100px] text-center"
                },
                {},
                {
                    title: 'delete',
                    key: 'id',
                    rowClass: "w-[100px] text-center",
                    columnClass: "text-center",
                    html: (id) => {
                        return <PopConfirm onConfirm={() => {
                            toast.promise(axios.delete(`${path}/users/${id}`, {
                                headers: {
                                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                                }
                            }), {
                                loading: "Loading",
                                success: () => {
                                    api.data.UserGetUser.refetch()
                                    return "Success Delete"
                                },
                                error: "Error Delete"

                            },
                                {
                                    style: {
                                        background: '#333',
                                        color: '#fff',
                                        fontSize: 20,
                                        borderRadius: 0
                                    }
                                })

                        }} placement="left" title="YOU SURE DELETE THIS USER ?" okText="DELETE" cancelText="CANCEL">
                            <button><DeleteOutlined></DeleteOutlined></button>
                        </PopConfirm>
                    }
                },
                {
                    title: 'edit',
                    key: 'id',
                    columnClass: "text-center",
                    rowClass: "w-[100px] text-center",
                    html: (id, full) => {
                        return <button onClick={() => {
                            setStatus((d) => ({
                                ...d,
                                id_user: id,
                                user_modal: true
                            }))
                        }}><EditOutlined></EditOutlined></button>
                    }
                },


            ]} data={
                api.data.UserGetUser.data.map(d => ({
                    ...d.role,
                    ...d,
                }))
                // new Array(10).fill({
                //     fullname: 'Roka aslo',
                //     username: 'pendekar',
                //     email: "pendekar@gmail.com",
                //     roles: "admin",
                // })
            } />}

        </CardBox>
        <AddUser />
    </LayoutDashboard>
}

const PopConfirm = styled(Popconfirm)``

const AddUser = () => {
    const { setStatus, status } = GetAndUpdateContext()

    const api = GET_API_UMS.root(["UserGetRoles", "UserGetUser"])

    const { register, control, handleSubmit,  reset, setValue, formState: { errors } } = useForm()

    const onSubmit = (data) => {
        toastItem({ api, name: "UserGetUser", type: "post", url: "/users", data, successMsg: "ADD USER SUCCESS" })
        reset()
    }



    useEffect(() => {
        if (status.id_user) {
            fetch(`${path}/users/${status.id_user}`, {
                method: "GET", headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }).then(res => res.json()).then(d => {
                console.log(d)
            })
        }
    }, [status.id_user])

    return <ModalsComponent modalName={"user_modal"} title={status.id_user ? "edit user" : "add new user"}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Form.input error={errors.fullname} register={register("fullname", { required: true })} label={"full name"}></Form.input>
            <Form.input error={errors.email} register={register("email", { required: true })} label={"email"}></Form.input>
            <Form.input error={errors.username} register={register("username", { required: true })} label={"username"}></Form.input>
            <Form.input error={errors.password} register={register("password", { required: true })} type="password" label={"password"}></Form.input>
            <div className="relative">
                <SelectComponent ClassLabel={"flex justify-between"} button={
                    <PopConfirm okText={<span className="text-black font-bold">CANCEL</span>} showCancel={false} description={<AddRoles ></AddRoles>} icon={false}>
                        <div className="py-2 px-4 cursor-pointer bg-blue hover:bg-opacity-60 text-black text-[14px]">
                            MANAGE
                        </div>
                    </PopConfirm>

                } data={api.error ? [] : api.loading ? [] : api.data.UserGetRoles.data.map(d => ({
                    label: d.name,
                    value: d.id
                }))} width={"100%"} error={errors.role_id} height={45} control={control} name={"role_id"} label={"roles"} />
                {/* <CardAnimation>
                    {addRoles && <div className="absolute bottom-[55px] w-full flex items-center justify-end space-y-4">
                        <AddRoles></AddRoles>
                    </div>}
                </CardAnimation> */}
            </div>
            <div className="flex justify-end gap-4 pt-10">
                <ButtonComponents nonSubmit className="py-4 w-48 text-red-500" click={() => {
                    setStatus((d) => ({
                        ...d,
                        user_modal: false
                    }))
                }}>CANCEL</ButtonComponents>
                <ButtonComponents className="py-4 w-48">SUBMIT</ButtonComponents>
            </div>
        </form>
    </ModalsComponent>

}

export const toastItem = ({ data, api, url, type, name, successMsg }) => {
    return new Promise((resolve, reject) => {
        data = data ? data : {}

        toast.promise(
            axios(`${path}${url}`, {
                method: type,
                data,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }),
            {
                loading: 'LOADING...',
                success: (d) => {
                    api.data[name].refetch()
                    resolve({
                        success: true
                    })
                    return <b>{successMsg}</b>
                },
                error: (d) => {
                    reject(d)
                    return "ERROR"
                },
            }, {
            style: {
                background: '#333',
                color: '#fff',
                fontSize: 20,
                borderRadius: 0
            },
        })
    })


}

const AddRoles = () => {
    const { register, handleSubmit, reset } = useForm()

    const [addRoles, setAddRoles] = useState(false)
    const api = GET_API_UMS.root(["UserGetRoles"])


    const onSubmit = (data) => {
        reset()
        toastItem({ data, api, url: "/users/roles", type: "post", name: "UserGetRoles", successMsg: "ADD ROLES SUCCESS" })
    }

    return <form onSubmit={handleSubmit(onSubmit)} className=" h-full justify-between flex flex-col gap-4 bg-border_second p-4 ml-[-34px] mr-[-10px] mt-[-20px]">
        <div>
            <div className="flex gap-2">
                <div className={`cursor-pointer  ${addRoles ? "bg-blue" : "bg-primary"} hover:bg-blue px-4 py-2`} onClick={() => setAddRoles(true)}>
                    ADD ROLES
                </div>
                <div className={`cursor-pointer ${!addRoles ? "bg-blue" : "bg-primary"} px-4 py-2 hover:bg-blue`} onClick={() => setAddRoles(false)}>
                    DELETE ROLES
                </div>
            </div>
        </div>
        {addRoles ? <div className="flex flex-col gap-4 w-80">
            <Form.input register={register("name", { required: true })} ></Form.input>
            <ButtonComponents>SUBMIT</ButtonComponents>
        </div> : <CardAnimation className="w-[500px] max-h-96 overflow-auto pr-2 space-y-4">
            {api.error ? "ERROR" : api.loading ? <div>LOADING</div> : api.data.UserGetRoles.data.map(d => {
                return <div key={d.id} className="border border-primary px-4 py-2 flex justify-between">
                    <div>{d.name}</div>
                    <Popconfirm title="Deleted Roles" onConfirm={() => {
                        toastItem({ api, url: `/users/roles/${d.id}`, type: "delete", name: "UserGetRoles" })
                    }}>
                        <div className="cursor-pointer text-blue">
                            <DeleteOutlined></DeleteOutlined>
                        </div>
                    </Popconfirm>
                </div>
            })}
        </CardAnimation>}

    </form>
}

export default UserManagement