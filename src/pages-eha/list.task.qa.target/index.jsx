import { CheckOutlined, DeleteFilled, EditFilled, FileFilled } from "@ant-design/icons"
import { CardBox } from "../../components/layout/card"
import { LayoutDashboard } from "../../components/layout/dashboard.layout"
import { TitleContent } from "../../components/layout/title"
import { TableInline } from "../../components/table"
import { GET_API_EHA } from "../../api/eha/GET"
import { Loading } from "../list.maintenance"
import { useState } from "react"
import { ButtonComponents } from "../../components.eha/button"
import { UPDATE_API } from "../../api/eha/UPDATE"
import { switchColor } from "../../helper/switch-color"
import { ModalSuccess } from "../../components.eha/modal"
import { Form } from "../../components.eha/input"

const APiTable = ({ is_false_positive = false, is_complete_qc = false, pages = 1, fillter }) => {
    return GET_API_EHA.root([
        {
            active: "vulnerability",
            query: `is_false_positive=${is_false_positive}&is_complete_qc=${is_complete_qc}&category=${fillter.category}&risk_level=${fillter.risk_level}`,
            pages
        },
    ])
}

const TargetReady = () => {
    const [pages, setpages] = useState({
        isComplete: 1,
        isFalse: 1
    })
    const [fillter, setFillter] = useState({
        category: "",
        risk_level: ""
    })

    const Api_isFalse = APiTable({ is_false_positive: true, pages: pages.isFalse, fillter })
    const Api_isComplete = APiTable({ is_complete_qc: true, pages: pages.isComplete, fillter })


    const onSolvedData = (id, data, API) => {


        data = {
            is_solved: true,
            updated_by: localStorage.getItem("user")
        }

        // // UPDATE_API.deleteVulnerabilities(data, API.data.vulnerability.refetch)
        UPDATE_API.updateSolvedVul(id, data, API.data.vulnerability.refetch)
    }

    var find = "Nessus";
    var regex = new RegExp(find, "g");
    return <LayoutDashboard className="bg-[#101C26] text-[16px]">
        <CardBox className="flex-1 col-span-full pb-14 flex flex-col ">
            <div className="flex items-center gap-5 pt-4">
                <div className="text-[24px] uppercase text-blue">Filter : </div>

                <div className="flex items-center gap-3">
                    <Form.dropdown items={[
                        {
                            key: "",
                            label: "all",
                        },
                        {
                            key: "vulnerabilty",
                            label: "vulnerability",
                        },
                        {
                            key: "compliance",
                            label: "compliance",
                        },
                    ]} label={"Category"}
                        onChange={(w) => {
                            setFillter(d => ({
                                ...d,
                                category: w.key
                            }))
                        }}></Form.dropdown>
                    <Form.dropdown items={[
                        {
                            key: "",
                            label: "all",
                        },
                        {
                            key: "low",
                            label: "low",
                        },
                        {
                            key: "medium",
                            label: "medium",
                        },
                        {
                            key: "high",
                            label: "high",
                        },
                    ]} label={"RISK LEVEL"}
                        onChange={(w) => {
                            setFillter(d => ({
                                ...d,
                                risk_level: w.key
                            }))
                        }}></Form.dropdown>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full flex-1">

                <div className="flex flex-1 flex-col space-y-4 relative">
                    <TitleContent>
                        <div className="text-[24px] uppercase text-blue">targets ready for qa</div>
                    </TitleContent>
                    {Api_isComplete.error ? "" : Api_isComplete.loading ? <Loading></Loading> : <TableInline onChange={(s) => {
                        setpages(d => ({
                            ...d,
                            isComplete: s
                        }))
                    }} paggination Loading={Api_isComplete.isFetching} totalPages={Api_isComplete.data.vulnerability.pagination.total_results} pageSize={15} currentPage={pages.isComplete} border hoverDisable
                        columns={[
                            // {
                            //     title: 'Delete',
                            //     key: 'id',
                            //     rowClass: "w-[100px] text-center",
                            //     columnClass: "w-[100px] text-center",
                            //     html: (id, data) => {
                            //         return <Popconfirm placement="right" title="Are you sure you want to delete this data?" okText="DELETE" onConfirm={() => {
                            //             onDelete(id, data)
                            //         }}>
                            //             <button ><DeleteFilled></DeleteFilled></button>
                            //         </Popconfirm>
                            //     }
                            // },
                            {
                                title: 'Approved',
                                key: 'id',
                                rowClass: "w-[90px] text-center",
                                columnClass: "w-[90px] text-center",
                                html: (id, data) => {
                                    return !data?.is_solved ? <ButtonComponents className="min-w-[50px]" click={() => {
                                        ModalSuccess({
                                            title: <div>Are you sure you want to approve this vulnerability <b className="text-blue">"{data.finding_name}"</b>?</div>, clickOk: () => {
                                                onSolvedData(id, data, Api_isComplete)
                                            },
                                            type: "info"
                                        })
                                    }}><CheckOutlined></CheckOutlined></ButtonComponents> : "-"
                                }
                            },
                            {
                                title: "FINDING NAME",
                                key: "finding_name",
                                html: (data) => {
                                    return data?.replace(regex, "E.H.A Engine")
                                }
                            },
                            {
                                title: 'TARGET',
                                rowClass: "w-[120px]",
                                columnClass: "w-[120px]",
                                key: 'addresses',
                            },
                            {
                                title: 'risk level',
                                key: 'risk_level',
                                rowClass: "w-[100px]",
                                columnClass: "w-[100px]",
                                html: (data) => {
                                    return switchColor(data)
                                }
                            },
                            {
                                title: 'stage',
                                key: 'stage',
                                rowClass: "w-[100px]",
                                columnClass: "w-[100px]",
                                html: (d, data) => {
                                    return d === "closed" ? <span className="text-red-400">{d}</span> : d
                                }
                            },
                            {
                                title: 'status',
                                key: 'is_false_positive',
                                rowClass: "w-[150px]",
                                columnClass: "w-[150px]",
                                html: (d, data) => {
                                    return d ? <div className="text-red-400">False Positive</div> : data?.is_solved ? "APPROVED" : <div className="text-yellow-500">READY QA</div>
                                }
                            },

                        ]}
                        data={
                            Api_isComplete.data.vulnerability.result
                        } />}

                </div>
                <div className="flex flex-1 flex-col space-y-4 relative">
                    <TitleContent>
                        <div className="text-[24px] uppercase text-blue">FINDING FALSE POSITIVE</div>
                    </TitleContent>
                    {Api_isFalse.error ? "" : Api_isFalse.loading ? <Loading></Loading> : <TableInline onChange={(s) => {
                        setpages(d => ({
                            ...d,
                            isFalse: s
                        }))
                    }} paggination Loading={Api_isFalse.isFetching} totalPages={Api_isFalse.data.vulnerability.pagination.total_results} pageSize={15} currentPage={pages.isFalse} border hoverDisable
                        columns={[
                            // {
                            //     title: 'Delete',
                            //     key: 'id',
                            //     rowClass: "w-[100px] text-center",
                            //     columnClass: "w-[100px] text-center",
                            //     html: (id, data) => {
                            //         return <Popconfirm placement="right" title="Are you sure you want to delete this data?" okText="DELETE" onConfirm={() => {
                            //             onDelete(id, data)
                            //         }}>
                            //             <button ><DeleteFilled></DeleteFilled></button>
                            //         </Popconfirm>
                            //     }
                            // },
                            {
                                title: 'Approved',
                                key: 'id',
                                rowClass: "w-[90px] text-center",
                                columnClass: "w-[90px] text-center",
                                html: (id, data) => {
                                    return !data?.is_solved ? <ButtonComponents className="min-w-[50px]" click={() => {
                                        ModalSuccess({
                                            title: <div>Are you sure you want to approve this vulnerability <b className="text-blue">"{data.finding_name}"</b>?</div>, clickOk: () => {
                                                onSolvedData(id, data, Api_isFalse)
                                            },
                                            type: "info"
                                        })
                                    }}><CheckOutlined></CheckOutlined></ButtonComponents> : "-"
                                }
                            },
                            {
                                title: "FINDING NAME",
                                key: "finding_name",
                                html: (data) => {
                                    return data?.replace(regex, "E.H.A Engine")
                                }
                            },
                            {
                                title: 'TARGET',
                                rowClass: "w-[120px]",
                                columnClass: "w-[120px]",
                                key: 'addresses',
                            },
                            {
                                title: 'risk level',
                                key: 'risk_level',
                                rowClass: "w-[100px]",
                                columnClass: "w-[100px]",
                                html: (data) => {
                                    return switchColor(data)
                                }
                            },
                            {
                                title: 'stage',
                                key: 'stage',
                                rowClass: "w-[100px]",
                                columnClass: "w-[100px]",
                                html: (d, data) => {
                                    return d === "closed" ? <span className="text-red-400">{d}</span> : d
                                }
                            },
                            {
                                title: 'status',
                                key: 'is_false_positive',
                                rowClass: "w-[150px]",
                                columnClass: "w-[150px]",
                                html: (d, data) => {
                                    console.log(data)
                                    return data.is_solved ? "APPROVED" : d ? <div className="text-red-400">False Positive</div> : "-"
                                }
                            },

                        ]}
                        data={
                            Api_isFalse.data.vulnerability.result
                        } />}

                </div>
            </div>
        </CardBox>
    </LayoutDashboard>
}

export default TargetReady