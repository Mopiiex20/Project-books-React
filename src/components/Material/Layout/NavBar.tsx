import React from "react"
import { Tabs, makeStyles, Paper, Tab } from "@material-ui/core";
import { LinkProps, Link } from "react-router-dom";

const AdapterLink = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
    <Link innerRef={ref as any} {...props} />
));
const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    tabs: {
        backgroundColor: "rgb(228, 210, 47)"
    }
});
export default () => {
    const [value, setValue] = React.useState(0);
    const classes = useStyles();
    function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
        setValue(newValue);
    }
    return (
        <Paper className={classes.root}>
            <Tabs
                className={classes.tabs}
                variant="fullWidth"
                value={value}
                onChange={handleChange}
            >
                <Tab label="Home" component={AdapterLink} to="/" />
                <Tab label="About us" component={AdapterLink} to="/aboutUs" />
            </Tabs>
        </Paper>
    )

}
