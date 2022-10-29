import {Button, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {DealDrawer} from "./DealDrawer";
import {useState} from "react";


export const DealsHeader = () => {

    const deals = useSelector(state => state.home.deals);

    const [open, setOpen] = useState(false);

    return (
        <div>

            <DealDrawer open={open} setOpen={setOpen}/>

            <div className={'d-flex'}>
                <Typography variant={'h5'} className={'me-auto'}>Deals</Typography>
                <Button onClick={() => setOpen(true)} variant={'contained'}>Create Deal</Button>
            </div>

            <p className={'text-secondary'}>{deals.length} records</p>
            
        </div>
    )
}