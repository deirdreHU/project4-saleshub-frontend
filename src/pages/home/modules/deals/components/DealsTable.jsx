import moment from "moment";
import {Table} from "antd";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, { useEffect, useState } from 'react';
import {REFRESH_DEALS} from "../../../store";
import ReactDragListView from 'react-drag-listview'

export const DealsTable = (props) =>  {
    const { navType, isEqualRedd } = props;
    const [_TableColumns, _setColumns] = useState([]);
    
    //defalut table columns
    let TableColumns = [
        {
            title: 'DEAL NAME',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },

        {
            title: 'DEAL Amount',
            dataIndex: 'amount',
            key: 'amount',
            sorter: (a, b) => a.amount - b.amount,
        },

        {
            title: 'DEAL STAGE',
            dataIndex: 'dealStage',
            key: 'dealStage',
            sorter: (a, b) => a.dealStage.localeCompare(b.dealStage),
        },

        {
            title: 'ASSIGNED TO',
            dataIndex: 'User',
            key: 'User',
            sorter: (a, b) => a.User.username.localeCompare(b.User.username),
            render: (_, record) => {
                return record.User.username
            }
        },

        {
            title: 'CREATED ON',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
            render: (_, record) => {
                return moment(new Date(record.createdAt)).format('lll')
            }
        },

        {
            title: 'CLOSED ON',
            dataIndex: 'closeDate',
            key: 'closeDate',
            sorter: (a, b) => new Date(a.closeDate).getTime() - new Date(b.closeDate).getTime(),
            render: (_, record) => {
                return record.closeDate ? moment(new Date(record.closeDate)).format('lll') : '-'
            }
        },

        {
            title: 'ASSOCIATED CONTACT',
            dataIndex: 'Contact',
            key: 'Contact',
            sorter: (a, b) => a.Contact.name.localeCompare(b.Contact.name),
            render: (_, record) => {
                return record.Contact.name;
            }
        },
    ];


    useEffect(() => {
        _setColumns(TableColumns);
        // eslint-disable-next-line
    }, [navType, isEqualRedd]);

    const deals = useSelector(state => state.home.deals);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(REFRESH_DEALS());
        // eslint-disable-next-line
    }, []);

    // const that = this;
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
        <ReactDragListView.DragColumn {...dragProps}>
            <Table
                onRow={record => {
                    return {
                        onClick: e => {
                            navigate(`/deals/${record.dealId}`)
                        }
                    }
                }}
            className={'mt-4'} columns={_TableColumns} dataSource={deals}/>
        </ReactDragListView.DragColumn>
    )
}
