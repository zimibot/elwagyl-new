import { Drawer } from "antd"
import { useState } from "react"

export const DrawerMenu = ({ children }) => {
    const [isShow, setShow] = useState(true)
    return (
        <Drawer title={false} width={"100%"} getContainer={false} placement="right" closable={false} open={isShow}>
            <div className="space-y-4 flex h-full flex-col">
                <div className="flex justify-end text-red-400">
                    <button onClick={() => { setShow(d => !d) }}>CLOSE</button>
                </div>
                {children}
            </div>
        </Drawer>
    )
}