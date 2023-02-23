import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Logo from "./assets/logo.svg"
import { version } from "../package.json";
import CacheBuster from 'react-cache-buster';
import 'antd/dist/reset.css';
import './ant.css'
import './App.css'

const Loading = () => {
    return (<div className="w-full h-full fixed top-0 justify-center flex items-center text-[red] text-5xl">
        <div className="progress-circle-pulse">
            <div className="big-circle"></div>
            <div className="small-circle"></div>
            <img className="absolute" width={100} height={100} src={Logo}></img>
        </div>
    </div>)
}

const isProduction = process.env.NODE_ENV === 'production';


ReactDOM.createRoot(document.getElementById('root')).render(
    <CacheBuster
        currentVersion={version}
        isEnabled={isProduction} //If false, the library is disabled.
        isVerboseMode={false} //If true, the library writes verbose logs to console.
        loadingComponent={<Loading />} //If not pass, nothing appears at the time of new version check.
        metaFileDirectory={'.'} //If public assets are hosted somewhere other than root on your server.
    >

        <App />


    </CacheBuster>

)

