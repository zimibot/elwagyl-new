
import { CardBox } from "../../components/layout/card"
import { TitleContent } from "../../components/layout/title"
import { TableInline } from "../../components/table"
import { GET_API_EHA } from "../../api/eha/GET"
import { GetAndUpdateContext } from "../../model/context.function"
import { ErrorHtml, Loading } from "."

export const AuditLogs = () => {
    const { setStatus, status } = GetAndUpdateContext()
    const api = GET_API_EHA.root([{
        active: "getLogsActivity"
    }])
    return <CardBox className="flex-1">
        <TitleContent>
            <div className="text-[24px] uppercase text-blue">Audit logs</div>
        </TitleContent>
        {api.error ? <ErrorHtml></ErrorHtml> : api.loading ? <Loading/> : <TableInline onChange={(count) => {
            setStatus(d => ({
                ...d,
                pages_logs: count
            }))
        }} currentPage={status.pages_logs ? status.pages_logs : 1} pageSize={15}  totalPages={api.data.getLogsActivity.pagination.total_results} border paggination hoverDisable columns={[
            {
                title: 'Name',
                key: 'name',
                rowClass: "w-[50px]",
            },
            {
                title: 'host',
                key: 'host',
                rowClass: 'w-[200px]',
            },
            {
                title: 'url',
                key: 'url',
            },
            {
                title: 'user agent',
                key: 'user-agent',
            },

            {
                title: 'code',
                key: 'code',
                rowClass: 'text-center',
                columnClass: 'text-center'
            },
            {
                title: 'level',
                key: 'level',
                rowClass: 'text-center',
                columnClass: 'text-center'
            },
            {
                title: 'method',
                key: 'method',
                rowClass: 'text-center',
                columnClass: 'text-center'
            },

        ]}
            data={
                api.data.getLogsActivity.result.map(d => {
                    let msg = JSON.parse(d.message)
                    let header = msg.headers
                    // let respon = msg.responseBody !== "" && JSON.parse(msg.responseBody)

                    console.log(msg.responseBody)
                    return {
                        ...msg,
                        // ...respon,
                        ...header,
                        ...d,
                    }
                })
                // new Array(20).fill({
                //     name: "username",
                //     username: "admin",
                //     email: "USER@MAIL.com",
                //     role: "administrator",
                //     status: "active",
                //     action: 1
                // })
            } />}

    </CardBox>
}