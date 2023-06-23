import { useState } from "react";
import {
  CONFIGMAP2D,
  DATEVALUE,
  GLOBEFRAME,
  GLOBEVALUE,
  VIEWGLOBE,
  PIECHARTVVALUE,
  DATEVIEWSIEM,
} from "./view.items";
const path = import.meta.env.VITE_CURRENT_IP;

export const ValueContext = () => {
  const [maximize, setmaximize] = useState({});
  const [status, setStatus] = useState({
    STATUSPING: true,
    Findingpage: 1,
  });
  const [value, setvalue] = useState({
    DATEVALUE: { ...DATEVALUE },
    GLOBEVALUE: { ...GLOBEVALUE },
    GLOBEFRAME: { ...GLOBEFRAME },
    OPTIONALVIEW: [...VIEWGLOBE],
    OPTIONALDATE: [...DATEVIEWSIEM],
    MAPS2DCONFIG: { ...CONFIGMAP2D },
    PIECHARTVALUE: { ...PIECHARTVVALUE },
    MAPSEHA: {
      zoom: 1,
      id: null,
      lat: 0,
      lon: 0,
      scale: 100,
    },
    PAGECOUNT: 1,
    SENSOR: {
      PAGE: 1,
      PAUSE: false,
    },
    APIURLDEFAULT: {
      ip: `http://${path}:8000`,
      timeType: "time_range",
      type: "siem",
    },
  });

  let data = {
    maximizeData: { maximize, setmaximize },
    data: { value, setvalue },
    update: { status, setStatus },
  };

  return { ...data };
};
