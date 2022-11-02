import {Button} from "@mui/material";
import {Input, Table} from "antd";
import CreateContact from "../contacts/components/CreateContact";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {REFRESH_CONTACTS, SET_QUERY} from "../../store";
import moment from 'moment';
import SearchSelector from "../../../../components/searchSelector/SearchSelector";
import {useStaff} from "../../../../hooks/useStaff";
import {useNavigate} from "react-router-dom";
import ReactDragListView from 'react-drag-listview'

export const Contacts = (props) =>  {
    const { navType, isEqualRedd } = props;
    const [_TableColumns, _setColumns] = useState([]);

    let TableColumns = [
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

    useEffect(() => {
        _setColumns(TableColumns);
        // eslint-disable-next-line
    }, [navType, isEqualRedd]);

    const contacts = useSelector(state => state.home.contacts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [keyword, setKeyword] = useState('');
    const [lifeCycleStage, setLifeCycleStage] = useState([]);
    const {staffs} = useStaff();
    const [assignedTo, setAssignedTo] = useState([]);
    
    useEffect(() => {
        dispatch(REFRESH_CONTACTS());
    }, [dispatch]);

    useEffect(() => {
        dispatch(SET_QUERY({
            key: 'assignedTo',
            value: assignedTo.map(item => {
                return staffs.find(staff => staff.username === item).userId;
            })
        }));
        dispatch(REFRESH_CONTACTS());
        // eslint-disable-next-line 
    }, [assignedTo]);

    useEffect(() => {
        dispatch(SET_QUERY({
            key: 'lifeCycleStage',
            value: lifeCycleStage
        }));
        dispatch(REFRESH_CONTACTS());
        // eslint-disable-next-line 
    }, [lifeCycleStage]);

    const dragProps = {
        onDragEnd(fromIndex, toIndex) {
            const columns = [..._TableColumns];
            const item = columns.splice(fromIndex, 1)[0];
            columns.splice(toIndex, 0, item);
            console.log(columns)
            // TableColumns = columns
            // TableColumns = [...columns]
            // TableColumns = columns
            _setColumns(columns);
        },
        nodeSelector: "th"
    };

    return (

        <>

            <div className={'d-flex'}>
                <div variant={'h6'} className={'me-auto'}>Contacts</div>
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

            <ReactDragListView.DragColumn {...dragProps}>

                <Table
                    onRow={record => {
                        return {
                            onClick: e => {
                                navigate(`/contacts/${record.contactId}`)
                            }
                        }
                    }}
                    className={'mt-4'} columns={_TableColumns} dataSource={contacts}/>

            </ReactDragListView.DragColumn>

        </>

    )
}

export default Contacts;
