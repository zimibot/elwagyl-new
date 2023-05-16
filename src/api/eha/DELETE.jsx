import axios from "axios";
import { path } from "./GET"
import { toast } from "react-hot-toast";

export const DELETE_API = {
    deleteProtectedSite: (data, setStatus, refresh) => ToastData({ name: data.site_name, url: `${path}/api/protected-sites/${data.id}`, setStatus, data: { deleted_by: data.name }, refresh }),
    deleteScanManage: (data, setStatus, refresh) => ToastData({ name: data.site_name, url: `${path}/api/tool-scanners/${data.id}`, setStatus, data: { deleted_by: data.name }, refresh }),
    deleteVulnerabilities: (data, setStatus, refresh) => ToastData({ name: data.site_name, url: `${path}/api/vulnerabilities/${data.id}`, setStatus, data: { deleted_by: data.name }, refresh }),
    deleteAssets: (data, setStatus, refresh) => ToastData({ name: data.site_name, url: `${path}/api/assets/${data.id}`, setStatus, data: { deleted_by: data.name }, refresh }),
    deleteScanAssets: (data, setStatus, refresh) => ToastData({ name: data.site_name, url: `${path}/api/scans/${data.id}`, setStatus, data: { deleted_by: data.name }, refresh }),
    deleteManagePlatform: (data, setStatus, refresh) => ToastData({ name: data.site_name, url: `${path}/api/platform-categories/${data.id}`, setStatus, data: { deleted_by: data.name }, refresh }),
}

const ToastData = ({ name, url, setStatus, data, refresh }) => {
    toast.promise(
        axios.delete(url, { data: data }),
        {
            loading: 'LOADING...',
            success: () => {
                if (refresh) {
                    refresh()
                }
                if (setStatus) {
                    setStatus((d) => ({
                        ...d,
                        UpdateStatus: !d?.UpdateStatus
                    }))
                }
                return <span className="uppercase">DELETED <b className="text-blue">{name}</b> SUCCESS!</span>
            },
            error: <span className="uppercase">DELETED <b className="text-blue">{name}</b> FAILED</span>,
        }, {
        style: {
            background: '#333',
            color: '#fff',
            fontSize: 20,
            borderRadius: 0
        },
    })
}