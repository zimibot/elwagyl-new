import styled from "styled-components"
import { SquareMedium } from "../components/decoration/square"

const Check = styled.label`
    input:checked ~ .checkmark {
        background-color: #1C3947;
    }
    input:checked ~ .bg-ss {
        background-color: #00D8FF;
    }
    input:checked ~ .text-sc {
        color: #1C3947;
        font-weight: bold;
    }
`
export const InputCheck = ({text}) => {
    return <Check className="flex items-center gap-3 relative p-3 cursor-pointer">
        <input className="opacity-0 absolute" type="checkbox" />
        <div className="bg-[#101C26] w-full h-full absolute left-0 top-0 bg-ss"></div>
        <div className="checkmark h-5 w-5  relative border-[2px] border-primary" />
        <span className="relative text-sc">  {text}</span>
        <SquareMedium></SquareMedium>
    </Check>
}