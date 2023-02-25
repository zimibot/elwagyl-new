import { Drawer } from "antd"
import { GetAndUpdateContext } from "../model/context.function"

export const DrawerMenu = ({ children, name, placement = "right" }) => {
    const { value, setvalue } = GetAndUpdateContext()


    return ( value[name] &&
        <Drawer title={false} width={"100%"} getContainer={false} placement={placement} closable={false} open={value[name].show}>
            <div className="space-y-4 flex h-full flex-col">
                <div className="flex justify-end text-red-400">
                    <button onClick={() => {
                        setvalue(d => ({
                            ...d,
                            [name]: {
                                show: !d[name].show
                            }
                        }))
                    }}>CLOSE</button>
                </div>
                {children}
            </div>
        </Drawer>
    )
}