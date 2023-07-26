import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "../../components.eha/input"
import { ModalSuccess } from "../../components.eha/modal";
import { CardBox } from "../../components/layout/card"
import { TitleContent } from "../../components/layout/title"

export const ListRegisterUser = () => {
    const { register, handleSubmit, setValue, unregister, watch, formState: { errors } } = useForm();

    const [alert, setalert] = useState(false);

    const Onsubmit = (d) => {
        console.log(d)

        let { password, verify_password } = d

        if (password !== verify_password) {
            setalert(true)
        } else {
            ModalSuccess({ title: "Successfully Register user!" })
            setalert(false)
        }

    }

    return (
        <CardBox className="flex-1">
            <TitleContent>
                <div className="text-[24px] uppercase text-blue">register user</div>
            </TitleContent>
            <CardBox className={"p-6 bg-[#1C3947]"}>
                <form className="space-y-8" onSubmit={handleSubmit(Onsubmit)}>
                    <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-6">
                            <Form.input register={register("full_name", { required: true })} error={errors.full_name} label={"full name*"} />
                            <Form.input register={register("username", { required: true })} error={errors.username} label={"username*"} />
                            <Form.input register={register("email", { required: true })} error={errors.email} label={"email*"} />
                            <Form.input register={register("role", { required: true })} error={errors.role} label={"role*"} />
                        </div>
                        <div className="space-y-6">
                            <Form.input register={register("protected_site", { required: true })} error={errors.protected_site} label={"Site*"} />
                            <Form.input register={register("user_details")} label={"user details"} />
                            <Form.input register={register("password", { required: true })} error={errors.password} customError={alert} type="password" label={"new password*"} />
                            <Form.input register={register("verify_password", { required: true })} error={errors.verify_password} customError={alert} type="password" label={"verify password*"} />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <Form.check text="user must change password at first logon (optional)"></Form.check>
                        <div>
                            <button className="bg-primary p-4 min-w-[150px] uppercase">
                                register
                            </button>
                        </div>
                    </div>
                </form>
            </CardBox>
        </CardBox>
    )
}