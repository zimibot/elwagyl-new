import { useState } from "react";
import { TableInline } from "../../components/table";
import { AttackType, columnAttack } from "../cyber.deck/data"

export const TableCstm = () => {
    const [isactive, setisactive] = useState({
        active: 1,
        data: null
    });
    return <TableInline onClick={(d, k) => setisactive({
        active: k + 1,
        data: d
    })} active={isactive.active} columns={columnAttack} data={AttackType} paggination={true} height={"350px"} />
}