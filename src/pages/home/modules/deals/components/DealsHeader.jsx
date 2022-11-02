import {IconButton, Button,Typography} from "@mui/material";
import TableRowsIcon from '@mui/icons-material/TableRows';
import AppsIcon from '@mui/icons-material/Apps';
import {useSelector} from "react-redux";
import {DealDrawer} from "./DealDrawer";
import {useState} from "react";

export const DealsHeader = () => {

    const deals = useSelector(state => state.home.deals);

    const [open, setOpen] = useState(false);

    return (
        <div>

            <DealDrawer open={open} setOpen={setOpen}/>

            <div className={'d-flex mb-2'}>
                <Typography variant="h5" className={'me-auto'}>Deals</Typography>
                <Button onClick={() => setOpen(true)} variant={'contained'}>Create Deal</Button>
            </div>

            <div className={'d-flex align-items-start'}>
                <div className={"mt-1 me-4 mb-4"}>
                    <Typography variant="h8">{deals.length} records</Typography>
                </div>
                
                <div>
                    <IconButton  size="small" href="/deals/list">
                        <TableRowsIcon />
                    </IconButton>
            
                    <IconButton size="small" href="/deals/board">
                        <AppsIcon />
                    </IconButton>
                </div>
            
            </div>
            
        </div>
    )
}