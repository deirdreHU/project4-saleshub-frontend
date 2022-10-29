import {useParams} from "react-router-dom";
import {Grid} from "@mui/material";
import Detail from "./modules/detail";
import Extra from "./modules/extra";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {REFRESH_CONTACT} from "../home/store";

function ContactDetail() {

    const {contact_id} = useParams();
    const contact = useSelector(state => state.home.contact);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(REFRESH_CONTACT(contact_id));
    }, [contact_id]);



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
