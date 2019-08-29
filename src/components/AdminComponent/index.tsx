import React from "react";
import { AdminState } from "../../redux/admin/types"

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import "@devexpress/dx-react-grid";

import Tabs from "../Material/tabs"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);
export interface IRow {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    age: number
}

interface AdminProps {
    doAdmin: () => object;
    adminUsersData: any,
    isAdmin: boolean
}
interface user {
    email: string;
    firstName: string;
    lastName: string;
    age: number;
    id: number;
}

export default class AdminComponent extends React.Component<AdminProps, AdminState>{
    startAdmin = () => {        
        const { doAdmin } = this.props;
        doAdmin();
    }
    componentDidMount() {
        this.startAdmin()
    }
    render() {
        return (
            <div>
                {this.props.isAdmin ? (
                                <span>
                                    <Tabs/>
                                </span>
                ) : (
                        <div>
                            <Mess />
                        </div>
                    )
                }
            </div>
        );
    }
}
export const Mess: React.SFC = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <span>
                            YOU HAVE NO RIGHTS TO SEE THIS PAGE!
                        </span>

                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}