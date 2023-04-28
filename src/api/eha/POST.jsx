import axios from "axios";
import { path } from "./GET"
import { toast } from "react-hot-toast";

export const POST_API = {
    addProtectedSite: (data, reset, setStatus) => ToastData({ name: "Protected Site", url: `${path}/api/protected-sites`, data, reset, setStatus }),
    addScanManage: (data, reset, setStatus) => ToastData({ name: "MANAGE SCAN PROFILES", url: `${path}/api/tool-scanners`, data, reset, setStatus }),
    addAssets: (data, reset, setStatus) => ToastData({ name: "ASSETS", url: `${path}/api/assets`, data, reset, setStatus }),
}

const ToastData = ({ name, url, data, reset, setStatus }) => {
    if (!name || !url || !data || !setStatus || !reset) {
        toast.error(`required ${!name ? "name" : ""} ${!url ? "url" : ""} ${!data && "data"} ${!setStatus && "setStatus"} ${!reset && "reset"}`)
    } else {

        toast.promise(
            axios.post(url, { ...data }),
            {
                loading: 'LOADING...',
                success: () => {
                    reset()
                    setStatus((d) => ({
                        ...d,
                        addProtected: false,
                        editScanTools:false,
                        UpdateStatus: !d?.UpdateStatus
                    }))
                    return <b>ADD {name} SUCCESS!</b>
                },
                error: `ADD ${name} FAILED`,
            }, {
            style: {
                background: '#333',
                color: '#fff',
                fontSize: 20,
                borderRadius: 0
            },
        })
    }

}