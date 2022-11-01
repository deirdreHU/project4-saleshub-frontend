import MenuAction from "../../../components/menuAction/MenuAction";
import {Divider} from "antd";
import {Avatar, Paper} from "@mui/material";
import {Modal} from 'antd';

import {useState} from "react";
import {Link} from 'react-router-dom'
import {DealDrawer} from "./components/DealDrawer";
import {useNavigate, useParams} from "react-router-dom";
import {authedRequest} from "../../../http";

export const Detail = ({deal}) => {

    const {deal_id} = useParams();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async () => {
        Modal.confirm({
            content: 'This action cannot be undone,are you sure to delete?',
            onOk: async () => {
                await authedRequest.delete(`/api/deals/${deal_id}`);
                navigate(-1);
            }
        })
    }

    if (!deal) {
        return <></>;
    }
        
    return (
        <div className={'p-3'}>

            <div className={'d-flex justify-content-end'}>
                <MenuAction onDelete={handleDelete} onEdit={() => setOpen(true)} />
            </div>

            <DealDrawer deal={deal} open={open} setOpen={setOpen}/>
            
            <h3>{deal.name}</h3>

            <Divider  className={'mt-4'} component="div"/>

            <div>
                <h5 className={'mt-4'}>About this deal</h5>
                <div className={'d-flex'}>
                    <p style={{width: '50%'}}>Name</p>
                    <p>{deal.Contact.name}</p>
                </div>
                <div className={'d-flex'}>
                    <p style={{width: '50%'}}>Amount</p>
                    <p>${deal.amount}</p>
                </div>
                <div className={'d-flex'}>
                    <p style={{width: '50%'}}>Deal Stage</p>
                    <p>{deal.dealStage}</p>
                </div>
                <div className={'d-flex'}>
                    <p style={{width: '50%'}}>Assign to</p>
                    <p>{deal.User.username}</p>
                </div>
            </div>

            <Divider />

            <div>

                <h5>Contact</h5>

                <Paper className={'p-3 d-flex align-items-center'}>

                    <Avatar className={'me-2'} />

                    <div className={'me-auto'}>
                        <Link to ={`/contacts/${deal.Contact.contactId}`} className={'m-0'} >{deal.Contact.name} </Link>
                        <p className={'text-secondary m-0'}>{deal.Contact.email}</p>
                    </div>

                </Paper>

            </div>
            
        </div>
    )
}
