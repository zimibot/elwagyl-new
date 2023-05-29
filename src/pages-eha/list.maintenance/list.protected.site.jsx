import { POST_API } from "../../api/eha/POST"
import { UPDATE_API } from "../../api/eha/UPDATE"
import { ButtonComponents } from "../../components.eha/button"
import { Form } from "../../components.eha/input"
import { ModalsComponent } from "../../components.eha/modal"
import { CardBox } from "../../components/layout/card"
import { TitleContent } from "../../components/layout/title"
import { TableInline } from "../../components/table"
import { GetAndUpdateContext } from "../../model/context.function"
import { useForm } from "react-hook-form";
import { DeleteFilled, EditFilled } from "@ant-design/icons"
import { useEffect } from "react"
import { Popconfirm } from 'antd';
import { DELETE_API } from "../../api/eha/DELETE"
import { GET_API_EHA } from "../../api/eha/GET"
import { ErrorHtml, Loading } from "."

export const ListProtectedSite = () => {
    const api = GET_API_EHA.root([
        {
            active: "protectedSite"
        },
        {
            active: "protectedSiteDetail"
        }
    ])

    
    const { setStatus } = GetAndUpdateContext()


    return (
        <CardBox className="flex-1">
            <TitleContent className="justify-between" subTitle={null} hide>
                <div className="text-[24px] uppercase text-blue">protected site</div>
                <div className="flex justify-end">
                    <ButtonComponents click={() => {
                        setStatus(d => ({
                            ...d,
                            getData: null,
                            addProtected: true
                        }))
                    }}>ADD PROTECTED SITE</ButtonComponents>
                </div>
            </TitleContent>
            {api.msg || api.error ? <ErrorHtml error={api.msg}></ErrorHtml> : api.loading ? <Loading /> : <Data api={api} setStatus={setStatus} />}

            <EditAndAdd name={"addProtected"} />
        </CardBox>
    )
}

const EditAndAdd = ({ name }) => {
    const { setStatus, status } = GetAndUpdateContext()

    const { register, handleSubmit, reset, setValue } = useForm({
        shouldUseNativeValidation: true
    });

    const submit = (data) => {
        data = {
            ...data,
            created_by: localStorage.getItem("user")
        }

        !status.getData ? POST_API.addProtectedSite(data, reset, setStatus) : UPDATE_API.updateProtectedSite(status.getData.id, data, setStatus)
    }

    useEffect(() => {
        if (status.getData) {
            setValue("site_name", status.getData.site_name)
            // setValue("created_by", status.getData.created_by)
        } else {
            reset()
        }
    }, [status.getData])

    return <ModalsComponent modalName={name}>
        <TitleContent className="justify-between" subTitle={null} hide>
            <div className="text-[24px] uppercase text-blue">{status.getData ? "Edit" : "Add"} protected site</div>
        </TitleContent>
        <form className="flex gap-4 flex-col" onSubmit={handleSubmit(submit)}>
            <Form.input register={register("site_name", { required: true })} label={"site name"} placeholder="Fill in this input..." />
            {/* <Form.input register={register("created_by", { required: true })} label={"created by"} placeholder="Fill in this input..." /> */}
            <div className="flex justify-end gap-4">
                <ButtonComponents className="py-4">SUBMIT</ButtonComponents>
                <ButtonComponents nonSubmit className="py-4 text-red-500 hover:bg-red-500" click={() => {
                    setStatus(d => ({
                        ...d,
                        getData: null,
                        addProtected: false
                    }))
                }}>CANCEL</ButtonComponents>
            </div>
        </form>
    </ModalsComponent>
}

const Data = ({ api, setStatus }) => {
    const { data, protectedSiteDetail } = api

    const confirm = (id, name, site_name) => {
        DELETE_API.deleteProtectedSite(({ id, name, site_name }), setStatus)
    };
    const cancel = (e) => {
        message.error('Click on No');
    };

    return <TableInline border hoverDisable columns={[
        {
            title: 'protected site name',
            key: 'site_name',
        },
        {
            title: 'create User',
            rowClass: "w-[200px]",
            key: 'created_by',
            html: (d) => {
                return d
            }
        },
        {
            title: 'create DATE',
            rowClass: "w-[200px]",
            key: 'created_at',
            html: (d) => {
                return d
            }
        },
        {
            title: 'EDIT',
            key: 'id',
            rowClass: "w-[50px]",
            html: (a) => {
                return <button onClick={async () => {
                    let data = await protectedSiteDetail({ idProtectedSite: a })
                    let res = data.items.result
                    setStatus(d => ({
                        ...d,
                        addProtected: true,
                        getData: {
                            id: res.id,
                            site_name: res.site_name,
                            created_by: res.created_by
                        }
                    }))
                }}><EditFilled></EditFilled></button>

            }
        },
        {
            title: 'DELETE',
            key: 'id',
            rowClass: "w-[50px]",
            html: (a, ful) => {
                return <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={() => confirm(a, ful.created_by, ful.site_name)}
                    onCancel={cancel}
                    rootClassName="text-white"
                    placement="left"
                    okText="DELETE"
                    cancelText="CANCEL"
                >
                    <button className="w-full flex justify-center"><DeleteFilled></DeleteFilled></button>
                </Popconfirm>


            }
        },

    ]}
        data={
            data.protectedSite.result
        } />
}