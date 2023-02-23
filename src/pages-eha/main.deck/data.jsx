import { Tooltip, Typography } from "antd"

const { Paragraph } = Typography;

export const columnItem = [

    {
        title: 'IP/DOMAIN',
        key: 'domain',
        html: (d) => {
            return <Tooltip title={d}>
                 <div className="flex h-full items-center gap-4 w-full top-0 absolute">
                    <div>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 10C0 7.34784 1.05357 4.8043 2.92893 2.92893C4.8043 1.05357 7.34784 0 10 0C12.6522 0 15.1957 1.05357 17.0711 2.92893C18.9464 4.8043 20 7.34784 20 10C20 12.6522 18.9464 15.1957 17.0711 17.0711C15.1957 18.9464 12.6522 20 10 20C7.34784 20 4.8043 18.9464 2.92893 17.0711C1.05357 15.1957 0 12.6522 0 10ZM9.375 1.34625C8.5375 1.60125 7.70625 2.37125 7.01625 3.665C6.78892 4.09512 6.59339 4.54131 6.43125 5H9.375V1.34625ZM5.1125 5C5.32084 4.33602 5.58859 3.69217 5.9125 3.07625C6.12863 2.66757 6.37824 2.27749 6.65875 1.91C5.11 2.55228 3.77751 3.62453 2.81875 5H5.1125ZM4.385 9.375C4.4225 8.27875 4.5575 7.2275 4.775 6.25H2.0925C1.6264 7.23131 1.34827 8.29126 1.2725 9.375H4.385ZM6.05875 6.25C5.81289 7.27475 5.67134 8.32175 5.63625 9.375H9.375V6.25H6.05875ZM10.625 6.25V9.375H14.3625C14.3279 8.32179 14.1867 7.27479 13.9412 6.25H10.625ZM5.6375 10.625C5.67218 11.6782 5.81331 12.7252 6.05875 13.75H9.375V10.625H5.6375ZM10.625 10.625V13.75H13.9412C14.175 12.7937 14.3238 11.74 14.3638 10.625H10.625ZM6.43125 15C6.60375 15.4825 6.8 15.93 7.01625 16.335C7.70625 17.6287 8.53875 18.3975 9.375 18.6538V15H6.43125ZM6.65875 18.09C6.37822 17.7225 6.12861 17.3324 5.9125 16.9237C5.5886 16.3078 5.32085 15.664 5.1125 15H2.81875C3.77746 16.3755 5.10997 17.4478 6.65875 18.09ZM4.775 13.75C4.54896 12.7226 4.4184 11.6765 4.385 10.625H1.2725C1.35 11.7375 1.63625 12.7913 2.0925 13.75H4.775ZM13.3413 18.09C14.89 17.4478 16.2225 16.3755 17.1812 15H14.8875C14.6791 15.664 14.4114 16.3078 14.0875 16.9237C13.8714 17.3325 13.6218 17.7226 13.3413 18.09ZM10.625 15V18.6538C11.4625 18.3988 12.2937 17.6287 12.9838 16.335C13.2 15.93 13.3962 15.4825 13.5687 15H10.625ZM15.225 13.75H17.9075C18.3638 12.7913 18.65 11.7375 18.7275 10.625H15.615C15.5816 11.6765 15.4511 12.7226 15.225 13.75ZM18.7275 9.375C18.6517 8.29127 18.3736 7.23132 17.9075 6.25H15.225C15.4425 7.2275 15.5775 8.27875 15.615 9.375H18.7275ZM14.0875 3.07625C14.3963 3.65625 14.665 4.30125 14.8875 5H17.1812C16.2225 3.62448 14.89 2.55222 13.3413 1.91C13.6138 2.265 13.8638 2.6575 14.0875 3.07625ZM13.5687 5C13.4066 4.54131 13.2111 4.09511 12.9838 3.665C12.2937 2.37125 11.4625 1.6025 10.625 1.34625V5H13.5687Z" fill="#00D8FF" />
                        </svg>
                    </div>
                    <Paragraph className="text-white !m-0" ellipsis={true}>
                        {d}
                    </Paragraph>
                </div>
            </Tooltip>
        }
    },
    {
        title: 'CRITICAL',
        key: 'critical',
        columnClass: "text-center",
        rowClass: "w-[100px] text-[#ED6A5E] border-l border-[#0B5567] text-center",

    },
    {
        title: 'HIGH',
        key: 'high',
        columnClass: "text-center",
        rowClass: "w-[100px] text-center text-[#FF7A00]",
    },
    {
        title: 'MEDIUM',
        key: 'medium',
        columnClass: "text-center",
        rowClass: "w-[100px] text-center text-[#FFBA08]",
    },
    {
        title: 'ACTION',
        key: 'action',
        columnClass: "text-center",
        rowClass: "w-[160px] text-center",
        html: () => {
            return <button className="flex items-center gap-4 justify-center w-full">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V16C0 16.5304 0.210714 17.0391 0.585786 17.4142C0.960859 17.7893 1.46957 18 2 18H16C17.1 18 18 17.1 18 16V2C18 1.46957 17.7893 0.960859 17.4142 0.585786C17.0391 0.210714 16.5304 0 16 0ZM16 16H2V4H16V16ZM9 7.5C10.84 7.5 12.48 8.46 13.34 10C12.48 11.54 10.84 12.5 9 12.5C7.16 12.5 5.52 11.54 4.66 10C5.52 8.46 7.16 7.5 9 7.5ZM9 6C6.27 6 3.94 7.66 3 10C3.94 12.34 6.27 14 9 14C11.73 14 14.06 12.34 15 10C14.06 7.66 11.73 6 9 6ZM9 11.5C8.17 11.5 7.5 10.83 7.5 10C7.5 9.17 8.17 8.5 9 8.5C9.83 8.5 10.5 9.17 10.5 10C10.5 10.83 9.83 11.5 9 11.5Z" fill="#00D8FF" />
                </svg>
                <span>VIEW DETAIL</span>
            </button>
        }
    },
]

