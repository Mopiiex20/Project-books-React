import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TextField, TableSortLabel } from "@material-ui/core";
import Edit from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'
import Check from '@material-ui/icons/Check'

interface IRowProps {
    i: number;
    editIdx: number;
    header: any[];
    user: any;
    stopEditing: Function;
    handleRemove: Function;
    startEditing: Function;
    handleChange: Function;

}
const Row: React.FC<IRowProps> = props => {

    const currentlyEditing = props.editIdx === props.i;
    
    return (
        <TableRow key={`tr-${props.i}`}>
            {props.header.map((item: any, k: any) => (
                <TableCell key={`trc-${k}`}>
                    {currentlyEditing ? (
                        item.prop !== "_id" ?
                            item.prop !== "delete" ?
                                item.prop !== "edit" ?
                                    <TextField
                                        name={item.prop}
                                        onChange={(e: any) => props.handleChange(e, item.prop, props.i)}
                                        value={props.user[item.prop]}
                                    />
                                    : <Check onClick={() => props.stopEditing(props.user._id)} />
                                : null
                            : props.user[item.prop]
                    ) : (
                            item.prop !== "delete" ?
                                item.prop !== "edit" ?
                                    props.user[item.prop]
                                    : <Edit onClick={() => props.startEditing(props.i)} />
                                : <Delete onClick={() => props.handleRemove(props.user._id)}></Delete>
                        )}
                </TableCell>
            ))}
        </TableRow>
    );
}
interface HeadRow {
    id: keyof Data;
    label: string;
    numeric: boolean;
}
const headRows: HeadRow[] = [
    { id: '_id', numeric: false, label: 'ID' },
    { id: 'firstName', numeric: false, label: 'User Name' },
    { id: 'email', numeric: false, label: 'E-mail' },
    { id: 'age', numeric: true, label: 'Age' },
    { id: 'edit', numeric: false, label: ' ' },
    { id: 'delete', numeric: false, label: ' ' }
];
type Order = 'asc' | 'desc';

interface Data {
    _id: number,
    firstName: string,
    email: string,
    age: number,
    edit: string,
    delete: string
}
interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}
function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };
    return (
        <TableHead>
            <TableRow>
                {headRows.map(row => (
                    <TableCell
                        key={row.id}
                        sortDirection={orderBy === row.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === row.id}
                            direction={order}
                            onClick={createSortHandler(row.id)}
                        >
                            {row.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>


    );
}
function getSorting<K extends keyof any>(
    order: Order,
    orderBy: K,
): (a: { [key in K]: number | string }, b: { [key in K]: number | string }) => number {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}
function desc<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
function stableSort<T>(array: T[], cmp: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}
interface IUserTableProps {
    data: any[];
    editIdx: number;
    header: any[];
    stopEditing: Function;
    handleRemove: Function;
    startEditing: Function;
    handleChange: Function;

}

const UsersTable: React.FC<IUserTableProps> = props => {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('_id');

    function handleRequestSort(event: React.MouseEvent<unknown>, property: keyof Data) {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    }
    return (
        <div>
            {
                props.data ? (
                    <Table>
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={props.data.length}
                        />
                        <TableBody>
                            {stableSort(props.data, getSorting(order, orderBy))
                                .map((user: any, i: any) => {
                                    return (
                                        <Row key={user._id}
                                            user={user}
                                            i={i}
                                            header={props.header}
                                            handleRemove={props.handleRemove}
                                            startEditing={props.startEditing}
                                            editIdx={props.editIdx}
                                            handleChange={props.handleChange}
                                            stopEditing={props.stopEditing}
                                        />
                                    );
                                })}
                        </TableBody>
                    </Table>) : (
                        <div>

                        </div>
                    )}
        </div>
    );
}
export default UsersTable