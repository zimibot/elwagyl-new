import { CardBox } from "../../components/layout/card"
import { TitleContent } from "../../components/layout/title"
import { TableInline } from "../../components/table"
import { DeleteOutlined, EditFilled } from "@ant-design/icons";
import { GET_API_EHA } from "../../api/eha/GET";
import { ErrorItems } from "../../pages/cyber.deck";
import { ButtonComponents } from "../../components.eha/button";
import { useState } from "react";
import { Popconfirm } from "antd";
import { DELETE_API } from "../../api/eha/DELETE";
import { ModalsComponent } from "../../components.eha/modal";
import { GetAndUpdateContext } from "../../model/context.function";
import { Form } from "../../components.eha/input";
import { SelectComponent } from "../../components.eha/select";
import { useForm } from "react-hook-form";
import { POST_API } from "../../api/eha/POST";
import { UPDATE_API } from "../../api/eha/UPDATE";
import { useEffect } from "react";
import { ErrorHtml, Loading } from ".";

const AddCategory = ({ data }) => {
    const { setStatus, status } = GetAndUpdateContext()
    const { register, handleSubmit, reset, setValue, control, formState: { errors } } = useForm({
        defaultValues: status.categoryEdit ? status.categoryEdit : {}
    })

    useEffect(() => {
        if (status.categoryEdit) {
            for (const key in status.categoryEdit) {
                setValue(key, status.categoryEdit[key])
            }
        } else {
            reset()
        }
    }, [status.categoryEdit])


    const submit = (d) => {
        d = {
            ...d,
            created_by: localStorage.getItem("user")
        }

        if (status.categoryEdit) {
            d = {
                ...d,
                updated_by: localStorage.getItem("user")
            }
            const succes = () => {
                status.refresCategory()
            }

            UPDATE_API.updatePlatformCategory(status.categoryEdit.id, d, null, succes)
        } else {
            POST_API.addPlatformsCategory(d, reset, setStatus)
        }
    }



    return <ModalsComponent modalName={"modalCategory"}>
        <TitleContent className="justify-between" subTitle={false}>
            <div className="flex justify-between w-full items-center">
                <div className="text-[24px] uppercase text-blue">{status.categoryEdit ? "EDIT" : "ADD"} platform</div>
            </div>
        </TitleContent>
        <form onSubmit={handleSubmit(submit)} className="space-y-4">
            <div className="space-y-4">
                <SelectComponent disabled={status.categoryEdit ? true : false} error={errors.category} label={"Category"} name={"category"} width={"100%"} height={45} control={control} data={data?.result?.map(d => {
                    return {
                        label: d,
                        value: d
                    }
                })}></SelectComponent>
                <Form.input error={errors.name} register={register("name", { required: true })} label={"name"}></Form.input>
            </div>
            <div className="flex justify-end gap-4">
                <ButtonComponents>SUBMIT</ButtonComponents>

                <ButtonComponents nonSubmit className="text-red-500" click={() => {
                    setStatus(d => ({
                        ...d,
                        modalCategory: false
                    }))
                }}>CANCEL</ButtonComponents>
            </div>
        </form>
    </ModalsComponent>
}

const DataCategory = ({ name, api, page = 1 }) => {
    const [pages, setPage] = useState();
    const { setStatus, status } = GetAndUpdateContext()

    if (!name) {
        return null;
    }

    const getAssetsPlatformName = api.getAssetsPlatformName({
        idPlatform: name,
        page: pages ? pages[name] : page,
        refresh: status.UpdateStatus,
    });

    const refresh = () => {
        getAssetsPlatformName.refetch()
    }


    return api.error ? (
        ""
    ) : getAssetsPlatformName.isLoading ? (
        <Loading />
    ) : (
        <TableInline
            name={name}
            custom
            currentPage={pages ? pages[name] : page}
            pageSize={10}
            totalPages={getAssetsPlatformName.data.pagination.total_results}
            onChange={(d) => {
                setPage(d);
            }}
            border
            paggination
            hoverDisable
            columns={[
                {
                    title: "NAME",
                    key: "name",
                },
                {
                    title: "EDIT",
                    key: "id",
                    columnClass: "text-center w-[100px]",
                    rowClass: "text-center w-[100px]",
                    html: (d, item) => {
                        return (
                            <div className="flex w-full items-center justify-center cursor-pointer" onClick={() => {
                                setStatus(d => ({
                                    ...d,
                                    refresCategory: refresh,
                                    categoryEdit: item,
                                    modalCategory: true
                                }))
                            }}>
                                <EditFilled />
                            </div>
                        );
                    },
                },
                {
                    title: "delete",
                    key: "id",
                    columnClass: "text-center w-[100px]",
                    rowClass: "text-center w-[100px]",
                    html: (id, full) => {
                        return <Popconfirm cancelText="CANCEL" okText="DELETE" onConfirm={async () => {
                            DELETE_API.deleteManagePlatform({
                                site_name: full.name,
                                id: id,
                                name: full.created_by
                            }, null, refresh)
                        }} title="Delete the task"
                            description="Are you sure to delete this task?"
                        >
                            <button className="flex items-center justify-center w-full text-[1.2rem]" >
                                <DeleteOutlined></DeleteOutlined>
                            </button>
                        </Popconfirm>
                    }
                },
            ]}
            Loading={getAssetsPlatformName.isFetching}
            data={getAssetsPlatformName.data.result}
        />
    );
};

const ListManagePlatform = () => {
    const { setStatus } = GetAndUpdateContext()

    const api = GET_API_EHA.root([
        {
            active: "getAssetsPlatformName",
        },
        {
            active: "getCategoryPlatform",
        },
    ]);

    return (
        <CardBox className="flex-1 col-span-full pb-14">
            <TitleContent subTitle>
                <div className="flex justify-between items-center w-full">
                    <div className="text-[24px] uppercase text-blue">
                        manage asset list platforms
                    </div>
                    <ButtonComponents click={() => {
                        setStatus(d => ({
                            ...d,
                            modalCategory: true,
                            categoryEdit: null
                        }))
                    }}>ADD PLATFORMS</ButtonComponents>
                </div>
            </TitleContent>
            <div className="grid grid-cols-4 flex-1 pb-10">
                {api.error ? (
                    <ErrorHtml />
                ) : api.loading ? (
                    <Loading />
                ) : (
                    api.data.getCategoryPlatform.result.map((d, k) => {
                        return (
                            <div
                                key={k}
                                className="space-y-5 h-full relative flex-1 flex flex-col border-r pr-4 border-primary"
                            >
                                <TitleContent subTitle>
                                    <div className="text-[24px] uppercase text-blue">{d}</div>
                                </TitleContent>
                                <DataCategory name={d} api={api} page={1} />
                            </div>
                        );
                    })
                )}
            </div>
            <AddCategory data={api.data.getCategoryPlatform}></AddCategory>
        </CardBox>
    );
};

export default ListManagePlatform