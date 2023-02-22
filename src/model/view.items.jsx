const VIEWGLOBE = [
    {
        text: "Satelite",
        value: "satelite",
        key: 0,
        type: "text",
        active: true
    },
    {
        text: "Detail View",
        value: "detailview",
        key: 1,
        type: "text",
        active: false
    },
    {
        text: "RESET MAPS",
        value: "resetmaps",
        key: 2,
        type: "text",
        active: false
    },
]

const DATEVIEW = [
    {
        text: "24 HOURS",
        value: "24hours",
        uniq: "24 H",
        type: "text",
        active: true,
        key: 0
    },
    {
        text: "30 DAYS",
        value: "30days",
        uniq: "30 D",
        type: "text",
        active: false,
        key: 1
    },
    {
        text: "ALL TIME",
        value: "alltime",
        uniq: "ALL",
        type: "text",
        active: false,
        key: 2
    },
]

const DATEVALUE = {
    value: "24hours",
    uniq: "24H"
}

const GLOBEVALUE = {
    value: "satelite",
}

const GLOBEFRAME = {
    window: null
}

const CONFIGMAP2D = {
    center: [0, 0],
    zoom: 1,
    x: 0,
    y: 0,
}

const PIECHARTVVALUE = {
    data: [],
    total: 0
}

export {
    VIEWGLOBE,
    DATEVALUE,
    DATEVIEW,
    GLOBEVALUE,
    GLOBEFRAME,
    CONFIGMAP2D,
    PIECHARTVVALUE
}