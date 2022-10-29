import {Button, Drawer, MenuItem, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import style from './style.module.css';
import {useDispatch} from "react-redux";
import {Form} from "antd";
import CloseIcon from '@mui/icons-material/Close';
import SearchSelector from "../../../../../components/searchSelector/SearchSelector";
import {useStaff} from "../../../../../hooks/useStaff";
import {countries} from "../../../../../consts/countries.data";
import {CREATE_CONTACT} from "../../../store";

function CreateContact() {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const {staffs} = useStaff();
    const dispatch = useDispatch();

    useEffect(() => {
        if (open) {
        form.resetFields(null);
        }
    }, [open]);

    const handleSubmit = async (values) => {
        values.assignedTo = staffs.find(staff => staff.username === values.assignedTo).userId;
        dispatch(CREATE_CONTACT(values));
        setOpen(false);
    }

    return (
        <div>
            <Button onClick={() => setOpen(true)} variant={'contained'}>Create Contact</Button>

            <Drawer onClose={() => setOpen(false)} className={style.createDrawer} anchor={'right'} open={open}>

                <div className={style.createDrawer}>
                    <div className={'d-flex align-items-center p-3'}>
                        <h5 className={'me-auto'}>Create Contact</h5>
                        <CloseIcon onClick={() => setOpen(false)} role={'button'}/>
                    </div>
                    <hr className={'m-0'}/>
                </div>

                <Form onFinish={handleSubmit} form={form} className={'p-4'}>

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
                        <SearchSelector
                        onChange={(val) => {
                            form.setFieldValue('assignedTo', val);
                        }}
                        label={'Assigned To'} options={staffs.map(staff => staff.username)}/>
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
                        <Button type={'submit'} className={'me-2'} variant={'contained'}>Create</Button>
                        <Button onClick={() => setOpen(false)} type={'submit'} color={'inherit'} variant={'contained'}>Cancel</Button>
                    </Form.Item>

                </Form>

            </Drawer>
        </div>
    )
}
export default CreateContact;
