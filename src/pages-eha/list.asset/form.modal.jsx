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
import { useState } from "react";
import { POST_API } from "../../api/eha/POST";

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
    ])

    console.log(API)
    const { setStatus } = GetAndUpdateContext()
    const { register, handleSubmit, reset, control, setValue, formState: { errors } } = useForm(
        {
            defaultValues: {
                platform: [{ categories: "", name: "", port: "", version: "" }]
            }
        }
    );

    const [selectOwner, setSelectOwner] = useState()

    const {
        fields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: "platform"
    });

    const onSubmit = data => {


        data = {
            ...data,
        }

        // {
        //     "name": "Asset 12",
        //     "url_ip": "https://example.com",
        //     "id_tag": "ABC123",
        //     "risk_group": "High",
        //     "environment": "Production",
        //     "contains_pii_data": true,
        //     "system_owner": "John Doe",
        //     "system_owner_email": "johndoe@example.com",
        //     "existing_system_owner": "ACME Corporation",
        //     "hostname_fqdn": "example.com",
        //     "mac_address": "00:11:22:33:44:55",
        //     "brand": "ACME",
        //     "application_criticality": "Critical",
        //     "frontend_backend": "Backend",
        //     "server": "Linux",
        //     "tags": "security",
        //     "description": "This is a sample protected site",
        //     "available_scanning_windows": "Mon-Fri, 8am-5pm",
        //     "out_of_scope": false,
        //     "internet_facing": true,
        //     "system_owner_id": 2,
        //     "protected_site_id": 2,
        //     "created_by": "Kurniadi Ahmad Wijaya"
        // }


        POST_API.addAssets(data, reset, setStatus)

        // ModalSuccess({ title: "Successfully Add New Asset!", onlyShowOk: true })
    };

    useEffect(() => {
        if (!isEmpty(errors)) {
            ModalSuccess({ title: "sorry there is an empty input!", type: "error", onlyShowOk: true })
        }
    }, [errors])


    console.log(errors)


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
                        <div className="text-[24px] uppercase text-blue">add new asset</div>
                    </TitleContent>
                    <div className="grid grid-cols-3 gap-7">
                        <div className="space-y-8">
                            <Form.input error={errors.name} register={register("name", { required: true })} label={"Asset NAME *"} />
                            <SelectComponent loading={API.loading} data={API.data?.protectedSite?.result?.map(d => ({
                                label: d.site_name,
                                value: d.id
                            }))} control={control} label={"PROTECTED SITE *"} error={errors.protected_site} height={45} name={"protected_site_id"} width={"100%"}></SelectComponent>
                            <Form.input register={register("contains_pii_data")} label={"contains pii data"} />
                            <SelectComponent onChangeData={async (d) => {
                                let prop = await API.systemOwnerDetail({ idOwner: d })
                                console.log(prop)
                                let { created_by, email, id } = prop.items.result
                                setValue("system_owner", created_by)
                                setValue("system_owner_email", email)
                                setValue("system_owner_id", id)
                                setSelectOwner(true)
                            }} error={errors.existing_system_owner} setvalue={setValue} loading={API.loading} data={API.data.systemOwner?.result.map(d => ({
                                label: d.name,
                                value: d.id
                            }))} control={control} label={"select existing system owner *"} height={45} name={"existing_system_owner"} width={"100%"}></SelectComponent>
                            <Form.input register={register("brand")} label={"brand"} />
                            <Form.input register={register("server")} label={"server"} />
                            <Form.texarea register={register("description")} label={"description"}></Form.texarea>
                        </div>
                        <div className="space-y-8">
                            <Form.input error={errors.url_ip} register={register("url_ip", { required: true })} label={"asset ip / url *"} />
                            <Form.input error={errors.asset_risk_group} register={register("risk_group", { required: true })} label={"asset risk group *"} />
                            {selectOwner && <Form.input disabled register={register("system_owner")} error={errors.system_owner} label={"system owner *"} />}
                            <Form.input register={register("hostname_fqdn")} label={"hostname (fqdn)"} />
                            <Form.input register={register("application_criticality")} label={"application criticality"} />
                            <Form.input register={register("tags")} label={"tags"} />
                            <Form.texarea register={register("available_scanning_windows")} label={"available scanning windows"}></Form.texarea>
                        </div>
                        <div className="space-y-8 flex flex-col">
                            <Form.input register={register("id_tag")} label={"asset id / tag"} />
                            <Form.input register={register("environment")} label={"environment"} />
                            {selectOwner && <Form.input disabled error={errors.system_owner_email} register={register("system_owner_email")} label={"system owner email *"} />}
                            <Form.input register={register("mac_address")} label={"mac address"} />
                            <Form.input register={register("frontend_backend")} label={"frontend / backend"} />
                        </div>
                        <div className="grid grid-cols-5 gap-10 col-span-full relative">
                            <div>
                                <div className="sticky top-5 space-y-6">
                                    <SelectComponent error={errors.platform_select} name={"platform_select"} control={control} width={"100%"}></SelectComponent>
                                    <div className="space-y-3">
                                        <span>INTERNET FACING :</span>
                                        <div>
                                            <Form.radio value={true}  register={register("internet_facing")} text={"YES"}></Form.radio>
                                            <Form.radio value={false}  register={register("internet_facing")} text={"NO"}></Form.radio>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-4 space-y-6">
                                <CardAnimation className={"space-y-6"}>
                                    {fields.map((d, k) => {
                                        return <div key={d.id} className="flex justify-between gap-4">
                                            <div className="grid grid-cols-4 gap-4 flex-1" >
                                                <Form.input register={register(`platform.${k}.categories`)} label={"categories"}></Form.input>
                                                <Form.input register={register(`platform.${k}.name`)} label={"name"}></Form.input>
                                                <Form.input register={register(`platform.${k}.port`)} label={"port"}></Form.input>
                                                <Form.input register={register(`platform.${k}.version`)} label={"version"}></Form.input>
                                            </div>
                                            <div className="flex justify-end items-end">
                                                <ButtonComponents className="py-4" click={() => remove(k)}>DELETE</ButtonComponents>
                                            </div>
                                        </div>
                                    })}
                                </CardAnimation>

                                <div className="col-span-full flex gap-4">
                                    <div className="flex-1">
                                        <ButtonComponents className="w-full flex items-center justify-center" click={() => {
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
                                        <ButtonComponents className="w-full flex items-center justify-center" click={() => {
                                            reset({
                                                platform: [{ categories: "", name: "", port: "", version: "" }]
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
                                        setStatus(d => ({ ...d, ADDASSET: false }))
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