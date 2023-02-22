import {  useQuery } from 'react-query'


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

export {
    API_DATAMAPS
}