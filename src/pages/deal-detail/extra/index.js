import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useState} from "react";
import {Notes} from "./components/notes";
import {Button} from "@mui/material";
import {CreateNote} from "./components/create-note";

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

export const Extra = ({deal}) => {
    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Notes" {...a11yProps(0)} />
                </Tabs>
            </Box>

            <CreateNote open={open} setOpen={setOpen}/>

            <TabPanel value={value} index={0}>
                <div className={'text-end'}>
                    <Button onClick={() => setOpen(true)} variant={'contained'}>Create Note</Button>
                </div>
                <Notes notes={deal?.dealNotes || []} />
            </TabPanel>
        </div>
    )
}
