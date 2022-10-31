import moment from "moment";
import {Table} from "antd";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {REFRESH_DEALS} from "../../../store";

const TableColumns = [
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

export const DealsTable = () => {

    const deals = useSelector(state => state.home.deals);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(REFRESH_DEALS());
        // eslint-disable-next-line 
    }, []);

    return (
        <Table
            onRow={record => {
                return {
                    onClick: e => {
                        navigate(`/deals/${record.dealId}`)
                    }
                }
            }}
        className={'mt-4'} columns={TableColumns} dataSource={deals}/>
    )
}
