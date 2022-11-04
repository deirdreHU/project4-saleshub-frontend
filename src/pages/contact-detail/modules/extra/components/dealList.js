import {Paper, Table, TableBody, TableCell, Button,TableHead, TableRow} from "@mui/material";
import moment from "moment";
import {useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import {REFRESH_CONTACT,REFRESH_ALL_CONTACTS} from "../../../../home/store";
import {useDispatch} from "react-redux";


import { DealDrawer } from "../../../../home/modules/deals/components/DealDrawer";

function DealList({deals}) {
    const {contact_id} = useParams();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(REFRESH_ALL_CONTACTS());
    }, [dispatch]);

    useEffect(() => {
        dispatch(REFRESH_CONTACT(contact_id));

        // eslint-disable-next-line 
    }, [dispatch]);

    return (
        <>
        <div>
            <DealDrawer open={open} setOpen={setOpen}/>
                <div className={'text-end'}>
                    <Button onClick={() => setOpen(true)} variant={'contained'}>Create deal</Button>
                </div>
        </div>

        <div>
            {deals.map(deal => {
                return (
                    <div className="ms-2 mb-4">
                        <div key={deal.dealId}>
                            <div className="mt-2 mb-2">
                                <span >
                                    <strong>
                                        {deal.name}
                                    </strong>
                                </span>
                            </div>

                            <Paper >
                                <Table>

                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Stage</TableCell>
                                            <TableCell>Amount</TableCell>
                                            <TableCell>Close Date</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        <TableRow >
                                            <TableCell>{deal.dealStage}</TableCell>
                                            <TableCell>{deal.amount}</TableCell>
                                            <TableCell>{deal.closeDate ? moment(deal.closeDate).format('lll') : '-'}</TableCell>
                                        </TableRow>
                                    </TableBody>

                                </Table>
                                
                            </Paper>
                        </div>
                    </div>

                )

            })}

        </div>
        </>
    )
}

export default DealList;
