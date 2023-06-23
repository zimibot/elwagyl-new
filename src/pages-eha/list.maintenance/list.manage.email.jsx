import { Loading } from "."
import { GET_API_EHA } from "../../api/eha/GET"
import { UPDATE_API } from "../../api/eha/UPDATE"
import { Form } from "../../components.eha/input"
import { CardBox } from "../../components/layout/card"
import { TitleContent } from "../../components/layout/title"

export const ListEmailManage = () => {
    const api = GET_API_EHA.root([
        {
            active: "emailSettings"
        }
    ])


    const refresh = () => {
        api.data.emailSettings.refetch()
    }

    const onChange = (data) => {

        data = {
            id: data.id,
            name: data.comment,
            config_is_running: data.target.checked,
            updated_by: localStorage.getItem("user")
        }

        UPDATE_API.updateEmail(data.id, data, null, refresh)
    }

    return <CardBox className={"flex-1"}>
        <TitleContent>
            <div className="text-[24px] uppercase text-blue">MANAGE EMAIL NOTIFICATIONS</div>
        </TitleContent>
        <div className="space-y-4">
            <div className="text-[16px]">
                <div className="p-5">SCAN NOTIFICATION (SENT TO SYSTEM  OWNER AND TASK CREATOR)</div>
                <div className="grid grid-cols-4 gap-4">
                    {api.error ? "ERROR" : api.loading ? <Loading /> : api.data.emailSettings.result.map(d => {
                        return d.is_hide ? "" : <div key={d.id} className="border border-primary p-4">
                            <Form.check checked={d.config_is_running} onChange={evt => onChange({
                                ...evt,
                                ...d,
                            })} text={<div>{d.comment} : {d.config_is_running ? <span className="text-blue">ON</span> : <span className="text-red-500">OFF</span>}</div>}></Form.check>
                        </div>
                    })}

                    {/* <div className="border border-primary p-4">
                        <Form.check text={"SCAN COMPLETED : OFF"}></Form.check>
                    </div>
                    <div className="border border-primary p-4">
                        <Form.check text={"SCAN PAUSED : OFF"}></Form.check>
                    </div>
                    <div className="border border-primary p-4">
                        <Form.check text={"SCAN RESUMED : OFF"}></Form.check>
                    </div> */}
                </div>
            </div>
        </div>
    </CardBox>
}