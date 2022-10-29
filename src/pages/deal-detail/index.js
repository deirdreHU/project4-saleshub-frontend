import {Grid} from "@mui/material";
import {Extra} from "./extra";
import {Detail} from "./detail";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {REFRESH_DEAL} from "../home/store";


export const DealDetail = () => {
    const {deal_id} = useParams();
    const dispatch = useDispatch();
    const deal = useSelector(state => state.home.deal);

    useEffect(() => {
        dispatch(REFRESH_DEAL(deal_id));
    }, [deal_id]);

    return (
        <Grid container>
        <Grid item xs={3} style={{borderRight: '1px solid gainsboro'}}>
            <Detail deal={deal}/>
        </Grid>
        <Grid item xs={9}>
            <Extra deal={deal}/>
        </Grid>
        </Grid>
    )
}