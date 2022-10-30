import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useState} from "react";
import Notes from "./components/notes";
import DealList from "./components/dealList";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {

    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function Extra({contact}) {
    // eslint-disable-next-line no-undef
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if (!contact) {
        return <></>;
    }

    return (
        <Box sx={{ width: '100%' }}>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Notes" {...a11yProps(0)} />
                    <Tab label="Deals" {...a11yProps(1)} />
                </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
                <Notes notes={contact.notes}/>
            </TabPanel>

            <TabPanel value={value} index={1}>
                <DealList deals={contact.deals}/>
            </TabPanel>
            
        </Box>
    )
}
export default Extra;
