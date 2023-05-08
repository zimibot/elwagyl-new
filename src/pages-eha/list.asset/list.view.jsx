import { GET_API_EHA } from "../../api/eha/GET"
import { ButtonComponents } from "../../components.eha/button"
import { CardBox } from "../../components/layout/card"
import { TitleContent } from "../../components/layout/title"
import { TableInline } from "../../components/table"
import { GetAndUpdateContext } from "../../model/context.function"

export const ListView = () => {
    const { setStatus } = GetAndUpdateContext()


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
                                ADDASSET: !d.ADDASSET
                            }))
                        }}>
                            [ + ] ADD
                        </ButtonComponents>
                        <ButtonComponents>
                            NET DISCOVERY
                        </ButtonComponents>
                    </div>
                </div>
            </CardBox>
            <CardBox className="flex-1">
                <TitleContent>
                    <div className="text-[24px] uppercase text-blue">UNCONFIRMED ASSET LIST</div>
                </TitleContent>
                <TableInline border hoverDisable columns={[
                    {
                        title: 'ID',
                        key: 'id',
                        rowClass: "w-[50px]"
                    },
                    {
                        title: 'IP/DOMAIN',
                        rowClass: "w-[150px]",
                        key: 'ip',
                    },
                    {
                        title: 'PROTECTED SITE',
                        key: 'protect',
                    },

                    {
                        title: 'CONFIRM',
                        rowClass: "w-[80px] text-center",
                        columnClass: "text-center",
                        key: 'crit',
                    },
                ]}
                    data={
                        new Array(20).fill({
                            id: "EH-1",
                            name: "ASSETNAME_1",
                            ip: "HTTP://192.168.1.1",
                            protect: "PROTECTED SITE A",
                            crit: <div className="flex justify-center items-center w-full">
                                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 11.1701L1.83 7.00009L0.410004 8.41009L6 14.0001L18 2.00009L16.59 0.590088L6 11.1701Z" fill="#00D8FF" />
                                </svg>

                            </div>,
                        })
                    }></TableInline>
            </CardBox>
        </div>
    )
}