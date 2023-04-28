import { useState } from "react";
import { CONFIGMAP2D, DATEVALUE,  GLOBEFRAME, GLOBEVALUE, VIEWGLOBE, PIECHARTVVALUE, DATEVIEWSIEM } from "./view.items";

export const ValueContext = () => {
    const [maximize, setmaximize] = useState({});
    const [status, setStatus] = useState({
        STATUSPING: true,
        Findingpage: 1
    });
    const [value, setvalue] = useState({
        DATEVALUE: { ...DATEVALUE },
        GLOBEVALUE: { ...GLOBEVALUE },
        GLOBEFRAME: { ...GLOBEFRAME },
        OPTIONALVIEW: [...VIEWGLOBE],
        OPTIONALDATE: [...DATEVIEWSIEM],
        MAPS2DCONFIG: { ...CONFIGMAP2D },
        PIECHARTVALUE: { ...PIECHARTVVALUE },
        PAGECOUNT: 1,
        SENSOR: {
            PAGE: 1,
            PAUSE: false
        },
        APIURLDEFAULT: {
            ip: "http://165.22.50.184:8000",
            timeType: "time_range"
        },
    });

    let data = {
        maximizeData: { maximize, setmaximize },
        data: { value, setvalue },
        update: { status, setStatus }
    }


    return ({ ...data })
}
