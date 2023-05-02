import axios from "axios";
import { path } from "./GET"
import { toast } from "react-hot-toast";

export const POST_API = {
    addProtectedSite: (data, reset, setStatus) =>
        ToastData({
            name: "Protected Site",
            url: `${path}/api/protected-sites`,
            data,
            reset,
            setStatus
        }),

    addScanManage: (data, reset, setStatus) =>
        ToastData({
            name: "MANAGE SCAN PROFILES",
            url: `${path}/api/tool-scanners`,
            data,
            reset,
            setStatus
        }),

    addAssets: (data, reset, setStatus, success, error) =>
        ToastData({
            name: "ASSETS",
            url: `${path}/api/assets`,
            data,
            reset,
            setStatus,
            success,
            error
        }),

    addplatforms: (data, reset, setStatus) =>
        ToastData({
            name: "PLATFORM",
            url: `${path}/api/platforms`,
            data,
            reset,
            setStatus
        }),

    addscanAssets: (data, reset, setStatus) =>
        ToastData({
            name: "SCAN",
            url: `${path}/api/scans`,
            data,
            reset,
            setStatus
        }),
};


const ToastData = ({ name, url, data, reset, setStatus, success, error }) => {
    if (!name || !url || !data || !setStatus || !reset) {
        toast.error(`required ${!name ? "name" : ""} ${!url ? "url" : ""} ${!data && "data"} ${!setStatus && "setStatus"} ${!reset && "reset"}`)
    } else {
        toast.promise(
            axios.post(url, { ...data }),
            {
                loading: 'LOADING...',
                success: (items) => {
                    reset();
                    if (success) {
                        success(items);
                    }
                    setStatus((d) => ({
                        ...d,
                        UpdateStatus: !d?.UpdateStatus
                    }));
                    return <b>ADD {name} SUCCESS!</b>;
                },
                error: (d) => {
                    if (error) {
                        error(d.response.data);
                    }
                    return (
                        <div className="text-red-500 font-bold">
                           SAVE ERROR
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


}