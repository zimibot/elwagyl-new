import { CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons"
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
import { GET_API_UMS } from "../../api/ums/GET"
import { useState } from "react"
import { toastItem } from "../usermanagement"
import { Loading } from "../../pages-eha/list.maintenance"
import { isDev } from "../../helper/context"
import { useEffect } from "react"
import { Popconfirm } from "antd"
import axios from "axios"
import { path } from "../../api/elwagyl"
import { toast } from "react-hot-toast"

const Settings = () => {
    const { setStatus } = GetAndUpdateContext()

    const api = GET_API_UMS.root(["SettingsPagesPermission", "SettingsPagesPermissionDetail"])

    return <LayoutDashboard>
        <CardBox className="col-span-full">
            <TitleContent subTitle={false}>
                <div className="flex justify-between w-full items-center">
                    <div className="text-[24px] uppercase text-blue">PERMISSION PAGE</div>
                    <ButtonComponents click={() => {
                        setStatus((d) => ({
                            ...d,
                            user_add: true,
                            premission_data: null
                        }))
                    }}>[ + ] ADD</ButtonComponents>
                </div>
            </TitleContent>
            {api.error ? "" : api.loading ? <Loading></Loading> : <TableInline ischeck={true} Loading={api.isFetching} classTable={"text-[16px]"} border hoverDisable columns={[
                {
                    title: 'Username',
                    key: 'username',
                    rowClass: "w-[150px]",
                    columnClass: "w-[150px]",

                },
                {
                    title: 'email',
                    key: 'email',
                    columnClass: "w-[300px]",
                    rowClass: "w-[300px]",
                },
                {
                    title: 'ALLOWED ACCESS PAGE',
                    key: 'pages',
                    htmlDropdown: (data) => {
                        let { current, subDropdown } = data
                        // let items = []

                        // console.log(data)

                        // if (data.length > 0) {
                        //     data.map((d) => ({
                        //         ...d,
                        //         pages: d.pages.map(d => {
                        //             items.push(d)
                        //         })
                        //     }))
                        // }

                        // return <div className=" flex flex-wrap">
                        //     {items.map((d, k) => (<div key={k} className="flex">
                        //         <div className="px-2">{d.name}</div>
                        //         |
                        //     </div>
                        //     ))}
                        // </div>

                        return <div className="flex gap-4">
                            {
                                current?.map((d, k) => {
                                    return <button onClick={subDropdown} className="border border-border_second flex hover:bg-blue hover:text-black" key={k}>
                                        <div className="px-2">
                                            {d.group}
                                        </div>
                                        <div className="border-l border-border_second px-4 bg-border_second text-blue">
                                            {d.pages.length}
                                        </div>
                                    </button>
                                })
                            }
                        </div>
                    }
                },
                {
                    title: 'DATE CREATED',
                    key: 'date',
                    columnClass: "w-[150px] text-center",
                    rowClass: "w-[150px] text-center"
                },
                {
                    title: 'edit',
                    key: 'id',
                    columnClass: "w-[80px]  text-center",
                    rowClass: "w-[80px] text-center",
                    html: (id) => {
                        return <button onClick={() => {
                            setStatus((d) => ({
                                ...d,
                                premission_data: id,
                                user_add: true
                            }))
                        }}>
                            <EditOutlined></EditOutlined>
                        </button>
                    }
                },
                {
                    title: 'delete',
                    key: 'id',
                    rowClass: "w-[80px] text-center",
                    columnClass: "w-[80px]  text-center",
                    html: (id) => {
                        return <Popconfirm placement="left" title="Are you sure you want to delete this data?" onConfirm={() => {
                            axios.delete(`${path}/users/permissions/${id}`, {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem("token")}`
                                }
                            }).then(() => {
                                toast.success("Deleted Success")
                                api.data.SettingsPagesPermission.refetch()
                            }).catch(() => {
                                toast.error("Deleted Error")
                            })
                        }}>
                            <DeleteOutlined></DeleteOutlined>
                        </Popconfirm>
                    }
                },

            ]}
                htmlDropdown={({ data }) => {
                    let { pages } = data


                    return <div className="p-4 grid grid-cols-2 gap-4">
                        {!pages ? "NO DATA" : pages.map((d, k) => {
                            return <div key={k} className="w-full h-full bg-primary p-4 flex-col flex">
                                <div className="w-full grid grid-cols-2">
                                    <div className="font-bold">{d.group}</div>
                                    <div className="grid grid-cols-4 text-center">
                                        <div>SHOW</div>
                                        <div>ADD</div>
                                        <div>EDIT</div>
                                        <div>DELETE</div>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    {d.pages.length === 0 ? <div className="flex justify-center items-center h-full">NO DATA</div> : d.pages.map((d, k) => {
                                        let add = d.add ? <CheckOutlined></CheckOutlined> : <CloseOutlined className="text-red-500" />
                                        let edit = d.edit ? <CheckOutlined></CheckOutlined> : <CloseOutlined className="text-red-500" />
                                        let show = d.show ? <CheckOutlined></CheckOutlined> : <CloseOutlined className="text-red-500" />
                                        let Delete = d.delete ? <CheckOutlined></CheckOutlined> : <CloseOutlined className="text-red-500" />

                                        return <div key={k} className="grid grid-cols-2">
                                            <div className="font-thin">{d.name}</div>
                                            <div className="grid grid-cols-4 text-center">
                                                <div>
                                                    {show}
                                                </div>
                                                <div>
                                                    {add}
                                                </div>
                                                <div>{edit}</div>
                                                <div>{Delete}</div>
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>
                        })}
                    </div>
                }}
                data={api.data.SettingsPagesPermission?.data.map(d => ({
                    ...d,
                    ...d.user = {
                        id_user: d.user.id,
                        username: d.user.username,
                        email: d.user.email
                    },
                }))} />}

        </CardBox>
        <AddSettings />
        <ModalEditPages></ModalEditPages>
    </LayoutDashboard>
}

const ModalEditPages = () => {
    const { status } = GetAndUpdateContext()
    const { register, handleSubmit, setValue } = useForm()
    const api = GET_API_UMS.root(["SettingsPagesAccess"])


    useEffect(() => {
        if (status.pageEdit) {
            let item = status.pageEdit
            for (const key in item) {
                setValue(key, item[key])
            }
        }
    }, [status.pageEdit])


    const onSubmit = (d) => {
        toastItem({ data: d, api, name: "SettingsPagesAccess", url: `/users/pages-access/${status.pageEdit.id}`, successMsg: "EDIT PAGES SUCCESS", type: "put" })
    }

    return <ModalsComponent title={"EDIT PAGES"} modalName={"modalEdit"}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Form.input label={"name"} register={register("name")} />
            <Form.input label={"group"} register={register("group.name")} />
            <Form.input label={"url"} register={register("url")} />
            <ButtonComponents>Submit</ButtonComponents>
        </form>
    </ModalsComponent>
}

const AddSettings = () => {
    const { setStatus, status } = GetAndUpdateContext()

    const api = GET_API_UMS.root(["SettingsGroupAccess", "UserGetUser", "SettingsPagesAccess", "SettingsPagesPermission", "SettingsPagesPermissionDetail"])
    const [group, setGroup] = useState([])

    const { register, control, handleSubmit, setValue, watch, reset, resetField, formState: { errors } } = useForm()

    useEffect(() => {
        const item = async () => {

            if (status.premission_data) {
                let data = await api.SettingsPagesPermissionDetail({ id: status.premission_data })
                let item = data.data
                setValue("group_ids", item.groups.map(d => d.id))
                setValue("user_id", item.user.id)
                let convertedData2 = item.pages.map(item => {
                    let pages = {};
                    item.pages.forEach(page => {
                        pages[page.id] = {
                            show: page.show,
                            id: page.id,
                            name: page.name,
                            url: page.url
                        };
                    });

                    return {
                        pages,
                        group: item.group
                    };
                });


                setValue("pages", convertedData2)
                setGroup(item.groups.map(d => d.name))
            } else {
                reset()
                setGroup([])
            }

        }

        item()

        return () => {
            reset()
            setGroup([])
        }


    }, [status.premission_data])



    const onSubmit = (d) => {
        delete d.roles;
        let item = d.pages.filter(d => d.group !== undefined)
        let pages = item.length > 0 ? item.map(se => ({
            ...se,
            pages: Object.values(se.pages).map((page, k) => {
                return {
                    ...page
                };
            }).filter(d => d.show !== undefined).filter(d => d.show !== false).map(d => (se.group === "E.H.A" ? {
                ...d,
                edit: d.edit === undefined ? false : d.edit,
                delete: d.delete === undefined ? false : d.delete,
                add: d.add === undefined ? false : d.add,
            } : { ...d })).sort((a, b) => a.key - b.key)
        })) : []

        d = {
            ...d,
            pages
        }

        if (status.premission_data) {
            toastItem({ data: d, api, name: "SettingsPagesPermission", url: `/users/permissions/${status.premission_data}`, successMsg: "UPDATE SETTINGS SUCCESS", type: "put" })
        } else {
            toastItem({ data: d, api, name: "SettingsPagesPermission", url: "/users/permissions", successMsg: "ADD SETTINGS SUCCESS", type: "post" }).then(d => {
                setTimeout(() => {
                    reset()
                    setStatus((d) => ({
                        ...d,
                        user_add: false,
                        premission_id: null
                    }))
                }, 500);
            })

        }

    }


    return <ModalsComponent width={"100%"} heightContent={"inherit"} style={{
        height: "100%",
        padding: "20px!important"
    }} modalName={"user_add"} title={"add USER PERMISSION"}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 flex-col justify-between flex-1">
            <div className="grid grid-cols-3  flex-1">
                <div className="space-y-4 border-r border-primary  pr-4">
                    <div className="grid grid-cols-2 gap-4">
                        <SelectComponent onChangeData={(id) => {
                            let user = api.data.UserGetUser.data.find(d => d.id === id)
                            setValue("roles", user.role.name)
                        }} error={errors.user_id}
                            data={api.data.UserGetUser.data ? api.data.UserGetUser.data.map(d => ({
                                label: d.username,
                                value: d.id
                            })) : []} width={"100%"} height={45} control={control} name={"user_id"} label={"username"}></SelectComponent>
                        <Form.input register={register("roles")} disabled label={"roles"}></Form.input>
                    </div>
                    <SelectComponent onChangeData={(__, item) => {
                        setGroup([])
                        item.map(d => {
                            setGroup(s => ([...s, d.label.props.data]))
                        })
                    }} error={errors.group_ids} data={api.data.SettingsGroupAccess.data ? api.data.SettingsGroupAccess.data.map(d => ({
                        label: d.name,
                        value: d.id
                    })) : []} mode="multiple" width={"100%"} height={45} control={control} name={"group_ids"} label={"GROUP ACCESS"}></SelectComponent>
                </div>
                {group.length > 0 ? <div className="grid grid-cols-2 gap-4 col-span-2 px-4"><TableAccess resetField={resetField} api={api} setStatus={setStatus} watch={watch} setValue={setValue} current={group} data={api.data.SettingsPagesAccess.data} control={control} ></TableAccess> </div> : <div className="col-span-2 flex items-center justify-center">
                    <div className="border border-blue p-4">
                        PLEASE SELECT GROUP ACCESS
                    </div>
                </div>}
            </div>
            <div className="flex justify-end gap-4">
                <ButtonComponents nonSubmit className="py-4 w-48 text-red-500" click={() => {
                    setStatus((d) => ({
                        ...d,
                        user_add: false,
                        premission_id: null
                    }))
                }}>CANCEL</ButtonComponents>
                <ButtonComponents className="py-4 w-48">SUBMIT</ButtonComponents>
            </div>
        </form>
    </ModalsComponent>

}

const TableAccess = ({ control, data, current, setValue, watch, setStatus, api, resetField }) => {
    let filteredData = data.filter(item => current.includes(item.group));
    let watchs = watch()

    const checkShow = (gp, id) => {
        try {
            // let data = watchs.pages && isArray(watchs.pages) ? isArray(watchs.pages[k].pages) ? watchs.pages[k].pages[key] : null : null
            let findGp = watchs.pages.find(d => d.group === gp)
            let show = findGp?.pages[id]?.show
            return {
                show
            }
        } catch (error) {

            return {
                show: true
            }
        }
    }


    return filteredData.map((d, k) => {


        let data = [

            {
                title: 'Page name',
                key: 'name',
                html: (name, full) => {

                    return <div className="flex gap-2 items-center">
                        {isDev && <div className="cursor-pointer" onClick={() => {
                            setStatus((w) => ({
                                ...w,
                                modalEdit: true,
                                pageEdit: {
                                    ...full, group: {
                                        name: d.group
                                    }
                                }
                            }))
                        }}><EditOutlined></EditOutlined></div>}
                        <span>{name}</span>
                    </div>
                }
            },
            {
                title: 'show',
                key: 'id',
                rowClass: "w-[110px]",
                columnClass: "w-[110px]",
                html: (id, isi, key) => {
                    let group = d.group
                    return <Form.switch onchangeData={(d) => {
                        setValue(`pages.[${k}].group`, group)
                        setValue(`pages.[${k}].pages.${id}.key`, key)
                        setValue(`pages.[${k}].pages.${id}.id`, id)
                        setValue(`pages.[${k}].pages.${id}.name`, isi.name)
                        setValue(`pages.[${k}].pages.${id}.url`, isi.url)
                        if (!d) {
                            resetField(`pages.[${k}].pages.[${id}].add`)
                            resetField(`pages.[${k}].pages.[${id}].edit`)
                            resetField(`pages.[${k}].pages.[${id}].delete`)
                        }
                    }} checkedChildren="ON" unCheckedChildren="OFF" name={`pages.[${k}].pages.${id}.show`} control={control}></Form.switch>
                }
            },
        ]

        d.group === "E.H.A" ? data.push({
            title: 'add',
            key: 'id',
            rowClass: "w-[110px]",
            columnClass: "w-[110px]",
            html: (id, isi, key) => {
                // let pages = watchs && watchs.pages[k] && watchs.pages[k].pages[key] && watchs.pages[k].pages[key].show

                return <Form.switch disabled={!checkShow(d.group, id).show} checkedChildren="ON" unCheckedChildren="OFF" name={`pages.[${k}].pages.[${id}].add`} control={control}></Form.switch>
            }
        },
            {
                title: 'edit',
                key: 'id',
                rowClass: "w-[110px]",
                columnClass: "w-[110px]",
                html: (id, isi, key) => {

                    return <Form.switch disabled={!checkShow(d.group, id).show} checkedChildren="ON" unCheckedChildren="OFF" name={`pages.[${k}].pages.[${id}].edit`} control={control}></Form.switch>
                }
            },

            {
                title: 'delete',
                key: 'id',
                rowClass: "w-[110px]",
                columnClass: "w-[110px]",
                html: (id, isi, key) => {

                    return <Form.switch disabled={!checkShow(d.group, id).show} checkedChildren="ON" unCheckedChildren="OFF" name={`pages.[${k}].pages.[${id}].delete`} control={control}></Form.switch>
                }
            },) : []


        return <div key={k} className={`flex flex-col space-y-4 ${filteredData.length === 1 ? "col-span-2" : ""}`}>
            <span> {d.group}</span>
            <TableInline Loading={api.isFetching} border hoverDisable columns={data} data={d.pages} classTable={"text-[15px]"} />
        </div>
    })

}

export default Settings