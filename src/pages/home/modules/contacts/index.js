import {Button,Typography} from "@mui/material";
import {Input, Table} from "antd";
import CreateContact from "../contacts/components/CreateContact";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {REFRESH_CONTACTS, SET_QUERY} from "../../store";
import moment from 'moment';
import SearchSelector from "../../../../components/searchSelector/SearchSelector";
import {useStaff} from "../../../../hooks/useStaff";
import {useNavigate} from "react-router-dom";

const TableColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        sorter: (a, b) => a.phone.localeCompare(b.phone),
    },
    {
        title: 'Assigned To',
        dataIndex: 'User',
        key: 'User',
        sorter: (a, b) => a.User.username.localeCompare(b.User.username),
        render: (_, record) => {
            return record.User.username
        }
    },
    {
        title: 'Lifecycle Stage',
        dataIndex: 'lifeCycleStage',
        key: 'lifeCycleStage',
        sorter: (a, b) => a.lifeCycleStage.localeCompare(b.lifeCycleStage),
    },
    {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
        sorter: (a, b) => a.country.localeCompare(b.country),
    },
    {
        title: 'Created On',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (record) => {
            return moment(record.createdAt).format('lll');
        },
        sorter: (a, b) => new Date(a).getTime() - new Date(b).getTime()
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: () => {
            return (
                <div>
                    <Button color={'warning'}>DELETE</Button>
                </div>
            )
        }
    }
];


function Contacts() {
    const contacts = useSelector(state => state.home.contacts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [keyword, setKeyword] = useState('');
    const [lifeCycleStage, setLifeCycleStage] = useState([]);
    const {staffs} = useStaff();
    const [assignedTo, setAssignedTo] = useState([]);
    
    useEffect(() => {
        dispatch(REFRESH_CONTACTS());
    }, []);

    useEffect(() => {
        dispatch(SET_QUERY({
            key: 'assignedTo',
            value: assignedTo.map(item => {
            return staffs.find(staff => staff.username === item).userId;
            })
        }));
        dispatch(REFRESH_CONTACTS());
    }, [assignedTo]);

    useEffect(() => {
        dispatch(SET_QUERY({
            key: 'lifeCycleStage',
            value: lifeCycleStage
        }));
        dispatch(REFRESH_CONTACTS());
    }, [lifeCycleStage]);

    return (
        <div>

            <div className={'d-flex'}>
                <Typography variant={'h5'} className={'me-auto'}>Contacts</Typography>
                <CreateContact />
            </div>

            <p className={'text-secondary'}>{contacts.length} records</p>

            <div className={'d-flex w-75 align-items-end'}>

                <Input.Search
                    onSearch={val => {
                        dispatch(SET_QUERY({
                            key: 'keyword',
                            value: val
                        }));
                    dispatch(REFRESH_CONTACTS());
                    }}
                placeholder={'Search contact name, email, phone'}
                className={'me-2 w-25'} />

                <div className={'w-25 me-4'}>
                    <SearchSelector
                    multiple={true}
                    label={'Assigned To'}
                    onChange={val => setAssignedTo(val)}
                    options={staffs.map(staff => staff.username)}/>
                </div>

                <div className={'w-25'}>
                    <SearchSelector
                    multiple={true}
                    label={'Life Cycle Stage'}
                    options={['Lead', 'Customer']}
                    onChange={val => setLifeCycleStage(val)}
                    />
                </div>

            </div>

            <Table
                onRow={record => {
                    return {
                        onClick: e => {
                        navigate(`/contacts/${record.contactId}`)
                        }
                    }
                }}

                className={'mt-4'} columns={TableColumns} dataSource={contacts}/>

        </div>

    )
}

export default Contacts;
