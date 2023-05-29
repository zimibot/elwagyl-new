import { InputNumber } from 'antd';
import styled from 'styled-components';
import { SquareMedium } from '../components/decoration/square';
import { Controller } from 'react-hook-form';


const InputNumb = styled(InputNumber)`
    background: #152A36;
    border: 0;
    border-radius: 0;
    width: 100%;
    input.ant-input-number-input {
        border: 0;
        color: #00D8FF;
        font-size: 16px;
    }

    .ant-input-number-handler-wrap {
        background: #00D8FF;
    }
    
    .ant-input-number-handler-wrap .ant-input-number-handler {
        border: 0;
    }
    
    .ant-input-number-handler-wrap .ant-input-number-handler .ant-input-number-handler-up-inner {
        font-size: 10px;
        color: black;
        font-weight: bold;
    }
    
    .ant-input-number-handler {
        border: 0;
    }
    
    .ant-input-number-handler-wrap .ant-input-number-handler .ant-input-number-handler-down-inner {
        font-size: 10px;
        color: black;
        font-weight: bold;
    }
`

export const InputNumbers = ({ control, name, error, onChangeData, ...props }) =>
    <Controller
        control={control}
        name={name}
        // defaultValue={null}
        rules={{
            required: true
        }}
        render={({
            field: { onChange, onBlur, value, ref },
        }) => {
            return (
                <div className={`relative w-20 ${error ? "border border-red-500" : ""}`}>
                    <InputNumb value={value} ref={ref} min={1} onBlur={onBlur} max={100} onChange={(d) => {
                        if (onChangeData) {
                            onChangeData(d)
                        }
                        onChange(d)
                    }} {...props} />
                    <SquareMedium />
                </div>
            )
        }}
    />
