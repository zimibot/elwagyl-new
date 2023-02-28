import { Select } from "antd"
import {  SquareMedium } from "../components/decoration/square"

export const SelectComponent = ({width = 160}) => {
    return <div className="relative">
        <Select
            defaultValue="jack"
            style={{
                width: width,
            }}
            onChange={() => { }}
            options={[
                {
                    value: 'jack',
                    label: <div className="flex items-center gap-2">
                        <img src="./cube.svg"></img>

                        ALL
                    </div>,
                },
                {
                    value: 'no',
                    label: <div className="flex items-center gap-2">
                        <img src="./cube.svg"></img>

                        NON ALL
                    </div>,
                },

            ]}
        />
        <SquareMedium />
    </div>

}