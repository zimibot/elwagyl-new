export const Column = [
    {
        title: 'No',
        key: 'no',
    },
    {
        title: 'SOURCE IP ',
        key: 'source',
    },
    {
        title: 'DATE',
        key: 'date',
    },
    {
        title: 'TIME',
        key: 'time',
    },
]

export const SERVICEHISTORYCOLUMN = [
    {
        title: 'HOST NAME',
        key: 'hostname',
    },
    {
        title: 'IP ADDRESS ',
        key: 'ipaddress',
    },
    {
        title: 'ACTIVE PORT',
        key: 'activeport',
        html: (d) => {
            return <div className="text-center">{parseInt(Math.random(d) * 100)}</div>
        }
    },
    {
        title: 'INACTIVE PORT',
        key: 'inactiveport',
        html: (d) => {
            return <div className="text-center">{parseInt(Math.random(d) * 100)}</div>
        }
    },
]

export const ExampleRowService = [
    {
        hostname: 'BROKER XDR',
        ipaddress: '88.210.293.12',
        activeport: 8,
        inactiveport: 4,
    },
    {
        hostname: 'BROKER XDR',
        ipaddress: '88.210.293.12',
        activeport: 8,
        inactiveport: 4,
    },
    {
        hostname: 'BROKER XDR',
        ipaddress: '88.210.293.12',
        activeport: 8,
        inactiveport: 4,
    },
    {
        hostname: 'BROKER XDR',
        ipaddress: '88.210.293.12',
        activeport: 8,
        inactiveport: 4,
    },
    {
        hostname: 'BROKER XDR',
        ipaddress: '88.210.293.12',
        activeport: 8,
        inactiveport: 4,
    },
    {
        hostname: 'BROKER XDR',
        ipaddress: '88.210.293.12',
        activeport: 8,
        inactiveport: 4,
    },
]

export const Row = [
    {
        no: '01',
        source: '88.210.293.12',
        date: '21/DEC/22',
        time: '10:15:49',
    },
    {
        no: '01',
        source: '88.210.293.12',
        date: '21/DEC/22',
        time: '10:15:49',
    },
    {
        no: '01',
        source: '88.210.293.12',
        date: '21/DEC/22',
        time: '10:15:49',
    },
    {
        no: '01',
        source: '88.210.293.12',
        date: '21/DEC/22',
        time: '10:15:49',
    },
    {
        no: '01',
        source: '88.210.293.12',
        date: '21/DEC/22',
        time: '10:15:49',
    },
    {
        no: '01',
        source: '88.210.293.12',
        date: '21/DEC/22',
        time: '10:15:49',
    },
    {
        no: '01',
        source: '88.210.293.12',
        date: '21/DEC/22',
        time: '10:15:49',
    },
    {
        no: '01',
        source: '88.210.293.12',
        date: '21/DEC/22',
        time: '10:15:49',
    },
    {
        no: '01',
        source: '88.210.293.12',
        date: '21/DEC/22',
        time: '10:15:49',
    },
    {
        no: '01',
        source: '88.210.293.12',
        date: '21/DEC/22',
        time: '10:15:49',
    },
    {
        no: '01',
        source: '88.210.293.12',
        date: '21/DEC/22',
        time: '10:15:49',
    },
    {
        no: '01',
        source: '88.210.293.12',
        date: '21/DEC/22',
        time: '10:15:49',
    },
    {
        no: '01',
        source: '88.210.293.12',
        date: '21/DEC/22',
        time: '10:15:49',
    },
    {
        no: '01',
        source: '88.210.293.12',
        date: '21/DEC/22',
        time: '10:15:49',
    },
    {
        no: '01',
        source: '88.210.293.12',
        date: '21/DEC/22',
        time: '10:15:49',
    },
    {
        no: '01',
        source: '88.210.293.12',
        date: '21/DEC/22',
        time: '10:15:49',
    },
    {
        no: '01',
        source: '88.210.293.12',
        date: '21/DEC/22',
        time: '10:15:49',
    },
    {
        no: '01',
        source: '88.210.293.12',
        date: '21/DEC/22',
        time: '10:15:49',
    },
    {
        no: '01',
        source: '88.210.293.12',
        date: '21/DEC/22',
        time: '10:15:49',
    },
    {
        no: '01',
        source: '88.210.293.12',
        date: '21/DEC/22',
        time: '10:15:49',
    },
    {
        no: '01',
        source: '88.210.293.12',
        date: '21/DEC/22',
        time: '10:15:49',
    },
].map((d, k) => ({
    ...d,
    no: k,
}))
export const columnAttack = [
    {
        title: 'NO',
        key: 'no',
    },
    {
        title: 'THREAT CATEGORIES',
        key: 'threat',
    },
    {
        title: 'Total',
        key: 'total',
    },
]
export const AttackType = [
    {
        no: '01',
        threat: 'BRUTE FORCE ATTACK',
        total: '500',
    },
    {
        no: '01',
        threat: 'BRUTE FORCE ATTACK',
        total: '500',
    },
    {
        no: '01',
        threat: 'BRUTE FORCE ATTACK',
        total: '500',
    },
    {
        no: '01',
        threat: 'BRUTE FORCE ATTACK',
        total: '500',
    },
    {
        no: '01',
        threat: 'BRUTE FORCE ATTACK',
        total: '500',
    },
    {
        no: '01',
        threat: 'BRUTE FORCE ATTACK',
        total: '500',
    },
    {
        no: '01',
        threat: 'BRUTE FORCE ATTACK',
        total: '500',
    },

].map((d, k) => ({
    ...d,
    no: k,
}))