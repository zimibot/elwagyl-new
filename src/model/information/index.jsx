
const OBSERVATION_SEVERITY_DESC = `Here we can see why we’re using a set to store our windows instead of an array. In sets, an element’s key is equal to its value. This means that when we need to remove a window from our set,  we don’t need to go through the trouble of finding exactly which window in the array is the one we need to remove (this is actually pretty complicated in Electron)`
const STASTISTIC_ALERT_DESC = `Alert type`
const STEPBYSTEP = [
    {
        title: "WELCOME",
        intro: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
    },
    {
        title: "INTRODUCTION",
        element: ".main-menu",
        intro: "Menu Navigation",
    },
    {
        title: "INTRODUCTION",
        element: ".alert-notif",
        intro: "Menu Notifications",
    },
    {
        title: "INTRODUCTION",
        element: ".menu-setting",
        intro: "Menu Settings",
    },
    {
        title: "INTRODUCTION",
        element: ".menu-prev",
        position: 'right',
        intro: "Menu Next and Previous paggination Page",
    },
    {
        title: "INTRODUCTION",
        element: ".title-page",
        position: 'right',
        intro: "Title Paggination",
    },
    {
        title: "INTRODUCTION",
        element: ".pregress-license",
        position: 'left',
        intro: "Progress Duration License",
    },
    {
        title: "INTRODUCTION",
        element: ".switch-item",
        position: 'left',
        intro: "Button Switch Mode",
    },
    {
        title: "INTRODUCTION",
        element: ".btn-information",
        position: 'right',
        intro: "Button information Detail",
    },
    {
        title: "FINISH INTRODUCTION",
        intro: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    },
]


