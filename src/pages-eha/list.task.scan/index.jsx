import { NavLink } from "react-router-dom";
import { GET_API_EHA } from "../../api/eha/GET";
import { ButtonComponents } from "../../components.eha/button";
import { CardBox } from "../../components/layout/card";
import { LayoutDashboard } from "../../components/layout/dashboard.layout";
import { TitleContent } from "../../components/layout/title";
import { TableInline } from "../../components/table";
import { GetAndUpdateContext } from "../../model/context.function";
import { ErrorHtml, Loading } from "../list.maintenance";
import { AddModal } from "./add.modal";
import {
  DeleteOutlined,
  EditOutlined,
  EyeFilled,
  ReloadOutlined,
} from "@ant-design/icons";
import { Popconfirm, Tooltip } from "antd";
import { DELETE_API } from "../../api/eha/DELETE";
import { useEffect, useState } from "react";
import moment from "moment";
import { POST_API } from "../../api/eha/POST";

const ListTask = () => {
  const { setStatus } = GetAndUpdateContext();

  const [checkItem, setCheckItem] = useState([]);
  const [statusItem, setstatus] = useState(false);

  const API = GET_API_EHA.root([
    {
      active: "scan",
      query: "type=vulnerability"
    },
  ]);


  useEffect(() => {
    let was = setInterval(() => setstatus((d) => !d), 500);

    return () => {
      clearInterval(was);
      setstatus(false)
    };
  }, []);


  return (
    <LayoutDashboard className="bg-[#101C26] text-[16px]">
      <div className="col-span-full flex-1 flex flex-col pb-10">
        <CardBox className="!p-0">
          <div className="p-8 flex items-center gap-10 border-b border-primary">
            <div>SCAN FUNCTION</div>
            <div className="space-x-4 flex">
              {/* <ButtonComponents
                nonSubmit
                href="/pdf/comparisoneha.pdf"
                download="comparisoneha.pdf"
                target="_blank"
                rel="noreferrer"
              >
                {checkItem.length > 0 ? (
                  <div>
                    {" "}
                    EXPORT PDF{" "}
                    <span className="font-bold">{checkItem.length} ITEMS</span>
                  </div>
                ) : (
                  " EXPORT PDF ALL SCAN"
                )}
              </ButtonComponents> */}
              <ButtonComponents
                click={() => {
                  setStatus((d) => ({
                    ...d,
                    ADDTASK: !d.ADDTASK,
                    reScan: false,
                    IDSCAN: null,
                  }));
                }}
              >
                [ + ] ADD
              </ButtonComponents>
            </div>
          </div>
        </CardBox>
        <CardBox className="flex-1">
          <TitleContent subTitle={false}>
            <div className="text-[24px] uppercase text-blue">SCAN LIST</div>
          </TitleContent>
          {API.msg || API.error ? (
            <ErrorHtml error={API.msg}></ErrorHtml>
          ) : (
            <TableInline
              isload
              Loading={API.isFetching}
              border
              hoverDisable
              columns={[
                {
                  title: "TARGETS",
                  key: "asset",
                  rowClass: "w-[50px]",
                  html: (d) => {
                    return d?.url_ip;
                  },
                },
                {
                  title: "Data Center",
                  rowClass: "w-[200px]",
                  key: "name",
                },
                {
                  title: "REQUESTED BY",
                  key: "created_by",
                  rowClass: "w-[150px]",
                },

                {
                  title: "scheduled start",
                  rowClass: "w-[180px]",
                  columnClass: "w-[180px] ",
                  key: "scheduled_start_time",
                  html: (time, full) => {
                    let date = full.scheduled_start_date?.split(" ")[0];
                    return (
                      <span>
                        {date} {time}
                      </span>
                    );
                  },
                },
                {
                  title: "scheduled scan",
                  rowClass: "w-[180px] text-center",
                  columnClass: "w-[180px] text-center",
                  key: "scheduled_run_scan",
                  html: (time) => {
                    return time ? time : "-";
                  },
                },
                {
                  title: "STATUS",
                  rowClass: "w-[120px] text-center",
                  columnClass: "w-[120px] text-center",
                  key: "status",
                },
                {
                  title: "compliance",
                  rowClass: "w-[120px] text-center",
                  columnClass: "w-[120px] text-center",
                  key: "total_category_compliance",
                },
                {
                  title: "Vulnerability",
                  rowClass: "w-[200px] text-center",
                  columnClass: "w-[200px] text-center",
                  key: "total_risk_level_critical",
                  html: (d, data) => {
                    return data.expected_end_time ? (
                      "-"
                    ) : (
                      <div className="flex gap-4">
                        <Tooltip title="LOW">
                          <span className="text-blue border min-w-[45px] border-blue">
                            {data.total_risk_level_low}
                          </span>
                        </Tooltip>
                        <Tooltip title="MEDIUM">
                          <span className="text-yellow-500 border min-w-[45px] border-yellow-500">
                            {data.total_risk_level_medium}
                          </span>
                        </Tooltip>
                        <Tooltip title="HIGH">
                          <span className="text-red-400 border min-w-[45px] border-red-400">
                            {data.total_risk_level_high}
                          </span>
                        </Tooltip>
                        <Tooltip title="CRITICAL">
                          <span className="text-red-600  border min-w-[45px] border-red-600">
                            {d}
                          </span>
                        </Tooltip>
                      </div>
                    );
                  },
                },
                {
                  title: "TIME REMAINING",
                  rowClass: "w-[200px] text-center",
                  columnClass: "w-[200px] text-center",
                  key: "expected_end_time",
                  html: (data, full) => {
                    let startDate = `${full?.scheduled_start_date?.split(" ")[0]} ${full.scheduled_start_time} `;
                    let endDate = `${full?.expected_end_date?.split(" ")[0]} ${data}`;

                    let momentStart = moment(startDate, "YYYY-MM-DD HH:mm:ss");
                    let momentEnd = moment(endDate, "YYYY-MM-DD HH:mm:ss");
                    let duration = moment.duration(momentEnd.diff(momentStart));

                    let minutes = duration.minutes();

                    return data ? <span>{minutes} Minutes </span> : "-";
                  },
                },
                {
                  title: "RECCURING SCAN",
                  rowClass: "w-[150px] text-center",
                  columnClass: "text-center",
                  key: "id",
                  htmlDropdown: (data) => {

                    let { fullData } = data
                    let { asset_id, sla_date, sla_time, recipient_email, remarks, attachment, is_draft, tool_scanner_id, created_by } = fullData
                    data = {
                      asset_id,
                      sla_date: sla_date?.split(" ")[0],
                      sla_time,
                      recipient_email,
                      remarks,
                      attachment,
                      is_draft,
                      tool_scanner_id,
                      created_by
                    }


                    return (
                      <div className="hover:text-white items-center flex justify-center gap-4 w-full">
                        <div className="flex gap-4 items-center">
                          <Tooltip title="RE SCANNING BUTTON">
                            <button onClick={() => {
                              POST_API.addscanAssets(data, false, API.data.scan.refetch)
                            }}>
                              <ReloadOutlined />
                            </button>
                          </Tooltip>
                        </div>
                      </div>
                    );
                  },
                },
                {
                  title: "Re Scan",
                  rowClass: "w-[120px] text-center",
                  columnClass: "text-center",
                  key: "sub_scans",
                  htmlDropdown: (data) => {
                    let { current, subDropdown } = data;
                    return (
                      <div className="hover:text-white items-center flex justify-center gap-4 w-full">
                        <div className="flex gap-4 items-center">
                          <button
                            className="flex items-center gap-4"
                            onClick={subDropdown}
                          >
                            <EyeFilled></EyeFilled>
                            <span>{current.length} SCAN</span>
                          </button>
                        </div>
                      </div>
                    );
                  },
                },

                {
                  rowClass: "w-[60px] text-center",
                  columnClass: "w-[60px]",
                  key: "id",
                  function: ({ current, fullData }) => {
                    return (
                      <div className="flex items-center gap-6">
                        <Tooltip title="FINDINGS VIEWS">
                          <NavLink
                            to={"/eha/vulnerability"}
                            state={{
                              id: current,
                              label: fullData?.name,
                              title: `10 // eha // vulnerability`,
                              eha: true,
                            }}
                            className="flex items-center justify-center gap-4 w-full "
                          >
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V16C0 16.5304 0.210714 17.0391 0.585786 17.4142C0.960859 17.7893 1.46957 18 2 18H16C17.1 18 18 17.1 18 16V2C18 1.46957 17.7893 0.960859 17.4142 0.585786C17.0391 0.210714 16.5304 0 16 0ZM16 16H2V4H16V16ZM9 7.5C10.84 7.5 12.48 8.46 13.34 10C12.48 11.54 10.84 12.5 9 12.5C7.16 12.5 5.52 11.54 4.66 10C5.52 8.46 7.16 7.5 9 7.5ZM9 6C6.27 6 3.94 7.66 3 10C3.94 12.34 6.27 14 9 14C11.73 14 14.06 12.34 15 10C14.06 7.66 11.73 6 9 6ZM9 11.5C8.17 11.5 7.5 10.83 7.5 10C7.5 9.17 8.17 8.5 9 8.5C9.83 8.5 10.5 9.17 10.5 10C10.5 10.83 9.83 11.5 9 11.5Z"
                                fill="#00D8FF"
                              />
                            </svg>
                          </NavLink>
                        </Tooltip>
                        |
                        <Tooltip title="EDIT">
                          <button
                            className="flex items-center justify-center gap-4 w-full "
                            onClick={() => {
                              setStatus((d) => ({
                                ...d,
                                ADDTASK: true,
                                IDSCAN: current,
                                reScan: false,
                              }));
                            }}
                          >
                            <EditOutlined></EditOutlined>
                          </button>
                        </Tooltip>
                        <Tooltip title="DELETE">
                          <Popconfirm
                            title="are you sure to delete this scan ?"
                            onConfirm={() => {
                              let data = {
                                id: current,
                                name: fullData.created_by,
                                site_name: fullData.name,
                              };
                              DELETE_API.deleteScanAssets(
                                data,
                                API.data.scan.refetch
                              );
                            }}
                            placement="left"
                            okText={"DELETE"}
                          >
                            <button className="flex items-center justify-center gap-4 w-full ">
                              <DeleteOutlined></DeleteOutlined>
                            </button>
                          </Popconfirm>
                        </Tooltip>
                      </div>
                    );
                  },
                },
                // {
                //     title: 'FUNCTION',
                //     rowClass: "w-[50px] text-center",
                //     columnClass: "text-center",
                //     key: "id",
                //     html: (id, its) => {
                //         return <div className="flex items-center gap-3">
                //             <Tooltip title='EDIT'>
                //                 <button className="flex items-center justify-center gap-4 w-full " onClick={() => {
                //                     setStatus(d => ({
                //                         ...d,
                //                         ADDTASK: true,
                //                         IDSCAN: id,
                //                         reScan: false
                //                     }))
                //                 }}>

                //                     <EditOutlined></EditOutlined>
                //                 </button>
                //             </Tooltip>
                //             <Tooltip title="DELETE">
                //                 <Popconfirm title="are you sure to delete this scan ?" onConfirm={() => {
                //                     let data = {
                //                         id: id,
                //                         name: its.created_by,
                //                         site_name: its.name
                //                     }
                //                     DELETE_API.deleteScanAssets(data, setStatus)
                //                 }} placement="left" okText={"DELETE"}>
                //                     <button className="flex items-center justify-center gap-4 w-full ">
                //                         <DeleteOutlined></DeleteOutlined>
                //                     </button>
                //                 </Popconfirm>
                //             </Tooltip>
                //         </div>
                //     }
                // },
              ]}
              htmlDropdown={(data) => {
                return (
                  <div className="flex flex-1 flex-col space-y-4 border border-primary p-4">
                    <TitleContent subTitle={false}>
                      <div>RE-SCANNING</div>
                    </TitleContent>
                    <TableInline
                      hoverDisable
                      columns={[
                        {
                          title: "remarks",
                          key: "remarks",
                        },
                        {
                          title: "scheduled start",
                          rowClass: "w-[200px]",
                          columnClass: "w-[200px] ",
                          key: "scheduled_start_time",
                          html: (time, full) => {
                            let date = full.scheduled_start_date?.split(" ")[0];
                            return (
                              <span>
                                {date} {time}
                              </span>
                            );
                          },
                        },
                        {
                          title: "scheduled scan",
                          rowClass: "w-[200px] text-center",
                          columnClass: "w-[200px] text-center",
                          key: "scheduled_run_scan",
                          html: (time) => {
                            return time ? time : "-";
                          },
                        },
                        {
                          title: "EMAIL",
                          rowClass: "w-[250px]",
                          columnClass: "w-[250px] ",
                          key: "recipient_email",
                        },
                        {
                          title: "status",
                          rowClass: "w-[120px]",
                          columnClass: "w-[120px] ",
                          key: "status",
                        },
                        {
                          title: "compliance",
                          rowClass: "w-[120px] text-center",
                          columnClass: "w-[120px] text-center",
                          key: "total_category_compliance",
                        },
                        {
                          title: "Vulnerability",
                          rowClass: "w-[220px] text-center",
                          columnClass: "w-[220px] text-center",
                          key: "total_risk_level_critical",
                          html: (d, data) => {
                            return data.expected_end_time ? (
                              "-"
                            ) : (
                              <div className="flex gap-4">
                                <Tooltip title="LOW">
                                  <span className="text-blue border min-w-[45px] border-blue">
                                    {data.total_risk_level_low}
                                  </span>
                                </Tooltip>
                                <Tooltip title="MEDIUM">
                                  <span className="text-yellow-500 border min-w-[45px] border-yellow-500">
                                    {data.total_risk_level_medium}
                                  </span>
                                </Tooltip>
                                <Tooltip title="HIGH">
                                  <span className="text-red-400 border min-w-[45px] border-red-400">
                                    {data.total_risk_level_high}
                                  </span>
                                </Tooltip>
                                <Tooltip title="CRITICAL">
                                  <span className="text-red-600  border min-w-[45px] border-red-600">
                                    {d}
                                  </span>
                                </Tooltip>
                              </div>
                            );
                          },
                        },
                        {
                          title: "TIME REMAINING",
                          rowClass: "w-[150px] text-center",
                          columnClass: "w-[150px] text-center",
                          key: "expected_end_time",
                          html: (data, full) => {
                            let startDate = `${full?.scheduled_start_date?.split(" ")[0]} ${full?.scheduled_start_time} `;
                            let endDate = `${full?.expected_end_date?.split(" ")[0]} ${data}`;
                            let momentStart = moment(
                              startDate,
                              "YYYY-MM-DD HH:mm:ss"
                            );
                            let momentEnd = moment(
                              endDate,
                              "YYYY-MM-DD HH:mm:ss"
                            );
                            let duration = moment.duration(
                              momentEnd.diff(momentStart)
                            );

                            let hours = duration.hours();
                            let minutes = duration.minutes();
                            let second = duration.seconds();

                            return data ? (
                              <span>
                                {hours === 0 ? "" : `${hours} Hours`}  {minutes === 0 ? "" : `${minutes} Minutes`} 
                              </span>
                            ) : (
                              "-"
                            );
                          },
                        },

                        {
                          title: "FINDINGS",
                          rowClass: "w-[100px] text-center",
                          columnClass: "w-[100px]  text-center",
                          key: "id",
                          html: (id, full) => {
                            return full.status === "completed" ? (
                              <Tooltip title="VIEWS">
                                <NavLink
                                  to={"/eha/vulnerability"}
                                  state={{
                                    id: id,
                                    label: data.data.name,
                                    title: `10 // eha // vulnerability`,
                                    eha: true,
                                  }}
                                  className="flex items-center justify-center gap-4 w-full "
                                >
                                  <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M16 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V16C0 16.5304 0.210714 17.0391 0.585786 17.4142C0.960859 17.7893 1.46957 18 2 18H16C17.1 18 18 17.1 18 16V2C18 1.46957 17.7893 0.960859 17.4142 0.585786C17.0391 0.210714 16.5304 0 16 0ZM16 16H2V4H16V16ZM9 7.5C10.84 7.5 12.48 8.46 13.34 10C12.48 11.54 10.84 12.5 9 12.5C7.16 12.5 5.52 11.54 4.66 10C5.52 8.46 7.16 7.5 9 7.5ZM9 6C6.27 6 3.94 7.66 3 10C3.94 12.34 6.27 14 9 14C11.73 14 14.06 12.34 15 10C14.06 7.66 11.73 6 9 6ZM9 11.5C8.17 11.5 7.5 10.83 7.5 10C7.5 9.17 8.17 8.5 9 8.5C9.83 8.5 10.5 9.17 10.5 10C10.5 10.83 9.83 11.5 9 11.5Z"
                                      fill="#00D8FF"
                                    />
                                  </svg>
                                </NavLink>
                              </Tooltip>
                            ) : (
                              "-"
                            );
                          },
                        },
                        {
                          title: "EDIT",
                          rowClass: "w-[100px] text-center",
                          columnClass: "w-[100px]  text-center",
                          key: "id",
                          html: (id) => {
                            return (
                              <Tooltip title="EDIT">
                                <button
                                  className="flex items-center justify-center gap-4 w-full "
                                  onClick={() => {
                                    setStatus((d) => ({
                                      ...d,
                                      ADDTASK: true,
                                      IDSCAN: id,
                                      reScan: false,
                                    }));
                                  }}
                                >
                                  <EditOutlined></EditOutlined>
                                </button>
                              </Tooltip>
                            );
                          },
                        },
                        {
                          title: "DELETE",
                          rowClass: "w-[100px] text-center",
                          columnClass: "w-[100px]  text-center",
                          key: "id",
                          html: (id, fullData) => {
                            return (
                              <Tooltip title="DELETE">
                                <Popconfirm
                                  title="are you sure to delete this scan ?"
                                  onConfirm={() => {
                                    let data = {
                                      id: id,
                                      name: fullData.created_by,
                                      site_name: fullData.name,
                                    };
                                    let success = () => {
                                      setTimeout(() => {
                                        setstatus((d) => !d);
                                      }, 500);
                                    };
                                    DELETE_API.deleteScanAssets(
                                      data,
                                      API.data.scan.refetch,
                                      success
                                    );
                                  }}
                                  placement="left"
                                  okText={"DELETE"}
                                >
                                  <button className="flex items-center justify-center gap-4 w-full ">
                                    <DeleteOutlined></DeleteOutlined>
                                  </button>
                                </Popconfirm>
                              </Tooltip>
                            );
                          },
                        },
                      ]}
                      Loading={statusItem}
                      data={data.data.sub_scans}
                    ></TableInline>
                  </div>
                );
              }}
              classSubHtml={"min-h-[500px] max-h-[600px] overflow-auto "}
              checkFunction={(d) => {
                setCheckItem(d);
              }}
              data={
                API.data?.scan?.result?.map((d) => ({
                  ...d.tool_scanner,
                  ...d.asset,
                  ...d,
                })) || null
              }
            ></TableInline>
          )}
        </CardBox>
      </div>
      <AddModal></AddModal>
    </LayoutDashboard>
  );
};

export default ListTask;
