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
            const { isLoading, data, error, refetch } = useQuery(['UserGetRoles'], () => fetch(`${path}/users/roles`, {
                method: "GET", headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }).then(res => { return res.json() }),)
            return {
                isLoading, data, error, refetch
            }
        },
        UserGetUser: () => {
            const { isLoading, data, error, refetch } = useQuery(['UserGetUser'], () => fetch(`${path}/users`, {
                method: "GET", headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }).then(res => { return res.json() }),)
            return {
                isLoading, data, error, refetch
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
        const { status } = GetAndUpdateContext()


        let data = typeName || []

        if (data.length > 0) {
            let p = {
                data: {},
                loading: [],
                error: [],
            };

            let parse = GET_API_UMS.data

            data.map(async d => {
                let item = parse[d](status)
                if (item) {
                    p["loading"].push(item?.isLoading)
                    p["error"].push(item.error ? true : false)
                    p["data"][d] = { data: item.data, refetch: item?.refetch }
                    if (item.data?.code !== 200) {
                        p["msg"] = item.data?.message
                    }
                }
                p[d] = parse[d]
            })

            return {
                ...p,
                error: checkStatement(p.error),
                loading: checkStatement(p.loading),
            }

        } else {
            return {
                error: true,
                msg: "ERROR DATA"
            }
        }


    }
}