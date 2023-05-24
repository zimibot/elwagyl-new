import { Result } from 'antd';
import { useEffect, useState } from 'react';
import { GetAndUpdateContext } from '../../model/context.function';
import "intro.js/introjs.css";
import { Steps } from 'intro.js-react';
import { useLocation } from 'react-router-dom';
import { SidebarMenu } from '../../components.ums/sidebar.menu';
import { STEPBYSTEP } from '../../model/information';



export const LayoutDashboard = ({ children, className = "" }) => {

    const [ishow, setishow] = useState(localStorage.getItem('step'));
    const [statusStep, setstatus] = useState();
    const locations = useLocation().state
    useEffect(() => {

        setTimeout(() => {
            setstatus(true)
        }, 3000);
        return () => {
            setstatus()
        };
    }, []);

    return ( <div className={`${locations?.ums ? `flex flex-1 ${className}` : `flex flex-1 flex-col ${className}`}`}>
        {statusStep && !ishow &&
            <Steps
                enabled={!ishow}
                steps={STEPBYSTEP}
                initialStep={0}
                onExit={() => {
                    localStorage.setItem("step", true)
                    setishow(true)
                }}
                // onBeforeExit={() => confirm("Are you sure to exit the tutorial ?")}
                options={{
                    showProgress: false,
                    showBullets: true,
                    exitOnEsc: false,
                    exitOnOverlayClick: false,
                }}

            />
        }

        {locations?.ums && <SidebarMenu></SidebarMenu>}
        <div className="grid grid-cols-9 flex-1  mx-auto w-full relative overflow-hidden text-blue">

            {children}

        </div>
    </div> 

    )
}