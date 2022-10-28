import {useEffect, useState} from "react";
import {authedRequest} from "../http";

export const useContact = (contactId) => {

    const [contact, setContact] = useState(null);
    
    useEffect(() => {
        authedRequest.get(`/api/contacts/${contactId}`)
        .then(res => {
            if (res && res.data) {
                setContact(res.data);
            }
        })
    }, [contactId]);
    return {
        contact
    }
}