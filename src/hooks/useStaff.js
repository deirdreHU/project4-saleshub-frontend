import {useEffect, useState} from "react";
import {authedRequest} from "../http";

export const useStaff = () => {
    const [staffs, setStaffs] = useState([]);

    useEffect(() => {
        authedRequest.get('/api/users')

        .then(res => {
            setStaffs(res.data);
        })
    }, []);
    
    return {
        staffs
    }
}
