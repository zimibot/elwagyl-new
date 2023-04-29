import { useForm, useFieldArray } from "react-hook-form";
import { Form } from "../../components.eha/input";
import { ModalsComponent, ModalSuccess } from "../../components.eha/modal";
import { CardAnimation, CardBox } from "../../components/layout/card";
import { TitleContent } from "../../components/layout/title";
import { SelectComponent } from "../../components.eha/select"
import { ButtonComponents } from "../../components.eha/button";
import { GetAndUpdateContext } from "../../model/context.function";
import { useEffect } from "react";
import { isEmpty } from "radash";
import { GET_API_EHA } from "../../api/eha/GET";
import { POST_API } from "../../api/eha/POST";
import { toast } from "react-hot-toast";

export const FormModal = () => {
    const API = GET_API_EHA.root([
        {
            active: "protectedSite",
        },
        {
            active: "systemOwner",
        },
        {
            active: "systemOwnerDetail",
        },
        {
            active: "getAssetsDetail"
        },
        {
            active: "platformDetail"
        },
    ])

    const { setStatus, status } = GetAndUpdateContext()
    const { register, handleSubmit, reset, control, setValue, setError, formState: { errors } } = useForm();
    const { idAssets } = status
    const {
        fields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: "platform"
    });

    const onSubmit = async (data) => {
        try {
            // Menambahkan beberapa data baru ke data yang diinputkan
            data = {
                ...data,
                created_by: localStorage.getItem("user"),
                out_of_scope: true,
                contains_pii_data: true
            };

            const onSuccess = (response) => {
                // Mendapatkan ID dari asset yang berhasil ditambahkan
                const { id } = response.data.result;

                // Menambahkan data platform jika ada
                if (data.platform?.length > 0) {
                    const items = data.platform.map(item => ({
                        ...item,
                        created_by: localStorage.getItem("user"),
                        asset_id: id
                    }));
                    POST_API.addplatforms(items, reset, setStatus);
                }

                // Mengubah status ADDASSET dan idAssets menjadi null
                setStatus(prevState => ({
                    ...prevState,
                    ADDASSET: false,
                    idAssets: null
                }));
            };

            const onError = (error) => {
                // Menampilkan pesan error untuk setiap param yang tidak valid
                error.result.forEach(d => {
                    setError(d.param);
                });
            };

            // Menambahkan data asset baru
            POST_API.addAssets(data, reset, setStatus, onSuccess, onError);
        } catch (error) {
            // Menangani error jika terjadi kesalahan saat menambahkan data asset
            console.error(error);
            // Tampilkan pesan error
            toast.error('Terjadi kesalahan saat menambahkan data asset!');
        }
    };
    useEffect(() => {
        if (!isEmpty(errors)) {
            ModalSuccess({ title: "sorry there is an empty input!", type: "error", onlyShowOk: true })
        }
    }, [errors])

    const GetAssets = async (idAssets) => {
        try {
            if (idAssets) {
                const assetsDetail = await API.getAssetsDetail({ idAssets });
                const { id } = assetsDetail.items.result;

                for (const key in assetsDetail.items.result) {
                    const value = assetsDetail.items.result[key];

                    if (key === "system_owner") {
                        setValue(key, value.name);
                    } else {
                        setValue(key, value);
                    }
                }

                if (id) {

                    const platformDetail = await API.platformDetail({ platform_id: id });
                    console.log(platformDetail);
                }
            }

            else {
                reset();
            }
        } catch (error) {
            console.log(error)
            alert("Error fetching asset data");
        }

    }

    useEffect(() => {

        GetAssets(idAssets)

    }, [idAssets])



    return (
        <ModalsComponent footer={false} width={null} style={`
                width: 100%;
                min-width: 100%;
                padding: 20px!important;
                .ant-modal-content {
                    width: 100%;
                    min-width: 100%;
                }
            `} modalName={"ADDASSET"}>
            <CardBox>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <TitleContent>

                        <div className="text-[24px] uppercase text-blue">{!idAssets ? "add new" : "edit"} asset</div>
                    </TitleContent>
                    <div className="grid grid-cols-3 gap-7">
                        <div className="space-y-8">
                            <Form.input error={errors.name} register={register("name", { required: true })} label={"Asset NAME *"} />
                            <SelectComponent loading={API.loading} data={API.data?.protectedSite?.result?.map(d => ({
                                label: d.site_name,
                                value: d.id
                            }))} control={control} label={"PROTECTED SITE *"} error={errors.protected_site_id} height={45} name={"protected_site_id"} width={"100%"}></SelectComponent>
                            <Form.input register={register("contains_pii_data")} label={"contains pii data"} />
                            <SelectComponent onChangeData={async (d) => {
                                let prop = await API.systemOwnerDetail({ idOwner: d })
                                let { created_by } = prop.items.result
                                // setValue("system_owner", created_by)
                                // setValue("system_owner_email", email)
                                setValue("system_owner_id", created_by)
                                // setSelectOwner(true)
                            }} error={errors.existing_system_owner} setvalue={setValue} loading={API.loading} data={API.data.systemOwner?.result.map(d => ({
                                label: d.name,
                                value: d.id
                            }))} control={control} label={"select existing system owner *"} height={45} name={"existing_system_owner"} width={"100%"}></SelectComponent>
                            <Form.input register={register("brand")} label={"brand"} />
                            <Form.input register={register("server")} label={"server"} />
                            <Form.texarea register={register("description")} label={"description"}></Form.texarea>
                            <Form.check error={errors.out_of_scope} value={true} register={register("out_of_scope")} text={"out of scope"}></Form.check>

                        </div>
                        <div className="space-y-8">
                            <Form.input error={errors.url_ip} register={register("url_ip", { required: true })} label={"asset ip / url *"} />
                            <Form.input error={errors.risk_group} register={register("risk_group", { required: true })} label={"asset risk group *"} />
                            <Form.input register={register("system_owner")} label={"system owner"} />
                            <Form.input register={register("hostname_fqdn")} label={"hostname (fqdn)"} />
                            <Form.input register={register("application_criticality")} label={"application criticality"} />
                            <Form.input register={register("tags")} label={"tags"} />
                            <Form.texarea register={register("available_scanning_windows")} label={"available scanning windows"}></Form.texarea>
                        </div>
                        <div className="space-y-8 flex flex-col">
                            <Form.input register={register("id_tag")} label={"asset id / tag"} />
                            <Form.input register={register("environment")} label={"environment"} />
                            <Form.input error={errors.system_owner_email} register={register("system_owner_email")} label={"system owner email "} />
                            <Form.input register={register("mac_address")} label={"mac address"} />
                            <Form.input register={register("frontend_backend")} label={"frontend / backend"} />
                        </div>
                        <div className="grid grid-cols-5 gap-10 col-span-full relative">
                            <div>
                                <div className="sticky top-5 space-y-6">
                                    <div className="space-y-3">
                                        <span>INTERNET FACING :</span>
                                        <div>
                                            <Form.radio error={errors.internet_facing} value={true} register={register("internet_facing")} text={"YES"}></Form.radio>
                                            <Form.radio error={errors.internet_facing} value={false} register={register("internet_facing")} text={"NO"}></Form.radio>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-4 space-y-6 ">
                                <CardAnimation className={"space-y-6"}>
                                    {fields.map((d, k) => {
                                        return <div key={d.id} className="flex justify-between gap-4">
                                            <div className="grid grid-cols-4 gap-4 flex-1" >
                                                {/* <SelectComponent data={[
                                                    {
                                                        label: "windows 10",
                                                        value: "window10"
                                                    },
                                                    {
                                                        label: "windows 11",
                                                        value: "window11"
                                                    },
                                                    {
                                                        label: "Linux",
                                                        value: "Linux"
                                                    },
                                                ]} height={48} error={errors && errors.platform && errors.platform[k] && errors.platform[k].platform} label={"platform"} name={`platform.${k}.platform`} control={control} width={"100%"}></SelectComponent> */}
                                                <Form.input register={register(`platform.${k}.categories`)} label={"categories"}></Form.input>
                                                <Form.input register={register(`platform.${k}.name`)} label={"name"}></Form.input>
                                                <Form.input register={register(`platform.${k}.port`)} label={"port"}></Form.input>
                                                <Form.input register={register(`platform.${k}.version`)} label={"version"}></Form.input>
                                            </div>
                                            <div className="flex justify-end items-end">
                                                <ButtonComponents nonSubmit className="py-4" click={() => remove(k)}>DELETE</ButtonComponents>
                                            </div>
                                        </div>
                                    })}
                                </CardAnimation>

                                <div className="col-span-full flex gap-4">
                                    <div className="flex-1">
                                        <ButtonComponents nonSubmit className="w-full flex items-center justify-center" click={() => {
                                            append({ categories: "", name: "", port: "", version: "" });
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
                                    <div>
                                        <ButtonComponents nonSubmit className="w-full flex items-center justify-center" click={() => {
                                            reset({
                                                platform: []
                                            })
                                        }}>
                                            <div className="flex items-center gap-4 py-2 px-5">


                                                <div>
                                                    reset platform
                                                </div>
                                            </div>
                                        </ButtonComponents>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-4">
                        <div className=" cursor-pointer min-w-[120px] bg-primary py-4 text-center text-red-500" onClick={() => {
                            ModalSuccess({
                                title: "are you sure you want to leave this page!", type: "warning", clickOk: () => {
                                    setTimeout(() => {
                                        setStatus(d => ({ ...d, ADDASSET: false, idAssets: null }))
                                    }, 500);
                                }
                            })

                        }}>CANCEL</div>
                        <button type="submit" className=" min-w-[120px] bg-primary py-4">SAVE</button>
                    </div>
                </form>
            </CardBox>
        </ModalsComponent>
    )
}