import { useInfiniteQuery, useQuery } from "react-query"
import { GetAndUpdateContext } from "../../model/context.function"
import { useLocation } from "react-router-dom";

export const path = import.meta.env.VITE_PATH_API_EHA

export function checkStatement(statement) {
    for (var i = 0; i < statement.length; i++) {
        if (statement[i] === true) {
            return true;
        }
    }
    return false;
}

export const GET_API_EHA = {
    data: {
        scanTools: (status) => {
            if (status) {
                const { isLoading, data, error } = useQuery(['listScanning', status.UpdateStatus, status.scanning_tools], () => fetch(`${path}/api/tool-scanners?${status.scanning_tools ? `scanning_tools=${status.scanning_tools}` : ""}`, { method: "GET" }).then(res => { return res.json() }),)
                return {
                    isLoading, data, error,
                }
            }
        },
        toolsScanner: (status) => {
            if (status) {
                const { isLoading, data, error } = useQuery(['toolsScanner', status.UpdateStatus], () => fetch(`${path}/api/general/tool-scanner-list`, { method: "GET" }).then(res => { return res.json() }),)
                return {
                    isLoading, data, error,
                }
            }
        },
        emailSettings: (status) => {
            if (status) {
                const { isLoading, data, error, refetch } = useQuery(['emailSettings', status.UpdateStatus], () => fetch(`${path}/api/manage-email-notification`, { method: "GET" }).then(res => { return res.json() }),)
                return {
                    isLoading, data, error, refetch
                }
            }
        },
        vulnerability: (status) => {
            if (status) {
                const stateLocation = useLocation()
                const { isLoading, data, error } = useQuery(['vulnerability', status.UpdateStatus, status.vulnerabilitypages, stateLocation.state.id], () => fetch(`${path}/api/vulnerabilities?page=${status.vulnerabilitypages ? status.vulnerabilitypages : 1}&limit=15&${stateLocation.state?.id ? `scan_id=${stateLocation.state?.id}` : ""}`, { method: "GET" }).then(res => { return res.json() }),)
                return {
                    isLoading, data, error,
                }
            }
        },

        scanToolsDetail: async (propsItem) => {
            const { idScan } = propsItem || {}

            if (idScan) {
                let items = await fetch(`${path}/api/tool-scanners/${idScan}`, { method: "GET" }).then(res => { return res.json() })

                return {
                    items
                }
            } else {
                return false
            }
        },
        protectedSite: (status) => {
            if (status) {
                const { isLoading, data, error, refetch } = useQuery(['protectedSite', status.UpdateStatus], () => fetch(`${path}/api/protected-sites`, { method: "GET" }).then(res => { return res.json() }),)
                return {
                    isLoading, data, error, refetch
                }
            }
        },
        protectedSiteDetail: async (propsItem) => {
            const { idProtectedSite } = propsItem || {}

            if (idProtectedSite) {
                let items = await fetch(`${path}/api/protected-sites/${idProtectedSite}`, { method: "GET" }).then(res => { return res.json() })
                return {
                    items
                }
            } else {
                return false
            }
        },
        scanDetails: async (propsItem) => {
            const { idscanDetail } = propsItem || {}

            if (idscanDetail) {
                let items = await fetch(`${path}/api/scans/${idscanDetail}`, { method: "GET" }).then(res => { return res.json() })
                return {
                    items
                }
            } else {
                return false
            }
        },

        assetsList: (status) => {
            if (status) {
                const { isLoading, data, error, } = useQuery(['assetsList', status.UpdateStatus], () => fetch(`${path}/api/assets`, { method: "GET" }).then(res => { return res.json() }),)
                return {
                    isLoading, data, error,
                }
            }
        },

        systemOwner: (status) => {
            if (status) {
                const { isLoading, data, error } = useQuery(['systemOwner', status.UpdateStatus], () => fetch(`${path}/api/system-owners`, { method: "GET" }).then(res => { return res.json() }),)
                return {
                    isLoading, data, error,
                }
            }
        },
        systemOwnerDetail: async (propsItem) => {
            const { idOwner } = propsItem || {}

            if (idOwner) {
                let items = await fetch(`${path}/api/system-owners/${idOwner}`, { method: "GET" }).then(res => { return res.json() })
                return {
                    items
                }
            } else {
                return false
            }
        },
        platformDetail: async (propsItem) => {
            try {
                const { platform_id } = propsItem || {}

                if (platform_id) {

                    let items = await fetch(`${path}/api/platforms/${platform_id}`, { method: "GET" }).then(res => { return res.json() })
                    return {
                        items
                    }
                } else {
                    return false
                }

            } catch (error) {
                return false
            }

        },
        getAssetsPlatformName: (propsItem) => {
            const { idPlatform, page, refresh } = propsItem || {}

            const { isLoading, data, error, refetch } = useQuery(['getAssetsPlatformName', idPlatform, page, refresh], () => {
                if (idPlatform && page) {
                    return fetch(`${path}/api/platform-categories/?category=${idPlatform}&page=${page}`, { method: "GET" }).then(res => { return res.json() })
                } else {
                    return {
                        result: []
                    }
                }
            },

            )
            return {
                isLoading, data, error, refetch
            }
        },
        getAssetsDetail: async (propsItem) => {
            const { idAssets } = propsItem || {}

            if (idAssets) {
                let items = await fetch(`${path}/api/assets/${idAssets}`, { method: "GET" }).then(res => { return res.json() })
                return {
                    items
                }
            } else {
                return false
            }
        },
        getAssetsRiskGroupDetail: async (propsItem) => {
            const { idAssets } = propsItem || {}

            if (idAssets) {
                let items = await fetch(`${path}/api/asset-risk-groups/${idAssets}`, { method: "GET" }).then(res => { return res.json() })
                return {
                    items
                }
            } else {
                return false
            }
        },

        scan: (status) => {
            if (status) {
                const { isLoading, data, error, } = useQuery(['scan', status.UpdateStatus], () => fetch(`${path}/api/scans`, { method: "GET" }).then(res => { return res.json() }),)
                return {
                    isLoading, data, error,
                }
            }
        },
        getCategoryPlatform: () => {
            const { isLoading, data, error, } = useQuery(['scan'], () => fetch(`${path}/api/general/platform-category-list`, { method: "GET" }).then(res => { return res.json() }),)
            return {
                isLoading, data, error,
            }
        },
        assetRiskGroup: () => {
            const { isLoading, data, error, refetch } = useQuery(['assetRiskGroup'], () => fetch(`${path}/api/asset-risk-groups`, { method: "GET" }).then(res => { return res.json() }),)
            return {
                isLoading, data, error, refetch
            }
        },

        getLogsActivity: (status) => {
            if (status) {
                const { isLoading, data, error, } = useQuery(['logs', status.pages_logs], () => fetch(`${path}/api/logs?page=${status.pages_logs ? status.pages_logs : 1}&limit=15`, { method: "GET" }).then(res => { return res.json() }),)
                return {
                    isLoading, data, error,
                }
            }
        },
        mainDeckStatisticSoverdueFinding: (status) => {
            if (status) {
                const { data, error, isLoading, ...props } = useInfiniteQuery(
                    "overdue-finding", ({ pageParam = 1 }) => fetch(`${path}/api/protected-sites/statistic/overdue-finding?page=${pageParam}`, { method: "GET" }).then((res) => res.json()),
                    {
                        getNextPageParam: (lastPage) => {
                            return lastPage && lastPage.pagination && lastPage.pagination.next_page ? lastPage.pagination.next_page.split("=")[1] + "=40" : undefined
                        },

                    }
                )

                return {
                    data, error, isLoading, props
                }
            }

        },
        mainDeckStatistics: () => {
            const { isLoading, data, error, } = useQuery(['mainDeckStatistics'], () => fetch(`${path}/api/assets/statistics`, { method: "GET" }).then(res => { return res.json() }),)
            return {
                isLoading, data, error,
            }
        },
        mainDeckStatisticsMontly: () => {
            const { isLoading, data, error, } = useQuery(['mainDeckStatisticsMontly'], () => fetch(`${path}/api/vulnerabilities/statistic/monthly`, { method: "GET" }).then(res => { return res.json() }),)
            return {
                isLoading, data, error,
            }
        },
        mainDeckStatisticsOverall: () => {
            const { isLoading, data, error, } = useQuery(['mainDeckStatisticsOverall'], () => fetch(`${path}/api/protected-sites/statistic/overall`, { method: "GET" }).then(res => { return res.json() }),)
            return {
                isLoading, data, error,
            }
        },
        mainDeckStatisticsRiskStatus: () => {
            const { isLoading, data, error, } = useQuery(['mainDeckStatisticsRiskStatus'], () => fetch(`${path}/api/vulnerabilities/statistic/risk-status?generate_chart=true`, { method: "GET" }).then(res => { return res.json() }),)
            return {
                isLoading, data, error,
            }
        },
        mainDeckStatisticsVulStatic: () => {
            const { isLoading, data, error, } = useQuery(['mainDeckStatisticsVulStatic'], () => fetch(`${path}/api/vulnerabilities/statistic/daily?page=1&limit=15`, { method: "GET" }).then(res => { return res.json() }),)
            return {
                isLoading, data, error,
            }
        },
        mainDeckStatisticsDeadline: () => {
            const { isLoading, data, error, } = useQuery(['mainDeckStatisticsDeadline'], () => fetch(`${path}/api/vulnerabilities/statistic/deadline`, { method: "GET" }).then(res => { return res.json() }),)
            return {
                isLoading, data, error,
            }
        },
        mainDeckStatisticsMaps: () => {
            const { isLoading, data, error, } = useQuery(['mainDeckStatisticsMaps'], () => fetch(`${path}/api/assets/statistics/map`, { method: "GET" }).then(res => { return res.json() }),)
            return {
                isLoading, data, error,
            }
        },

    },

    root: (typeName) => {
        const { status } = GetAndUpdateContext()


        let data = typeName || []

        if (typeName.length > 0) {
            let p = {
                data: {},
                loading: [],
                error: [],
            };

            let parse = GET_API_EHA.data

            data.map(async d => {
                let item = parse[d.active](status)
                if (item) {
                    p["loading"].push(item?.isLoading)
                    p["error"].push(item.error ? true : false)
                    p["data"][d.active] = { ...item.data, refetch: item?.refetch }
                    if (item.props) {
                        p["data"][d.active] = { ...item.data, props: item.props, refetch: item?.refetch }
                    }
                    if (item.data?.code !== 200) {
                        p["msg"] = item.data?.message
                    }
                }
                p[d.active] = parse[d.active]
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