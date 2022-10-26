import ListIcon from '@mui/icons-material/List';
import MenuAction from "../../../../components/menuAction/MenuAction";
import {Avatar, Divider} from "@mui/material";

function Detail({contact}) {
    
    if (!contact) {
        return <></>;
    }
    return (
        <div className={'p-3'}>

            <div className={'d-flex justify-content-end'}>
                <MenuAction />
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