const MENUDATA = [
    {
        label: 'CYBER DECK',
        key: '/dashboard',
        icon: <div className="absolute w-full h-full left-0 top-0">
            <div className="absolute top-0 block px-1 !text-lg left-0" style={{
                color: "rgba(0, 216, 255, 0.3)"
            }}>01</div>
            <div className="absolute left-[-3px]">
                <svg width="6" height="19" viewBox="0 0 6 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 3L3 0V19L0 16V3Z" fill="#101C26" />
                    <path d="M6 3L3 0V19L6 16V3Z" fill="#101C26" />
                </svg>
            </div>

        </div>
    },
    {
        label: 'EXECUTIVE',
        key: '/dashboard/executive',
        icon: <div className="absolute w-full h-full left-0 top-0">
            <div className="absolute top-0 block px-1 !text-lg left-0" style={{
                color: "rgba(0, 216, 255, 0.3)"
            }}>02</div>
            <div className="absolute left-[-3px]">
                <svg width="6" height="19" viewBox="0 0 6 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 3L3 0V19L0 16V3Z" fill="#101C26" />
                    <path d="M6 3L3 0V19L6 16V3Z" fill="#101C26" />
                </svg>
            </div>
        </div>
    },
    {
        label: 'AVAILABILITY',
        key: '/dashboard/availability',
        icon: <div className="absolute w-full h-full left-0 top-0">
            <div className="absolute top-0 block px-1 !text-lg left-0" style={{
                color: "rgba(0, 216, 255, 0.3)"
            }}>03</div>

            <div className="absolute left-[-3px]">
                <svg width="6" height="19" viewBox="0 0 6 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 3L3 0V19L0 16V3Z" fill="#101C26" />
                    <path d="M6 3L3 0V19L6 16V3Z" fill="#101C26" />
                </svg>
            </div>
        </div>
    },
    {
        label: 'THREATS MAP',
        key: '/dashboard/threats-maps',
        icon: <div className="absolute w-full h-full left-0 top-0">
            <div className="absolute top-0 block px-1 !text-lg left-0" style={{
                color: "rgba(0, 216, 255, 0.3)"
            }}>04</div>

            <div className="absolute left-[-3px]">
                <svg width="6" height="19" viewBox="0 0 6 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 3L3 0V19L0 16V3Z" fill="#101C26" />
                    <path d="M6 3L3 0V19L6 16V3Z" fill="#101C26" />
                </svg>
            </div>
        </div>
    },
    {
        label: 'SOAR',
        key: '/dashboard/soar',
        url: "google.com",
        icon: <div className="absolute w-full h-full left-0 top-0">
            <div className="absolute top-0 block px-1 !text-lg left-0" style={{
                color: "rgba(0, 216, 255, 0.3)"
            }}>05</div>

            <div className="absolute left-[-3px]">
                <svg width="6" height="19" viewBox="0 0 6 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 3L3 0V19L0 16V3Z" fill="#101C26" />
                    <path d="M6 3L3 0V19L6 16V3Z" fill="#101C26" />
                </svg>
            </div>
        </div>
    },
    {
        label: 'XDR',
        key: '/dashboard/xdr',
        url: "facebook.com",
        icon: <div className="absolute w-full h-full left-0 top-0">
            <div className="absolute top-0 block px-1 !text-lg left-0" style={{
                color: "rgba(0, 216, 255, 0.3)"
            }}>06</div>

            <div className="absolute left-[-3px]">
                <svg width="6" height="19" viewBox="0 0 6 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 3L3 0V19L0 16V3Z" fill="#101C26" />
                    <path d="M6 3L3 0V19L6 16V3Z" fill="#101C26" />
                </svg>
            </div>
        </div>
    },
    {
        label: 'FIREWALL',
        key: '/dashboard/firewall',
        url: "youtube.com",
        icon: <div className="absolute w-full h-full left-0 top-0">
            <div className="absolute top-0 block px-1 !text-lg left-0" style={{
                color: "rgba(0, 216, 255, 0.3)"
            }}>07</div>

            <div className="absolute left-[-3px]">
                <svg width="6" height="19" viewBox="0 0 6 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 3L3 0V19L0 16V3Z" fill="#101C26" />
                    <path d="M6 3L3 0V19L6 16V3Z" fill="#101C26" />
                </svg>
            </div>
        </div>
    },
    {
        label: 'SDWAN',
        key: '/dashboard/sdwan',
        url: "1cak.com",
        icon: <div className="absolute w-full h-full left-0 top-0">
            <div className="absolute top-0 block px-1 !text-lg left-0" style={{
                color: "rgba(0, 216, 255, 0.3)"
            }}>08</div>

            <div className="absolute left-[-3px]">
                <svg width="6" height="19" viewBox="0 0 6 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 3L3 0V19L0 16V3Z" fill="#101C26" />
                    <path d="M6 3L3 0V19L6 16V3Z" fill="#101C26" />
                </svg>
            </div>
        </div>
    },
    {
        label: 'SASE',
        key: '/dashboard/sase',
        url: "1cak.com",
        icon: <div className="absolute w-full h-full left-0 top-0">
            <div className="absolute top-0 block px-1 !text-lg left-0" style={{
                color: "rgba(0, 216, 255, 0.3)"
            }}>09</div>

            <div className="absolute left-[-3px]">
                <svg width="6" height="19" viewBox="0 0 6 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 3L3 0V19L0 16V3Z" fill="#101C26" />
                    <path d="M6 3L3 0V19L6 16V3Z" fill="#101C26" />
                </svg>
            </div>
        </div>
    },
    {
        label: 'EHA',
        key: '/eha',
        icon: <div className="absolute w-full h-full left-0 top-0">
            <div className="absolute top-0 block px-1 !text-lg left-0" style={{
                color: "rgba(0, 216, 255, 0.3)"
            }}>10</div>

            <div className="absolute left-[-3px]">
                <svg width="6" height="19" viewBox="0 0 6 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 3L3 0V19L0 16V3Z" fill="#101C26" />
                    <path d="M6 3L3 0V19L6 16V3Z" fill="#101C26" />
                </svg>
            </div>
        </div>
    },
];

const ERRORCOMPONENT = {
    dataNotFound: "Data Not Found",
    dataDisconnected: "408 Request Timeout",
    dataNoLength: "N/A",
    dataNotAvailable: "no data available"
}

export {
    OBSERVATION_SEVERITY_DESC,
    STASTISTIC_ALERT_DESC,
    STEPBYSTEP,
    ERRORCOMPONENT,
    MENUDATA
}