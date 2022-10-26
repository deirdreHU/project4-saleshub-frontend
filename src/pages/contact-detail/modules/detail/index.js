import ListIcon from '@mui/icons-material/List';
import MenuAction from "../../../../components/menuAction/MenuAction";
import {Avatar, Divider} from "@mui/material";
import EditContact from "./components/EditContact";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Modal} from 'antd';
import {authedRequest} from "../../../../http";

function Detail({contact}) {

    const navigate = useNavigate();
    const {contact_id} = useParams();
    const [editVisible, setEditVisible] = useState(false);

    const handleDelete = async () => {
        Modal.confirm({
            content: 'Do you want to delete this contact?',
            onOk: async () => {
            await authedRequest.delete(`/api/contacts/${contact_id}`);
            navigate(-1);
            }
        })
    }
    
    if (!contact) {
        return <></>;
    }
    return (
        <div className={'p-3'}>

            <div className={'d-flex justify-content-end'}>
                <EditContact
                    defaultValues={{...contact}}
                    onClose={() => setEditVisible(false)} visible={editVisible}/>
                
                <MenuAction
                    onDelete={handleDelete}
                    onEdit={() => {
                        setEditVisible(true);
                    }}/>
            </div>

            <div className={'d-flex align-items-center'}>
                <Avatar className={'me-3'} sx={{ width: 70, height: 70 }}>
                {contact.name[0]}
                </Avatar>

                <div>
                <h4 className={'m-0'}>{contact.name}</h4>
                </div>
            </div>

            <Divider className={'mt-3'} component="div"/>

            <h5 className={'mt-4'}>About this contact</h5>

            <div className={'d-flex mt-3'}>
                <p style={{width: '40%'}}>Name</p>
                <p>{contact.name}</p>
            </div>

            <div className={'d-flex mt-3'}>
                <p style={{width: '40%'}}>Email</p>
                <p>{contact.email}</p>
            </div>

            <div className={'d-flex mt-3'}>
                <p style={{width: '40%'}}>Phone</p>
                <p>{contact.phone}</p>
            </div>

            <div className={'d-flex mt-3'}>
                <p style={{width: '40%'}}>Residence country</p>
                <p>{contact.country}</p>
            </div>

            <div className={'d-flex mt-3'}>
                <p style={{width: '40%'}}>Assigned To</p>
                <p>{contact.User?.username || '-'}</p>
            </div>

            <div className={'d-flex mt-3'}>
                <p style={{width: '40%'}}>Lifecycle stage</p>
                <p>{contact.lifeCycleStage}</p>
            </div>

        </div>
    )
}
export default Detail
