import { useForm } from "react-hook-form";
import { Form } from "../../components.eha/input";
import { ModalsComponent, ModalSuccess } from "../../components.eha/modal";
import { CardBox } from "../../components/layout/card";
import { TitleContent } from "../../components/layout/title";
import { GetAndUpdateContext } from "../../model/context.function";
import { SelectComponent } from "../../components.eha/select";
import { GET_API_EHA } from "../../api/eha/GET";
import { POST_API } from "../../api/eha/POST";
import { useEffect } from "react";
import { UPDATE_API } from "../../api/eha/UPDATE";

export const AddModal = () => {
    const { setStatus, status } = GetAndUpdateContext()
    const { IDSCAN } = status
    const API = GET_API_EHA.root([
        {
            active: "assetsList"
        },
        {
            active: "scanDetails"
        },
        {
            active: "toolsScanner"
        },
    ])
    const { register, handleSubmit, control, reset, setValue, formState: { errors } } = useForm();
    const editData = async (id) => {
        let data = await API.scanDetails({ idscanDetail: id })
        let res = data.items.result

        for (const key in res) {
            setValue(key, res[key])
        }

    }

    useEffect(() => {
        if (IDSCAN) {
            editData(IDSCAN)
        } else {
            reset()
        }
    }, [IDSCAN])



    const onSubmit = data => {

        if (IDSCAN) {
            data = {
                ...data,
                updated_by: localStorage.getItem("user"),
                is_draft: false
            }
            UPDATE_API.updateScanAssets(IDSCAN, data, setStatus)
        } else {
            data = {
                ...data,
                created_by: localStorage.getItem("user"),
                is_draft: false
            }

            POST_API.addscanAssets(data, reset, setStatus)
        }

        // ModalSuccess()
    };


    return (
        <ModalsComponent footer={false} width={null} style={`
                padding: 20px!important;
                .ant-modal-content {
                    width: 100%;
                    min-width: 100%;
                }
            `} modalName={"ADDTASK"}>
            <CardBox>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <TitleContent>
                        <div className="text-[24px] uppercase text-blue">{IDSCAN ? "EDIT" : "add new"} scan</div>
                    </TitleContent>
                    <div className="grid grid-cols-3 gap-7">
                        <div className="space-y-8">
                            <SelectComponent error={errors.asset_id} required={true} loading={API.loading} data={API?.data?.assetsList?.result?.map(d => {
                                return ({
                                    label: d.name,
                                    value: d.id
                                })
                            })} control={control} name={"asset_id"} width={"100%"} height={45} label={"TARGET TO SCAN"}></SelectComponent>
                            {/* <Form.input register={register("target_scan")} label={"TARGET TO SCAN"} /> */}
                            {/* <Form.input register={register("tools_scanner")} label={"TOOLS SCANNER"} /> */}
                            <SelectComponent error={errors.tool_scanner_id} required={true} loading={API.loading} data={API.data.toolsScanner?.result?.map(d => {
                                return ({
                                    label: d,
                                    value: d                                })
                            })} control={control} name={"tool_scanner_id"} width={"100%"} height={45} label={"TOOLS SCANNER"}></SelectComponent>

                            <div className="grid grid-cols-2 gap-4">
                                <Form.date error={errors.sla_date} required={true} control={control} name={"sla_date"} label={"SLA DATE"} />
                                <Form.date error={errors.sla_time} required={true} type={"time"} control={control} name={"sla_time"} label={"SLA TIME"} />
                            </div>
                            <Form.input error={errors.recipient_email} register={register("recipient_email", { required: true })} label={"RECIPIENT EMAIL"} />
                            <Form.input type="file" register={register("attachment")} label={"attachment"} />
                        </div>
                        <div className="space-y-8 col-span-2 flex flex-col">
                            <div className="grid grid-cols-2 gap-4">
                                <Form.date error={errors.dates_and_schedules} required={true} control={control} name={"scheduled_start_date"} label={"DATES AND SCHEDULES"} />
                                <Form.date error={errors.expected_end_date} required={true} control={control} name={"expected_end_date"} label={"EXPECTED END DATE"} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Form.date error={errors.scheduled_start_time} required={true} type={"time"} control={control} name={"scheduled_start_time"} label={"SCHEDULED START TIME"} />
                                <Form.date error={errors.expected_end_time} required={true} type={"time"} control={control} name={"expected_end_time"} label={"EXPECTED END TIME"} />
                            </div>
                            <div className="flex flex-1 w-full">
                                <Form.texarea error={errors.remarks} register={register('remarks', { required: true })} classNameInput="h-full" className="w-full h-full" label={"REMARKS"}></Form.texarea>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-4">
                        <div className=" cursor-pointer min-w-[120px] bg-primary py-4 text-center text-red-500" onClick={() => {
                            setStatus(d => ({ ...d, ADDTASK: false }))
                        }}>CANCEL</div>
                        {/* <div type="submit" className=" min-w-[120px] bg-primary py-4 text-center uppercase px-4 text-yellow-400">save as draft</div> */}
                        <button type="submit" className=" min-w-[120px] bg-primary py-4">SAVE</button>
                    </div>
                </form>
            </CardBox>
        </ModalsComponent>
    )
}