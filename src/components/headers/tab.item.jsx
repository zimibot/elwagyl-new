import { Tabs } from 'antd';
import { DatePicker } from 'antd';
import { DefaultLimitText } from '../limitText';

const onChange = (key) => {
    console.log(key);
};


const items = [
    {
        key: '1',
        label: `TODAY`,
        children: <div>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((d,k) => {
                return <div key={d} className="p-6 border-b border-primary text-blue text-[16px] space-y-2 fadein2sc opacity-0" style={{
                    animationDelay: `${k * 100}ms`
                }}>
                    <div className="flex justify-between">
                        <div className="opacity-60">7 SECOND AGO</div>
                        <div>10:15:42 - 21/12/22</div>
                    </div>
                    <div className="font-bold">ATTACKER JAKARTA</div>
                    <DefaultLimitText config={{
                        className: "opacity-60",
                    }} text={"Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud"}></DefaultLimitText>
                </div>
            })}
        </div>,
    },
    {
        key: '2',
        label: `MONTH`,
        children: <div>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((d,k) => {
                return <div key={d} className="p-6 border-b border-primary text-blue text-[16px] space-y-2 fadein2sc opacity-0" style={{
                    animationDelay: `${k * 100}ms`
                }}>
                    <div className="flex justify-between">
                        <div className="opacity-60">7 SECOND AGO</div>
                        <div>10:15:42 - 21/12/22</div>
                    </div>
                    <div className="font-bold">ATTACKER JAKARTA</div>
                    <DefaultLimitText config={{
                        className: "opacity-60",
                    }} text={"Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud"}></DefaultLimitText>
                </div>
            })}
        </div>,
    },
    {
        key: '3',
        label: `ALL TIMES`,
        children: <div>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((d,k) => {
                return <div key={d} className="p-6 border-b border-primary text-blue text-[16px] space-y-2 fadein2sc opacity-0" style={{
                    animationDelay: `${k * 100}ms`
                }}>
                    <div className="flex justify-between">
                        <div className="opacity-60">7 SECOND AGO</div>
                        <div>10:15:42 - 21/12/22</div>
                    </div>
                    <div className="font-bold">ATTACKER JAKARTA</div>
                    <DefaultLimitText config={{
                        className: "opacity-60",
                    }} text={"Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud"}></DefaultLimitText>
                </div>
            })}
        </div>,
    },
    {
        key: '4',
        label: `SYSTEM`,
        children: <div>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((d,k) => {
                return <div key={d} className="p-6 border-b border-primary text-blue text-[16px] space-y-2 fadein2sc opacity-0" style={{
                    animationDelay: `${k * 100}ms`
                }}>
                    <div className="flex justify-between">
                        <div className="opacity-60">7 SECOND AGO</div>
                        <div>10:15:42 - 21/12/22</div>
                    </div>
                    <div className="font-bold">NEW UPDATE AVAILABLE [v.2.1.0]</div>
                    <DefaultLimitText config={{
                        className: "opacity-60",
                    }} text={"Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud"}></DefaultLimitText>
                </div>
            })}

        </div>,
    },
];
export const TabItem = () => <Tabs className="flex flex-col flex-1" tabBarExtraContent={<DatePicker picker="month" />} defaultActiveKey="1" items={items} onChange={onChange} />;