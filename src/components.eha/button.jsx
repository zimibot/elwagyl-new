import { SquareMedium } from "../components/decoration/square"

export const ButtonComponents = ({ children, className= "", click = () => { } }) => {
    return (
        <button className={`text-[16px] relative min-w-[130px] py-2 text-center bg-[#152A36] uppercase ${className}`} onClick={click}>
            {children}
            <SquareMedium></SquareMedium>
        </button>
    )
}