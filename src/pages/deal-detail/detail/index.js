import MenuAction from "../../../components/menuAction/MenuAction";
import {Divider} from "antd";
import {Avatar, Paper} from "@mui/material";

import {useState} from "react";
import {DealDrawer} from "./components/DealDrawer";
import {useNavigate, useParams} from "react-router-dom";
import {authedRequest} from "../../../http";

export const Detail = ({deal}) => {

    const {deal_id} = useParams();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async () => {
        authedRequest.delete(`/api/deals/${deal_id}`)
            .then(() => {
                navigate(-1);
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
            
            <h3>{deal.Contact.name} - {deal.name}</h3>

            <Divider />

            <div>
                <h5>About this deal</h5>
                <div className={'d-flex'}>
                    <p style={{width: '200px'}}>Name</p>
                    <p>{deal.Contact.name}</p>
                </div>
                <div className={'d-flex'}>
                    <p style={{width: '200px'}}>Amount</p>
                    <p>${deal.amount}</p>
                </div>
                <div className={'d-flex'}>
                    <p style={{width: '200px'}}>Deal Stage</p>
                    <p>{deal.dealStage}</p>
                </div>
                <div className={'d-flex'}>
                    <p style={{width: '200px'}}>Assign to</p>
                    <p>{deal.User.username}</p>
                </div>
            </div>

            <Divider />

            <div>

                <h5>Contact</h5>

                <Paper className={'p-3 d-flex align-items-center'}>

                    <Avatar className={'me-2'} />

                    <div className={'me-auto'}>
                        <h6 className={'m-0'}>{deal.Contact.name}</h6>
                        <p className={'text-secondary m-0'}>{deal.Contact.email}</p>
                    </div>

                </Paper>

            </div>
            
        </div>
    )
}
