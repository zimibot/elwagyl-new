import { ArrowLeftOutlined, CheckOutlined, DeleteOutlined, LoadingOutlined } from "@ant-design/icons"
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
import { Popconfirm, Spin } from "antd"
import { useState } from "react"
import { SelectScanner } from "../list.task.scan/add.modal"
import { DELETE_API } from "../../api/eha/DELETE"


const ModalDiscovery = () => {
    const antIcon = <LoadingOutlined spin />;
    const [loading, setLoading] = useState(false);

    const { setStatus } = GetAndUpdateContext();
    const API = GET_API_EHA.root([
        {
            active: "protectedSite",
        },
        {
            active: "scanDetails",
        },
        {
            active: "toolsScanner",
        },
        {
            active: "scanTools",
        },
        {
            active: "scan",
            query: "type=host-discovery",
        },
    ]);

    const { register, reset, handleSubmit, control, setValue, formState: { errors } } = useForm();

    const ipRangeRegex = /^(?:(?:^|, ?)(?:(?:\d{1,3}\.){3}\d{1,3}(?:\/\d{1,2})?|(?:\d{1,3}\.){3}\d{1,3}(?: - (?:\d{1,3}\.){3}\d{1,3}))(?:$|, ?))+$/;
    const ipRangeValidation = {
        required: "IP range is required",
        pattern: {
            value: ipRangeRegex,
            message: "Invalid IP range format",
        },
    };

    const alphanumericValidation = {
        required: "Field is required",
        minLength: {
            value: 6,
            message: "Minimum Character 6"
        },
        pattern: {
            value: /^[A-Za-z0-9\s]+$/i,
            message: "Only letters, numbers, and spaces are allowed",
        },
    };

    const emailValidation = {
        required: "Email is required",
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email format",
        },
    };

    const onSubmit = (data) => {
        setLoading(true)
        data = {
            ...data,
            created_by: localStorage.getItem("user"),
            attachment: "",
            is_draft: false,
        };

        const succesLoad = () => {
            setLoading(false)
        }
        const errorLoad = () => {
            setLoading(false)
        }

        POST_API.addscanAssets(data, reset, API.data.scan.refetch, succesLoad, errorLoad);
    };

    useEffect(() => {
        reset();

        setValue("tool_scanner_id", 4)
    }, []);


    return (
        <ModalsComponent title={"new discovery scan"} modalName={"modalDiscovery"}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Form.input
                    error={errors.target}
                    label={"target IP RANGE"}
                    register={register("target", ipRangeValidation)}
                    placeholder="Enter IP range (e.g., 192.0.0.0/24 or 192.0.0.0 - 192.0.0.255)"
                ></Form.input>
                <Form.input
                    error={errors.recipient_email}
                    label={"Email"}
                    register={register("recipient_email", emailValidation)}
                    placeholder="Email"
                ></Form.input>
                <Form.input
                    error={errors.remarks}
                    label={"remarks"}
                    register={register("remarks", alphanumericValidation)}
                ></Form.input>


                <SelectComponent
                    data={API.data.protectedSite?.result?.map((d) => ({
                        label: d.site_name,
                        value: d.id,
                    })) || []}
                    error={errors.protected_site_id}
                    required
                    width={"100%"}
                    height={45}
                    control={control}
                    name={"protected_site_id"}
                    label={"Data Center"}
                ></SelectComponent>


                <div className="grid grid-cols-1 gap-4">
                    <SelectScanner fillterID={4} API={API} control={control} errors={errors}></SelectScanner>

                </div>

                <div className="flex justify-end gap-4">
                    <ButtonComponents
                        nonSubmit
                        click={() => {
                            setStatus((d) => ({
                                ...d,
                                modalDiscovery: false,
                            }));
                        }}
                        className="py-4 text-red-500"
                    >
                        cancel
                    </ButtonComponents>
                    <ButtonComponents disabled={loading} className="py-4">{loading ? <Spin indicator={antIcon} /> : "SUBMIT"} </ButtonComponents>
                </div>
            </form>
        </ModalsComponent>
    );
};




