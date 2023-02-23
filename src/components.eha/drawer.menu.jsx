import { Drawer } from "antd"
import { useEffect } from "react"
import { GetAndUpdateContext } from "../model/context.function"

export const DrawerMenu = ({ children, show = false, name, placement = "right" }) => {
    const { value, setvalue } = GetAndUpdateContext()

    useEffect(() => {
        setvalue(d => ({ ...d, [name]: show }))
        return () => {
            setvalue(d => ({ ...d, [name]: false }))
        }
    }, [show])

    return (
        <Drawer title={false} width={"100%"} getContainer={false} placement={placement} closable={false} open={value[name]}>
            <div className="space-y-4 flex h-full flex-col">
                <div className="flex justify-end text-red-400">
                    <button onClick={() => {
                        setvalue(d => ({
                            ...d,
                            [name]: !d[name]
                        }))
                    }}>CLOSE</button>
                </div>
                {children}
            </div>
        </Drawer>
    )
}