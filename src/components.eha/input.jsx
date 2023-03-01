import { AlertFilled } from "@ant-design/icons"

export const Form = {
    input: ({ label, className = "", classNameInput = "", error, ...props }) => {
        return <div className={`flex flex-col gap-4 text-[16px] ${className} `}>
            <label className="uppercase">{label}</label>
            <div className="relative w-full">
                <input className={` bg-primary w-full p-4 ${classNameInput} ${error && "border border-red-500"}`} {...props}></input>
            </div>
            {error && <div className="text-red-500">input is required</div>}
        </div>
    },
    texarea: ({ label, className = "", classNameInput = "", error, ...props }) => {
        return <div className={`flex flex-col gap-4 text-[16px] ${className} `}>
            <label className="uppercase">{label}</label>
            <div className="relative w-full">
                <textarea rows={5} className={` bg-primary w-full p-4 ${classNameInput} ${error && "border border-red-500"}`} {...props}/>
            </div>
            {error && <div className="text-red-500">input is required</div>}
        </div>
    },

}