import axios from "axios";
import { path } from "./GET"
import { toast } from "react-hot-toast";

export const POST_API = {
    addProtectedSite: (data, reset, setStatus, refresh) =>
        ToastData({
            name: "Protected Site",
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

    addscanAssets: (data, reset, setStatus, refresh) =>
        ToastData({
            name: "SCAN",
            url: `${path}/api/scans`,
            data,
            reset,
            setStatus,
            refresh
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
};


const ToastData = ({ name, url, data, reset, setStatus, success, error, refresh }) => {
    if (!name || !url || !data || !reset) {
        toast.error(`required ${!name ? "name" : ""} ${!url ? "url" : ""} ${!data && "data"} ${!reset && "reset"}`)
    } else {
        toast.promise(
            axios.post(url, { ...data }),
            {
                loading: 'LOADING...',
                success: (items) => {
                    if (refresh) {
                        refresh()
                    }
                    reset();
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