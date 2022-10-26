import {useParams} from "react-router-dom";
import {Grid} from "@mui/material";
import Detail from "./modules/detail";
import Extra from "./modules/extra";
import {useContact} from '../../hooks/useContact';

function ContactDetail() {

    const {contact_id} = useParams();

    const {contact} = useContact(contact_id);

    return (

        <Grid container>

            <Grid item xs={3} style={{borderRight: '1px solid gainsboro'}}>
                <Detail contact={contact}/>
            </Grid>

            <Grid item xs={9}>
                <Extra contact={contact}/>
            </Grid>

        </Grid>
        
    )
}
export default ContactDetail;
