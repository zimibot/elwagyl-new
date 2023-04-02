import axios from 'axios'
import { counting, max, sum, unique } from 'radash'
import { useQuery, useInfiniteQuery } from 'react-query'
import { Formatter } from '../helper/formater'
import { GetAndUpdateContext } from '../model/context.function'
import { ItemData } from '../pages/executive'
import { CountryId } from './country'
export const path = import.meta.env.VITE_PATH_API
let color = (d) => {
    let items
    switch (d) {
        case "low":
            items = "#00D8FF"
            break;
        case "medium":
            items = "#FFBA08"
            break;
        case "high":
            items = "#ED6A5E"
            break;
        default:
            items = "white"
            break;
    }

    return items
}


const API_DATAMAPS = () => {
    const { isLoading, error, data } = useQuery('apiMaps', () =>
        fetch('globe/api/locations.json').then(res =>
            res.json()
        ),
        {
            refetchOnWindowFocus: false,
            refetchInterval: false
        }
    )

    return { data, error, isLoading }
}

export const getCookie = (name) => {
    function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
}


const Options = () => {
    return ({
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json',
        },
    })
}

const PostOptions = ({ data, url, auth }) => {
    let formData = new FormData()

    for (const key in data) {
        formData.append(key, data[key])
    }

    let headers = auth ? {
        'Authorization': `Bearer ${auth}`,
        'Content-Type': 'application/json',
    } : {
        "Content-Type": "multipart/form-data",
    }
    return ({
        url: url,
        method: "POST",
        data: formData,
        accept: "application/json",
        ContentType: "application/x-www-form-urlencoded",
        headers
    })
}


const API_POST = {
    LOGIN: (data) => axios({
        ...PostOptions({ data, url: `${path}/login` })
    })
}


