import { Drawer } from "antd"
import { GetAndUpdateContext } from "../../model/context.function"
import { TitleContent } from "../layout/title"
import { TabItem } from "./tab.item"

export const MassagesDrawer = () => {
    const { maximize, setmaximize } = GetAndUpdateContext()
    return <Drawer title={false} width={"100%"} placement="right" onClose={() => {
        setmaximize(d => ({ ...d, MESSAGES: !d.MESSAGES }))
        window.api.invoke('message-close') 
    }} closable={false} open={true}>
        <TitleContent maximizeItem={"MESSAGES"} className={"pt-0"}>
            <div className="text-[24px] uppercase text-blue">MESSAGES</div>
        </TitleContent>
        <div className="flex-1 pt-4 ml-[-23px] mr-[-23px] flex flex-col">
            <TabItem></TabItem>
        </div>
    </Drawer>
}