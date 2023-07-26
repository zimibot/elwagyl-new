import { CardBox } from "../../components/layout/card";
import { LayoutDashboard } from "../../components/layout/dashboard.layout";
import { TitleContent } from "../../components/layout/title";
import { TableInline } from "../../components/table";
import { Form } from "../../components.eha/input";
import { ButtonComponents } from "../../components.eha/button";
import { GET_API_EHA } from "../../api/eha/GET";
import { EditFilled } from "@ant-design/icons";
import { ErrorHtml, Loading } from "../list.maintenance";
import { GetAndUpdateContext } from "../../model/context.function";
import { useState } from "react";
import { ModalsComponent } from "../../components.eha/modal";
import { useForm } from "react-hook-form";
import { UPDATE_API } from "../../api/eha/UPDATE";
import { BulkEdit } from "./bulk_edit"
import { Badge } from "antd";

const EditTask = ({ idChecked, api, setIsLoad }) => {
  const { setStatus, status } = GetAndUpdateContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
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
        break;
      case "mark_false":
        items.is_false_positive = true;
        break;
      case "bulk_edit":
        items.bulk_edit = true;
        break;
      default:
        break;
    }

    if (items.bulk_edit) {
      setStatus((prevStatus) => ({ ...prevStatus, bulk_edit: !prevStatus.bulk_edit }));
    } else {
      UPDATE_API.updateBulkCheck(items, api.data.vulnerability.refetch);
      setIsLoad((prevIsLoad) => !prevIsLoad);
    }
  };

  return (
    <ModalsComponent modalName="edit_task">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* <div className={`${idChecked.length === 1 || status.id ? "" : "hidden"}`}>
          <Form.radio
            error={errors.is_data}
            disabled={idChecked.length === 1 || status.id ? false : true}
            register={register("is_data", { required: true })}
            value="bulk_edit"
            text="edit finding"
          ></Form.radio>
        </div> */}
        <Form.radio
          error={errors.is_data}
          register={register("is_data", { required: true })}
          value="mark_false"
          text="mark false positive"
        ></Form.radio>
        <Form.radio
          error={errors.is_data}
          register={register("is_data", { required: true })}
          value="complete"
          text="complete qc"
        ></Form.radio>
        <div className="flex justify-end gap-4">
          <ButtonComponents
            click={() => {
              setStatus((prevStatus) => ({ ...prevStatus, edit_task: !prevStatus.edit_task, id: null }));
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
  setPages,
  pages,
  checked,
  name,
  Delete,
  setIsLoad,
  isLoad,
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

  const find = "Nessus";
  const regex = new RegExp(find, "g");

  return (
    <>
      {API.msg || API.error ? (
        <ErrorHtml error={API.msg}></ErrorHtml>
      ) : API.loading ? (
        <Loading></Loading>
      ) : (
        <TableInline
          onChange={(s) => {
            setPages(s);
          }}
          pagination
          Loading={API.isFetching || isLoad}
          totalPages={API.data.vulnerability.pagination.total_results}
          pageSize={15}
          paggination
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
                      setStatus((prevStatus) => ({
                        ...prevStatus,
                        edit_task: !prevStatus.edit_task,
                        id,
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
                return data?.replace(regex, "E.H.A Engine");
              },
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
              html: (isFalsePositive, full) => {
                return isFalsePositive ? (
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
          setIsLoad={setIsLoad}
          idChecked={checked.map((d) => d.id)}
          api={API}
        ></EditTask>
      )}
    </>
  );
};

const TaskQA = () => {
  const { setStatus } = GetAndUpdateContext();
  const [checked, setChecked] = useState([]);
  const [pages2, setPages2] = useState(1);

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
        <div className="grid grid-cols-1 flex-1 pb-10">
          <div className="space-y-5 h-full relative flex-1 flex flex-col border-r pr-4 border-primary">
            <TitleContent subTitle={false}>
              <div className="flex justify-between items-center w-full">
                <div className="text-[24px] uppercase text-blue">
                  Finding risk level
                </div>
                <div className="py-2">
                  <Badge className="text-blue" color="#222"  count={checked.length}>
                    <ButtonComponents
                      disabled={checked.length > 0 ? false : true}
                      click={() => {
                        setStatus((prevStatus) => ({
                          ...prevStatus,
                          edit_task: !prevStatus.edit_task,
                          id: null,
                        }));
                      }}
                    >
                      EDIT CHECKED
                    </ButtonComponents>
                  </Badge>
                </div>
              </div>
            </TitleContent>
            <ListQa
              name="vul1"
              pages={pages2}
              checked={checked}
              setPages={setPages2}
              setChecked={setChecked}
              checkFunction={setChecked}
            ></ListQa>
          </div>
          {/* <div className="space-y-5 h-full relative flex-1 flex flex-col border-r pr-4 border-primary">
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
              setPages={setPages}
              queryFalse={true}
              isLoad={isLoad}
              setIsLoad={setIsLoad}
            ></ListQa>
          </div> */}
        </div>
      </CardBox>
    </LayoutDashboard>
  );
};

export default TaskQA;
