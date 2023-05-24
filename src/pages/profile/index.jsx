import { CheckOutlined, CloseOutlined } from "@ant-design/icons"
import { Form } from "../../components.eha/input"
import { Alert, Descriptions, notification } from 'antd';
import { ButtonComponents } from "../../components.eha/button";
import { useForm } from "react-hook-form";
import axios from "axios";

const ProfilePage = () => {

    const { register, handleSubmit, setError, reset, formState: { errors } } = useForm()
    const licnese = JSON.parse(localStorage.getItem("license"))
    const onSubmit = (data) => {
        data = {
            ...data,
            user_id: localStorage.getItem("id")
        }

        axios.post("http://165.22.50.184:8000/users/reset-password", data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }
        }).then(d => {
            openNotification({ msg: "Password Reset Successful", types: "success", label: "SUCCESS" })
            reset()
        }).catch(d => {
            // alert(d.response.data.detail)
            setError("current_password")
            openNotification({ msg: d.response.data.detail, types: "error", label: "ERRORS" })
        })
    }

    const openNotification = ({ msg, types, label }) => {
        notification.open({
            message: <div className="text-white">{label}</div>,
            type: types,
            className: "!bg-primary !text-white !bg-opacity-40 !backdrop-blur-sm",
            // icon: <CloseOutlined className="text-red-500"></CloseOutlined>,
            closeIcon: <CloseOutlined className="text-red-500"></CloseOutlined>,
            description:
                msg,
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    };

    return <div className="flex flex-col h-full w-full ">
        <div className="w-full p-4 bg-primary flex justify-between items-center z-10" style={{
            WebkitUserSelect: "none",
            WebkitAppRegion: "drag",
        }}>
            <div>PROFILE</div>
            <button className="text-red-500 menu-no-drag" onClick={() => {
                window.api.invoke('profile-close')
            }}><CloseOutlined></CloseOutlined></button>
        </div>
        <div className="flex-1 relative">
            <div className="w-full h-full bg-border_second  grid grid-cols-2">
                <div className="w-full h-full border-l border-primary">
                    <div className="p-4 border-b border-primary">INFORMATION</div>
                    <div className="p-4">
                        <Descriptions column={1} bordered size="small"  >
                            <Descriptions.Item label="Name User">{localStorage.getItem("user")}</Descriptions.Item>
                            <Descriptions.Item label="Roles">Super Admin</Descriptions.Item>
                            <Descriptions.Item label="License Expired">MAY 2025</Descriptions.Item>
                            <Descriptions.Item label="License Duration">{licnese.detailLicense.duration}</Descriptions.Item>
                            <Descriptions.Item label="License Registered">{licnese.detailLicense.registered_date}</Descriptions.Item>
                        </Descriptions>
                    </div>
                </div>
                <div className="w-full h-full">
                    <div className="p-4 border-b border-primary">CHANGE PASSWORD</div>
                    <form className="space-y-5 p-4 flex flex-col relative" onSubmit={handleSubmit(onSubmit)}>
                        {/* <div>
                        <Alert className="rounded-none bg-blue border-0 " message={<div className="flex items-center gap-4 font-bold"><CheckOutlined></CheckOutlined> <span>RESET PASSWORD SUCCESS</span></div>} type="success" />
                        </div> */}
                        <Form.input error={errors.current_password} register={register("current_password", { required: true })} label={"current password"} type="password"></Form.input>
                        <Form.input error={errors.new_password} register={register("new_password", { required: true })} label={"New Password"} type="password"></Form.input>
                        <ButtonComponents>SUBMIT</ButtonComponents>
                    </form>
                </div>


            </div>
        </div>
    </div>
}

export default ProfilePage