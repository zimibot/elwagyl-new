import { CardBox } from "../../components/layout/card"
import { TitleContent } from "../../components/layout/title"
import { TableInline } from "../../components/table"

export const ListProtectedSite = () => {
    return (
        <CardBox className="flex-1">
            <TitleContent>
                <div className="text-[24px] uppercase text-blue">protected site</div>
            </TitleContent>
            <TableInline border paggination hoverDisable columns={[
                {
                    title: 'protected site name',
                    key: 'name',
                },
                {
                    title: 'create DATES',
                    rowClass: "w-[200px]",
                    key: 'create_date',
                },
             
            ]}
                data={
                    new Array(20).fill({
                        name: "site a",
                    
                        create_date: "2023/02/14 | 05.00 AM",
                     
            
                    })
                } />
        </CardBox>
    )
}