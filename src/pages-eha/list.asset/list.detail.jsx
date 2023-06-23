import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { GET_API_EHA, path } from "../../api/eha/GET";
import { ButtonComponents } from "../../components.eha/button";
import { CardBox } from "../../components/layout/card";
import { TitleContent } from "../../components/layout/title";
import { TableInline } from "../../components/table";
import { GetAndUpdateContext } from "../../model/context.function";
import { ErrorHtml, Loading } from "../list.maintenance";
import { DELETE_API } from "../../api/eha/DELETE";
import { Popconfirm } from "antd";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { convertZip } from "../../helper/converZip";
import { ModalSuccess } from "../../components.eha/modal";
import { switchColor } from "../../helper/switch-color";

export const ListDetail = () => {
  const { setStatus } = GetAndUpdateContext();

  const [checkAssets, setCheck] = useState([]);
  const [loading, setLoading] = useState({
    assset: false,
    comparison: false,
  });

  const API = GET_API_EHA.root([
    {
      active: "assetsList",
    },
    {
      active: "getAssetsPDF",
    },
  ]);


  return (
    <div className="col-span-full flex-1 flex flex-col pb-10">
      <CardBox className="!p-0">
        <div className="p-8 flex items-center gap-10 border-b border-primary">
          <div>ASSET LIST</div>
          <div className="space-x-4 flex">
            <ButtonComponents
              click={() => {
                setStatus((d) => ({
                  ...d,
                  ADDASSET: !d.ADDASSET,
                  idAssets: null,
                }));
              }}
            >
              [ + ] ADD
            </ButtonComponents>
            <ButtonComponents
              className="flex gap-3"
              nonSubmit
              click={() => {
                if (!loading.assset) {
                  if (checkAssets && checkAssets.length > 0) {
                    let data = checkAssets.map((d) => ({
                      name: `${d.name}.pdf`,
                      url: `${path}/api/assets/export/${d.id}`,
                    }));
                    setLoading((d) => ({
                      ...d,
                      assset: true,
                    }));
                    convertZip("assets-eha-pdf", checkAssets, data, setLoading);
                  } else {
                    ModalSuccess({
                      title: "Please Select you assets",
                      type: "info",
                    });
                  }
                }
              }}
            >
              {loading.assset && <LoadingOutlined></LoadingOutlined>}
              EXPORT PDF
            </ButtonComponents>
            <ButtonComponents
              className="flex gap-3"
              nonSubmit
              click={() => {
                if (!loading.comparison) {
                  if (checkAssets && checkAssets.length > 0) {
                    let data = checkAssets.map((d) => ({
                      name: `${d.name}.pdf`,
                      url: `${path}/api/assets/export-comparison/${d.id}`,
                    }));
                    setLoading(d => ({
                      ...d,
                      comparison: true,
                    }));
                    convertZip("assets-eha-comparison-pdf", checkAssets, data, setLoading);
                  } else {
                    ModalSuccess({
                      title: "Please Select you assets",
                      type: "info",
                    });
                  }
                }
              }}
            >
              {loading.comparison && <LoadingOutlined></LoadingOutlined>}
              EXPORT PDF Comparison
            </ButtonComponents>

            <NavLink
              to={"/eha/assets/net-discovery"}
              state={{
                title: `09 // eha // assets // net dicovery`,
                eha: true,
              }}
            >
              <ButtonComponents>NET DISCOVERY</ButtonComponents>
            </NavLink>
          </div>
        </div>
      </CardBox>
      <CardBox className="flex-1">
        <TitleContent>
          <div className="text-[24px] uppercase text-blue">
            ASSETS LIST DATA
          </div>
        </TitleContent>
        {API.msg || API.error ? (
          <ErrorHtml error={API.msg}></ErrorHtml>
        ) : (
          <TableInline
            Loading={API.loading || API.isFetching}
            isload
            border
            hoverDisable
            columns={[
              {
                title: "ID",
                key: "id",
                rowClass: "w-[50px]",
                columnClass: "w-[50px]",
              },
              {
                title: "ASSET NAME",
                key: "name",
              },
              {
                title: "PROTECTED SITE",
                key: "site_name",
              },
              {
                title: "IP/DOMAIN",
                rowClass: "w-[300px]",
                key: "url_ip",
              },
              {
                title: "LAST SCAN",
                key: "latest_scan",
                rowClass: "w-[200px]",
                columnClass: "w-[200px]",
              },

              {
                title: "target RISK",
                key: "asset_risk_group",
                rowClass: "w-[100]",
                columnClass: "w-[100]",
                html: (data) => {
                  return switchColor(data?.risk_level)
                }
              },
              {
                title: "LOW",
                rowClass: "w-[80px] text-center",
                columnClass: "w-[80px] text-center",
                key: "low",
                html: (d) => {
                  return <span className="text-blue">{d ? d : 0}</span>
                },
              },
              {
                title: "MEDIUM",
                rowClass: "w-[80px] text-center",
                columnClass: "text-center w-[80px]",
                key: "medium",
                html: (d) => {
                  return <span className="text-yellow-500">{d ? d : 0}</span>
                },
              },
              {
                title: "HIGH",
                rowClass: "w-[80px] text-center",
                columnClass: "text-center w-[80px]",
                key: "high",
                html: (d) => {
                  return  <span className="text-red-400">{d ? d : 0}</span>
                },
              },
              {
                title: "CRIT",
                rowClass: "w-[80px] text-center",
                columnClass: "text-center w-[80px]",
                key: "critical",
                html: (d) => {
                  return  <span className="text-red-600">{d ? d : 0}</span>
                },
              },

              {
                title: "EDIT",
                key: "id",
                rowClass: "w-[50px] text-center",
                columnClass: "text-center w-[50px] ",
                html: (id) => {
                  return (
                    <button
                      className="flex items-center justify-center gap-4 w-full "
                      onClick={() => {
                        setStatus((d) => ({
                          ...d,
                          ADDASSET: !d.ADDASSET,
                          idAssets: id,
                        }));
                      }}
                    >
                      <EditOutlined></EditOutlined>
                    </button>
                  );
                },
              },
              {
                title: "DELETE",
                key: "id",
                rowClass: "w-[50px] text-center",
                columnClass: "text-center w-[100px] ",
                html: (__, data) => {
                  return (
                    <Popconfirm
                      title="Are you sure to delete this asset?"
                      okText="Deleted"
                      onConfirm={() => {
                        data = {
                          ...data,
                          name: data.created_by,
                        };
                        DELETE_API.deleteAssets(data, setStatus);
                      }}
                    >
                      <button className="flex items-center justify-center gap-4 w-full ">
                        <DeleteOutlined></DeleteOutlined>
                      </button>
                    </Popconfirm>
                  );
                },
              },
            ]}
            checkFunction={(id) => {
              setCheck(id);
            }}
            data={API.data.assetsList?.result?.map((d) => ({
              ...d.protected_site,
              ...d.severity_count,
              ...d,
            })) || null}
          ></TableInline>
        )}
      </CardBox>
    </div>
  );
};
