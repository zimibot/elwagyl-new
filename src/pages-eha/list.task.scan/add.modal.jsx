import { useForm } from "react-hook-form";
import { Form } from "../../components.eha/input";
import { ModalsComponent } from "../../components.eha/modal";
import { CardAnimation, CardBox } from "../../components/layout/card";
import { TitleContent } from "../../components/layout/title";
import { GetAndUpdateContext } from "../../model/context.function";
import { SelectComponent } from "../../components.eha/select";
import { GET_API_EHA } from "../../api/eha/GET";
import { POST_API } from "../../api/eha/POST";
import { useEffect, useState } from "react";
import { UPDATE_API } from "../../api/eha/UPDATE";
import { isArray } from "radash";
import moment from "moment";
import { LoadingOutlined } from "@ant-design/icons";

export const AddModal = () => {
    const { setStatus, status } = GetAndUpdateContext()
    const [time, settime] = useState()
    const [loading, setloading] = useState(false)
    const { IDSCAN, reScan } = status
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
        {
            active: "scanTools"
        },
        {
            active: "scan"
        },
    ])
    const { register, handleSubmit, control, reset, setValue, watch, resetField, formState: { errors } } = useForm({
        defaultValues: {
            schedule_switch: "custom_date"
        }
    });
    const editData = async (id) => {
        let data = await API.scanDetails({ idscanDetail: id })
        let res = data.items.result
        for (const key in res) {
            if (key === "scheduled_start_date" || key === "sla_date") {
                setValue(key, res[key].split(" ")[0])
            } else {

                setValue(key, res[key])
            }
        }

    }


    useEffect(() => {
        if (IDSCAN) {
            editData(IDSCAN)
        } else {
            reset()
        }
    }, [IDSCAN])


    let ws = watch("schedule_switch")
    let ds = watch("scheduled_start_time")
    let dc = watch("scheduled_start_date")

    const onSubmit = data => {
        setloading(true)
        let success = () => {
            API.data.scan.refetch()
            setloading(false)
        }

        if (reScan) {
            delete data.id
        }

        if (IDSCAN && !reScan) {
            data = {
                ...data,
                scheduled_start_time: `${data.scheduled_start_time}:00`,
                updated_by: localStorage.getItem("user"),
                is_draft: false
            }
            UPDATE_API.updateScanAssets(IDSCAN, data, API.data.scan.refetch)
        } else {

            data = {
                ...data,
                scheduled_start_time: `${data.scheduled_start_time}:00`,
                created_by: localStorage.getItem("user"),
                is_draft: false
            }

            POST_API.addscanAssets(data, reset, success)
        }

        // ModalSuccess()
    };

    useEffect(() => {
        const now = moment().format("lll");
        settime(now)

        if (ds || dc) {
            let selectedTime = ds;

            let selectedDate = dc


            let selectedDateTime = moment(`${selectedDate} ${selectedTime}`, 'YYYY-MM-DD HH:mm');

            // Menggabungkan tanggal saat ini dan waktu saat ini menjadi objek Moment
            let currentDateTime = moment().format("YYYY-MM-DD HH:mm");


            // Get the current time

            let currentItems = moment()
            let futureDateTime = currentItems.add(3, 'minutes'); // Menambahkan 5 menit

            if (selectedDateTime.isBefore(currentDateTime)) {
                // Reset the input value to the current time
                setValue("scheduled_start_time", futureDateTime.format('HH:mm'))
            } else {
                if (selectedDateTime.diff(currentDateTime, 'minutes') < 3) {
                    // alert("The selected time cannot be less than 3 minutes from the current time!")
                    setValue("scheduled_start_time", futureDateTime.format('HH:mm'))
                }
            }
        }

    }, [ds, dc])

    useEffect(() => {
        if (ws) {
            console.log(ws)
            resetField("scheduled_run_scan")
        }
    }, [ws])

    const minDate = () => {
        let dtToday = new Date()

        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();
        if (month < 10)
            month = '0' + month.toString();
        if (day < 10)
            day = '0' + day.toString();

        return year + '-' + month + '-' + day;
    }

    const minTime = () => {
        var currentTime = new Date();
        var currentHour = currentTime.getHours();
        var currentMinute = currentTime.getMinutes();
        return currentHour.toString().padStart(2, '0') + ':' + currentMinute.toString().padStart(2, '0')
    }


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
                    <TitleContent subTitle={time}>
                        <div className="text-[24px] uppercase text-blue">{reScan ? "RE-SCANNING" : IDSCAN ? "EDIT" : "add new"} scan</div>
                    </TitleContent>
                    <div className="grid grid-cols-3 gap-7">
                        <div className="space-y-8">
                            <SelectComponent error={errors.asset_id} required={true} loading={API.loading} data={API.data.assetsList ? API.data.assetsList.result ? !isArray(API.data.assetsList.result) ? [] : API.data.assetsList.result.map(d => {
                                return ({
                                    label: d.name,
                                    value: d.id
                                })
                            }) : [] : []} control={control} name={"asset_id"} width={"100%"} height={45} label={"TARGET TO SCAN"}></SelectComponent>
                            {/* <Form.input register={register("target_scan")} label={"TARGET TO SCAN"} /> */}
                            {/* <Form.input register={register("tools_scanner")} label={"TOOLS SCANNER"} /> */}
                            {/* <SelectComponent error={errors.selectScanner} required={true} loading={API.loading} data={API.data.toolsScanner?.result?.map(d => {
                                return ({
                                    label: d === "Nessus" ? "E.H.A ENGINE" : "",
                                    value: d
                                })
                            })} control={control} name={"selectScanner"} width={"100%"} height={45} label={"TOOLS SCANNER"}></SelectComponent> */}
                            {/* {ds && <SelectComponent error={errors.tool_scanner_id} required={true} loading={API.loading} data={API.data.scanTools?.result?.map(d => {
                                return ({
                                    label: d.name,
                                    value: d.id
                                })
                            })} control={control} name={"tool_scanner_id"} width={"100%"} height={45} label={"Select scanner"}></SelectComponent>} */}
                            <SelectComponent error={errors.tool_scanner_id} required={true} loading={API.loading} data={API.data.scanTools?.result?.map(d => {
                                return ({
                                    label: d.name,
                                    value: d.id
                                })
                            })} control={control} name={"tool_scanner_id"} width={"100%"} height={45} label={"Tools Scanner"}></SelectComponent>


                            <div className="grid grid-cols-2 gap-4">
                                <Form.input min={minDate()} type="date" error={errors.sla_date} register={register("sla_date", { required: false })} name={"sla_date"} label={"SLA DATE"} />
                                <Form.input min={minTime()} error={errors.sla_time} register={register("sla_time", { required: false })} type={"time"} name={"sla_time"} label={"SLA TIME"} />
                            </div>
                            <Form.input error={errors.recipient_email} register={register("recipient_email", { required: true })} label={"RECIPIENT EMAIL"} />
                            <Form.input type="file" register={register("attachment")} label={"attachment"} />
                        </div>
                        <div className="space-y-4 col-span-2 flex flex-col">
                            <div className="flex items-center gap-3 ">
                                <div>
                                    SET SCHEDULE :
                                </div>
                                <div className="flex items-center gap-3">
                                    <Form.radio register={register("schedule_switch")} value="custom_date" name={"schedule_switch"} text={"CUSTOM DATE"}></Form.radio>
                                    <Form.radio register={register("schedule_switch")} value="periode_time" name={"schedule_switch"} text={"PERIODE TIME"}></Form.radio>
                                </div>
                            </div>
                            <CardAnimation className="flex flex-col flex-1 gap-4">
                                {ws === "custom_date" ? <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <Form.input type="date" min={minDate()} register={register("scheduled_start_date", { required: true })} error={errors.scheduled_start_date} label={"SCHEDULE DATE START"} />
                                        <Form.input error={errors.scheduled_start_time} register={register("scheduled_start_time", { required: true })} type={"time"} label={"SCHEDULE START TIME (Current Time + 3 Minutes)"} />
                                        {/* <Form.input type="date" error={errors.expected_end_date} register={register("expected_end_date", { required: true })}  name={"expected_end_date"} label={"EXPECTED END DATE"} /> */}
                                    </div>
                                    {/* <div className="grid grid-cols-2 gap-4">
                                        <Form.input error={errors.scheduled_start_time} register={register("scheduled_start_time", { required: true })} type={"time"}  label={"SCHEDULE START TIME"} />
                                        <Form.input error={errors.expected_end_time} type={"time"}   name={"expected_end_time"} label={"EXPECTED END TIME"} />
                                    </div> */}
                                </div> : <div className="flex gap-4 w-full">
                                    <div>
                                        <div>SCHEDULES</div>
                                        <div>
                                            <Form.radio error={errors.scheduled_run_scan} register={register("scheduled_run_scan", { required: true })} value="DAILY" text={"daily"} />
                                            <Form.radio error={errors.scheduled_run_scan} register={register("scheduled_run_scan", { required: true })} value="WEEKLY" text={"weekly"} />
                                            <Form.radio error={errors.scheduled_run_scan} register={register("scheduled_run_scan", { required: true })} value="MONTHLY" text={"monthly"} />
                                            <Form.radio error={errors.scheduled_run_scan} register={register("scheduled_run_scan", { required: true })} value="YEARLY" text={"yearly"} />
                                        </div>
                                    </div>
                                    <div className="space-y-4 flex-1">
                                        <Form.input min={minDate()} type="date" register={register("scheduled_start_date", { required: true })} error={errors.scheduled_start_date} label={"DATE"} />
                                        <Form.input min={minTime()} error={errors.scheduled_start_time} register={register("scheduled_start_time", { required: true })} type={"time"} label={"TIME (Current Time + 3 Minutes)"} />
                                    </div>
                                </div>}

                                <div className="flex flex-1 w-full">
                                    <Form.texarea error={errors.remarks} register={register('remarks', { required: true })} classNameInput="h-full" className="w-full h-full" label={"REMARKS"}></Form.texarea>
                                </div>
                            </CardAnimation>
                        </div>
                    </div>
                    <div className="flex justify-end gap-4">
                        <div className=" cursor-pointer min-w-[120px] bg-primary py-4 text-center text-red-500" onClick={() => {
                            setStatus(d => ({ ...d, ADDTASK: false }))
                        }}>CANCEL</div>
                        {/* <div type="submit" className=" min-w-[120px] bg-primary py-4 text-center uppercase px-4 text-yellow-400">save as draft</div> */}
                        <button disabled={loading} type="submit" className=" min-w-[120px] bg-primary py-4 flex items-center justify-center gap-2">
                            <span>SAVE</span>
                            {loading && <LoadingOutlined></LoadingOutlined>}

                        </button>
                    </div>
                </form>
            </CardBox>
        </ModalsComponent>
    )
}