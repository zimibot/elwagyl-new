import { Drawer } from "antd"
import { GetAndUpdateContext } from "../model/context.function"

export const DrawerMenu = ({ children }) => {
    const { value, setvalue } = GetAndUpdateContext()

    return (
        <Drawer title={false} width={"100%"} getContainer={false} placement="right" closable={false} open={value.SHOWDETAIL}>
            <div className="space-y-4 flex h-full flex-col">
                <div className="flex justify-end text-red-400">
                    <button onClick={() => {
                        setvalue(d => ({
                            ...d,
                            SHOWDETAIL: !d.SHOWDETAIL
                        }))
                    }}>CLOSE</button>
                </div>
                {children}
            </div>
        </Drawer>
    )
}