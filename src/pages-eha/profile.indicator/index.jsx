import { CloseOutlined, DeleteOutlined, EditFilled, InfoCircleOutlined } from "@ant-design/icons"
import { Empty, Popconfirm, Popover, Result, Tooltip } from "antd"
import { InputNumbers } from "../../components.eha/input.number"
import { ModalSuccess, ModalsComponent } from "../../components.eha/modal"
import { SelectComponent } from "../../components.eha/select"
import { CardAnimation, CardBox } from "../../components/layout/card"
import { LayoutDashboard } from "../../components/layout/dashboard.layout"
import { TableInline } from "../../components/table"
import { GetAndUpdateContext } from "../../model/context.function"
import { GET_API_EHA } from "../../api/eha/GET"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { Form } from "../../components.eha/input"
import { ButtonComponents } from "../../components.eha/button"
import { POST_API } from "../../api/eha/POST"
import { ErrorHtml, Loading } from "../list.maintenance"
import { TitleContent } from "../../components/layout/title"
import { UPDATE_API } from "../../api/eha/UPDATE"
import { DELETE_API } from "../../api/eha/DELETE"
import { switchColor } from "../../helper/switch-color"

const ProfileIndicator = () => {
    const {
        reset,
        handleSubmit,
        register,
        control,
        watch,
        setValue,
        resetField,
        formState: { errors }
    } = useForm({
        defaultValues: {
            remediation_deadline_adjustment_configs: {
                low: 121,
                medium: 61,
                high: 31,
                critical: 1
            }
        }
    });

    const api = GET_API_EHA.root([
        {
            active: "assetRiskGroup"
        },
        {
            active: "getAssetsRiskGroupDetail"
        }
    ]);

    const [riskLevel, setRiskLevel] = useState([
        {
            id: 0,
            label: "low",
            value: 121,
            attribute: {
                min: 121,
                max: 240
            }
        },
        {
            id: 1,
            label: "medium",
            value: 61,
            attribute: {
                min: 61,
                max: 120
            }
        },
        {
            id: 2,
            label: "high",
            value: 31,
            attribute: {
                min: 31,
                max: 60
            }
        },
        {
            id: 3,
            label: "critical",
            value: 1,
            attribute: {
                min: 1,
                max: 30
            }
        }
    ]);

    riskLevel.sort((d, s) => s.attribute.min - d.attribute.min);

    const [show, setshow] = useState(false);
    const [selectRisk, setselectRisk] = useState({
        colorRails: "#152A36",
        select: null
    });

    useEffect(() => {
        if (!selectRisk.select) {
            riskLevel.map(d => {
                resetField(`${d.label}_vulnerability_risk_level_configs`)
            })
        }
    }, [selectRisk])

    const statusRisk = (risk_level) => {
        let select;

        switch (risk_level) {
            case 50:
                select = {
                    colorRails: "#00D8FF",
                    select: "low"
                };
                break;
            case 75:
                select = {
                    colorRails: "#FFBA08",
                    select: "medium"
                };
                break;
            case 100:
                select = {
                    colorRails: "#ED6A5E",
                    select: "high"
                };
                break;
            default:
                select = {
                    colorRails: "#00D8FF",
                    select: null
                };
                break;
        }

        setselectRisk(select);
    };

    useEffect(() => {
        const subscription = watch(({ risk_level }) =>
            statusRisk(risk_level)
        );

        return () => subscription.unsubscribe();
    }, [watch]);

    const onSubmit = (a) => {
        a = {
            ...a,
            created_by: localStorage.getItem("user"),
            risk_level: selectRisk.select,
            updated_by: localStorage.getItem("user")
        };

        const success = () => {
            reset();
        };

        if (a.id) {
            let id = a.id;
            UPDATE_API.updateRiskGroup(id, a, api.data.assetRiskGroup.refetch)
        } else {
            POST_API.addRiskGroup(a, reset, api.data.assetRiskGroup.refetch, success);
        }
    };

    const handleButtonClick = async (id) => {
        try {
            const data = await api.getAssetsRiskGroupDetail({ idAssets: id });
            if (data) {
                setshow(true);

                const result = data.items.result;
                const data2 = result.remediation_deadline_adjustment_configs;

                const data1 = Object.entries(data2).map(([key, value], index) => {
                    let attribute = {};

                    if (key === "low") {
                        attribute = { min: 121, max: 240 };
                    } else if (key === "medium") {
                        attribute = { min: 61, max: 120 };
                    } else if (key === "high") {
                        attribute = { min: 31, max: 60 };
                    } else {
                        attribute = { min: 1, max: 30 };
                    }

                    return {
                        id: index,
                        label: key,
                        value: value,
                        attribute: attribute
                    };
                });

                setRiskLevel(data1);

                for (const key in result) {
                    if (key === "risk_level") {
                        let count =
                            result[key] === "low"
                                ? 50
                                : result[key] === "medium"
                                    ? 75
                                    : 100;
                        setValue(key, count);
                    } else {
                        setValue(key, result[key]);
                        setValue("id", id);
                    }
                }
            }
        } catch (error) {
            alert("Error occurred while fetching data.");
            console.error(error);
        }
    };

    return (
        <LayoutDashboard>
            <CardAnimation className="grid grid-cols-5 col-span-full text-[16px] bg-[#101C26] gap-6">
                <div
                    className={`${show ? "col-span-2" : " col-span-full"
                        } flex flex-col border-r border-primary py-4`}
                >
                    <CardBox className={"flex-1 pb-9"}>
                        <TitleContent subTitle={false}>
                            <div className="flex items-center justify-between w-full">
                                <div>ASSET GROUP</div>
                                <ButtonComponents
                                    click={() => {
                                        setshow(true);
                                        reset();
                                    }}
                                >
                                    [ + ] ADD PROFILE
                                </ButtonComponents>
                            </div>
                        </TitleContent>
                        {api.error ? (
                            <ErrorHtml></ErrorHtml>
                        ) : api.loading ? (
                            <Loading />
                        ) : (
                            <TableInline
                                border
                                hoverDisable
                                Loading={api.isFetching}
                                columns={[
                                    {
                                        title: "EDIT",
                                        key: "id",
                                        rowClass: "w-[50px] text-center",
                                        columnClass: "w-[50px] text-center",
                                        html: (id) => {
                                            return (
                                                <button onClick={() => handleButtonClick(id)}>
                                                    <EditFilled />
                                                </button>
                                            );
                                        }
                                    },
                                    {
                                        title: "DELETE",
                                        key: "id",
                                        rowClass: "w-[80px] text-center",
                                        columnClass: "w-[80px] text-center",
                                        html: (id, full) => {
                                            return (
                                                <Popconfirm
                                                    onConfirm={() => {
                                                        let data = {
                                                            id: id,
                                                            site_name: full.name
                                                        };
                                                        DELETE_API.deleteAssetsGroup(
                                                            data,
                                                            api.data.assetRiskGroup.refetch
                                                        );
                                                    }}
                                                    placement="right"
                                                    title="Do you wish to delete this data?"
                                                >
                                                    <button>
                                                        <DeleteOutlined />
                                                    </button>
                                                </Popconfirm>
                                            );
                                        }
                                    },
                                    {
                                        title: "NAME",
                                        key: "name",
                                        rowClass: "w-[230px]",
                                        columnClass: "w-[230px]"
                                    },
                                    {
                                        title: "DESCRIPTION",
                                        key: "description",
                                        html: (d) => {
                                            return d ? d : "-";
                                        }
                                    },
                                    {
                                        title: "RISK",
                                        key: "risk_level",
                                        rowClass: "w-[100px] text-center",
                                        columnClass: "w-[100px] text-center",
                                        html: (data) => {
                                            return switchColor(data);
                                        }
                                    }
                                ]}
                                data={api.data.assetRiskGroup.result}
                                style={{
                                    row: {
                                        fontSize: "16px"
                                    },
                                    columns: {
                                        fontSize: "16px"
                                    }
                                }}
                            />
                        )}
                    </CardBox>
                </div>

                {show && (
                    <form onSubmit={handleSubmit(onSubmit)} className="col-span-3 flex flex-col">
                        <div className="py-4 flex flex-col gap-4 pr-4 flex-1 justify-between">
                            <div className="space-y-4">
                                <TitleContent subTitle={false}>
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center gap-4 justify-center">
                                            <Tooltip title="CLOSE">
                                                <div
                                                    className="flex items-center border border-1 border-red-500  p-2 text-red-500 font-bold cursor-pointer"
                                                    onClick={() => {
                                                        setshow(false);
                                                    }}
                                                >
                                                    <CloseOutlined />
                                                </div>
                                            </Tooltip>
                                            <span> ADD ASSET RISK GROUP</span>
                                        </div>
                                    </div>
                                </TitleContent>
                                <Form.input
                                    error={errors.name}
                                    register={register("name", { required: true })}
                                    label={"ASSET RISK GROUP NAME*"}
                                />
                                <Form.texarea register={register("description")} label={"DESCRIPTION"} />
                                <div className="uppercase text-blue">
                                    <Form.slider colorRail={selectRisk.colorRails} control={control} name={"risk_level"} />
                                </div>
                            </div>
                            {selectRisk.select ? (
                                <div className="flex flex-1 flex-col justify-around">
                                    <div>
                                        <div className="px-4 py-4 border-b border-primary uppercase">
                                            <b>{switchColor(selectRisk.select)} VULNERABILITY RISK LEVEL</b>
                                        </div>
                                        <div className="px-4 py-4 ">
                                            <div className="grid grid-cols-3 gap-8">
                                                {riskLevel.slice(0, 3).map((d, k) => {
                                                    return (
                                                        <div key={k} className="grid grid-cols-2 items-center uppercase">
                                                            <div>
                                                                {switchColor(d.label)} ASSET GROUP
                                                                <br />
                                                                RISK SCORE
                                                            </div>
                                                            <div className="space-y-2">
                                                                <p>RISK LEVEL*</p>
                                                                <div>
                                                                    <SelectComponent
                                                                        error={
                                                                            errors[`${selectRisk.select}_vulnerability_risk_level_configs`] &&
                                                                            errors[`${selectRisk.select}_vulnerability_risk_level_configs`][d.label]
                                                                        }
                                                                        data={riskLevel.map((w) => ({
                                                                            label: w.label,
                                                                            value: w.value
                                                                        }))}
                                                                        control={control}
                                                                        name={`${selectRisk.select}_vulnerability_risk_level_configs.${d.label}`}
                                                                        width={"100%"}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="py-4 flex items-center gap-3 px-4 ">
                                            <b>REMEDIATION DEADLINE ADJUSTMENT</b>
                                            <Popover
                                                title="INFORMATION"
                                                placement="right"
                                                content={
                                                    <div className="uppercase">
                                                        MAXIMUM VALUE
                                                        <div>
                                                            {riskLevel.map((d, k) => {
                                                                return (
                                                                    <div key={k}>
                                                                        {switchColor(d.label)} : {d?.attribute?.max}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                }
                                            >
                                                <InfoCircleOutlined />
                                            </Popover>
                                        </div>
                                        <div className="grid grid-cols-4 gap-4 border-t border-primary py-4 px-4">
                                            {riskLevel.map((d, k) => {
                                                return (
                                                    <div key={`z${k}`} className="grid grid-cols-2 items-center uppercase">
                                                        <div className="space-x-2">
                                                            {switchColor(d.label)}
                                                            <span>WEIGHTED</span>
                                                            <br />
                                                            RISK LEVEL
                                                        </div>
                                                        <div className="space-y-2 flex flex-col items-center ">
                                                            <div className="space-y-2">
                                                                <div className="flex gap-3 items-center">
                                                                    <InputNumbers
                                                                        {...d.attribute}
                                                                        error={errors.remediation_deadline_adjustment_configs && errors.remediation_deadline_adjustment_configs[d.label]}
                                                                        control={control}
                                                                        name={`remediation_deadline_adjustment_configs.${d.label}`}
                                                                        onChangeData={(c) => {
                                                                            const index = riskLevel.findIndex((item) => item.label === d.label);
                                                                            resetField(`${selectRisk.select}_vulnerability_risk_level_configs.${d.label}`);
                                                                            if (index !== -1) {
                                                                                const updatedRiskLevel = [...riskLevel];
                                                                                updatedRiskLevel[index] = { ...updatedRiskLevel[index], value: c };
                                                                                setRiskLevel(updatedRiskLevel);
                                                                            }
                                                                        }}
                                                                    />
                                                                    <span>DAYS</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-4">
                                        <div className="bg-primary w-[150px] py-6 text-center text-red-500 cursor-pointer" onClick={() => {
                                            setshow(false);
                                        }}>
                                            CANCEL
                                        </div>
                                        <button className="bg-primary w-[150px] py-6">SAVE</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1 flex items-center justify-center">
                                    <Empty
                                        className="flex items-center justify-center flex-col"
                                        image={<img src="/assets/no-data.png" alt="" />}
                                        description={<div className="uppercase text-xl">Please Select risk level</div>}
                                    />
                                </div>
                            )}
                        </div>
                    </form>
                )}
            </CardAnimation>
        </LayoutDashboard>
    );
};

export default ProfileIndicator;
