import { Drawer } from "antd"

export const DrawerMenu = ({ children }) => {
    return (
        <Drawer title={false} height={"100%"} getContainer={false} placement="bottom" closable={false} open={true}>
            <div className="space-y-4 flex h-full flex-col">
                <div className="flex justify-end text-red-400">
                    <button>CLOSE</button>
                </div>
                {children}
            </div>
        </Drawer>
    )
}