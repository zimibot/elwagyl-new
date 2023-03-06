import { LayoutDashboard } from "../../components/layout/dashboard.layout"
import { GetAndUpdateContext } from "../../model/context.function"
import { FormModal } from "./form.modal"
import { ListDetail } from "./list.detail"
import { ListView } from "./list.view"



const AssetsList = () => {
    const { status } = GetAndUpdateContext()

    return (
        <LayoutDashboard className="bg-[#101C26] text-[16px]">
            {status.VIEWSHOW?.show ? <ListView></ListView> : <ListDetail></ListDetail>}

            <FormModal></FormModal>
        </LayoutDashboard>
    )
}



export default AssetsList