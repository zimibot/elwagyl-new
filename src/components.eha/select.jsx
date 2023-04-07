import { Select } from "antd"
import { SquareMedium } from "../components/decoration/square"
import styled from "styled-components"
import { useController } from "react-hook-form"

const Selecable = styled(Select)`
    .ant-select-selector {
        height: ${({ height }) => height ? `${height}px !important` : "auto"} ;
    }
`
export const SelectComponent = ({ width = 160, height, control, name, className, label }) => {

    const {
        field,
    } = useController({
        name,
        control,
        // rules: { required: true },
    });


    return <div className="space-y-4">
        {label && <label className="uppercase">{label}</label>}
        <div className="relative">
            <Selecable
                ref={field.ref}
                height={height}
                defaultValue="jack"
                value={field.value}
                onBlur={d => field.onBlur(d)}
                className={className ? className : ""}
                style={{
                    width: width,
                }}

                onChange={d => field.onChange(d)}
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
    </div>

}