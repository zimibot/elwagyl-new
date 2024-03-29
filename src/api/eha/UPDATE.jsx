import axios from "axios";
import { path } from "./GET"
import { toast } from "react-hot-toast";

export const UPDATE_API = {
    updateProtectedSite: (id, data, setStatus) => ToastData({ name: data.site_name, url: `${path}/api/protected-sites/${id}`, setStatus, data: { ...data, updated_by: data.created_by } }),
    updateScanManage: (id, data, setStatus, ) => ToastData({ name: data.name, url: `${path}/api/tool-scanners/${id}`, setStatus, data }),
    updateScanAssets: (id, data, refresh, success, error) => ToastData({ name: data.asset.name, url: `${path}/api/scans/${id}`, refresh, data, success, error }),
    updatePlatformCategory: (id, data, setStatus, success) => ToastData({ name: data.name, url: `${path}/api/platform-categories/${id}`, setStatus, data, success }),
    updateAssets: (id, data, setStatus, success, error) => ToastData({ name: data.name, url: `${path}/api/assets/${id}`, setStatus, data, success, error }),
    updateEmail: (id, data, setStatus, refresh) => ToastData({ name: data.name, url: `${path}/api/manage-email-notification/${id}`, setStatus, data, refresh }),
    updateRiskGroup: (id, data, refresh) => ToastData({ name: data.name, url: `${path}/api/asset-risk-groups/${id}`, data, refresh }),
    updateSolvedVul: (id, data, refresh) => ToastData({ name: data.name, url: `${path}/api/vulnerabilities/${id}`, data, refresh }),
    updateBulkCheck: (data, refresh) => ToastData({ name: data.name, url: `${path}/api/vulnerabilities/update/bulk`, data, refresh }),
}

const ToastData = ({ name, url, data, setStatus, success, error, refresh }) => {

    toast.promise(
        axios.put(url, { ...data }),
        {
            loading: 'LOADING...',
            success: (items) => {
                if (success) {
                    success(items);
                }
                if (refresh) {
                    refresh()
                }
                if (setStatus) {
                    setStatus((a) => ({
                        ...a,
                        addProtected: false,
                        editScanTools: false,
                        UpdateStatus: !a?.UpdateStatus
                    }))
                }
                return <span className="uppercase">UPDATE <b className="text-blue">{name}</b> SUCCESS!</span>
            },
            error: d => {
                console.log(d)
                if (error) {
                    error(d)
                }
                return <span className="uppercase">UPDATE <b className="text-blue">{name}</b> FAILED</span>
            },
        }, {
        style: {
            background: '#333',
            color: '#fff',
            fontSize: 20,
            borderRadius: 0
        },
    })

}