const API_GET = {
    API_PING: () => {

        const { isLoading, error, data, ...props } = useQuery(['ping'], () =>
            window.api.invoke('ping-window', "10.22.22.6"),
            {
                refetchOnWindowFocus: true,
                refetchInterval: 1000
            }
        )


        return {  isLoading, error, data, ...props }

    },
    ALERT_SEVERITY: () => {
        const { value } = GetAndUpdateContext()
        let item = []
        const { isLoading, error, data, ...props } = useQuery(['alertSeverity', value.APIURLDEFAULT, value.DATEVALUE.value], () =>
            fetch(`${value.APIURLDEFAULT.ip}/main/alert-severity?${value.APIURLDEFAULT.timeType}=${value.DATEVALUE.value}`, {
                ...Options()
            }).then(res => {
                return res.json()
            }
            ), {
                refetchOnWindowFocus: false,
                refetchInterval: false
            }
        )

        for (const key in data) {
            let total = sum(data[key].data, d => d.total)

            item.push({
                name: key,
                color: color(key),
                count: total,
                total: Formatter(total),
                ...data[key]
            })


        }

        let systemSum = sum(item, d => d.count)
        let system = systemSum === 0 ? {
            name: "low",
            color: "#00D8FF"
        } : max(item, d => d.count)



        return { item, error, isLoading, props, system }
    },
    ALERT_TYPE: () => {
        const { value } = GetAndUpdateContext()
        let item = []
        const { isLoading, error, data, ...props } = useQuery(['alertBreakdown', value.APIURLDEFAULT, value.DATEVALUE.value], () =>
            fetch(`${value.APIURLDEFAULT.ip}/main/alert-breakdown?${value.APIURLDEFAULT.timeType}=${value.DATEVALUE.value}`, {
                ...Options()
            }).then(res => {
                return res.json()
            }
            ),
            {
                refetchOnWindowFocus: false,
                refetchInterval: false
            }
        )

        for (const key in data) {
            item.push({
                name: key,
                total: data[key],
            })
        }

        let dataItems = item.map((d, k) => ({
            ...d,
            no: k + 1,
            percents: (d.total / sum(item, d => d.total)) * 100
        }))

        return { dataItems, error, isLoading, props }
    },
    AFFECTED_ENTITY: () => {
        const { value } = GetAndUpdateContext()
        let item = []
        const { isLoading, error, data, ...props } = useQuery(['entity-breakdown', value.APIURLDEFAULT, value.DATEVALUE.value], () =>
            fetch(`${value.APIURLDEFAULT.ip}/main/entity-breakdown?${value.APIURLDEFAULT.timeType}=${value.DATEVALUE.value}`, {
                ...Options()
            }).then(res => {
                return res.json()
            }
            ),
            {
                refetchOnWindowFocus: false,
                refetchInterval: false
            }
        )

        for (const key in data) {
            item.push({
                name: key,
                total: data[key],
            })
        }

        return { item, error, isLoading, props }
    },
    DASHBOARD_STATUS: () => {
        const { value } = GetAndUpdateContext()
        const { isLoading, error, data, ...props } = useQuery(['dashboardStatus', value.APIURLDEFAULT, value.DATEVALUE.value], () =>
            fetch(`${value.APIURLDEFAULT.ip}/main/dashboard-status?${value.APIURLDEFAULT.timeType}=${value.DATEVALUE.value}`, {
                ...Options()
            }).then(res => {

                return res.json()
            }
            ),
            {
                refetchOnWindowFocus: false,
                refetchInterval: false
            }
        )

        return { data, error, isLoading, props }
    },
    LISTATTACK: () => {
        const { value } = GetAndUpdateContext()
        const { isLoading, error, data, ...props } = useQuery(['listAttack', value.APIURLDEFAULT, value.DATEVALUE.value, value.PAGECOUNT], () =>
            fetch(`${value.APIURLDEFAULT.ip}/main/attacker-ip-address?${value.APIURLDEFAULT.timeType}=${value.DATEVALUE.value}&limit=100&page=${value.PAGECOUNT}`, {
                ...Options()
            }).then(res => {
                return res.json()
            }),
            {
                refetchOnWindowFocus: false,
                refetchInterval: false
            }
        )

        return { data, error, isLoading, props }
    },
    EXECUTIVE_SERVICE_ALIVE: () => {
        const { value } = GetAndUpdateContext()
        const { isLoading, error, data, ...props } = useQuery(['executiveServiceAlive', value.APIURLDEFAULT, value.DATEVALUE.value, value.PAGECOUNT], () =>
            fetch(`${path}/full_executive/service-alive?time_range=24hour`, {
                ...Options()
            }).then(res => {
                return res.json()
            }),
            {
                refetchOnWindowFocus: false,
                refetchInterval: false
            }
        )

        return { data, error, isLoading, props }
    },
    EXECUTIVE_SERVICE_HISTORY: () => {
        const { value } = GetAndUpdateContext()
        const { isLoading, error, data, ...props } = useQuery(['executiveServiceHistory', value.APIURLDEFAULT, value.DATEVALUE.value, value.PAGECOUNT], () =>
            fetch(`${path}/full_executive/service-history?time_range=24hour`, {
                ...Options()
            }).then(res => {
                return res.json()
            }),
            {
                refetchOnWindowFocus: false,
                refetchInterval: false
            }
        )

        return { data, error, isLoading, props }
    },
    EXECUTIVE_SERVICE_LIST: () => {
        const { value } = GetAndUpdateContext()
        const { isLoading, error, data, ...props } = useQuery(['executiveServiceList', value.APIURLDEFAULT, value.DATEVALUE.value, value.PAGECOUNT], () =>
            fetch(`${path}/full_executive/service-list?time_range=24hour`, {
                ...Options()
            }).then(res => {
                return res.json()
            }),
            {
                refetchOnWindowFocus: false,
                refetchInterval: false
            }
        )
        let graph

        if (data) {
            let d = data.data[0]
            let totalActive = counting(d.services, g => g.alive)
            let arActive = d.services.filter(d => d.alive === true)
            let arInactive = d.services.filter(d => d.alive === false)
            graph = ItemData({ d, totalActive, arActive, arInactive })

        }



        return { data, error, isLoading, props, graph }
    },
    EXECUTIVE_HOST_LIST: () => {
        const { value } = GetAndUpdateContext()
        const { isLoading, error, data, ...props } = useQuery(['hostList', value.APIURLDEFAULT, value.DATEVALUE.value, value.PAGECOUNT], () =>
            fetch(`${path}/full_executive/host-list`, {
                ...Options()
            }).then(res => {
                return res.json()
            }), {
            refetchInterval: 1500
        }

        )
        let dataitem

        if (data) {
            dataitem = data.data.map(d => {
                let ps = ping(d.ip)
                return {
                    ...d,
                    ping: ps
                }
            })

        }


        return { dataitem, error, isLoading, props }
    },
    EXECUTIVE_ACTIVE_TIME: () => {
        const { value } = GetAndUpdateContext()
        const { isLoading, error, data, ...props } = useQuery(['activeTime', value.APIURLDEFAULT, value.DATEVALUE.value, value.PAGECOUNT], () =>
            fetch(`${path}/full_executive/total-active-time`, {
                ...Options()
            }).then(res => {
                return res.json()
            }),
            {
                refetchOnWindowFocus: false,
                refetchInterval: false
            }
        )



        return { data, error, isLoading, props }
    },
    EXECUTIVE_OVERAL_STATUS: () => {
        const { value } = GetAndUpdateContext()
        const { isLoading, error, data, ...props } = useQuery(['overalStatus', value.APIURLDEFAULT, value.DATEVALUE.value, value.PAGECOUNT], () =>
            fetch(`${path}/full_executive/overall-status?time_range=24hour`, {
                ...Options()
            }).then(res => {
                return res.json()
            }),
            {
                refetchOnWindowFocus: false,
                refetchInterval: false
            }
        )



        return { data, error, isLoading, props }
    },
    AVAILABILITY_ANOMALIES_SUMMARY: () => {
        const { value } = GetAndUpdateContext()
        // let item = []
        const { isLoading, error, data, ...props } = useQuery(['anomaliesSummary', value.APIURLDEFAULT, value.DATEVALUE.value], () =>
            fetch(`${value.APIURLDEFAULT.ip}/availability/anomalies-summary?time_range=${value.DATEVALUE.value}`, {
                ...Options()
            }).then(res => {
                return res.json()
            }
            ),
            {
                refetchOnWindowFocus: false,
                refetchInterval: false
            }
        )

        let item = []

        if (data) {
            for (const key in data) {
                item.push({
                    name: key,
                    ...data[key]
                })
            }
        }


        return { item, error, isLoading, props }
    },
    AVAILABILITY_ASSET_LIST: () => {
        const { value } = GetAndUpdateContext()
        // let item = []
        const { isLoading, error, data, ...props } = useQuery(['assetList', value.APIURLDEFAULT, value.DATEVALUE.value], () =>
            fetch(`${path}/availability/asset-list`, {
                ...Options()
            }).then(res => {
                return res.json()
            }
            ),
            {
                refetchOnWindowFocus: false,
                refetchInterval: false
            }
        )




        return { data, error, isLoading, props }
    },
    AVAILABILITY_SENSOR: () => {
        const { value } = GetAndUpdateContext()
        // let item = []
        const { isLoading, error, data, ...props } = useQuery(['realtime', value.APIURLDEFAULT, value.DATEVALUE.value], () =>
            fetch(`${path}/availability/summary?time_range=${value.DATEVALUE.value}`, {
                ...Options()
            }).then(res => {
                return res.json()
            }
            ),
            {
                refetchOnWindowFocus: false,
                refetchInterval: false
            }
        )




        return { data, error, isLoading, props }
    },
    AVAILABILITY_SERVER_LIST: () => {
        const { value } = GetAndUpdateContext()
        // let item = []
        const { isLoading, error, data, ...props } = useQuery(['serverList', value.SENSOR], () =>
            fetch(`${path}/availability/server-list?time_range=24hour&limit=9&page=${value.SENSOR ? value.SENSOR.PAGE : 1}`, {
                ...Options()
            }).then(res => {
                return res.json()
            }
            ),
            {
                refetchOnWindowFocus: false,
                refetchInterval: false
            }
        )




        return { data, error, isLoading, props }
    },
    THREATSMAP_CYBER_ATTACK_STATISTIC: () => {
        const { value } = GetAndUpdateContext()
        // let item = []
        const { isLoading, error, data, ...props } = useQuery(['cyberAttack', value.DATEVALUE.value], () =>
            fetch(`${path}/threats_map/cyber-attack-statistic?time_range=${value.DATEVALUE.value}`, {
                ...Options()
            }).then(res => {
                return res.json()
            }
            ),
            {
                refetchOnWindowFocus: false,
                refetchInterval: false
            }
        )




        return { data, error, isLoading, props }
    },
    THREATSMAP_GLOBE: () => {
        const { value } = GetAndUpdateContext()
        // let item = []
        const { isLoading, error, data, ...props } = useQuery(['globe', value.DATEVALUE.value, value.APIURLDEFAULT.ip], () =>
            fetch(`${value.APIURLDEFAULT.ip}/threats_map/geolocation?time_range=${value.DATEVALUE.value}&limit=10000&page=1`, {
                ...Options()
            }).then(res => {
                return res.json()
            }
            ),
            {
                refetchOnWindowFocus: false,
                refetchInterval: false
            }
        )
        let item = []
        if (data) {

            let t = sum(data.country_attack, f => f.jumlahDuplikasi)
            let s = data.country_attack.map((d, k) => {
                let from = `${d.from}`.replace("INDO", "ID")
                let currentDes = data.country_target.filter(s => s.text === from)
                let Country = CountryId.filter(s => s.countryNameEn === currentDes[0].country)
                return ({
                    "location_id": `${from}-${k}`,
                    "country_id": k,
                    "name": `${currentDes[0].country}`,
                    "preview": "/assets/attack.jpg",
                    "planet_u": parseFloat(d.startLat),
                    "planet_v": parseFloat(d.startLng),
                    "flag": `/assets/flag/${Country[0]?.countryCode.toLowerCase()}.svg`,
                    "other": true,
                    "desc": {
                        "attack": {
                            "briefs": k,
                            "briefs_text": `${d.jumlahDuplikasi !== 0 ? d.jumlahDuplikasi : 1} THREATS TO KEJAKSAAN`,
                            "works": true,
                            "typeAttack": d.status,
                            "brief_id": "artworks\/smart-flat-2030",
                            "type": "brief",
                            "attack_list": [],
                        }
                    }
                })
            })

            s.push(({
                location_id: "id",
                country_id: 9999,
                from: "ID",
                tO: "ID",
                status: "low",
                flag: "/assets/flag/id.svg",
                name: "Kejaksaan",
                preview: "https://pbs.twimg.com/profile_images/1477557361107632132/Nw62UPGK_400x400.jpg",
                planet_u: -6.200000,
                planet_v: 106.816666,
                other: true,
                desc: {
                    attack: {
                        briefs: 2,
                        briefs_text: `TOTAL ${t} THREATS`,
                        typeAttack: "low",
                        attack_list: [],
                    }

                }

            }))

            item = s
        }



        let map2d

        if (item) {
            let sa = item.map(d => ({
                ...d,
                color: color(d.desc.attack.typeAttack),
                markerOffset: -10,
                coordinates: [d.planet_v, d.planet_u]
            }))

            map2d = sa
        }


        return { item, map2d, error, isLoading, props }
    },
    THREATSMAP_CYBER_ATTACK_THREATS: () => {
        const { value } = GetAndUpdateContext()

        let fetchData = async (limit, page) => {
            let fets = await fetch(`${value.APIURLDEFAULT.ip}/threats_map/cyber-threat?${value.APIURLDEFAULT.timeType}=${value.DATEVALUE.value}&limit=${limit}&page=${page ? page : 1}`, {
                ...Options()
            })
            return fets.json()
        }


        const {
            status,
            data,
            error,
            isFetching,
            isFetchingNextPage,
            fetchNextPage,
            hasNextPage,
            ...props
        } = useInfiniteQuery(
            ['projects', value.APIURLDEFAULT, value.DATEVALUE],
            (ctx) => {
                return fetchData(10, ctx.pageParam)
            },
            {
                getNextPageParam: (_lastGroup, groups) => {
                    return groups.length
                },
            },
        )



        // return { data, error, isLoading, props }
        return {
            status,
            data,
            error,
            isFetching,
            isFetchingNextPage,
            fetchNextPage,
            hasNextPage,
            props
        }
    },
}

export {
    API_DATAMAPS,
    API_POST,
    API_GET
}

let ping = async (ip) => {
    let pfs = await window.api.invoke('ping-window', ip)

    return pfs
}