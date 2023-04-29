import { Select, Tooltip } from "antd"
import { SquareMedium } from "../components/decoration/square"
import styled from "styled-components"
import { Controller } from "react-hook-form";
import { DeleteFilled, ExclamationCircleFilled } from "@ant-design/icons";

const Selecable = styled(Select)`
    .ant-select-selector {
        height: ${({ height }) => height ? `${height}px !important` : "auto"} ;
    }
`

export const SelectMultiple = ({ height, className, width, data = [
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
] }) => {

    return <div className="relative">
        <Selecable
            mode="multiple"
            height={height}
            onBlur={d => onBlur(d)}
            className={className ? className : ""}
            style={{
                width: width,
            }}

            onChange={d => onChange(d)}
            options={data}
        />
    </div>

}
export const SelectComponent = ({ width = 160, error, height, control, name, className, loading, label, onChangeData, data = [
    {
        value: 'jack',
        label: " ALL",
    },
    {
        value: 'no',
        label: "NON ALL",
    },
], ...props }) => {


    if (!control || !name) {
        return <div className="p-4 bg-red-500 text-white">
            ERROR SELECTED
        </div>
    }

    let items = data.map(d => ({
        ...d,
        label: <div className="flex items-center gap-2">
            <img src="./cube.svg"></img>
            {d.label}
        </div>
    }))

    return <div className="space-y-4">
        {label && <label className="uppercase">{label}</label>}
        <div className="relative flex items-center justify-end">
            <Controller
                control={control}
                name={name}
                rules={{
                    required: true
                }}
                // defaultValue={null}
                render={({
                    field: { onChange, onBlur, value, ref },
                }) => {
                    value = value ? value : {}
                    return (
                        <Selecable
                            ref={ref}
                            maxTagCount="responsive"
                            height={height}
                            // value={value ? value : false}
                            {...value}
                            status={error ? 'error' : ''}
                            onBlur={d => onBlur(d)}
                            className={className ? className : ""}
                            style={{
                                width: width,
                            }}
                            loading={loading}
                            // defaultActiveFirstOption
                            removeIcon={() => {
                                return <DeleteFilled></DeleteFilled>
                            }}
                            onChange={d => {
                                onChange(d)
                                if (onChangeData) {
                                    onChangeData(d)
                                }
                            }}

                            options={items}
                            {...props}
                        />
                    )
                }}
            />
            {error && <div className="text-red-400 absolute px-4 right-5 font-[20px]">
                <Tooltip title="INPUT IS REQUIRED">
                    <ExclamationCircleFilled />
                </Tooltip>
            </div>}
            <SquareMedium />
        </div>
    </div>

}