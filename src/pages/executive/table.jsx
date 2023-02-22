import { useState } from "react";
import { TableInline } from "../../components/table";
import { SERVICEHISTORYCOLUMN, ExampleRowService } from "../cyber.deck/data";

export const TableCstm = () => {
    const [tableActive, settableActive] = useState(1);
    
    return  <TableInline border={true} onClick={(d, k) => {
        settableActive(k + 1)
    }} className={"flex-1 flex flex-col"} active={tableActive} classTable="flex-1" columns={SERVICEHISTORYCOLUMN} data={ExampleRowService} paggination={true} />
}