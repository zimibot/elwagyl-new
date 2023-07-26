import axios from "axios";
import { path } from "./GET"
import { toast } from "react-hot-toast";

export const POST_API = {
    addProtectedSite: (data, reset, setStatus, refresh) =>
        ToastData({
            name: "DATA CENTER",
            url: `${path}/api/protected-sites`,
            data,
            reset,
            setStatus,
            refresh
        }),

    addScanManage: (data, reset, setStatus, refresh) =>
        ToastData({
            name: "MANAGE SCAN PROFILES",
            url: `${path}/api/tool-scanners`,
            data,
            reset,
            setStatus,
            refresh
        }),

    addAssets: (data, reset, setStatus, success, error, refresh) =>
        ToastData({
            name: "ASSETS",
            url: `${path}/api/assets`,
            data,
            reset,
            setStatus,
            refresh,
            success,
            error
        }),

    addplatforms: (data, reset, setStatus, refresh) =>
        ToastData({
            name: "PLATFORM",
            url: `${path}/api/platforms`,
            data,
            reset,
            setStatus,
            refresh
        }),

    addscanAssets: (data, reset, refresh, success, error) =>
        ToastData({
            name: "SCAN",
            url: `${path}/api/scans`,
            data,
            reset,
            refresh,
            success,
            error
        }),
    addPlatformsCategory: (data, reset, setStatus, refresh) =>
        ToastData({
            name: "PLATFORM",
            url: `${path}/api/platform-categories`,
            data,
            reset,
            setStatus,
            refresh
        }),
    addRiskGroup: (data, reset, refresh, success) =>
        ToastData({
            name: "RISK GROUP",
            url: `${path}/api/asset-risk-groups`,
            data,
            reset,
            refresh,
            success
        }),
    addScanImage: (data, success, error) =>
        ToastData({
            name: "UPLOAD FILES",
            url: `${path}/api/general/upload`,
            data,
            success,
            error
        }),
};


const ToastData = ({ name, url, data, reset, setStatus, success, error, refresh }) => {
    toast.promise(
        axios.post(url, name === "UPLOAD FILES" ? data : { ...data }, name === "UPLOAD FILES" ? {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        } : {}),
        {
            loading: 'LOADING...',
            success: (items) => {
                if (refresh) {
                    refresh()
                }
                if (reset) {
                    reset();
                }
                if (success) {
                    success(items);
                }
                if (setStatus) {
                    setStatus((d) => ({
                        ...d,
                        UpdateStatus: !d?.UpdateStatus
                    }));
                }
                return <b>ADD {name} SUCCESS!</b>;
            },
            error: (d) => {
                if (error) {
                    error(d.response.data);
                }

                console.log(d.response.data )

                const errorMessage = d.response?.data?.result[0]?.msg || "SAVE ERROR";

                return (
                    <div className="text-red-500 font-bold">
                        {errorMessage}
                    </div>
                );
            }
        },
        {
            style: {
                background: '#333',
                color: '#fff',
                fontSize: 20,
                borderRadius: 0
            }
        }
    );


}