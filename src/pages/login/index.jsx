import { ButtonComponents } from "../../components.eha/button"
import { Form } from "../../components.eha/input"
import LOGO from "../../assets/images/full.logo.svg";
import iconLogo from "../../assets/logo.svg";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { API_POST, path } from "../../api/elwagyl";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useEffect } from "react";
import { Result } from "antd";
import { useState } from "react";
import { ShadowError } from "../../components/shadow";
import { CardAnimation } from "../../components/layout/card";
import { LoadingOther } from "../../components/loading/loadingOther";
import { ModalsComponent } from "../../components.eha/modal";
import { GetAndUpdateContext } from "../../model/context.function";
import { isDev } from "../../helper/context";
// import logo from "../../assets/images/logo.svg"

let isDevLicense = "00:15:5d:83:03:33"

const LoginPages = () => {

    const { setStatus } = GetAndUpdateContext()

    const navi = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm({ shouldUseNativeValidation: true });

    const [msg, setMsg] = useState(
        {
            error: false,
            status: false,
            loading: true,
            isload: false
        }
    )



    const licenseData = (d) => {
        let data = {
            "license_id": {
                "license_elwagyl": "AS12-DD45-EE56-AA21",
                "license_eha": "I23A-56AS-77OP-98OL",
                "license_sase": "DA12-WW21-09LO-88SJ"
            },
            "mac_address": isDev ? isDevLicense : d.macs[0]
        }
        axios.post(`${path}/license-v2/verify`, data, {
            headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0',
            },
        }).then(d => {
            localStorage.setItem("license", JSON.stringify({
                detailLicense: d.data
            }))
            setMsg(d => ({
                ...d,
                error: false,
                loading: false,
                status: false
            }))

        }).catch(res => {
            setMsg(d => ({
                ...d,
                error: false,
                loading: false
            }))
            if (res.code === "ERR_NETWORK") {
                setMsg(d => ({
                    ...d,
                    error: true
                }))
            } else {
                setMsg(d => ({
                    ...d,
                    status: true
                }))
            }
        })
    }

    useEffect(() => {
        setMsg(d => ({
            ...d,
            loading: true
        }))
        window.api.invoke('dataOS').then(d => {
            licenseData(d)
        })
    }, [msg.isload])

    const onSubmit = async data => {

        toast.promise(
            API_POST.LOGIN(data),
            {
                loading: 'LOGIN LOADING...',
                success: (d) => {
                    console.log(d)
                    localStorage.setItem("id", d.data.user._id)
                    localStorage.setItem("token", d.data.access_token)
                    localStorage.setItem("user", d.data.user.username)
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

    return !auth ? <CardAnimation className="flex-col flex flex-1">
        {msg.loading ? <LoadingOther></LoadingOther> : <div className="flex flex-col flex-1">

        <div className="flex-auto flex items-center justify-center flex-col gap-5" style={{
                background: "rgba(16, 28, 38, 0.8)"
            }}>
                <img src={LOGO} className="w-2/5"></img>
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
            
            {/* {msg.status ? <div className="absolute w-full h-full flex items-center justify-center">
                <Result extra={<button className="bg-primary p-4 hover:bg-blue hover:text-black" onClick={() => {
                    setStatus(d => ({
                        ...d,
                        showVerify: true
                    }))
                }}>ENTER LICENSE !</button>} icon={<div className="flex justify-center"><img width={120} src={iconLogo}></img></div>}
                    title={<span className="text-[30px] uppercase">EL WAGYL HAS BEEN SUCCESSFULLY UPDATED.</span>}
                    subTitle={<div className="text-blue text-[20px] uppercase">AS PART OF THE UPDATE, WE KINDLY REQUEST YOU TO RE-VERIFY YOUR LICENSE. <br /> PLEASE TAKE A MOMENT TO ENTER YOUR LICENSE AGAIN TO ENSURE UNINTERRUPTED ACCESS AND USAGE OF THE APPLICATION</div>}>
                </Result>
            </div> : <div className="flex-auto flex items-center justify-center flex-col gap-5" style={{
                background: "rgba(16, 28, 38, 0.8)"
            }}>
                <img src={LOGO} className="w-2/5"></img>
                <form onSubmit={handleSubmit(onSubmit)} className="p-2 flex-col space-y-4 justify-center items-center border-blue">
                    <div className="flex gap-4">
                        <Form.input register={register("username", { required: true })} placeholder="USERNAME" className="min-w-[400px]" />
                        <Form.input register={register("password", { required: true })} type="password" placeholder="PASSWORD" className="min-w-[400px]" />
                    </div>
                    <ButtonComponents className="h-[43px] w-full">
                        LOGIN
                    </ButtonComponents>
                </form>
            </div>} */}
            <CardAnimation>
                {msg.error && <ShadowError />}
            </CardAnimation>
        </div>}
        <LicensePages setMsg={setMsg} setStatus={setStatus}></LicensePages>
    </CardAnimation> : <Navigate to={"/dashboard"}></Navigate>
}

export default LoginPages


const LicensePages = ({ setMsg, setStatus }) => {

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm()

    const onSubmit = (data) => {
      
        window.api.invoke('dataOS').then(d => {
            data = {
                ...data,
                "mac_address": isDev ? isDevLicense : d.macs[0]
                // "mac_address": "00:15:5d:83:03:11"
            }

            axios.put(`${path}/license-v2/add-mac-address`, data).then(d => {
                alert("The license has been successfully verified.")
                setMsg(d => ({
                    ...d,
                    isload: !d.isload
                }))
                setStatus(d => ({
                    ...d,
                    showVerify: false
                }))
            }).catch(d => {
                reset()
                alert(d.response.data.detail)
            })
        })

    }

    console.log(watch())

    return <ModalsComponent title={"LICENSE VERIFICATION"} modalName={"showVerify"}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Form.input error={errors.license_id?.license_elwagyl} register={register("license_id.license_elwagyl", { required: true })} label={"LICENSE ELWAGYL"} />
            <Form.input register={register("license_id.license_eha")} label={"LICENSE EHA"} />
            <Form.input register={register("license_id.license_sase")} label={"LICENSE SASE"} />
            <div className="flex justify-end">
                <ButtonComponents>SUBMIT</ButtonComponents>
            </div>
        </form>
    </ModalsComponent>
}