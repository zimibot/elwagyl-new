import { useState } from "react";
import { CONFIGMAP2D, DATEVALUE, DATEVIEW, GLOBEFRAME, GLOBEVALUE, VIEWGLOBE, PIECHARTVVALUE } from "./view.items";

export const ValueContext = () => {
    const [maximize, setmaximize] = useState({});
    const [status, setStatus] = useState({
        STATUSPING: true
    });
    const [value, setvalue] = useState({
        DATEVALUE: { ...DATEVALUE },
        GLOBEVALUE: { ...GLOBEVALUE },
        GLOBEFRAME: { ...GLOBEFRAME },
        OPTIONALVIEW: [...VIEWGLOBE],
        OPTIONALDATE: [...DATEVIEW],
        MAPS2DCONFIG: { ...CONFIGMAP2D },
        PIECHARTVALUE: { ...PIECHARTVVALUE },
        APIURLDEFAULT: {
            ip: "http://10.22.22.6:8000",
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
