import {useEffect, useState} from "react";
import {authedRequest} from "../http";

export const useDeal = (dealId) => {

    const [deal, setDeal] = useState(null);

    useEffect(() => {
        authedRequest.get(`/api/deals/${dealId}`)
        .then(res => {
            if (res && res.data) {
            setDeal(res.data);
            }
        })
    }, [dealId]);
    
    return {
        deal
    }
}
