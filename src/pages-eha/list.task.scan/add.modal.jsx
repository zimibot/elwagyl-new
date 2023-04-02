import { useForm } from "react-hook-form";
import { Form } from "../../components.eha/input";
import { ModalsComponent, ModalSuccess } from "../../components.eha/modal";
import { CardBox } from "../../components/layout/card";
import { TitleContent } from "../../components/layout/title";
import { GetAndUpdateContext } from "../../model/context.function";

export const AddModal = () => {
    const { setStatus } = GetAndUpdateContext()
    const { register, handleSubmit, setValue, unregister, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
        ModalSuccess()
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
                        <div className="text-[24px] uppercase text-blue">add new asset</div>
                    </TitleContent>
                    <div className="grid grid-cols-3 gap-7">
                        <div className="space-y-8">
                            <Form.input register={register("target_scan")} label={"TARGET TO SCAN"} />
                            <Form.input register={register("tools_scanner")} label={"TOOLS SCANNER"} />
                            <div className="grid grid-cols-2 gap-4">
                                <Form.date register={register("sla_date")} label={"SLA DATE"} />
                                <Form.input register={register("tools_scanner")} label={"TOOLS SCANNER"} />
                            </div>
                            <Form.input register={register("recipient_email")} label={"RECIPIENT EMAIL"} />
                            <Form.input register={register("attachments")} label={"attachments"} />
                        </div>
                        <div className="space-y-8 col-span-2 flex flex-col">
                            <Form.date register={register("dates_and_schedules")} label={"DATES AND SCHEDULES"} />
                            <Form.date register={register("scheduled_start_time")} label={"SCHEDULED START TIME"} />
                            <div className="flex flex-1 w-full">
                                <Form.texarea classNameInput="h-full" className="w-full h-full" label={"REMARKS"}></Form.texarea>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-4">
                        <div className=" cursor-pointer min-w-[120px] bg-primary py-4 text-center text-red-500" onClick={() => {
                            setStatus(d => ({ ...d, ADDTASK: false }))
                        }}>CANCEL</div>
                        <div type="submit" className=" min-w-[120px] bg-primary py-4 text-center uppercase px-4 text-yellow-400">save as draft</div>
                        <button type="submit" className=" min-w-[120px] bg-primary py-4">SAVE</button>
                    </div>
                </form>
            </CardBox>
        </ModalsComponent>
    )
}