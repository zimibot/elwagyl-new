import { useForm } from "react-hook-form";
import { useState } from "react"
import { Form } from "../../components.eha/input";
import { ModalsComponent, ModalSuccess } from "../../components.eha/modal";
import { CardBox } from "../../components/layout/card";
import { TitleContent } from "../../components/layout/title";
import { SelectComponent } from "../../components.eha/select"
import moment from "moment/moment"
import { ButtonComponents } from "../../components.eha/button";
import { GetAndUpdateContext } from "../../model/context.function";

export const FormModal = () => {

    const { setStatus } = GetAndUpdateContext()


    const [arrInput, setArrInput] = useState([])


    const { register, handleSubmit, setValue, unregister, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
        ModalSuccess()
    };


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
                        <div className="text-[24px] uppercase">add new asset</div>
                    </TitleContent>
                    <div className="grid grid-cols-3 gap-7">
                        <div className="space-y-8">
                            <Form.input register={register("asset_name")} label={"Asset Name"} />
                            <Form.input error={errors.business_unit} register={register("business_unit", { required: true })} label={"business unit *"} />
                            <Form.input register={register("contains_pii_data")} label={"contains pii data"} />
                            <Form.input register={register("select_existing_system_owner")} label={"select existing system owner"} />
                            <Form.input register={register("brand")} label={"brand"} />
                            <Form.input register={register("server")} label={"server"} />
                            <Form.texarea register={register("description")} label={"description"}></Form.texarea>
                        </div>
                        <div className="space-y-8">
                            <Form.input error={errors.asset_ip_url} register={register("asset_ip_url", { required: true })} label={"asset ip / url *"} />
                            <Form.input error={errors.asset_risk_group} register={register("asset_risk_group", { required: true })} label={"asset risk group *"} />
                            <Form.input register={register("system_owner")} label={"system owner"} />
                            <Form.input register={register("hostname")} label={"hostname (fqdn)"} />
                            <Form.input register={register("application_criticality")} label={"application criticality"} />
                            <Form.input register={register("tags")} label={"tags"} />
                            <Form.texarea label={"available scanning windows"}></Form.texarea>
                        </div>
                        <div className="space-y-8 flex flex-col">
                            <Form.input register={register("asset_id_tag")} label={"asset id / tag"} />
                            <Form.input register={register("environment")} label={"environment"} />
                            <Form.input error={errors.system_owner_email} register={register("system_owner_email", { required: true })} label={"system owner email *"} />
                            <Form.input register={register("mac_address")} label={"mac address"} />
                            <Form.input register={register("frontend_backend")} label={"frontend / backend"} />
                        </div>
                        <div className="grid grid-cols-5 gap-10 col-span-full relative">
                            <div>
                                <div className="sticky top-5 space-y-6">
                                    <SelectComponent name={"platform_select"} setValue={setValue} width={"100%"}></SelectComponent>
                                    <div className="space-y-3">
                                        <span>INTERNET FACING :</span>
                                        <div>
                                            <Form.check register={register("internet_yes")} text={"YES"}></Form.check>
                                            <Form.check register={register("internet_no")} text={"NO"}></Form.check>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-4 space-y-6">
                                {arrInput.length === 0 ? <div className="flex justify-center p-4 border border-primary">PLATFORM NOT FOUND</div> : arrInput.map((w, s) => {
                                    return (
                                        <div key={s} className="grid grid-cols-4 gap-6 relative">
                                            {w.inputRow.map((d, k) => <div key={k}><Form.input register={register(`platform.${w.id}.${d.type}`)} label={d.label} /></div>)}
                                            <div className="col-span-full flex justify-end">
                                                <div className="delete">
                                                    <ButtonComponents click={() => {
                                                        var deletid = arrInput.filter((el) => el.id === w.id)
                                                        w.inputRow.map(d => {
                                                            unregister(`platform.${deletid[0].id}.${d.type}`)
                                                        })

                                                        console.log(watch())

                                                        setTimeout(() => {
                                                            var filtered = arrInput.filter(function (el) { return el.id != w.id; });
                                                            setArrInput(filtered)
                                                        }, 300);
                                                    }}>DELETE</ButtonComponents>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                                <div className="col-span-full">
                                    <ButtonComponents className="w-full flex items-center justify-center" click={() => {
                                        let inputs = `inputRow`
                                        let momtent = moment().valueOf()
                                        setArrInput(d => ([
                                            ...d,
                                            {
                                                id: momtent,
                                                [inputs]: [
                                                    {
                                                        label: "CATEGORIES",
                                                        type: "category"
                                                    },
                                                    {
                                                        label: "NAME",
                                                        type: "name"
                                                    },
                                                    {
                                                        label: "PORT",
                                                        type: "port"
                                                    },
                                                    {
                                                        label: "VERSION",
                                                        type: "version"
                                                    },
                                                ]
                                            }
                                        ]))
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
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-4">
                        <div className=" cursor-pointer min-w-[120px] bg-primary py-4 text-center text-red-500" onClick={() => {
                            setStatus(d => ({ ...d, ADDASSET: false }))
                        }}>CANCEL</div>
                        <button type="submit" className=" min-w-[120px] bg-primary py-4">SAVE</button>
                    </div>
                </form>
            </CardBox>
        </ModalsComponent>
    )
}