export const NetDiscovery = () => {
    const { setStatus } = GetAndUpdateContext()
    const prevPage = useNavigate()

    const API = GET_API_EHA.root([
        {
            active: "scan",
            query: "type=host-discovery&status=pending"
        },
        {
            active: "assetsList",
            query: "is_unconfirmed_asset=true"
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
            <div className="flex flex-1 flex-col">
                <div className="grid grid-cols-2 gap-4 h-full">

                    <CardBox className={"flex-1 flex flex-col"}>
                        <div className="flex-1 flex flex-col">
                            <div className="flex flex-col flex-1 gap-4">
                                <div className="flex flex-1 flex-col p-4 border border-border_second gap-4">
                                    <TitleContent subTitle={false}>
                                        <div className="flex items-center justify-between w-full">
                                            <div className="text-[24px] uppercase text-blue">PROGRESS NETWORK DISCOVERY SCAN</div>
                                        </div>
                                    </TitleContent>
                                    {API.error ? <ErrorHtml></ErrorHtml> : <TableInline Loading={API.loading || API.isFetching} border hoverDisable data={API.data.scan?.result} columns={[
                                        {
                                            title: "Target",
                                            key: "target"
                                        },

                                        // {
                                        //     title: "SHCEDULED DATE",
                                        //     key: "scheduled_start_date"
                                        // },
                                        {
                                            title: "Data Center",
                                            key: "protected_site",
                                            html: (data) => {
                                                return data?.site_name
                                            }
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
                                        {
                                            title: "Delete",
                                            key: "id",
                                            rowClass: "w-[100px] text-center",
                                            columnClass: "w-[100px] text-center",
                                            html: (id, data) => {
                                                return <Popconfirm title="Are you sure to delete this data?" onConfirm={() => {
                                                    data = {
                                                        site_name: data.target,
                                                        id
                                                    }

                                                    DELETE_API.deleteScanAssets(data, API.data.scan.refetch)
                                                }}>
                                                    <button>
                                                        <DeleteOutlined></DeleteOutlined>
                                                    </button>
                                                </Popconfirm>
                                            }
                                        },

                                    ]}></TableInline>}

                                </div>

                            </div>
                        </div>
                    </CardBox>
                    <CardBox className={"flex-1 flex flex-col"}>
                        <div className="flex-1 flex flex-col">
                            <div className="flex flex-col flex-1 gap-4">
                                <div className="flex flex-1 flex-col p-4 border border-border_second gap-4">
                                    <TitleContent subTitle={false}>
                                        <div className="flex items-center justify-between w-full">
                                            <div className="text-[24px] uppercase text-blue">ASSETS NETWORK UNCONFIRMED</div>
                                        </div>
                                    </TitleContent>
                                    {API.msg || API.error ? (
                                        <ErrorHtml error={API.msg}></ErrorHtml>
                                    ) : (
                                        <TableInline
                                            Loading={API.loading || API.isFetching}
                                            isload
                                            border
                                            hoverDisable
                                            columns={[
                                                {
                                                    title: "ID",
                                                    key: "id",
                                                    rowClass: "w-[50px]",
                                                    columnClass: "w-[50px]",
                                                },
                                                {
                                                    title: "ASSET NAME",
                                                    key: "name",
                                                },
                                                {
                                                    title: "Data Center",
                                                    key: "site_name",
                                                    rowClass: "w-[200px]",
                                                    columnClass: "w-[200px]",
                                                },
                                                {
                                                    title: "IP/DOMAIN",
                                                    rowClass: "w-[200px]",
                                                    columnClass: "w-[200px]",
                                                    key: "url_ip",
                                                },
                                                {
                                                    title: "DELETE",
                                                    rowClass: "w-[100px] text-center",
                                                    columnClass: "w-[100px] text-center",
                                                    key: "id",
                                                    html: (id, data) => {
                                                        return <Popconfirm title="Are you sure to delete this data?" onConfirm={() => {
                                                            data = {
                                                                site_name: data.name,
                                                                id
                                                            }

                                                            DELETE_API.deleteAssets(data, API.data.assetsList.refetch)
                                                        }}>
                                                            <button>
                                                                <DeleteOutlined></DeleteOutlined>
                                                            </button>
                                                        </Popconfirm>
                                                    }
                                                },
                                                {
                                                    title: "CONFIRM",
                                                    rowClass: "w-[100px] text-center flex justify-center",
                                                    columnClass: "w-[100px] text-center",
                                                    key: "id",
                                                    html: (id, data) => {
                                                        return <ButtonComponents className="!min-w-[50px]">
                                                            <CheckOutlined></CheckOutlined>
                                                        </ButtonComponents>
                                                    }
                                                },



                                            ]}
                                            data={API.data.assetsList?.result?.map((d) => ({
                                                ...d.protected_site,
                                                ...d.severity_count,
                                                ...d,
                                            })) || null}
                                        ></TableInline>
                                    )}

                                </div>

                            </div>
                        </div>
                    </CardBox>
                </div>
            </div>

        </div>
        <ModalDiscovery></ModalDiscovery>
    </LayoutDashboard>
}
