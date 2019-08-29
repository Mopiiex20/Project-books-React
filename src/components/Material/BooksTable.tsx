import React, { useEffect } from 'react';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Delete from '@material-ui/icons/Delete'
import Button1 from "./button"
import Modal from '@material-ui/core/Modal';
import { TextField, Button, Checkbox, Toolbar, Typography, Tooltip, IconButton } from '@material-ui/core';
import { Formik, Form } from 'formik'

import { connect } from 'react-redux';
import { RootState } from '../../redux/rootReduser';
import req from '../../services/Request';
import { Book } from '../../redux/addToCart/types'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            marginTop: theme.spacing(3),
            overflowX: 'auto',
        },
        table: {
            minWidth: 650,
        },
    }),
);

const useStyles1 = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 4),
        },
    }),
);

function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

interface BooksProps {
    booksData: any,
    token : string
}

interface Values {
    title: string;
    description: string;
    price: number;
}

interface Data {
    _id: number;
    title: string;
    description: string;
    price: number;
}

interface HeadRow {
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headRows: HeadRow[] = [
    { id: '_id', numeric: false, label: 'ID' },
    { id: 'title', numeric: false, label: 'Title' },
    { id: 'description', numeric: false, label: 'Description' },
    { id: 'price', numeric: false, label: 'Price' }
];

interface EnhancedTableProps {
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, numSelected, rowCount } = props;
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headRows.map(row => (
                    <TableCell
                        key={row.id}
                        align={row.numeric ? 'right' : 'left'}
                    >{row.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

interface EnhancedTableToolbarProps {
    numSelected: number;
    selected: any[];
    deleteSelected: any
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const { numSelected, selected, deleteSelected } = props;
    return (
        <Toolbar>
            <div>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subtitle1">
                        {numSelected} selected
                    </Typography>
                ) : (<div></div>)}
            </div>
            <div >
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton onClick={() => { deleteSelected(selected) }} aria-label="delete">
                            <Delete />
                        </IconButton>
                    </Tooltip>
                ) : (<div> </div>)}
            </div>
        </Toolbar>
    );
};

const BooksTable: React.FC<BooksProps> = props => {
    const [open, setOpen] = React.useState(false);
    const [rows, setRows] = React.useState<any>([]);

    async function fetch() {
        await req('books', "GET")
            .then((res: any) => setRows(res.data))
    }
    useEffect(() => { fetch() }, []);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [modalStyle] = React.useState(getModalStyle);
    const classes = useStyles();
    const classes1 = useStyles1();

    const [selected, setSelected] = React.useState<string[]>([]);

    function handleSelectAllClick(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.checked) {
            const newSelecteds = rows.map((book: any) => book.title);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    }

    function handleClick(event: React.MouseEvent<unknown>, name: string) {
        const selectedIndex = selected.indexOf(name);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    }

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    function deleteSelected(selectedBooks: any[]) {
        let newRows: any[] = [];
        let deleteIds: any[] = [];
        selectedBooks.forEach(element => {
            const dBook = rows.find((book: Book) => element === book.title)
            deleteIds.push(dBook._id)
        });
        if (deleteIds.length !== 0) {
            const conf: boolean = window.confirm("Do you want to delete selected books?");
            if (conf) {
                deleteIds.forEach((elem: number) => {
                    req(`books/${elem}`, 'DELETE');
                    newRows = rows.filter((book: Book) => book._id !== elem)
                }
                )
                console.log(newRows);
                setSelected([]);
                setRows(newRows);
            }
        }
    }
    const onSubmit = (values: Values) => {
        if (values.price > 10) {
            if (values.description.length > 10) {
                if (values.title.length > 5) {

                    req('books/', "PUT", values, props.token);
                    setOpen(false);
                    fetch();
                } else alert("Too short title")
            } else alert("Too shot Description")
        } else alert("Too low proce!")
    }
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes1.paper}>
                    <Formik initialValues={{ title: "", description: "", price: 1 }} onSubmit={(values) => {
                        onSubmit(values)
                    }}
                    >
                        {
                            ({ values, handleChange }) => (
                                <Form>
                                    <div>
                                        <TextField
                                            fullWidth
                                            label="Book Name"
                                            multiline
                                            name="title"
                                            value={values.title}
                                            onChange={handleChange}
                                        ></TextField>
                                    </div>
                                    <div>
                                        <TextField
                                            fullWidth
                                            multiline
                                            label="Description"
                                            name="description"
                                            value={values.description}
                                            onChange={handleChange}
                                        >
                                        </TextField>
                                    </div>
                                    <div>
                                        <TextField
                                            fullWidth
                                            label="Price"
                                            type="number"
                                            name="price"
                                            value={values.price}
                                            onChange={handleChange}
                                        ></TextField>
                                    </div>
                                    <div>
                                        <Button variant="contained" color="primary" type="submit">Add Book</Button>
                                    </div>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </Modal>

            {rows ? (
                <Paper className={classes.root}>
                    {selected.length === 0 ? (
                        <Button1 text="Add new book" click={() => handleOpen()} />
                    ) : (
                            <EnhancedTableToolbar
                                selected={selected}
                                numSelected={selected.length}
                                deleteSelected={() => { deleteSelected(selected) }}
                            />
                        )}
                    <Table className={classes.table}>
                        <EnhancedTableHead
                            numSelected={selected.length}
                            onSelectAllClick={handleSelectAllClick}
                            rowCount={rows.length}
                        />
                        <TableBody>

                            {rows.map((row: Book, index: any) => {
                                const isItemSelected = isSelected(row.title);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow
                                        key={row._id}
                                        hover
                                        onClick={event => handleClick(event, row.title)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isItemSelected}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </TableCell>
                                        <TableCell component="th" id={labelId} scope="row">
                                            {row._id}
                                        </TableCell>
                                        <TableCell >{row.title}</TableCell>
                                        <TableCell >{row.description}</TableCell>
                                        <TableCell >{row.price}</TableCell>
                                    </TableRow>)
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            ) : (<div></div>)}
        </div>
    );
}

const mapStateToProps = (state: RootState) => ({
    booksData: state.adminData.booksData,
    token: state.login.token
});
export default connect(mapStateToProps)(BooksTable);