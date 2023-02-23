import { Select } from "antd"
import {  SquareMedium } from "../components/decoration/square"

export const SelectComponent = () => {
    return <div className="relative">
        <Select
            defaultValue="jack"
            style={{
                width: 160,
            }}
            onChange={() => { }}
            options={[
                {
                    value: 'jack',
                    label: <span className="flex items-center gap-2">
                        <img src="./cube.svg"></img>

                        ALL
                    </span>,
                },
                {
                    value: 'no',
                    label: <span className="flex items-center gap-2">
                        <img src="./cube.svg"></img>

                        NON ALL
                    </span>,
                },

            ]}
        />
        <SquareMedium />
    </div>

}