import { TableInline } from "../../components/table";

export const TableCstm = ({ tableIndex = 1, data = [], column = [], onClick = () => {}, onLoad=() => {} }) => {

    return <TableInline onLoad={onLoad} border={true} onClick={(d, k) => {
        onClick(d, k)
       
    }} className={"flex-1 flex flex-col"} active={tableIndex} columns={column} classTable="flex-1" data={data} />
}