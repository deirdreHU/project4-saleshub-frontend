import {Button, Drawer, MenuItem, TextField} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";

import {Divider, Form} from "antd";
import SearchSelector from "../../../../components/searchSelector/SearchSelector";

import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {REFRESH_ALL_CONTACTS, REFRESH_DEAL} from "../../../home/store";
import {useStaff} from "../../../../hooks/useStaff";
import {authedRequest} from "../../../../http";


export const DealDrawer = ({open = false, setOpen, deal}) => {
    const [form] = Form.useForm();
    const {deal_id} = useParams();
    const {staffs} = useStaff();
    const allContacts = useSelector(state => state.home.allContacts);
    const dispatch = useDispatch();
    const [closeDate, setCloseDate] = useState(null);
    const [defaultValues, setDefaultValues] = useState({});

    
    useEffect(() => {
        dispatch(REFRESH_ALL_CONTACTS());
    }, []);

    useEffect(() => {
        if (deal && deal.closeDate) {
            setCloseDate(moment(new Date(deal.closeDate)));
        }
    }, [deal]);

    useEffect(() => {
        if(deal && open)
        {
            const newDefaultValues = {
                ...deal
            };
        
            newDefaultValues.assignedTo = deal.User.username;
            newDefaultValues.contact = deal.Contact.name;
            if (newDefaultValues.closeDate) {
                form.setFieldValue('closeDate', moment(new Date(newDefaultValues.closeDate)));
            }

            setDefaultValues(newDefaultValues);
        }
    }, [deal, open]);

    const handleSubmit = async (values) => {
        const deal = {...values};
        deal.closeDate = deal.closeDate.toDate().toString();
        deal.assignedTo = staffs.find(item => item.username === deal.assignedTo).userId;
        deal.contact = allContacts.find(item => item.name === deal.contact).contactId;
        await authedRequest.put(`/api/deals/${deal_id}`, deal);
        dispatch(REFRESH_DEAL(deal_id));
        setOpen(false);
    }

    if (!deal) {
        return <></>
    }



    return (
        <Drawer
            onClose={() => setOpen(false)}
            anchor={'right'}
            open={open}>

            <div className={'drawer'}>

                <div className={'d-flex'}>
                    <h5 className={'me-auto'}>Edit Deal</h5>
                    <CloseIcon onClick={() => setOpen(false)} role={'button'}/>
                </div>

                <Divider />

                <Form initialValues={defaultValues} onFinish={handleSubmit} form={form}>
                    
                    <Form.Item rules={[
                        {
                            required: true,
                            message: 'Please enter deal name'
                        }
                    ]} name={'name'}>
                        <TextField fullWidth variant={'standard'} label={'Name'}/>
                    </Form.Item>

                    <Form.Item rules={[
                        {
                            required: true,
                            message: 'Please enter deal amount'
                        }
                    ]} name={'amount'}>
                        <TextField fullWidth variant={'standard'} label={'Amount'} type={'number'}/>
                    </Form.Item>

                    <Form.Item rules={[
                        {
                            required: true,
                            message: 'Please select a contact'
                        }
                    ]} name={'contact'}>
                        <SearchSelector
                            onChange={val => {
                                form.setFieldValue('contact', val);
                            }}
                            defaultValue={defaultValues.contact}
                            label={'Contact'}
                            options={allContacts.map(contact => contact.name)}
                        />
                    </Form.Item>

                    <Form.Item rules={[
                        {
                            required: true,
                            message: 'Please select deal stage',
                            
                        }
                    ]} name={'dealStage'}>
                        <TextField
                            fullWidth
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
                    </Form.Item>

                    <Form.Item rules={[
                        {
                            required: true,
                            message: 'Please select close date'
                        }
                    ]} name={'closeDate'}>
                        <div>
                            <DatePicker
                                minDate={new Date()}
                                value={closeDate}
                                onChange={val => {
                                form.setFieldValue('closeDate', val);
                                setCloseDate(val);
                                }}
                                label="Close date"
                                renderInput={
                                (params) =>
                                    <TextField fullWidth  variant={'standard'} {...params} />}
                            />
                        </div>
                    </Form.Item>

                    <Form.Item rules={[
                        {
                            required: true,
                            message: 'Please select assign to',
                        }
                    ]} name={'assignedTo'} >
                        <SearchSelector
                            defaultValue={defaultValues.assignedTo}
                            onChange={val => {
                                form.setFieldValue('assignedTo', val);
                            }}
                            options={staffs.map(staff => staff.username)}
                            label={'Assigned to'}
                        />
                    </Form.Item>

                    <Form.Item rules={[
                        {
                            required: true,
                            message: 'Please select deal type'
                        }
                    ]} name={'dealType'}>
                        <TextField variant={'standard'} label={'Deal type'} fullWidth select>
                            <MenuItem value={'New business'}>New business</MenuItem>
                            <MenuItem value={'Existing business'}>Existing business</MenuItem>
                        </TextField>
                    </Form.Item>

                    <Form.Item>
                        <Button className={'me-2'} type={'submit'} variant={'contained'}>Update</Button>
                        <Button onClick={() => setOpen(false)} variant={'contained'} color={'inherit'}>Cancel</Button>
                    </Form.Item>

                </Form>

            </div>
            
        </Drawer>
    )
}
