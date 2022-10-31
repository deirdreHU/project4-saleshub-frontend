import {Input} from "antd";
import {MenuItem, TextField} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";

import {useEffect, useState} from "react";
import SearchSelector from "../../../../../components/searchSelector/SearchSelector";
import {useStaff} from "../../../../../hooks/useStaff";
import {useContacts} from "../../../../../hooks/useContacts";

import {useDispatch} from "react-redux";
import {FILTER_DEALS} from "../../../store";

export const DealsFilter = () => {
    const [name, setName] = useState('');
    const [dealStage, setDealStage] = useState(null);
    const [assignedTo, setAssignedTo] = useState(null);
    const [createdOn, setCreadtedOn] = useState(null);
    const [closedOn, setClosedOn] = useState(null);
    const [contact, setContact] = useState(null);
    const {staffs} = useStaff();
    const {allContacts} = useContacts();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FILTER_DEALS(
            name,
            dealStage,
            assignedTo,
            createdOn,
            closedOn,
            contact
        ))
        // eslint-disable-next-line 
    }, [name, dealStage, assignedTo, createdOn, closedOn, contact]);

    return (
        <div className={'d-flex'}>
            <Input.Search
                onSearch={val => {
                    setName(val);
                }}
                size={'large'} className={'me-2'} placeholder={'Search deal name'} style={{width: '230px'}}/>

            <TextField
                size={'small'}
                style={{width: '220px'}}
                className={'me-2'}
                fullWidth
                onChange={e => {
                    setDealStage(e.target.value);
                }}
                variant={'standard'}
                label={'Deal Stage'}
                select>
                <MenuItem value={'Qualified to buy'}>Qualified to buy</MenuItem>
                <MenuItem value={'Appointment scheduled'}>Appointment scheduled</MenuItem>
                <MenuItem value={'Qualified to buy'}>Qualified to buy</MenuItem>
                <MenuItem value={'Presentation scheduled'}>Presentation scheduled</MenuItem>
                <MenuItem value={'Closed won'}>Closed won</MenuItem>
                <MenuItem value={'Closed lost'}>Closed lost</MenuItem>
            </TextField>

            <div  className={'me-2'} style={{width: '220px'}}>
                <SearchSelector
                    multiple
                    defaultValue={[]}
                    onChange={val => {
                        const staffNames = val;
                        const staffIds = staffNames.map(staff => {
                            return staffs.find(item => item.username === staff).userId;
                        });
                        setAssignedTo(staffIds);
                    }}
                    options={staffs.map(staff => staff.username)}
                    label={'Assigned to'}
                />
            </div>

            <div className={'me-2'} style={{width: '200px'}}>
                <DatePicker
                    value={createdOn}
                    onChange={e => {
                        setCreadtedOn(e);
                    }}
                    label="Create date"
                    renderInput={
                        (params) =>
                            <TextField fullWidth  variant={'standard'} {...params} />
                    }
                />
            </div>

            <div className={'me-2'} style={{width: '200px'}}>
                <DatePicker
                    minDate={createdOn}
                    value={closedOn}
                    onChange={e => {
                        setClosedOn(e);
                    }}
                    label="Close date"
                    renderInput={
                        (params) =>
                            <TextField fullWidth  variant={'standard'} {...params} />}
                />
            </div>

            <div className={'me-2'} style={{width: '200px'}}>
                <SearchSelector
                    multiple
                    defaultValue={[]}
                    onChange={val => {
                        const contactNames = val;
                        const contactIds = contactNames.map(name => {
                            return allContacts.find(item => item.name === name).contactId;
                        });
                        setContact(contactIds);
                    }}
                    label={'Contact'}
                    options={allContacts.map(contact => contact.name)}
                />
            </div>
        </div>
    )
}
