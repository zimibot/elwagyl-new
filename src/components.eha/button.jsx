import { SquareMedium } from "../components/decoration/square"

export const ButtonComponents = ({ children, className= "", active, click = () => { }, nonSubmit }) => {
    return (
       !nonSubmit?  <button className={`text-[16px] items-center flex justify-center hover:bg-blue hover:text-blueGray-800 hover:font-bold cursor-pointer relative min-w-[130px] py-2 px-4 text-center bg-[#152A36] uppercase ${className} ${active ? "text-blueGray-800  bg-blue font-bold" : ""}`} onClick={click}>
       {children}
       <SquareMedium></SquareMedium>
   </button> :  <div className={`text-[16px] items-center flex justify-center hover:bg-blue hover:text-blueGray-800 hover:font-bold cursor-pointer relative min-w-[130px] py-2 px-4 text-center bg-[#152A36] uppercase ${className} ${active ? "text-blueGray-800  bg-blue font-bold" : ""}`} onClick={click}>
            {children}
            <SquareMedium></SquareMedium>
        </div>
    )
}