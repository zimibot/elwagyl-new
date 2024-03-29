import { Select, Tooltip } from "antd"
import { SquareMedium } from "../components/decoration/square"
import styled from "styled-components"
import { Controller } from "react-hook-form";
import { DeleteFilled, ExclamationCircleOutlined, ExclamationOutlined } from "@ant-design/icons";
import { isArray } from "radash";

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
export const SelectComponent = ({ onDelete, button, ClassLabel, ClassButton, required = true, width = 160, error, height, control, name, className, loading, label, onChangeData, data = [
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
        label: <div className="flex justify-between items-center" data={d.label}>
            <div className="flex items-center gap-2">
                {props.mode !== "multiple" && props.mode !== "tag" && <img src="./cube.svg"></img>}
                {d.label}
            </div>
        </div>
    })) || [];

    return <div className="space-y-4">
        {label && <div className={ClassLabel ? ClassLabel : ""}>
            <label className="uppercase">{label}</label>
        </div>}
        <div className="space-y-2">

            <div className="relative flex items-center justify-end">

                <Controller
                    control={control}
                    name={name}
                    rules={{
                        required: required
                    }}
                    // defaultValue={null}
                    render={({
                        field: { onChange, onBlur, value, ref },
                    }) => {
                        return (
                            <Selecable
                                ref={ref}
                                maxTagCount="responsive"
                                height={height}
                                // value={value ? value : false}
                                value={isArray(value) ? value : value ? value : props.mode === "multiple" || props.mode === "tag" ? [] : value}
                                status={error ? 'error' : ''}
                                onBlur={d => onBlur(d)}
                                className={className ? className : ""}
                                showSearch={false}
                                placeholder="please Select"
                                allowClear
                                clearIcon={<DeleteFilled></DeleteFilled>}
                                style={{
                                    width: width,
                                }}
                                loading={loading}
                                // defaultActiveFirstOption
                                removeIcon={() => {
                                    return <DeleteFilled></DeleteFilled>
                                }}

                                showArrow={error ? false : true}
                                onChange={(d, w) => {
                                    if (onChangeData) {
                                        onChangeData(d, w)
                                    }

                                    if (isArray(d)) {
                                        if (d.length === 0) {
                                            onChange(null)
                                        } else {
                                            onChange(d)
                                        }
                                    } else {
                                        onChange(d)
                                    }


                                }}

                                options={items}
                                {...props}
                            />
                        )
                    }}
                />
                <div className={`${ClassButton ? "" : ""} absolute right-10`}>
                    {button}
                </div>

                <SquareMedium />
            </div>
            {error && <div className="text-red-400 gap-2 flex text-[15px] items-center">
                <ExclamationOutlined /> <span>INPUT IS REQUIRED</span>
            </div>}
        </div>

    </div>

}