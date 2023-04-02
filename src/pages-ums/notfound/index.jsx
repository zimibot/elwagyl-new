import { SmileOutlined, SmileTwoTone } from "@ant-design/icons"
import { Result } from "antd"
import { LayoutDashboard } from "../../components/layout/dashboard.layout"

const NotFoundUMS = () => {
    return <LayoutDashboard>
        <div className="col-span-full text-white flex items-center justify-center">
            <Result
                icon={<div className="text-[120px] text-blue">
                    <SmileOutlined/>
                </div>}
                title={<div className="text-[40px]">PAGES 404</div>}
                subTitle={<div className="text-white text-[30px] uppercase">Sorry, the page you visited does not exist.</div>}
            // extra={<Button type="primary">Back Home</Button>}
            />
        </div>
    </LayoutDashboard>
}

export default NotFoundUMS