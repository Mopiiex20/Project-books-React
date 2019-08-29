import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
        },
        input: {
            display: 'none',
        },
    }),
);

export default function ButtonComponent(props: any) {
    const classes = useStyles();
    const { click, text } = props
    return (
        <div>
            <Button variant="contained" color="primary" className={classes.button} onClick={click}>
            {text}
      </Button>
        </div>
    );
}