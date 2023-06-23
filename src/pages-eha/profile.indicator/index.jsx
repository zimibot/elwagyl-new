import { DeleteOutlined, EditFilled } from "@ant-design/icons"
import { Popconfirm, Tooltip } from "antd"
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
import { Loading } from "../list.maintenance"
import { TitleContent } from "../../components/layout/title"
import { UPDATE_API } from "../../api/eha/UPDATE"
import { DELETE_API } from "../../api/eha/DELETE"
import { switchColor } from "../../helper/switch-color"

const ProfileIndicator = () => {
    const { setStatus, status } = GetAndUpdateContext()
    const api = GET_API_EHA.root([
        {
            active: "assetRiskGroup"
        },
        {
            active: "getAssetsRiskGroupDetail"
        },
    ])

    const [riskLevel, setRiskLevel] = useState([
        {
            label: "low",
            value: null
        },
        {
            label: "medium",
            value: null
        },
        {
            label: "high",
            value: null
        },
    ])
    const [show, setshow] = useState(false)
    const { reset, handleSubmit, control, watch, setValue, formState: { errors } } = useForm()

    let item = watch()

    // useEffect(() => {
    //     if (!isEmpty(errors)) {
    //         ModalSuccess({ type: "error", onlyShowOk: true, title: "Please  completing all the inputs ." })
    //     }
    // }, [errors])


    const onSubmit = (a) => {
        setStatus(d => ({
            ...d,
            stateData: a,
            resetForm: reset,
            SAVEMODAL: !d["SAVEMODAL"]
        }))
    }


    return <LayoutDashboard>
        <CardAnimation className="grid grid-cols-5 col-span-full text-[16px] bg-[#101C26] gap-6">
            <div className={`${show ? "col-span-2" : " col-span-full"} flex flex-col border-r border-primary py-4`}>
                <CardBox className={"flex-1 pb-9"}>
                    <TitleContent subTitle={false}>
                        <div className="flex items-center justify-between w-full">
                            <div>
                                ASSET GROUP
                            </div>
                            <ButtonComponents click={() => {
                                setshow(true)
                                setStatus(d => ({
                                    ...d,
                                    dataSave: null
                                }))
                                reset()
                                if (status.resetData) {
                                    status.resetData()
                                }
                            }}>[ + ] ADD PROFILE</ButtonComponents>
                        </div>
                    </TitleContent>
                    {api.error ? "" : api.loading ? <Loading></Loading> : <TableInline
                        border
                        hoverDisable
                        Loading={api.isFetching}
                        columns={
                            [
                                {
                                    title: 'EDIT',
                                    key: 'id',
                                    rowClass: 'w-[50px] text-center',
                                    columnClass: "w-[50px] text-center",
                                    html: (id) => {

                                        // Iterate over the keys in data2

                                        return <button onClick={async () => {
                                            setshow(true)
                                            let data1 = [];

                                            let data = await api.getAssetsRiskGroupDetail({ idAssets: id })
                                            let result = data.items.result
                                            let data2 = result.remediation_deadline_adjustment_configs

                                            for (let key in data2) {
                                                // Create a new object with label and value properties
                                                let obj = {
                                                    label: key,
                                                    value: data2[key]
                                                };

                                                // Push the object into the data1 array
                                                data1.push(obj);
                                            }

                                            setRiskLevel(data1)

                                            setStatus(d => ({
                                                ...d,
                                                dataSave: result
                                            }))
                                            for (const key in result) {
                                                setValue(key, result[key])
                                            }

                                        }}>
                                            <EditFilled></EditFilled>
                                        </button>
                                    }
                                },
                                {
                                    title: 'DELETE',
                                    key: 'id',
                                    rowClass: 'w-[80px] text-center',
                                    columnClass: "w-[80px] text-center",
                                    html: (id, full) => {
                                        return <Popconfirm onConfirm={() => {
                                            let data = {
                                                id: id,
                                                site_name: full.name
                                            }
                                            DELETE_API.deleteAssetsGroup(data, api.data.assetRiskGroup.refetch)
                                        }} placement="right" title="Do you wish to delete this data?">
                                            <button>
                                                <DeleteOutlined></DeleteOutlined>
                                            </button>
                                        </Popconfirm>
                                    }
                                },
                                {
                                    title: 'NAME',
                                    key: 'name',
                                    rowClass: 'w-[230px]',
                                    columnClass: "w-[230px]",
                                },
                                {
                                    title: 'DESCRIPTION',
                                    key: 'description',
                                    html: (d) => {
                                        return d ? d : "-"
                                    }
                                },
                                {
                                    title: 'RISK',
                                    key: 'risk_level',
                                    rowClass: 'w-[100px] text-center',
                                    columnClass: "w-[100px] text-center",
                                    html : (data) => {
                                        

                                        return switchColor(data)
                                    }
                                },

                            ]
                        }
                        data={
                            api.data.assetRiskGroup.result
                        
                        }
                        style={{
                            row: {
                                fontSize: "16px"
                            },
                            columns: {
                                fontSize: "16px"
                            }
                        }}></TableInline>}

                </CardBox>
            </div>

            {show && <form onSubmit={handleSubmit(onSubmit)} className="border-l col-span-3 border-primary">
                <CardBox className={" mx-[-13px]"}>
                    <div>

                        <div className="space-y-6 px-4 py-4 border-b border-primary">
                            <div className="font-bold text-lg">{!status.dataSave ? "ADD RISK PROFILE" : `EDIT RISK PROFILE - ${item.name}`}</div>
                            <div >
                                <b>REMEDIATION DEADLINE ADJUSTMENT</b>
                            </div>
                        </div>

                        <div className="px-4 py-6 border-b border-primary">
                            <div className="grid grid-cols-3 gap-8">
                                {riskLevel.map((d, k) => {
                                    return <div key={`z${k}`} className="grid grid-cols-2 items-center uppercase">
                                        <div>
                                            {d.label} ASSET GROUP
                                            <br></br>
                                            RISK SCORE
                                        </div>
                                        <div className="space-y-2">
                                            <p>RISK LEVEL</p>
                                            <div>
                                                <InputNumbers error={errors.remediation_deadline_adjustment_configs && errors.remediation_deadline_adjustment_configs[d.label]} control={control} name={`remediation_deadline_adjustment_configs.${d.label}`} onChangeData={(c) => {

                                                    const index = riskLevel.findIndex((item) => item.label === d.label);
                                                    // resetField(`low_vulnerability_risk_level_configs.${d.label}`)
                                                    // resetField(`medium_vulnerability_risk_level_configs.${d.label}`)
                                                    // resetField(`high_vulnerability_risk_level_configs.${d.label}`)
                                                    // resetField(`critical_vulnerability_risk_level_configs.${d.label}`)
                                                    if (index !== -1) {
                                                        const updatedRiskLevel = [...riskLevel];
                                                        updatedRiskLevel[index] = { ...updatedRiskLevel[index], value: c };
                                                        setRiskLevel(updatedRiskLevel);
                                                    }

                                                }}></InputNumbers>
                                            </div>
                                        </div>
                                    </div>
                                })}

                            </div>
                        </div>

                        
                        <div className="px-4 py-6 border-b border-primary">
                            <b>LOW VULNERABILITY RISK LEVEL</b>
                        </div>
                        <div className="px-4 py-6 border-b border-primary">
                            <div className="grid grid-cols-3 gap-8">
                                {riskLevel.map((d, k) => {
                                    return <div key={`s${k}`} className="grid grid-cols-2 items-center uppercase">
                                        <div>
                                            {d.label} ASSET GROUP
                                            <br></br>
                                            RISK SCORE
                                        </div>
                                        <div className="space-y-2">
                                            <p>RISK LEVEL</p>
                                            <div>
                                                <SelectComponent error={errors.low_vulnerability_risk_level_configs && errors.low_vulnerability_risk_level_configs[d.label]} data={riskLevel} control={control} name={`low_vulnerability_risk_level_configs.${d.label}`} width={"100%"}></SelectComponent>
                                            </div>
                                        </div>
                                    </div>

                                })}

                            </div>
                        </div>
                        <div className="px-4 py-6 border-b border-primary">
                            <b>MEDIUM VULNERABILITY RISK LEVEL</b>
                        </div>
                        <div className="px-4 py-6 border-b border-primary">
                            <div className="grid grid-cols-3 gap-8">
                                {riskLevel.map((d, k) => {
                                    return <div key={`a${k}`} className="grid grid-cols-2 items-center uppercase">
                                        <div>
                                            {d.label} ASSET GROUP
                                            <br></br>
                                            RISK SCORE
                                        </div>
                                        <div className="space-y-2">
                                            <p>RISK LEVEL</p>
                                            <div>
                                                <SelectComponent error={errors.medium_vulnerability_risk_level_configs && errors.medium_vulnerability_risk_level_configs[d.label]} data={riskLevel} control={control} name={`medium_vulnerability_risk_level_configs.${d.label}`} width={"100%"}></SelectComponent>
                                            </div>
                                        </div>
                                    </div>

                                })}
                            </div>
                        </div>
                        <div className="px-4 py-6 border-b border-primary">
                            <b>HIGH VULNERABILITY RISK LEVEL</b>
                        </div>
                        <div className="px-4 py-6 border-b border-primary">
                            <div className="grid grid-cols-3 gap-8">
                                {riskLevel.map((d, k) => {
                                    return <div key={`e${k}`} className="grid grid-cols-2 items-center uppercase">
                                        <div>
                                            {d.label} ASSET GROUP
                                            <br></br>
                                            RISK SCORE
                                        </div>
                                        <div className="space-y-2">
                                            <p>RISK LEVEL</p>
                                            <div>
                                                <SelectComponent error={errors.high_vulnerability_risk_level_configs && errors.high_vulnerability_risk_level_configs[d.label]} data={riskLevel} control={control} name={`high_vulnerability_risk_level_configs.${d.label}`} width={"100%"}></SelectComponent>
                                            </div>
                                        </div>
                                    </div>

                                })}
                            </div>
                        </div>
                        <div className="px-4 py-6 border-b border-primary">
                            <b>CRITICAL VULNERABILITY RISK LEVEL</b>
                        </div>
                        <div className="px-4 py-6 border-b border-primary">
                            <div className="grid grid-cols-3 gap-8">
                                {riskLevel.map((d, k) => {
                                    return <div key={`t${k}`} className="grid grid-cols-2 items-center uppercase">
                                        <div>
                                            {d.label} ASSET GROUP
                                            <br></br>
                                            RISK SCORE
                                        </div>
                                        <div className="space-y-2">
                                            <p>RISK LEVEL</p>
                                            <div>
                                                <SelectComponent error={errors.critical_vulnerability_risk_level_configs && errors.critical_vulnerability_risk_level_configs[d.label]} data={riskLevel} control={control} name={`critical_vulnerability_risk_level_configs.${d.label}`} width={"100%"}></SelectComponent>
                                            </div>
                                        </div>
                                    </div>

                                })}
                            </div>
                        </div>

                        <div className="flex justify-end p-4 gap-4">
                            <div className="bg-primary w-[150px] py-6 text-center text-red-500 cursor-pointer" onClick={() => {
                                setshow(false)
                                reset()
                                if (status.resetData) {
                                    status.resetData()
                                }
                            }}>CANCEL</div>
                            <button className="bg-primary w-[150px] py-6">SAVE</button>
                        </div>
                    </div>
                </CardBox>
            </form>}
        </CardAnimation>
        <ModalAssetsGroup refresh={api.data.assetRiskGroup}></ModalAssetsGroup>
    </LayoutDashboard>
}