export const columnItemRequire = [


    {
        title: 'IP/DOMAIN',
        key: 'domain',
        html: (d) => {
            return <Tooltip title={d}>
                <div className="flex h-full items-center gap-4 w-full top-0 absolute">
                    <div>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 10C0 7.34784 1.05357 4.8043 2.92893 2.92893C4.8043 1.05357 7.34784 0 10 0C12.6522 0 15.1957 1.05357 17.0711 2.92893C18.9464 4.8043 20 7.34784 20 10C20 12.6522 18.9464 15.1957 17.0711 17.0711C15.1957 18.9464 12.6522 20 10 20C7.34784 20 4.8043 18.9464 2.92893 17.0711C1.05357 15.1957 0 12.6522 0 10ZM9.375 1.34625C8.5375 1.60125 7.70625 2.37125 7.01625 3.665C6.78892 4.09512 6.59339 4.54131 6.43125 5H9.375V1.34625ZM5.1125 5C5.32084 4.33602 5.58859 3.69217 5.9125 3.07625C6.12863 2.66757 6.37824 2.27749 6.65875 1.91C5.11 2.55228 3.77751 3.62453 2.81875 5H5.1125ZM4.385 9.375C4.4225 8.27875 4.5575 7.2275 4.775 6.25H2.0925C1.6264 7.23131 1.34827 8.29126 1.2725 9.375H4.385ZM6.05875 6.25C5.81289 7.27475 5.67134 8.32175 5.63625 9.375H9.375V6.25H6.05875ZM10.625 6.25V9.375H14.3625C14.3279 8.32179 14.1867 7.27479 13.9412 6.25H10.625ZM5.6375 10.625C5.67218 11.6782 5.81331 12.7252 6.05875 13.75H9.375V10.625H5.6375ZM10.625 10.625V13.75H13.9412C14.175 12.7937 14.3238 11.74 14.3638 10.625H10.625ZM6.43125 15C6.60375 15.4825 6.8 15.93 7.01625 16.335C7.70625 17.6287 8.53875 18.3975 9.375 18.6538V15H6.43125ZM6.65875 18.09C6.37822 17.7225 6.12861 17.3324 5.9125 16.9237C5.5886 16.3078 5.32085 15.664 5.1125 15H2.81875C3.77746 16.3755 5.10997 17.4478 6.65875 18.09ZM4.775 13.75C4.54896 12.7226 4.4184 11.6765 4.385 10.625H1.2725C1.35 11.7375 1.63625 12.7913 2.0925 13.75H4.775ZM13.3413 18.09C14.89 17.4478 16.2225 16.3755 17.1812 15H14.8875C14.6791 15.664 14.4114 16.3078 14.0875 16.9237C13.8714 17.3325 13.6218 17.7226 13.3413 18.09ZM10.625 15V18.6538C11.4625 18.3988 12.2937 17.6287 12.9838 16.335C13.2 15.93 13.3962 15.4825 13.5687 15H10.625ZM15.225 13.75H17.9075C18.3638 12.7913 18.65 11.7375 18.7275 10.625H15.615C15.5816 11.6765 15.4511 12.7226 15.225 13.75ZM18.7275 9.375C18.6517 8.29127 18.3736 7.23132 17.9075 6.25H15.225C15.4425 7.2275 15.5775 8.27875 15.615 9.375H18.7275ZM14.0875 3.07625C14.3963 3.65625 14.665 4.30125 14.8875 5H17.1812C16.2225 3.62448 14.89 2.55222 13.3413 1.91C13.6138 2.265 13.8638 2.6575 14.0875 3.07625ZM13.5687 5C13.4066 4.54131 13.2111 4.09511 12.9838 3.665C12.2937 2.37125 11.4625 1.6025 10.625 1.34625V5H13.5687Z" fill="#00D8FF" />
                        </svg>
                    </div>
                    <Paragraph className="text-white !m-0" ellipsis={true}>
                        {d}
                    </Paragraph>
                </div>
            </Tooltip>
        }
    },
    {
        title: 'RISK',
        key: 'high',
        columnClass: "text-center",
        rowClass: "w-[100px] text-center text-[#FF7A00]",
    },
]

export const dataItems = [
    {
        domain: 'WWW.DOMAIN.COM/data/sade/daaa/caca/swe/INDEX.PHP',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
    {
        domain: '102.22.13.44',
        critical: 32,
        high: 44,
        medium: 44,
        action: 1,
    },
]