import { CloseOutlined } from "@ant-design/icons"
import { Form } from "../../components.eha/input"
import { Descriptions } from 'antd';
import { ButtonComponents } from "../../components.eha/button";

const ProfilePage = () => {

    return <div className="flex flex-col h-full w-full">
        <div className="w-full p-4 bg-primary flex justify-between items-center sticky top-0" style={{
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
                <div className="w-full h-full">
                    <div className="p-4 border-b border-primary">CHANGE PASSWORD</div>
                    <form className="space-y-5 p-4 flex flex-col">
                        <Form.input label={"Password"} type="password"></Form.input>
                        <Form.input label={"Re type password"} type="password"></Form.input>
                        <ButtonComponents>SUBMIT</ButtonComponents>
                    </form>
                </div>
                <div className="w-full h-full border-l border-primary">
                    <div className="p-4 border-b border-primary">INFORMATION</div>
                    <div className="p-4">
                        <Descriptions column={2} bordered size="small" layout="vertical" >
                            <Descriptions.Item label="Name User">{localStorage.getItem("user")}</Descriptions.Item>
                            <Descriptions.Item label="Roles">Super Admin</Descriptions.Item>
                            <Descriptions.Item label="License Expired">MAY 2025</Descriptions.Item>
                            <Descriptions.Item label="License Duration">1.9 years ago</Descriptions.Item>
                        </Descriptions>
                    </div>
                </div>

            </div>
        </div>
    </div>
}

export default ProfilePage