import { ButtonComponents } from "../../components.eha/button"
import { Form } from "../../components.eha/input"
import LOGO from "../../assets/images/full.logo.svg";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { API_POST, getCookie } from "../../api";
import { toast, Toaster } from "react-hot-toast";
import { useCookies } from "react-cookie";

const LoginPages = () => {

    const navi = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm({ shouldUseNativeValidation: true });
    const onSubmit = async data => {
        // API_POST.LOGIN(data)


        toast.promise(
            API_POST.LOGIN(data),
            {
                loading: 'LOGIN LOADING...',
                success: (d) => {
                    localStorage.setItem("token", d.data.access_token)
                    setTimeout(() => {
                        navi("/dashboard")
                    }, 500);
                    return <b>LOGIN SUCCESS!</b>
                },
                error: "LOGIN FAILED",
            }, {
            style: {
                background: '#333',
                color: '#fff',
                fontSize: 20,
                borderRadius: 0
            },
        })


        // return navi("/dashboard")
    };

    let auth = localStorage.getItem("token")

    return !auth ? <div className="flex-col flex flex-1">
        <Toaster></Toaster>
        <div className="flex flex-col flex-1">
            <div className="flex-auto flex items-center justify-center flex-col gap-5" style={{
                background: "rgba(16, 28, 38, 0.8)"
            }}>
                <img src={LOGO} className=" w-2/5"></img>
                <form onSubmit={handleSubmit(onSubmit)} className="p-2 flex-col space-y-4 justify-center items-center border-blue">
                    <div className="flex gap-4">
                        <Form.input register={register("username", { required: true })} placeholder="USERNAME" className="min-w-[400px]" />
                        <Form.input register={register("password", { required: true })} type="password" placeholder="PASSWORD" className="min-w-[400px]" />
                    </div>
                    <ButtonComponents className="h-[43px] w-full">
                        LOGIN
                    </ButtonComponents>
                </form>
            </div>

        </div>
    </div> : <Navigate to={"/dashboard"}></Navigate>
}

export default LoginPages