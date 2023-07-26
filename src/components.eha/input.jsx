import { CalendarOutlined, ClockCircleOutlined, DownOutlined, ExclamationCircleFilled, ExclamationCircleOutlined, ExclamationOutlined, EyeFilled, EyeInvisibleFilled, FieldTimeOutlined } from "@ant-design/icons"
import { DatePicker, Slider, Switch, Tag, TimePicker, Timeline, Tooltip } from "antd"
import { useState } from "react"
import styled from "styled-components"
import { Dropdown } from 'antd';
import { Controller } from "react-hook-form";
import dayjs from 'dayjs';
import moment from "moment";
import { ButtonComponents } from "./button";
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



        let pwd = props?.type === "password" ? !showPw ? "password" : "text" : props?.type
        return <div className={rowColumn ? "flex gap-4 whitespace-nowrap items-center" : `flex flex-col gap-4 text-[16px] ${className} `}>
            {label && <label className="uppercase flex justify-between items-center">{label}
                {/* {type === "file" &&
                    <div className="flex gap-2">
                        <div className="cursor-pointer" onClick={() => { setfile(true) }}>
                            <Tag className="rounded-none" color={file ? "cyan" : "grey"}>UPLOAD FILE</Tag>
                        </div>
                        <div className="cursor-pointer" onClick={() => { setfile(false) }}>
                            <Tag className="rounded-none" color={file ? "grey" : "cyan"}>URL</Tag>
                        </div>
                    </div>
                } */}
            </label>}
            <div className="relative w-full flex gap-2 flex-col">
                <div className="relative">
                    <Input placeholder="please fill in this input"  {...props} type={pwd} className={`bg-primary w-full p-3 ${classNameInput} ${error && "border !border-red-400"}`} {...register} ></Input>

                    {props?.type === "password" &&
                        <Dropdown
                            open={customError}
                            rootClassName="is-error"
                            menu={{
                                items,
                            }}
                            placement="left"
                        >
                            <div className="absolute right-0 px-4 top-0 text-[20px] h-full flex items-center justify-center" onClick={() => setshowPw(d => !d)}>
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
                </div>
                {error ? error.type === "required" ? <div className="text-red-400 flex items-center gap-1  text-[15px] uppercase">
                    <ExclamationOutlined />{error.message === "" ? <span>INPUT IS REQUIRED</span> : <span>{error.message}</span>}
                </div> : <div className="text-red-400 flex items-center gap-1  text-[15px] uppercase">
                    <ExclamationOutlined /><span>{error?.message}</span>
                </div> : ""}
            </div>

        </div>
    },
    texarea: ({ label, className = "", classNameInput = "", register, error, ...props }) => {
        return <div className={`flex flex-col gap-4 text-[16px] ${className} `}>
            <label className="uppercase">{label}</label>
            <div className="relative w-full flex  flex-col  gap-2 flex-1">
                <textarea rows={5} className={` bg-primary w-full outline-none p-3 ${classNameInput} ${error && "border border-red-500"}`} {...register} {...props} />
                {error && <div className="text-red-400 flex items-center gap-1  text-[15px]">
                    <ExclamationOutlined /><span>INPUT IS REQUIRED</span>
                </div>}
            </div>
        </div>
    },
    check: ({ text, register, error, classRoot = "", ...props }) => {
        return <Check className={`flex items-center gap-3 relative cursor-pointer ${error ? "text-red-500" : ""} `}>
            <Input className="opacity-0 absolute" type="checkbox" {...register} {...props} />
            {/* <div className="bg-[#101C26] w-full h-full absolute left-0 top-0 bg-ss"></div> */}
            <div className={`checkmark h-5 w-5  relative border-[2px]  ${error ? "border-red-500" : "border-blue"}`} />
            <span className="relative text-sc uppercase"> {text}</span>
        </Check>

    },
    radio: ({ name, control, text, error, register, ...props }) => {
        return <Check className={`flex items-center gap-3 relative p-2 cursor-pointer ${error ? "text-red-500" : ""} `}>
            <Input {...register} className="opacity-0 absolute" type="radio"  {...props} />
            {/* <div className="bg-[#101C26] w-full h-full absolute left-0 top-0 bg-ss"></div> */}
            <div className={`checkmark rounded-full h-5 w-5  relative border-[2px]  ${error ? "border-red-500" : "border-blue"}`} />
            <span className="relative text-sc top-1 uppercase"> {text}</span>
        </Check>
    },
    dropdown: ({ items = [
        {
            key: '1',
            label: 'Item 1',
        },
    ], label, onChange, ...props }) => {
        const [show, setShow] = useState(false)
        const [defaultData, setdefaultData] = useState({
            text: "",
            data: ['']
        })

        items = items.map(d => ({
            ...d,
            label: <span className="uppercase">{d.label}</span>
        }))

        return <Check className={`flex items-center gap-3 relative p-2 cursor-pointer `}>
            <Dropdown
                open={show}
                autoAdjustOverflow
                onOpenChange={(d) => {
                    setShow(d)
                }}
                menu={{
                    items,
                    selectable: true,
                    defaultSelectedKeys: defaultData.data,
                    onClick: (d) => {
                        // console.log(d)
                        setdefaultData(({
                            text: d.key,
                            data: d.keyPath
                        }))
                        onChange(d)
                    },
                }}
                {...props}
            >
                <ButtonComponents className={`flex gap-3 items-center justify-between ${defaultData.text === "" ? "" : "bg-blue text-black font-bold"}`} click={() => { setShow(d => !d) }} >
                    {defaultData.text !== "" ? defaultData.text : label}
                    <DownOutlined className="text-base"></DownOutlined>
                </ButtonComponents>
            </Dropdown>
        </Check>
    },
    switch: ({ error, required = false, control, name, label, nonControl, type, onchangeData, ...props }) => {
        if (nonControl) {
            return <Switch className="w-full" {...props}  ></Switch>
        }
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
                    field: { onChange, value, ref },
                }) => {
                    return (<Switch {...props} checkedChildren="ON" unCheckedChildren="OFF" className="w-full" ref={ref} checked={value ? value : false} onChange={(d) => {
                        onChange(d)
                        if (onchangeData) {
                            onchangeData(d)
                        }
                    }}></Switch>)

                }}
            />

        </div>
    },
    slider: ({ onChangeCustom, error, required = false, colorRail = "#152A36", control, name, label, nonControl, type, marks = {
        0: 'none',
        50: 'low',
        75: 'medium',
        100: "high",
    }, ...props }) => {
        if (nonControl) {
            return <Switch className="w-full" {...props}  ></Switch>
        }
        if (!control || !name) {
            return <div className="w-full p-4 h-12 bg-red-500 text-white uppercase">control/name is required </div>
        }
        return <div className="relative">
            <div className="uppercase">SELECT RISK LEVEL*</div>
            <div className="px-5">
                <Controller
                    control={control}
                    name={name}
                    rules={{
                        required: required
                    }}
                    render={({
                        field: { onChange, value, ref },
                    }) => {

                        return (<Slider onChange={onChange} tooltip={{
                            open: false
                        }}
                            trackStyle={{
                                background: colorRail
                            }}
                            railStyle={{
                                background: "#152A36",
                                height: 5
                            }} marks={marks} step={null} value={value} ref={ref} />)

                    }}
                />
            </div>
            {error && <div className="text-red-400 absolute px-4 font-[20px]">
                <Tooltip title="INPUT IS REQUIRED">
                    <ExclamationCircleOutlined />
                </Tooltip>
            </div>}
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