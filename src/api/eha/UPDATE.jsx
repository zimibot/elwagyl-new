import axios from "axios";
import { path } from "./GET"
import { toast } from "react-hot-toast";

export const UPDATE_API = {
    updateProtectedSite: (id, data, setStatus) => ToastData({ name: data.site_name, url: `${path}/api/protected-sites/${id}`, setStatus, data: { ...data, updated_by: data.created_by } }),
    updateScanManage: (id, data, setStatus) => ToastData({ name: data.name, url: `${path}/api/tool-scanners/${id}`, setStatus, data })
}

const ToastData = ({ name, url, data, setStatus }) => {

    if (!name || !url || !data || !setStatus) {
        toast.error(`required ${!name && "name"} ${!url && "url"} ${!data && "data"} ${!setStatus && "setStatus"}`)
    }

    toast.promise(
        axios.put(url, { ...data }),
        {
            loading: 'LOADING...',
            success: () => {
                setStatus((d) => ({
                    ...d,
                    addProtected: false,
                    editScanTools: false,
                    UpdateStatus: !d?.UpdateStatus
                }))
                return <span className="uppercase">UPDATE <b className="text-blue">{name}</b> SUCCESS!</span>
            },
            error: <span className="uppercase">UPDATE <b className="text-blue">{name}</b> FAILED</span>,
        }, {
        style: {
            background: '#333',
            color: '#fff',
            fontSize: 20,
            borderRadius: 0
        },
    })

}