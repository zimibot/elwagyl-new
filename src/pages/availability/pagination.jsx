import { CaretLeftFilled, CaretRightFilled, PauseOutlined, StepForwardFilled } from "@ant-design/icons"
import { useEffect } from "react"
import { GetAndUpdateContext } from "../../model/context.function"

export const Pagination = ({ data }) => {
    const { setvalue, value } = GetAndUpdateContext()
    let getTotalPages = window.localStorage.getItem("totalPages")
    let totalArr = new Array(parseInt(getTotalPages ? getTotalPages : 0)).fill()
    const onNext = () => {
        if (data.data) {
            let totalPages = data.data.pagination.total_page


            setvalue(d => ({
                ...d,
                SENSOR: {
                    ...d.SENSOR,
                    PAGE: d.SENSOR?.PAGE ? totalPages !== d.SENSOR.PAGE ? d.SENSOR.PAGE + 1 : 1 : 1,
                }
            }))
        }

    }
    const onPause = () => {
        setvalue(d => ({
            ...d,
            SENSOR: {
                ...d.SENSOR,
                PAUSE: !d.SENSOR?.PAUSE,
            }
        }))
    }
    const onPrev = () => {
        setvalue(d => ({
            ...d,
            SENSOR: {
                ...d.SENSOR,
                PAGE: d.SENSOR?.PAGE ? d.SENSOR.PAGE === 1 ? 1 : d.SENSOR.PAGE - 1 : 1,
            }
        }))
    }

    useEffect(() => {
        if (data.data) {
            window.localStorage.setItem("totalPages", data.data.pagination.total_page)
        }
        let int = setInterval(() => {
            onNext()
        }, 15000);


        if (value.SENSOR) {
            if (value.SENSOR.PAUSE) {
                clearInterval(int)
            } else {
                int
            }

        }




        return () => {
            clearInterval(int)
        }
    }, [value.SENSOR, data.data])


    return <div className="flex items-center gap-4">
        <div className="flex gap-2">
            {getTotalPages && totalArr.map((d, k) => {
                return <button key={k} className={`w-5 h-5 bg-blue  ${value.SENSOR ? value.SENSOR.PAGE === (k + 1) ? "" : "bg-opacity-50" : "bg-opacity-50"} `}></button>
            })}
            {/* <button className="w-5 h-5 bg-blue"></button>
            <button className="w-5 h-5 bg-blue bg-opacity-50 hover:bg-opacity-100"></button>
            <button className="w-5 h-5 bg-blue bg-opacity-50 hover:bg-opacity-100"></button>
            <button className="w-5 h-5 bg-blue bg-opacity-50 hover:bg-opacity-100"></button>
            <button className="w-5 h-5 bg-blue bg-opacity-50 hover:bg-opacity-100"></button>
            <button className="w-5 h-5 bg-blue bg-opacity-50 hover:bg-opacity-100"></button>
            <button className="w-5 h-5 bg-blue bg-opacity-50 hover:bg-opacity-100"></button>
            <button className="w-5 h-5 bg-blue bg-opacity-50 hover:bg-opacity-100"></button>
            <button className="w-5 h-5 bg-blue bg-opacity-50 hover:bg-opacity-100"></button> */}
        </div>
        <div className="flex gap-2">
            <button className="p-2 bg-primary" onClick={onPrev}>
                <CaretLeftFilled />
            </button>
            <button className="p-2 bg-primary" onClick={onPause}>
                {value.SENSOR && value.SENSOR.PAUSE ? <StepForwardFilled /> : <PauseOutlined />}

            </button>
            <button className="p-2 bg-primary" onClick={onNext}>
                <CaretRightFilled />
            </button>
        </div>
    </div>
}