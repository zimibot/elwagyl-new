import { CardBox } from "../../components/layout/card";
import { LayoutDashboard } from "../../components/layout/dashboard.layout";
import { TitleContent } from "../../components/layout/title";
import { TableInline } from "../../components/table";
import { Form } from "../../components.eha/input";
import { ButtonComponents } from "../../components.eha/button";
import { GET_API_EHA } from "../../api/eha/GET";
import { DeleteFilled, EditFilled, LoadingOutlined } from "@ant-design/icons";
import { ErrorHtml, Loading } from "../list.maintenance";
import { GetAndUpdateContext } from "../../model/context.function";
import { useState } from "react";
import { ModalsComponent } from "../../components.eha/modal";
import { useForm } from "react-hook-form";
import { BulkEdit } from "./bulk_edit";
import { UPDATE_API } from "../../api/eha/UPDATE";
import { Popconfirm } from "antd";
import { DELETE_API } from "../../api/eha/DELETE";

const EditTask = ({ idChecked, api, setisload }) => {
  const { setStatus, status } = GetAndUpdateContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const Onsubmit = (data) => {
    const items = {
      is_complete_qc: false,
      is_false_positive: false,
      bulk_edit: false,
      ids: status.id ? [status.id] : idChecked,
      name: "BULK STATUS",
      updated_by: localStorage.getItem("user"),
    };

    switch (data.is_data) {
      case "complete":
        items.is_complete_qc = true;
        items.is_false_positive = false;
        items.bulk_edit = false;
        break;
      case "mark_false":
        items.is_false_positive = true;
        items.is_complete_qc = false;
        items.bulk_edit = false;

        break;
      case "bulk_edit":
        items.is_false_positive = false;
        items.is_complete_qc = false;
        items.bulk_edit = true;

        break;

      default:
        items.is_complete_qc = false;
        items.is_false_positive = false;
        items.bulk_edit = false;
        break;
    }

    if (items.bulk_edit) {
      setStatus((d) => ({ ...d, bulk_edit: !d.bulk_edit }));
    } else {
      UPDATE_API.updateBulkCheck(items, api.data.vulnerability.refetch);
      setisload((d) => !d);
    }
  };

  return (
    <ModalsComponent modalName={"edit_task"}>
      <form className="space-y-4" onSubmit={handleSubmit(Onsubmit)}>
        {/* {idChecked.length === 1 && <Form.radio register={register("is_data")} value="bulk_edit" text={"bulk edit finding"}></Form.radio>} */}
        <div
          className={`${idChecked.length === 1 || status.id ? "" : "hidden"}`}
        >
          <Form.radio
            error={errors.is_data}
            disabled={idChecked.length === 1 || status.id ? false : true}
            register={register("is_data", { required: true })}
            value="bulk_edit"
            text={"edit finding"}
          ></Form.radio>
        </div>
        <Form.radio
          error={errors.is_data}
          register={register("is_data", { required: true })}
          value="mark_false"
          text={"mark false positive"}
        ></Form.radio>
        <Form.radio
          error={errors.is_data}
          register={register("is_data", { required: true })}
          value="complete"
          text={"complete qc"}
        ></Form.radio>
        <div className="flex justify-end gap-4">
          <ButtonComponents
            click={() => {
              setStatus((d) => ({ ...d, edit_task: !d.edit_task, id: null }));
              reset();
            }}
            nonSubmit
            className="text-red-500"
          >
            CLOSE
          </ButtonComponents>
          <ButtonComponents>SAVE</ButtonComponents>
        </div>
      </form>
      <BulkEdit idItems={status.id ? status.id : idChecked[0]}></BulkEdit>
    </ModalsComponent>
  );
};

