import { Result } from 'antd';
import { DrawerMenu } from '../../components.eha/drawer.menu';
import { GetAndUpdateContext } from '../../model/context.function';



export const LayoutDashboard = ({ children,className = "" }) => {
    const { status } = GetAndUpdateContext()

    return (status.STATUSPING ? <div className={`flex flex-1 flex-col ${className}`}>
        <div className="grid grid-cols-9 flex-1  mx-auto w-full relative overflow-hidden">
            {children}
        </div>
    </div> : <div className="flex items-center justify-center flex-1">
        <Result
            status="warning"
            title={<span className="uppercase">You are offline, please check your internet network or VPN network</span>}
            extra={
                <button className="border border-primary px-4 py-2 hover:bg-blue hover:text-[#000]" onClick={() => {
                    window.api.invoke('network', ["network"])
                }}>
                    CHECK YOUR NETWORK
                </button>
            }
        />
    </div>

    )
}