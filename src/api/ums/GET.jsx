import { useQuery } from "react-query"
import { GetAndUpdateContext } from "../../model/context.function"
// import { useLocation } from "react-router-dom";

export const path = import.meta.env.VITE_PATH_API

export function checkStatement(statement) {
    for (var i = 0; i < statement.length; i++) {
        if (statement[i] === true) {
            return true;
        }
    }
    return false;
}

export const GET_API_UMS = {
    data: {
        UserGetRoles: () => {
            const { isLoading, data, error, refetch, isFetching } = useQuery(['UserGetRoles'], () => fetch(`${path}/users/roles`, {
                method: "GET", headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }).then(res => { return res.json() }),)
            return {
                isLoading, data, error, refetch, isFetching
            }
        },
        UserGetUser: () => {
            const { isLoading, data, error, refetch, isFetching } = useQuery(['UserGetUser'], () => fetch(`${path}/users`, {
                method: "GET", headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }).then(res => { return res.json() }),)
            return {
                isLoading, data, error, refetch, isFetching
            }
        },
        SettingsGroupAccess: () => {
            const { isLoading, data, error, refetch, isFetching } = useQuery(['SettingsGroupAccess'], () => fetch(`${path}/users/groups`, {
                method: "GET", headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }).then(res => { return res.json() }),)
            return {
                isLoading, data, error, refetch, isFetching
            }
        },
        SettingsPagesAccess: () => {
            const { isLoading, data, error, refetch, isFetching } = useQuery(['SettingsPagesAccess'], () => fetch(`${path}/users/pages-access`, {
                method: "GET", headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }).then(res => { return res.json() }),)
            return {
                isLoading, data, error, refetch, isFetching
            }
        },
        SettingsPagesPermission: () => {
            const { isLoading, data, error, refetch, isFetching } = useQuery(['SettingsPagesPermission'], () => fetch(`${path}/users/permissions`, {
                method: "GET", headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }).then(res => { return res.json() }))

            return {
                isLoading, data, error, refetch, isFetching
            }
        },
        SettingsPagesPermissionDetail: async (props) => {
            let { id } = props
            if (id) {
                let data = await fetch(`${path}/users/permissions/${id}`, {
                    method: "GET", headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }).then(res => { return res.json() })

                return { isLoading: false, error: false, data }
            } else {
                return { isLoading: false, error: true }
            }

        },
        // UserGetUserPersonal: (status) => {
        //     if (status) {     
        //         const { isLoading, data, error, refetch } = useQuery(['UserGetUserPersonal', status.id_user], () => fetch(`${path}/users/${status.id_user}`, {
        //             method: "GET", headers: {
        //                 "Authorization": `Bearer ${localStorage.getItem("token")}`
        //             }
        //         }).then(res => { return res.json() }),)
        //         return {
        //             isLoading, data, error, refetch
        //         }
        //     }
        // },

    },

    root: (typeName) => {
        const { status } = GetAndUpdateContext();
        let data = typeName || [];

        if (data.length === 0) {
            return {
                error: true,
                msg: "ERROR DATA"
            };
        }

        const result = {
            data: {},
            loading: [],
            error: [],
            isFetching: []
        };

        let parse = GET_API_UMS.data;

        data.forEach((d) => {
            let item = parse[d](status);
            if (item) {
                result.loading.push(item?.isLoading);
                result.isFetching.push(item?.isFetching);
                result.error.push(item.error ? true : false);
                result.data[d] = { data: item.data, refetch: item?.refetch };
                if (item.data?.code !== 200) {
                    result.msg = item.data?.message;
                }
            }
            result[d] = parse[d];
        });

        result.error = checkStatement(result.error);
        result.loading = checkStatement(result.loading);
        result.isFetching = checkStatement(result.isFetching);

        return result;
    }

}