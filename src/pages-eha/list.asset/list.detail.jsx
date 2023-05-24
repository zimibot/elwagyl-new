import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { GET_API_EHA } from "../../api/eha/GET"
import { ButtonComponents } from "../../components.eha/button"
import { CardBox } from "../../components/layout/card"
import { TitleContent } from "../../components/layout/title"
import { TableInline } from "../../components/table"
import { GetAndUpdateContext } from "../../model/context.function"
import { ErrorHtml, Loading } from "../list.maintenance"
import { DELETE_API } from "../../api/eha/DELETE"
import { Popconfirm } from "antd"
import { NavLink } from "react-router-dom"

export const ListDetail = () => {
    const { setStatus } = GetAndUpdateContext()

    const API = GET_API_EHA.root([{
        active: "assetsList"
    }])


    return (
        <div className="col-span-full flex-1 flex flex-col pb-10">
            <CardBox className="!p-0">
                <div className="p-8 flex items-center gap-10 border-b border-primary">
                    <div>ASSET LIST</div>
                    <div className="space-x-4 flex">
                        {/* <ButtonComponents>
                            IMPORT
                        </ButtonComponents>
                        <ButtonComponents>
                            EXPORT
                        </ButtonComponents> */}
                         <ButtonComponents>
                            EXPORT
                        </ButtonComponents>
                        <ButtonComponents click={() => {
                            setStatus(d => ({
                                ...d,
                                ADDASSET: !d.ADDASSET,
                                idAssets: null
                            }))
                        }}>
                            [ + ] ADD
                        </ButtonComponents>
                        <NavLink to={"/eha/assets/net-discovery"} state={{ title: `09 // eha // assets // net dicovery`, eha: true }}>
                            <ButtonComponents>
                                NET DISCOVERY
                            </ButtonComponents>
                        </NavLink>
                    </div>
                </div>
            </CardBox>
            <CardBox className="flex-1">
                <TitleContent>
                    <div className="text-[24px] uppercase text-blue">ASSETS LIST DATA</div>
                </TitleContent>
                {API.msg || API.error ? <ErrorHtml error={API.msg}></ErrorHtml> : API.loading ? <Loading></Loading> : <TableInline Loading={API.loading} border hoverDisable columns={[
                    {
                        title: 'ID',
                        key: 'id',
                        rowClass: "w-[50px]"
                    },
                    {
                        title: 'ASSET NAME',
                        key: 'name',
                    },
                    {
                        title: 'PROTECTED SITE',
                        key: 'site_name',
                    },
                    {
                        title: 'IP/DOMAIN',
                        rowClass: "w-[300px]",
                        key: 'url_ip',
                    },
                    {
                        title: 'LAST SCAN',
                        key: 'updated_at',
                        rowClass: "w-[200px]",
                    },

                    {
                        title: 'target RISK',
                        key: 'risk_group',
                        rowClass: "w-[100]",
                    },
                    {
                        title: 'application criticality',
                        key: 'application_criticality',
                        rowClass: "w-[200px] text-center",
                        columnClass: "text-center"
                    },
                    {
                        title: 'CRIT',
                        rowClass: "w-[80px] text-center",
                        columnClass: "text-center",
                        key: 'critical',
                    },
                    {
                        title: 'HIGH',
                        rowClass: "w-[80px] text-center",
                        columnClass: "text-center",
                        key: 'high',
                    },
                    {
                        title: 'MEDIUM',
                        rowClass: "w-[80px] text-center",
                        columnClass: "text-center",
                        key: 'medium',
                    },
                    {
                        title: 'LOW',
                        rowClass: "w-[80px] text-center",
                        columnClass: "text-center",
                        key: 'low',
                    },
                    {
                        title: 'EDIT',
                        key: "id",
                        rowClass: "w-[50px] text-center",
                        columnClass: "text-center",
                        html: (id) => {
                            return <button className="flex items-center justify-center gap-4 w-full " onClick={() => {
                                setStatus(d => ({
                                    ...d,
                                    ADDASSET: !d.ADDASSET,
                                    idAssets: id
                                }))
                            }}>
                                <EditOutlined></EditOutlined>
                            </button>
                        }
                    },
                    {
                        title: 'DELETE',
                        key: "id",
                        rowClass: "w-[50px] text-center",
                        columnClass: "text-center",
                        html: (__, data) => {
                            return <Popconfirm title="Are you sure to delete this asset?" okText="Deleted" onConfirm={() => {
                                data = {
                                    ...data,
                                    name: data.created_by
                                }
                                DELETE_API.deleteAssets(data, setStatus)
                            }}>
                                <button className="flex items-center justify-center gap-4 w-full " >
                                    <DeleteOutlined></DeleteOutlined>
                                </button>
                            </Popconfirm>
                        }
                    },
                ]}
                    data={
                        API.data.assetsList.result.map(d => ({
                            ...d.protected_site,
                            ...d.severity_count,
                            ...d
                        }))
                    }></TableInline>}

            </CardBox>
        </div>
    )
}