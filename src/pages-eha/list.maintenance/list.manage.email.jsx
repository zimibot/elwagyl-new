import { Form } from "../../components.eha/input"
import { CardBox } from "../../components/layout/card"
import { TitleContent } from "../../components/layout/title"

export const ListEmailManage = () => {
    return <CardBox className={"flex-1"}>
        <TitleContent>
            <div className="text-[24px] uppercase text-blue">MANAGE EMAIL NOTIFICATIONS</div>
        </TitleContent>
        <div className="space-y-4">
            <div className="text-[16px]">
                <div className="p-5">SCAN NOTIFICATION (SENT TO SYSTEM  OWNER AND TASK CREATOR)</div>
                <div className="grid grid-cols-4 gap-4">
                    <div className="border border-primary p-4">
                        <Form.check text={"SCAN STARTED : OFF"}></Form.check>
                    </div>
                    <div className="border border-primary p-4">
                        <Form.check text={"SCAN COMPLETED : OFF"}></Form.check>
                    </div>
                    <div className="border border-primary p-4">
                        <Form.check text={"SCAN PAUSED : OFF"}></Form.check>
                    </div>
                    <div className="border border-primary p-4">
                        <Form.check text={"SCAN RESUMED : OFF"}></Form.check>
                    </div>
                </div>
            </div>
            <div className="text-[16px]">
                <div className="p-5">SCAN NOTIFICATION (SENT TO SYSTEM  OWNER AND TASK CREATOR)</div>
                <div className="grid grid-cols-5 gap-4">
                    <div className="border border-primary p-4">
                        <Form.check text={<span>
                            FINDING CREATED <br></br>(SENT TO QC TEAM): ON
                        </span>}></Form.check>
                    </div>
                    <div className="border border-primary p-4">
                        <Form.check text={<span>
                            FINDING PASSED QC <br></br>(SENT TO QC TEAM): ON
                        </span>}></Form.check>
                    </div>
                    <div className="border border-primary p-4">
                        <Form.check text={<span>
                            FINDING PASSED QA (SENT TO BUSINESS<br></br> OWNER AND FINDING OWNER): OFF
                        </span>}></Form.check>
                    </div>
                    <div className="border border-primary p-4">
                        <Form.check text={<span>
                            FINDING RESCANNING <br></br> (SENT TO SYSTEM OWNER): OFF
                        </span>}></Form.check>
                    </div>
                    <div className="border border-primary p-4">
                        <Form.check text={<span>
                            FINDING REACHED DEADLINE <br></br> (SENT TO SYSTEM OWNER): ON
                        </span>}></Form.check>
                    </div>
                </div>
            </div>
        </div>
    </CardBox>
}