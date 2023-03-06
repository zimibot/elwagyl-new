import { ButtonComponents } from "../../components.eha/button"
import { CardBox } from "../../components/layout/card"
import { TitleContent } from "../../components/layout/title"
import { TableInline } from "../../components/table"
import { GetAndUpdateContext } from "../../model/context.function"

export const ListDetail = () => {
    const { setStatus } = GetAndUpdateContext()

    return (
        <div className="col-span-full flex-1 flex flex-col pb-10">
            <CardBox className="!p-0">
                <div className="p-8 flex items-center gap-10 border-b border-primary">
                    <div>ASSET LIST</div>
                    <div className="space-x-4 flex">
                        <ButtonComponents>
                            IMPORT
                        </ButtonComponents>
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
                    <div className="text-[24px] uppercase">DETAIL PROTECTED SITE A</div>
                </TitleContent>
                <TableInline border paggination hoverDisable columns={[
                    {
                        title: 'ID',
                        key: 'id',
                        rowClass: "w-[50px]"
                    },
                    {
                        title: 'NAME',
                        key: 'name',
                        rowClass: "w-[150px]"
                    },
                    {
                        title: 'IP/DOMAIN',
                        rowClass: "w-[150px]",
                        key: 'ip',
                    },
                    {
                        title: 'PROTECTED SITE',
                        rowClass: "w-[200px]",
                        key: 'protect',
                    },
                    {
                        title: 'LAST SCAN',
                        key: 'lastScan',
                        rowClass: "w-[100px]",
                    },
                    {
                        title: 'ARCHIVED',
                        rowClass: "text-center w-[100px]",
                        columnClass: "text-center",
                        key: 'archived',
                    },
                    {
                        title: null,
                        key: null,
                    },
                    {
                        title: 'CRIT',
                        rowClass: "w-[80px] text-center",
                        columnClass: "text-center",
                        key: 'crit',
                    },
                    {
                        title: 'HIGH',
                        rowClass: "w-[80px] text-center",
                        columnClass: "text-center",
                        key: 'high',
                    },
                    {
                        title: 'MEDIUM',
                        rowClass: "w-[80px] text-center",
                        columnClass: "text-center",
                        key: 'med',
                    },
                    {
                        title: 'LOW',
                        rowClass: "w-[80px] text-center",
                        columnClass: "text-center",
                        key: 'low',
                    },
                    {
                        title: 'VIEW',
                        rowClass: "w-[100px] text-center",
                        columnClass: "text-center",
                        html: () => {
                            return <button className="flex items-center justify-center gap-4 w-full " onClick={() => {
                                setStatus(d => ({
                                    ...d,
                                    VIEWSHOW: {
                                        show: !d.VIEWSHOW?.show,
                                        id: 32
                                    }
                                }))
                            }}>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V16C0 16.5304 0.210714 17.0391 0.585786 17.4142C0.960859 17.7893 1.46957 18 2 18H16C17.1 18 18 17.1 18 16V2C18 1.46957 17.7893 0.960859 17.4142 0.585786C17.0391 0.210714 16.5304 0 16 0ZM16 16H2V4H16V16ZM9 7.5C10.84 7.5 12.48 8.46 13.34 10C12.48 11.54 10.84 12.5 9 12.5C7.16 12.5 5.52 11.54 4.66 10C5.52 8.46 7.16 7.5 9 7.5ZM9 6C6.27 6 3.94 7.66 3 10C3.94 12.34 6.27 14 9 14C11.73 14 14.06 12.34 15 10C14.06 7.66 11.73 6 9 6ZM9 11.5C8.17 11.5 7.5 10.83 7.5 10C7.5 9.17 8.17 8.5 9 8.5C9.83 8.5 10.5 9.17 10.5 10C10.5 10.83 9.83 11.5 9 11.5Z" fill="#00D8FF" />
                                </svg>

                                VIEW
                            </button>
                        }
                    }
                ]}
                    data={
                        new Array(20).fill({
                            id: "EH-1",
                            name: "ASSETNAME_1",
                            ip: "HTTP://192.168.1.1",
                            protect: "PROTECTED SITE A",
                            lastScan: "2023/02/14",
                            archived: "false",
                            crit: 2,
                            high: 2,
                            med: 2,
                            low: 2,
                        })
                    }></TableInline>
            </CardBox>
        </div>
    )
}