import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Result } from "antd";
import { useQuery } from "react-query";

import { ButtonComponents } from "../../components.eha/button";
import { Form } from "../../components.eha/input";
import { ShadowError } from "../../components/shadow";
import { CardAnimation } from "../../components/layout/card";
import { LoadingOther } from "../../components/loading/loadingOther";
import { ModalSuccess, ModalsComponent } from "../../components.eha/modal";
import { GetAndUpdateContext } from "../../model/context.function";
import { isDev } from "../../helper/context";
import { API_POST, path } from "../../api/elwagyl";

import LOGO from "../../assets/images/full.logo.svg";
import logo from "../../assets/logo.svg";

let isDevLicense = "00:15:5d:83:03:44";

const LoginPages = () => {
    const { setStatus } = GetAndUpdateContext();

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ shouldUseNativeValidation: true });

    const [message, setMessage] = useState({
        error: false,
        status: false,
        loading: false,
        isLoad: false,
    });
 

    const verifyLicense = (data) => {

        let requestData = {
            license_id: {
                license_elwagyl: "AS12-DD45-EE56-AA21",
                license_eha: "I23A-56AS-77OP-98OL",
                license_sase: "DA12-WW21-09LO-88SJ",
            },
            mac_address: isDev ? isDevLicense : data.macs[0],
        };



        axios
            .post(`${path}/license-v2/verify`, requestData, {
                headers: {
                    "Cache-Control": "no-cache",
                    Pragma: "no-cache",
                    Expires: "0",
                },
            })
            .then((response) => {
                localStorage.setItem(
                    "license",
                    JSON.stringify({
                        detailLicense: response.data,
                    })
                );

                setMessage((prevMessage) => ({
                    ...prevMessage,
                    error: false,
                    loading: false,
                    status: false,
                }));

            })
            .catch((error) => {

                setMessage((prevMessage) => ({
                    ...prevMessage,
                    error: false,
                    loading: false,
                }));
                if (error.code === "ERR_NETWORK") {
                    setMessage((prevMessage) => ({
                        ...prevMessage,
                        error: true,
                    }));
                } else {
                    setMessage((prevMessage) => ({
                        ...prevMessage,
                        status: true,
                    }));
                }
            });
    };

    const { isLoading: isQueryLoading, data, isFetching } = useQuery("dataOS", () =>
        window.api.invoke("dataOS")
    );

    useEffect(() => {
   

        if (!isQueryLoading) {
            

            verifyLicense(data);
        }
    }, [isQueryLoading, isFetching]);

    const onSubmit = async (data) => {
        toast.promise(
            API_POST.LOGIN(data),
            {
                loading: "Logging in...",
                success: (response) => {
                    axios
                        .get(`${path}/users/me`, {
                            headers: {
                                Authorization: `Bearer ${response.data.access_token}`,
                            },
                        })
                        .then((userData) => {
                            if (
                                userData.data.permissions &&
                                userData.data.permissions.pages &&
                                userData.data.permissions.pages.length > 0
                            ) {
                                localStorage.setItem("id", response.data.user.id);
                                localStorage.setItem("token", response.data.access_token);
                                localStorage.setItem("user", response.data.user.username);

                                const item = userData.data.permissions.pages.find(
                                    (page) => page.group === "ELWAGYL"
                                );
                                navigate(item.pages ? item.pages[0].url : "/elwagyl");
                                localStorage.setItem(
                                    "current_url",
                                    item.pages ? item.pages[0].url : "/elwagyl"
                                );
                            } else {
                                // Menampilkan pesan error jika tidak ada izin akses
                                ModalSuccess({
                                    title: "User does not have access permissions.",
                                    type: "error",
                                });
                                throw new Error(
                                    "Login failed: User does not have access permissions."
                                );
                            }
                        });

                    return <b>Login successful!</b>;
                },
                error: "Login failed. Please verify your username and password.",
            },
            {
                style: {
                    background: "#333",
                    color: "#fff",
                    fontSize: 20,
                    borderRadius: 0,
                },
            }
        ).catch((error) => {
            console.error(error.message);
        });
    };

    const isAuthenticated = localStorage.getItem("token");

    return !isAuthenticated ? (
        <CardAnimation className="flex-col flex flex-1">
            {message.loading ? (
                <LoadingOther></LoadingOther>
            ) : (
                <div className="flex flex-col flex-1">
                    {message.status && !message.error ? (
                        <div className="absolute w-full h-full flex items-center justify-center">
                            <Result
                                extra={
                                    <button
                                        className="bg-primary p-4 hover:bg-blue hover:text-black"
                                        onClick={() => {
                                            setStatus((prevStatus) => ({
                                                ...prevStatus,
                                                showVerify: true,
                                            }));
                                        }}
                                    >
                                        ENTER LICENSE!
                                    </button>
                                }
                                icon={<div className="flex justify-center"><img width={120} src={logo} alt="Logo" /></div>}
                                title={<span className="text-[30px] uppercase">EL WAGYL HAS BEEN SUCCESSFULLY UPDATED.</span>}
                                subTitle={
                                    <div className="text-blue text-[20px] uppercase">
                                        AS PART OF THE UPDATE, WE KINDLY REQUEST YOU TO RE-VERIFY YOUR LICENSE. <br /> PLEASE TAKE A MOMENT TO ENTER YOUR LICENSE AGAIN TO ENSURE UNINTERRUPTED ACCESS AND USAGE OF THE APPLICATION
                                    </div>
                                }
                            />
                        </div>
                    ) : (
                        <div
                            className="flex-auto flex items-center justify-center flex-col gap-5"
                            style={{
                                background: "rgba(16, 28, 38, 0.8)",
                            }}
                        >
                            <img src={LOGO} className="w-2/5" alt="Logo" />
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="p-2 flex-col space-y-4 justify-center items-center border-blue"
                            >
                                <div className="flex gap-4">
                                    <Form.input
                                        register={register("username", { required: true })}
                                        placeholder="USERNAME"
                                        className="min-w-[400px]"
                                    />
                                    <Form.input
                                        register={register("password", { required: true })}
                                        type="password"
                                        placeholder="PASSWORD"
                                        className="min-w-[400px]"
                                    />
                                </div>
                                <ButtonComponents className="h-[43px] w-full">
                                    LOGIN
                                </ButtonComponents>
                            </form>
                        </div>
                    )}
                    <CardAnimation>
                        {message.error && <ShadowError />}
                    </CardAnimation>
                </div>
            )}
            <LicensePages setMessage={setMessage} setStatus={setStatus}></LicensePages>
        </CardAnimation>
    ) : (
        <Navigate
            to={localStorage.getItem("current_url") ? localStorage.getItem("current_url") : "/elwagyl"}
        ></Navigate>
    );
};

