
const OBSERVATION_SEVERITY_DESC = `Observation Severity refers to the level of severity or intensity of an observation or attention to an object or situation, while Alert Severity refers to the severity level of a warning or notification related to a security threat on the information system.`
const STASTISTIC_ALERT_DESC = `In the context of data analysis, Statistic Alerts can also be used to warn users when there is a significant change in the monitored statistical data, such as changes in the distribution of values, variation, or correlation between variables. These Statistic Alerts can help users identify and analyze changes or anomalies that occur in their data, and take appropriate action if necessary`
const LIST_THREATS = "List Threat is a list that contains types of security threats that may occur on a computer system or network. It can include both internal and external security threats, such as malware attacks, DDoS attacks, phishing attacks, and others."
const LIST_SOURCE_IP = "List Source Attacker may include information such as IP addresses, URLs, or domain names used by the attacker to carry out the attack, as well as other characteristics such as the country of origin or the type of attack performed."
const TOP_ATTACK = " Top Attack Country Source refers to a list or collection of information that identifies the countries that are most frequently the source of security attacks on a computer system or network. "
const STEPBYSTEP = [
    {
        title: "WELCOME",
        intro: <div className="text-left">Thank you for choosing EL WAGYL as your next cybersecurity resilience step. We are thrilled to present our latest offering, EL WAGYL Single Cockpit SOC, an all-in-one solution for your cybersecurity needs.
            <br></br>
            <br></br>
            Our latest upgrade, EL WAGYL V.4, is a breakthrough that enables you to access all the settings and management of your security tools or security system in one single dashboard application. This new feature allows you to easily manage and monitor your entire security infrastructure, making your cybersecurity resilience journey more efficient and streamlined.
            <br></br>
            <br></br>
            We are committed to providing you with the best cybersecurity solutions, and we believe EL WAGYL Single Cockpit SOC is the next step in that journey. By installing this application, you will take a significant step towards ensuring the security and protection of your organization's critical assets.
            <br></br>
            <br></br>
            Thank you again for choosing EL WAGYL. We hope you enjoy using EL WAGYL Single Cockpit SOC as much as we enjoyed creating it.


        </div>,
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
        intro: "Menu Next and Previous pagination Page",
    },
    {
        title: "INTRODUCTION",
        element: ".title-page",
        position: 'right',
        intro: "Title Pagination",
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
    // {
    //     title: "FINISH INTRODUCTION",
    //     intro: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    // },
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
    TOP_ATTACK,
    LIST_THREATS,
    LIST_SOURCE_IP,
    STEPBYSTEP,
    ERRORCOMPONENT,
    MENUDATA
}