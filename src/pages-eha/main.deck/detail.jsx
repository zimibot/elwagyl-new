import { DrawerMenu } from "../../components.eha/drawer.menu"
import { TitleContent } from "../../components/layout/title"

export const DetailDeck = () => {
    return <DrawerMenu>
        <TitleContent  className={"pt-0"}>
            <div className="text-[24px] uppercase">MESSAGES</div>
        </TitleContent>
    </DrawerMenu>
}