export default LoginPages;

const LicensePages = ({ setMessage, setStatus }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        window.api.invoke("dataOS").then((osData) => {
            data = {
                license_id: {
                    license_elwagyl: data.license_id.license_elwagyl?.replace(/ /g, ""),
                    license_eha: data.license_id.license_eha?.replace(/ /g, ""),
                    license_sase: data.license_id.license_sase?.replace(/ /g, ""),
                },
                mac_address: isDev ? isDevLicense : osData.macs[0],
            };

            axios
                .put(`${path}/license-v2/add-mac-address`, data)
                .then((response) => {
                    alert("The license has been successfully verified.");
                    setMessage((prevMessage) => ({
                        ...prevMessage,
                        isLoad: !prevMessage.isLoad,
                    }));
                    setStatus((prevStatus) => ({
                        ...prevStatus,
                        showVerify: false,
                    }));
                })
                .catch((error) => {
                    reset();
                    alert(error.response.data.detail);
                });
        });
    };

    return (
        <ModalsComponent title={"LICENSE VERIFICATION"} modalName={"showVerify"}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Form.input
                    error={errors.license_id?.license_elwagyl}
                    register={register("license_id.license_elwagyl", { required: true })}
                    label={"LICENSE ELWAGYL"}
                />
                <Form.input
                    register={register("license_id.license_eha")}
                    label={"LICENSE EHA"}
                />
                <Form.input
                    register={register("license_id.license_sase")}
                    label={"LICENSE SASE"}
                />
                <div className="flex justify-end">
                    <ButtonComponents>SUBMIT</ButtonComponents>
                </div>
            </form>
        </ModalsComponent>
    );
};
