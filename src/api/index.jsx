import { sum } from 'radash'
import { useQuery } from 'react-query'
import { Formatter } from '../helper/formater'
import { GetAndUpdateContext } from '../model/context.function'


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

const Options = () => {
    return ({
        headers: {
            'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6ODgwNzg2MDc1Mjl9.RakTTLK9tEjuhUCN32hvAGn94D8bzMTNaoxN_7ZUJxI",
            'Content-Type': 'application/json',
        },
    })
}



const API_GET = {
    ALERT_SEVERITY: () => {
        const { value } = GetAndUpdateContext()
        let item = []
        const { isLoading, error, data } = useQuery(['alertSeverity', value.APIURLDEFAULT, value.DATEVALUE.value], () =>
            fetch(`${value.APIURLDEFAULT.ip}/main/alert-severity?${value.APIURLDEFAULT.timeType}=${value.DATEVALUE.value}`, {
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
            var color = ""
            switch (key) {
                case "low":
                    color = "#00D8FF"
                    break;
                case "medium":
                    color = "#FFBA08"
                    break;
                case "high":
                    color = "#ED6A5E"
                    break;
                default:
                    color = "white"
                    break;
            }

            item.push({
                name: key,
                color,
                total: Formatter(sum(data[key].data, d => d.total)),
                ...data[key]
            })
        }

        return { item, error, isLoading }
    },
    ALERT_TYPE: () => {
        const { value } = GetAndUpdateContext()
        let item = []
        const { isLoading, error, data } = useQuery(['alertBreakdown', value.APIURLDEFAULT, value.DATEVALUE.value], () =>
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

        return { dataItems, error, isLoading }
    },
    DASHBOARD_STATUS: () => {
        const { value } = GetAndUpdateContext()
        const { isLoading, error, data } = useQuery(['dashboardStatus', value.APIURLDEFAULT, value.DATEVALUE.value], () =>
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

        return { data, error, isLoading }
    },
    LISTATTACK: () => {
        const { value } = GetAndUpdateContext()
        const { isLoading, error, data } = useQuery(['listAttack', value.APIURLDEFAULT, value.DATEVALUE.value], () =>
            fetch(`${value.APIURLDEFAULT.ip}/main/attacker-ip-address?${value.APIURLDEFAULT.timeType}=${value.DATEVALUE.value}&limit=100&page=1`, {
                ...Options()
            }).then(res => {
                return res.json()
            }),
            {
                refetchOnWindowFocus: false,
                refetchInterval: false
            }
        )

        return { data, error, isLoading }
    }
}

export {
    API_DATAMAPS,
    API_GET
}