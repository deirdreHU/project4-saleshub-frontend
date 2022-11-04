import {Button, Drawer, MenuItem, TextField} from "@mui/material";
import {useEffect, useState} from "react";

import style from './style.module.css';
import CloseIcon from '@mui/icons-material/Close';
import {Form} from "antd";

import SearchSelector from "../../../../../components/searchSelector/SearchSelector";
import {useStaff} from "../../../../../hooks/useStaff";
import {countries} from "../../../../../consts/countries.data";

import {useDispatch} from "react-redux";
import {REFRESH_CONTACT, UPDATE_CONTACT} from "../../../../../pages/home/store";
import {useParams} from "react-router-dom";

function EditContact({visible, onClose, defaultValues}) {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const {staffs} = useStaff();
    const {contact_id} = useParams();
    const dispatch = useDispatch();

    if (defaultValues) {
        defaultValues.assignedTo = defaultValues.User.username;
    }
    
    useEffect(() => {
        setOpen(visible);
    }, [visible]);

    useEffect(() => {
        console.log(defaultValues)
        if (defaultValues && form && open) {
            console.log(defaultValues)
            console.log(1111)
            form.setFieldValue({
                ...defaultValues,
                assignedTo: defaultValues.User.username
            })
        }
    }, [defaultValues,form,open]);

    const handleSubmit = async (values) => {
        values.assignedTo = staffs.find(staff => staff.username === values.assignedTo).userId;
        onClose();
        dispatch(UPDATE_CONTACT(values, defaultValues.contactId));
        dispatch(REFRESH_CONTACT(contact_id));
    }

    return (
        <div>
            <Drawer onClose={() => {onClose(false);}} className={style.createDrawer} anchor={'right'} open={open}>

                <div className={style.createDrawer}>
                    <div className={'d-flex align-items-center p-3'}>
                        <h5 className={'me-auto'}>Edit Contact</h5>
                        <CloseIcon onClick={() => setOpen(false)} role={'button'}/>
                    </div>
                    <hr className={'m-0'}/>
                </div>

                <Form
                    initialValues={defaultValues}
                    onFinish={handleSubmit}
                    form={form}
                    className={'p-4'}>

                    <Form.Item
                        rules={[
                        {
                            required: true,
                            message: 'Please select contact name'
                        }
                        ]}
                        name={'name'}
                    >
                        <TextField
                        variant={'standard'}
                        label={'Name'}
                        fullWidth
                        />
                    </Form.Item>

                    <Form.Item
                        name={'email'}
                        rules={[
                        {
                            required: true,
                            type: 'email',
                            message: 'Please enter a correct contact email'
                        }
                        ]}
                    >
                        <TextField
                        variant={'standard'}
                        label={'Email'}
                        fullWidth
                        />
                    </Form.Item>

                    <Form.Item
                        name={'phone'}
                        rules={[
                        {
                            required: true,
                            message: 'Please enter contact phone'
                        }
                        ]}
                    >
                        <TextField
                        variant={'standard'}
                        label={'Phone'}
                        fullWidth
                        />
                    </Form.Item>

                    <Form.Item
                        name={'country'}
                        rules={[
                        {
                            required: true,
                            message: 'Please select country!'
                        }
                        ]}
                    >
                        <TextField
                            fullWidth
                            variant={'standard'}
                            label={'Country'}
                            select
                        >
                        {countries.map(country => {
                            return <MenuItem key={country.name} value={country.name}>{country.name}</MenuItem>
                        })}
                        </TextField>
                    </Form.Item>

                    <Form.Item
                        name={'assignedTo'}
                        rules={[
                        {
                            required: true,
                            message: 'Please select a staff'
                        }
                        ]} 
                    >
                        <TextField
                            fullWidth
                            variant={'standard'}
                            label={'Assigned To'}
                            select
                        >
                        {staffs.map(staff => {
                            return <MenuItem key={staff.username} value={staff.username}>{staff.username}</MenuItem>
                        })}
                        </TextField>
                    </Form.Item>

                    <Form.Item
                        rules={[
                        {
                            required: true,
                            message: 'Please select life cycle stage!'
                        }
                        ]}
                        name={'lifeCycleStage'}>
                        <TextField select label={'Life Cycle Stage'} variant={'standard'} fullWidth>
                            <MenuItem value={'Lead'}>Lead</MenuItem>
                            <MenuItem value={'Customer'}>Customer</MenuItem>
                        </TextField>
                    </Form.Item>

                    <Form.Item>
                        <Button type={'submit'} className={'me-2'} variant={'contained'}>
                            Update
                        </Button>
                        
                        <Button onClick={() => setOpen(false)} type={'submit'} color={'inherit'} variant={'contained'}>Cancel</Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    )
}

export default EditContact;
