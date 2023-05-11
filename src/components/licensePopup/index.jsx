import { CloseOutlined } from "@ant-design/icons"
import styled from "styled-components"

import elwagyl from "../../assets/license/elwagyl.svg"
import paloalto from "../../assets/license/paloalto.svg"
import cortex from "../../assets/license/cortex.svg"

const Button = styled.button`
    -webkit-app-region: no-drag;
`


export const LicensePoup = () => {
    return <div className="absolute w-full h-full flex flex-col uppercase bg-[#101C26]">
        <div className="w-full p-4 bg-primary flex justify-between items-center sticky top-0" style={{
            WebkitUserSelect: "none",
            WebkitAppRegion: "drag",
        }}>
            <div>LICENSE</div>
            {/* <Button className="text-red-500 menu-no-drag"><CloseOutlined></CloseOutlined></Button> */}
        </div>
        <div className=" flex-1  flex flex-col gap-4 p-4 overflow-auto">
            <div className="border border-primary">
                <div className="p-5">
                    <img src={elwagyl}></img>
                </div>
                <div className="grid grid-cols-2 border-t border-primary">
                    <div className="font-bold p-4">PRODUCT NAME</div>
                    <div className="border-l border-primary p-4">EL WAGYL TIM</div>
                </div>
                <div className="grid grid-cols-2 border-t border-primary">
                    <div className="font-bold p-4">IDENTIFICATION NUMBER</div>
                    <div className="border-l border-primary p-4">
                        <div>AS12-DD45-EE56-AA21</div>
                    </div>
                </div>
                <div className="grid grid-cols-2 border-t border-primary">
                    <div className="font-bold p-4">VALIDITY TYPE</div>
                    <div className="border-l border-primary p-4">ON PREMISE [MAY-2025]</div>
                </div>
            </div>
            <div className="border border-primary">
                <div className="p-5">
                    <img src={elwagyl}></img>
                </div>
                <div className="grid grid-cols-2 border-t border-primary">
                    <div className="font-bold p-4">PRODUCT NAME</div>
                    <div className="border-l border-primary p-4">E.H.A</div>
                </div>
                <div className="grid grid-cols-2 border-t border-primary">
                    <div className="font-bold p-4">IDENTIFICATION NUMBER</div>
                    <div className="border-l border-primary p-4">
                        <div>I23A-56AS-77OP-98OL</div>
                    </div>
                </div>
                <div className="grid grid-cols-2 border-t border-primary">
                    <div className="font-bold p-4">VALIDITY TYPE</div>
                    <div className="border-l border-primary p-4">ON PREMISE [MAY-2025]</div>
                </div>
            </div>
            <div className="border border-primary">
                <div className="p-5">
                    <img src={paloalto}></img>
                </div>
                <div className="grid grid-cols-2 border-t border-primary">
                    <div className="font-bold p-4">PRODUCT NAME</div>
                    <div className="border-l border-primary p-4">VM-100 - PALO ALTO NETWORKS</div>
                </div>
                <div className="grid grid-cols-2 border-t border-primary">
                    <div className="font-bold p-4">IDENTIFICATION NUMBER</div>
                    <div className="border-l border-primary p-4">
                        <div>2197301408120740123</div>
                    </div>
                </div>
                <div className="grid grid-cols-2 border-t border-primary">
                    <div className="font-bold p-4">VALIDITY TYPE</div>
                    <div className="border-l border-primary p-4">ON PREMISE [MAY-2025]</div>
                </div>
            </div>
            <div className="border border-primary">
                <div className="p-5">
                    <img src={paloalto}></img>
                </div>
                <div className="grid grid-cols-2 border-t border-primary">
                    <div className="font-bold p-4">PRODUCT NAME</div>
                    <div className="border-l border-primary p-4">PA - 5220 - XDR PALO ALTO NETWORKS</div>
                </div>
                <div className="grid grid-cols-2 border-t border-primary">
                    <div className="font-bold p-4">IDENTIFICATION NUMBER</div>
                    <div className="border-l border-primary p-4">
                        <div>2197301408120740123</div>
                    </div>
                </div>
                <div className="grid grid-cols-2 border-t border-primary">
                    <div className="font-bold p-4">VALIDITY TYPE</div>
                    <div className="border-l border-primary p-4">ON PREMISE [MAY-2025]</div>
                </div>
            </div>
            <div className="border border-primary">
                <div className="p-5">
                    <img src={cortex}></img>
                </div>
                <div className="grid grid-cols-2 border-t border-primary">
                    <div className="font-bold p-4">PRODUCT NAME</div>
                    <div className="border-l border-primary p-4">CORTEX XDR PALO ALTO NETWORKS</div>
                </div>
                <div className="grid grid-cols-2 border-t border-primary">
                    <div className="font-bold p-4">IDENTIFICATION NUMBER</div>
                    <div className="border-l border-primary p-4">
                        <div>2197301408120740123</div>
                    </div>
                </div>
                <div className="grid grid-cols-2 border-t border-primary">
                    <div className="font-bold p-4">VALIDITY TYPE</div>
                    <div className="border-l border-primary p-4">ON PREMISE [MAY-2025]</div>
                </div>
            </div>
        </div>
    </div>
}
