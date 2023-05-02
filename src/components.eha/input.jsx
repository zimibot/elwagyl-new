import { CalendarOutlined, ClockCircleOutlined, ExclamationCircleFilled, ExclamationCircleOutlined, EyeFilled, EyeInvisibleFilled, FieldTimeOutlined } from "@ant-design/icons"
import { DatePicker, Switch, Tag, TimePicker, Timeline, Tooltip } from "antd"
import { useState } from "react"
import styled from "styled-components"
import { Dropdown } from 'antd';
import { Controller } from "react-hook-form";
import dayjs from 'dayjs';
import moment from "moment";
import { SwitchCustom } from "../components/form.input";
import { SquareMedium } from "../components/decoration/square";
const { RangePicker } = DatePicker;


const items = [
    {
        key: '1',
        label: (
            <div className="text-[16px] uppercase text-red-500">
                passwords do not match!
            </div>
        ),
    },
];
const Check = styled.label`
    input:checked ~ .checkmark {
        background-color: #00D8FF;
    }
  
`
const Input = styled.input`
    border: 1px solid transparent;
    :hover {
        border: 1px solid
    }
`

export const Form = {
    input: ({ label, rowColumn, className = "", classNameInput = "", error, customError = false, register, ...props }) => {


        const [showPw, setshowPw] = useState();
        const [file, setfile] = useState(false);



        let type = props?.type === "password" ? showPw ? "text" : props.type : props.type

        return <div className={rowColumn ? "flex gap-4 whitespace-nowrap items-center" : `flex flex-col gap-4 text-[16px] ${className} `}>
            {label && <label className="uppercase flex justify-between items-center">{label}
                {type === "file" &&
                    <div className="flex gap-2">
                        <div className="cursor-pointer" onClick={() => { setfile(true) }}>
                            <Tag className="rounded-none" color={file ? "cyan" : "grey"}>UPLOAD FILE</Tag>
                        </div>
                        <div className="cursor-pointer" onClick={() => { setfile(false) }}>
                            <Tag className="rounded-none" color={file ? "grey" : "cyan"}>URL</Tag>
                        </div>
                    </div>
                }
            </label>}
            <div className="relative w-full flex items-center justify-end">
                <Input {...props} type={type === "file" ? file ? type : "text" : type} className={`bg-primary w-full p-3 ${classNameInput} ${error && "border !border-red-400"}`} {...register} ></Input>

                {!error && props?.type === "password" &&
                    <Dropdown
                        open={customError}
                        rootClassName="is-error"
                        menu={{
                            items,
                        }}
                        placement="left"
                    >
                        <div className="absolute right-0 px-4 text-[20px]" onClick={() => setshowPw(d => !d)}>
                            {showPw ?
                                <Tooltip title="HIDE PASSWORD">
                                    <EyeInvisibleFilled />
                                </Tooltip>
                                :
                                <Tooltip title="SHOW PASSWORD">
                                    <EyeFilled />
                                </Tooltip>
                            }
                        </div>
                    </Dropdown>


                }

                {error && <div className="text-red-400 absolute px-4 font-[20px]">
                    <Tooltip placement="left" title={error.message ? error.message : "INPUT IS REQUIRED"}>
                        <ExclamationCircleOutlined />
                    </Tooltip>
                </div>}
            </div>
        </div>
    },
    texarea: ({ label, className = "", classNameInput = "", register, error, ...props }) => {
        return <div className={`flex flex-col gap-4 text-[16px] ${className} `}>
            <label className="uppercase">{label}</label>
            <div className="relative w-full flex items-start justify-end flex-1">
                <textarea rows={5} className={` bg-primary w-full outline-none p-3 ${classNameInput} ${error && "border border-red-500"}`} {...register} {...props} />
                {error && <div className="text-red-400 absolute px-4 font-[20px]">
                    <Tooltip title="INPUT IS REQUIRED">
                        <ExclamationCircleOutlined />
                    </Tooltip>
                </div>}
            </div>
        </div>
    },
    check: ({ text, register, error, classRoot = "", ...props }) => {
        return <Check className={`flex items-center gap-3 relative p-3 cursor-pointer ${error ? "text-red-500" : ""} `}>
            <Input className="opacity-0 absolute" type="checkbox" {...register} {...props} />
            {/* <div className="bg-[#101C26] w-full h-full absolute left-0 top-0 bg-ss"></div> */}
            <div className={`checkmark h-5 w-5  relative border-[2px]  ${error ? "border-red-500" : "border-blue"}`} />
            <span className="relative text-sc uppercase"> {text}</span>
        </Check>

    },
    radio: ({ text, error, register, ...props }) => {
        return <Check className={`flex items-center gap-3 relative p-3 cursor-pointer ${error ? "text-red-500" : ""} `}>
            <Input className="opacity-0 absolute" type="radio" {...register} {...props} />
            {/* <div className="bg-[#101C26] w-full h-full absolute left-0 top-0 bg-ss"></div> */}
            <div className={`checkmark h-5 w-5  relative border-[2px]  ${error ? "border-red-500" : "border-blue"}`} />
            <span className="relative text-sc">  {text}</span>
        </Check>
    },
    switch: ({ error, required = false, control, name, label, type, ...props }) => {
        if (!control || !name) {
            return <div className="w-full p-4 h-12 bg-red-500 text-white uppercase">control/name is required </div>
        }
        return <div className="relative switch-item">
            <Controller
                control={control}
                name={name}
                rules={{
                    required: required
                }}
                render={({
                    field: { onChange, onBlur, value, ref },
                }) => {
                    return (<Switch {...props} className="w-full" ref={ref} checked={value} onChange={onChange}></Switch>)

                }}
            />

        </div>
    },
    date: ({ error, required = true, control, name, label, type, ...props }) => {

        if (!control || !name) {
            return <div className="w-full p-4 h-12 bg-red-500 text-white uppercase">control/name is required </div>
        }

        return <div className="flex flex-col gap-4 text-[16px]">
            <label className="uppercase">{label}</label>
            <div className={`relative flex items-center justify-end ${error ? "border border-red-500" : ""}`}>
                <Controller
                    control={control}
                    name={name}
                    rules={{
                        required: required
                    }}
                    render={({
                        field: { onChange, onBlur, value, ref },
                    }) => {
                        return (type === "time" ?
                            <TimePickers suffixIcon={error ? false : <ClockCircleOutlined></ClockCircleOutlined>} onBlur={onBlur} format={"hh:mm:ss"} ref={ref} value={value ? moment(value, 'hh:mm:ss') : ""} {...props} onChange={(__, w) => onChange(w)}></TimePickers> :
                            <DatePinckers suffixIcon={error ? false : <CalendarOutlined></CalendarOutlined>} ref={ref} value={value ? dayjs(value) : ""} type={type} onChange={(__, w) => onChange(w)} />)
                    }}
                />
                {error && <div className="text-red-400 absolute px-4 font-[20px]">
                    <Tooltip title="INPUT IS REQUIRED">
                        <ExclamationCircleOutlined />
                    </Tooltip>
                </div>}
            </div>
        </div>
    }

}

const DatePinckers = styled(DatePicker)`
    background: #152A36;
    width: 100%;
    opacity: 1;
    font-size: 16px;
    padding: 9px;
    .ant-picker-input>input {
        font-size: 16px;
    }

`

const TimePickers = styled(TimePicker)`
    background: #152A36;
    width: 100%;
    opacity: 1;
    font-size: 16px;
    padding: 9px;
    .ant-picker-input>input {
        font-size: 16px;
    }

`
const RangePickers = styled(RangePicker)`
    background: #152A36;
    width: 100%;
    opacity: 1;
    font-size: 16px;
    padding: 9px;
    .ant-picker-input>input {
        font-size: 16px;
    }

`