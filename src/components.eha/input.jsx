import { ExclamationCircleOutlined, EyeFilled, EyeInvisibleFilled } from "@ant-design/icons"
import { DatePicker, Tooltip } from "antd"
import { useState } from "react"
import styled from "styled-components"
import { Dropdown } from 'antd';


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

        let type = props?.type === "password" ? showPw ? "text" : props.type : props.type

        return <div className={rowColumn ? "flex gap-4 whitespace-nowrap items-center" : `flex flex-col gap-4 text-[16px] ${className} `}>
            {label && <label className="uppercase">{label}</label>}
            <div className="relative w-full flex items-center justify-end">
                <Input {...props} type={type} className={`bg-primary w-full p-3 ${classNameInput} ${error && "border border-red-400"}`} {...register} ></Input>

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
                    <Tooltip title="INPUT IS REQUIRED">
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
    check: ({ text, register, classRoot = "", ...props }) => {
        return <Check className={`flex items-center gap-3 relative p-3 cursor-pointer ${classRoot}`}>
            <Input className="opacity-0 absolute" type="checkbox" {...register} {...props} />
            {/* <div className="bg-[#101C26] w-full h-full absolute left-0 top-0 bg-ss"></div> */}
            <div className="checkmark h-5 w-5  relative border-[2px] border-blue" />
            <span className="relative text-sc uppercase"> {text}</span>
        </Check>

    },
    radio: ({ text, register, ...props }) => {
        return <Check className="flex items-center gap-3 relative p-3 cursor-pointer">
            <Input className="opacity-0 absolute" type="radio" {...register} {...props} />
            {/* <div className="bg-[#101C26] w-full h-full absolute left-0 top-0 bg-ss"></div> */}
            <div className="checkmark h-5 w-5  relative border-[2px] border-blue" />
            <span className="relative text-sc">  {text}</span>
        </Check>
    },
    date: ({ onChange, label }) => {
        return <div className="flex flex-col gap-4 text-[16px]">
            <label className="uppercase">{label}</label>
            <DatePinckers onChange={d => onChange(d)} />
        </div>
    }

}

const DatePinckers = styled(DatePicker)`
    background: #152A36;
    width: 100%;
    opacity: 1;
    font-size: 16px;
    padding: 11px;
    .ant-picker-input>input {
        font-size: 16px;
    }

`