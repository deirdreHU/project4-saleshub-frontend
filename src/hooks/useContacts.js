import {useEffect, useState} from "react";
import {authedRequest} from "../http";

export const useContacts = () => {

    const [allContacts, setAllContacts] = useState([]);
    
    useEffect(() => {
        authedRequest.get(`/api/contacts`)
        .then(res => {
            if (res && res.data) {
            setAllContacts(res.data);
            }
        })
    }, []);

    return {
        allContacts
    }
}
