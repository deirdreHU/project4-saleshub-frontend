import {Paper, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import moment from "moment";

function DealList({deals}) {

    return (

        <div>
            {deals.map(deal => {

                return (
                    <div key={deal.dealId}>
                        <span>
                            <strong>
                                (Deal name): {deal.name}
                            </strong>
                        </span>

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
                )

            })}

        </div>
    )
}

export default DealList;
