import { NavLink } from "react-router-dom"
import { GET_API_EHA } from "../../api/eha/GET"
import { ButtonComponents } from "../../components.eha/button"
import { CardBox } from "../../components/layout/card"
import { LayoutDashboard } from "../../components/layout/dashboard.layout"
import { TitleContent } from "../../components/layout/title"
import { TableInline } from "../../components/table"
import { GetAndUpdateContext } from "../../model/context.function"
import { ErrorHtml, Loading } from "../list.maintenance"
import { AddModal } from "./add.modal"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Popconfirm, Tooltip } from "antd"
import { DELETE_API } from "../../api/eha/DELETE"

const ListTask = () => {
    const { setStatus } = GetAndUpdateContext()

    const API = GET_API_EHA.root([{
        active: "scan"
    }])

    return (
        <LayoutDashboard className="bg-[#101C26] text-[16px]">
            <div className="col-span-full flex-1 flex flex-col pb-10">
                <CardBox className="!p-0">
                    <div className="p-8 flex items-center gap-10 border-b border-primary">
                        <div>SCAN FUNCTION</div>
                        <div className="space-x-4 flex">
                            {/* <ButtonComponents>
                                IMPORT
                            </ButtonComponents> */}
                            <ButtonComponents click={() => {
                                setStatus(d => ({
                                    ...d,
                                    ADDTASK: !d.ADDTASK,
                                    IDSCAN: undefined
                                }))
                            }}>
                                [ + ] ADD
                            </ButtonComponents>
                            {/* <ButtonComponents>
                                RECURRING SCANS
                            </ButtonComponents> */}
                        </div>
                    </div>
                </CardBox>
                <CardBox className="flex-1">
                    <TitleContent>
                        <div className="text-[24px] uppercase text-blue">SCAN LIST</div>
                    </TitleContent>
                    {API.msg || API.error ? <ErrorHtml error={API.msg}></ErrorHtml> : API.loading ? <Loading></Loading> : <TableInline border hoverDisable columns={[
                        {
                            title: 'TARGETS',
                            key: 'id',
                            rowClass: "w-[50px]"
                        },
                        {
                            title: 'PROTECTED SITE',
                            rowClass: "w-[200px]",
                            key: 'name',
                        },
                        {
                            title: 'REQUESTED BY',
                            key: 'created_by',
                            rowClass: "w-[150px]"
                        },
                        {
                            title: 'CREATION DATES',
                            key: 'created_at',
                            rowClass: "w-[200px]"
                        },
                        {
                            title: 'SCHEDULED DATES',
                            key: 'scheduled_start_date',
                        },

                        {
                            title: 'REMARKS',
                            rowClass: "w-[300px]",
                            key: 'remarks',
                        },
                        {
                            title: 'SCAN ALERTS',
                            rowClass: "w-[120px] text-center",
                            columnClass: "text-center",
                            key: 'scan_alerts',
                        },
                        {
                            title: 'STATUS',
                            rowClass: "w-[120px] text-center",
                            columnClass: "text-center",
                            key: 'status',
                        },

                        {
                            title: 'FINDINGS',
                            rowClass: "w-[100px] text-center",
                            columnClass: "text-center",
                            key: "id",
                            html: (id, data) => {
                                return <Tooltip title="VIEWS">
                                    <NavLink to={"/eha/vulnerability"} state={{ id: id, label: data.name, title: `10 // eha // vulnerability`, eha: true }} className="flex items-center justify-center gap-4 w-full ">
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V16C0 16.5304 0.210714 17.0391 0.585786 17.4142C0.960859 17.7893 1.46957 18 2 18H16C17.1 18 18 17.1 18 16V2C18 1.46957 17.7893 0.960859 17.4142 0.585786C17.0391 0.210714 16.5304 0 16 0ZM16 16H2V4H16V16ZM9 7.5C10.84 7.5 12.48 8.46 13.34 10C12.48 11.54 10.84 12.5 9 12.5C7.16 12.5 5.52 11.54 4.66 10C5.52 8.46 7.16 7.5 9 7.5ZM9 6C6.27 6 3.94 7.66 3 10C3.94 12.34 6.27 14 9 14C11.73 14 14.06 12.34 15 10C14.06 7.66 11.73 6 9 6ZM9 11.5C8.17 11.5 7.5 10.83 7.5 10C7.5 9.17 8.17 8.5 9 8.5C9.83 8.5 10.5 9.17 10.5 10C10.5 10.83 9.83 11.5 9 11.5Z" fill="#00D8FF" />
                                        </svg>


                                    </NavLink>
                                </Tooltip>
                            }
                        },
                        {
                            title: 'EDIT',
                            rowClass: "w-[50px] text-center",
                            columnClass: "text-center",
                            key: "id",
                            html: (id) => {
                                return <button className="flex items-center justify-center gap-4 w-full " onClick={() => {
                                    setStatus(d => ({
                                        ...d,
                                        ADDTASK: true,
                                        IDSCAN: id
                                    }))
                                }}>

                                    <EditOutlined></EditOutlined>
                                </button>
                            }
                        },
                        {
                            title: 'DELETE',
                            rowClass: "w-[50px] text-center",
                            columnClass: "text-center",
                            key: "id",
                            html: (id, its) => {
                                return <Popconfirm title="are you sure to delete this scan ?" onConfirm={() => {
                                    let data = {
                                        id: id,
                                        name: its.created_by,
                                        site_name: its.name
                                    }
                                    DELETE_API.deleteScanAssets(data, setStatus)
                                }} placement="left" okText={"DELETE"}>
                                    <button className="flex items-center justify-center gap-4 w-full ">
                                        <DeleteOutlined></DeleteOutlined>
                                    </button>
                                </Popconfirm>
                            }
                        },
                    ]}
                        data={API.data.scan.result.map(d => ({
                            ...d.tool_scanner,
                            ...d.asset,
                            ...d,
                        }))
                            // new Array(20).fill({
                            //     id: "EH-1",
                            //     requested: "ADMINISTRATOR",
                            //     create_date: "2023/02/14 | 05.00 AM",
                            //     ip: "HTTP://192.168.1.1",
                            //     protect: "PROTECTED SITE A",
                            //     remarks: "",
                            //     status: "COMPLETED",
                            //     scan_alerts: <div className="flex w-full justify-center items-center">
                            //         <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            //             <path d="M0 19H22L11 0L0 19ZM12 16H10V14H12V16ZM12 12H10V8H12V12Z" fill="#FFBA08" />
                            //         </svg>

                            //     </div>
                            // })
                        }></TableInline>}

                </CardBox>
            </div>
            <AddModal></AddModal>
        </LayoutDashboard>
    )
}

export default ListTask