const ListQa = ({
  setChecked,
  queryFalse,
  setpages,
  pages,
  checked,
  name,
  Delete,
  setisload,
  isload,
  columns = [],
  ...props
}) => {
  const { setStatus } = GetAndUpdateContext();

  const API = GET_API_EHA.root([
    {
      active: "vulnerability",
      query: `is_false_positive=${queryFalse}&is_complete_qc=false`,
      pages,
    },
  ]);

  var find = "Nessus";
  var regex = new RegExp(find, "g");

  return (
    <>
      {API.msg || API.error ? (
        <ErrorHtml error={API.msg}></ErrorHtml>
      ) : API.loading ? (
        <Loading></Loading>
      ) : (
        <TableInline
          onChange={(s) => {
            setpages(s);
          }}
          paggination
          Loading={API.isFetching || isload}
          totalPages={API.data.vulnerability.pagination.total_results}
          pageSize={15}
          currentPage={pages}
          border
          hoverDisable
          columns={[
            {
              title: "EDIT",
              key: "id",
              rowClass: "w-[50px]",
              columnClass: "w-[50px]",
              html: (id, data) => {
                return !data.checked ? (
                  <button
                    onClick={() =>
                      setStatus((d) => ({
                        ...d,
                        edit_task: !d.edit_task,
                        id: id,
                      }))
                    }
                  >
                    <EditFilled></EditFilled>
                  </button>
                ) : (
                  "-"
                );
              },
            },
            {
              title: "FINDING NAME",
              key: "finding_name",
              html: (data) => {
                return data?.replace(regex, "E.H.A Engine")
              }
            },
            {
              title: "TARGET",
              rowClass: "w-[120px]",
              columnClass: "w-[120px]",
              key: "addresses",
            },
            {
              title: "risk level",
              key: "risk_level",
              rowClass: "w-[100px]",
              columnClass: "w-[100px]",
            },
            {
              title: "status",
              key: "is_false_positive",
              rowClass: "w-[150px]",
              columnClass: "w-[150px]",
              html: (d, full) => {
                return d ? (
                  <div className="text-red-400">False Positive</div>
                ) : full.is_complete_qc ? (
                  "COMPLETE"
                ) : (
                  "-"
                );
              },
            },
          ]}
          data={API.data.vulnerability.result}
          {...props}
        />
      )}
      {checked && (
        <EditTask
          setisload={setisload}
          idChecked={checked.map((d) => d.id)}
          api={API}
        ></EditTask>
      )}
    </>
  );
};

const onDelete = (id, data, API) => {
  data = {
    id,
    site_name: data.finding_name,
  };

  DELETE_API.deleteVulnerabilities(data, API.data.vulnerability.refetch);
};

const TaskQA = () => {
  const { setStatus } = GetAndUpdateContext();
  const [checked, setChecked] = useState([]);
  const [pages, setpages] = useState(1);
  const [pages2, setpages2] = useState(1);
  const [isload, setisload] = useState(1);

  return (
    <LayoutDashboard className="bg-[#101C26] text-[16px]">
      <CardBox className="flex-1 col-span-full pb-14">
        <TitleContent subTitle={false}>
          <div className="text-[24px] uppercase text-blue">quality control</div>
        </TitleContent>
        <div className="flex gap-10 border-t border-primary pt-4">
          {/* <Form.input rowColumn type="date" label={"start date"}></Form.input>
                <Form.input rowColumn type="date" label={"end date"}></Form.input>
                <div className="flex items-center">
                    <ButtonComponents>
                        apply
                    </ButtonComponents>
                </div> */}
        </div>
        <div className="grid grid-cols-2 flex-1 pb-10">
          <div className="space-y-5 h-full relative flex-1 flex flex-col border-r pr-4 border-primary">
            <TitleContent subTitle={false}>
              <div className="flex justify-between items-center w-full">
                <div className="text-[24px] uppercase text-blue">
                  Finding risk level
                </div>
                {checked.length > 0 && (
                  <div>
                    <ButtonComponents
                      click={() => {
                        setStatus((d) => ({
                          ...d,
                          edit_task: !d.edit_task,
                          id: null,
                        }));
                      }}
                    >
                      EDIT
                    </ButtonComponents>
                  </div>
                )}
              </div>
            </TitleContent>
            <ListQa
              name="vul1"
              pages={pages2}
              checked={checked}
              setpages={setpages2}
              setChecked={setChecked}
              checkFunction={setChecked}
            ></ListQa>
          </div>
          <div className="space-y-5 h-full relative flex-1 flex flex-col border-r pr-4 border-primary">
            <TitleContent subTitle={false}>
              <div className="flex justify-between items-center w-full">
                <div className="text-[24px] uppercase text-blue">
                  Finding False Positive{" "}
                </div>
              </div>
            </TitleContent>
            <ListQa
              name="vul2"
              Delete
              pages={pages}
              setpages={setpages}
              queryFalse={true}
              isload={isload}
              setisload={setisload}
            ></ListQa>
          </div>
        </div>
      </CardBox>
    </LayoutDashboard>
  );
};

export default TaskQA;