export default ProfileIndicator

const ModalAssetsGroup = ({ refresh }) => {
    const { status, setStatus } = GetAndUpdateContext()
    const { register, control, reset, setValue, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            risk_level: 0
        }
    })

    useEffect(() => {

        if (status.dataSave) {
            let data = status.dataSave
            for (const key in data) {
                if (key === "risk_level") {
                    setValue(key, data[key] === "low" ? 0 : data[key] === "medium" ? 50 : 100)
                } else {
                    setValue(key, data[key])
                }
            }
            setStatus(d => ({
                ...d,
                resetData: reset
            }))
        }

    }, [status.dataSave])

    const onSubmit = (d) => {
        d = {
            ...status.stateData,
            ...d,
            created_by: localStorage.getItem("user"),
            risk_level: d.risk_level === 0 ? "low" : d.risk_level === 50 ? "medium" : "high",
            updated_by: localStorage.getItem("user")
        }


        const success = () => {
            status.resetForm()

        }
        if (status.dataSave) {
            let id = status.dataSave.id
            UPDATE_API.updateRiskGroup(id, d, refresh.refetch)
        } else {
            POST_API.addRiskGroup(d, reset, refresh.refetch, success)
        }


    }
    return (
        <ModalsComponent title={"ASSET RISK GROUP"} modalName={"SAVEMODAL"}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Form.input error={errors.name} register={register("name", { required: true })} label={"Assets risk group name"} />
                <Form.texarea register={register("description")} label={"Description"} />
                <div className="px-4 py-2">
                    <Form.slider name={"risk_level"} control={control}></Form.slider>
                </div>
                <div className="flex justify-end">
                    <ButtonComponents className="h-[45px]">SAVE</ButtonComponents>
                </div>
            </form>
        </ModalsComponent>
    )
}