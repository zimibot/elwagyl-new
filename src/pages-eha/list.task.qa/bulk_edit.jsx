import { useEffect, useState } from "react"
import { GET_API_EHA } from "../../api/eha/GET"
import { ModalsComponent } from "../../components.eha/modal"
import { Form } from "../../components.eha/input"
import { isObject } from "radash"

export const BulkEdit = ({ idItems }) => {
    const API = GET_API_EHA.root([
        {
            active: "vulnerabilitiesDetail",
        },
    ])

    const [data, setData] = useState(null)
    const [nameData, setNameData] = useState([])

    const getData = async () => {
        try {
            let data = await API.vulnerabilitiesDetail({ idvul: idItems })
            let items = data.items.result

            delete items.created_by
            delete items.created_at
            delete items.deleted_at
            delete items.deleted_by
            delete items.updated_at
            delete items.updated_by

            for (const key in items) {
                if (!isObject(items[key])) {
                    setNameData(d => [...d, key])
                }
            }

            setData(items)
        } catch (error) {
            setData(null)
            setNameData([])
        }
    }

    useEffect(() => {
        getData()
        return () => {
            setData(null)
            setNameData([])
        }
    }, [idItems])


    return <ModalsComponent modalName={"bulk_edit"} width={"100%"}>
        <form>
            <div className="grid grid-cols-3 gap-4">

                {nameData.map((d, k) => {
                    return <div key={k}>
                        {d === "solution" ? <Form.texarea label={d} /> : <Form.input label={d}></Form.input>}
                    </div>
                })}
            </div>

        </form>
    </ModalsComponent>
}