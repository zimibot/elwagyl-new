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

const TargetReady = () => {
    const [pages, setpages] = useState(1)

    const API = GET_API_EHA.root([
        {
            active: "vulnerability",
            query: "is_false_positive=false&is_complete_qc=true",
            pages
        },
    ])


    const onSolved = (id, data) => {

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
        <CardBox className="flex-1 col-span-full pb-14">
            <TitleContent>
                <div className="text-[24px] uppercase text-blue">targets ready for qa</div>
            </TitleContent>
            {API.error ? "" : API.loading ? <Loading></Loading> : <TableInline onChange={(s) => {
                setpages(s)
            }} paggination Loading={API.isFetching} totalPages={API.data.vulnerability.pagination.total_results} pageSize={15} currentPage={pages} border hoverDisable
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
                            return !data?.is_solved ? <ButtonComponents className="min-w-[50px]" click={() => onSolved(id, data)}><CheckOutlined></CheckOutlined></ButtonComponents> : "-"
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
                        title: 'status',
                        key: 'is_false_positive',
                        rowClass: "w-[150px]",
                        columnClass: "w-[150px]",
                        html: (d, data) => {
                            return d ? <div className="text-red-400">False Positive</div> : data?.is_solved  ? "APPROVED" : "-"
                        }
                    },

                ]}
                data={
                    API.data.vulnerability.result
                } />}

        </CardBox>
    </LayoutDashboard>
}

export default TargetReady