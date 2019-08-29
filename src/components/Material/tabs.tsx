import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import UsersTable from './AdminUsers';
import BooksTable from './BooksTable';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

function a11yProps(index: any) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
            display: 'flex',
            height: 224,
        },
        tabs: {
            borderRight: `1px solid ${theme.palette.divider}`,
        },
    }),
);

export default function AdminTabs() {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    
    function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
        setValue(newValue);
    }
    return (
        <div >
            <Tabs
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Tab fullWidth={true} label="Users" {...a11yProps(0)} />
                <Tab fullWidth={true} label="Books" {...a11yProps(1)} />
            </Tabs>

            <TabPanel value={value} index={0}>
                <UsersTable />
            </TabPanel>

            <TabPanel value={value} index={1}>
                <BooksTable />
            </TabPanel>
        </div>
    );
}