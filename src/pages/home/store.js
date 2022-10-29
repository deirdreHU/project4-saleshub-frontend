import {createSlice} from "@reduxjs/toolkit";
import {authedRequest} from "../../http";
import {message} from "antd";

const Actions = {
    SET_CONTACT: 'SET_CONTACT',
    SET_CONTACTS: 'SET_CONTACTS',
    SET_QUERY: 'SET_QUERY',
    SET_DEALS: 'SET_DEALS',
    SET_ALL_CONTACTS: 'SET_ALL_CONTACTS',
    SET_DEAL: 'SET_DEAL'
}

export const homeSlice = createSlice({

    name: 'home',

    initialState: {
        contact: null,
        keyword: '',
        allContacts: [],
        assignedTo: [],
        lifeCycleStage: [],
        contacts: [],
        deals: [],
        deal: null
    },

    reducers: {
        [Actions.SET_DEAL]: (state, action) => {
            state.deal = action.payload;
        },

        [Actions.SET_ALL_CONTACTS]: (state, action) => {
            state.allContacts = action.payload;
        },

        [Actions.SET_CONTACT]: (state, action) => {
            state.contact = action.payload;
        },

        [Actions.SET_QUERY]: (state, action) => {
            const { key, value } = action.payload;
            state[key] = value;
        },

        [Actions.SET_CONTACTS]: (state, action) => {
            state.contacts = action.payload;
        },

        [Actions.SET_DEALS]: (state, action) => {
            state.deals = action.payload;
        }
    }

})


export const { SET_CONTACTS, SET_QUERY, SET_CONTACT, SET_DEALS, SET_ALL_CONTACTS, SET_DEAL } = homeSlice.actions;

export const REFRESH_CONTACT = (contactId) => dispatch => {
    authedRequest.get(`/api/contacts/${contactId}`)
        .then(res => {
            if (res && res.data) {
                dispatch(SET_CONTACT(res.data));
            }
        })
}

export const REFRESH_CONTACTS = () => (dispatch, getState) => {
    const state = getState();
    const {keyword, assignedTo, lifeCycleStage} = state.home;
    authedRequest.get('/api/contacts', {
        params: {
            keyword,
            assignedTo: assignedTo.join(','),
            lifeCycleStage: lifeCycleStage.join(',')
        }
    })
    .then(res => {
        if (res && res.data) {
            dispatch(SET_CONTACTS(res.data))
        }
    })
}

export const REFRESH_ALL_CONTACTS = () => dispatch => {
    authedRequest.get(`/api/contacts`)
        .then(res => {
            if (res && res.data) {
            dispatch(SET_ALL_CONTACTS(res.data));
            }
        })
}

export const REFRESH_DEAL = (dealId) => dispatch => {
    authedRequest.get(`/api/deals/${dealId}`)
        .then(res => {
            if (res && res.data) {
            dispatch(SET_DEAL(res.data))
            }
        })
}

export const REFRESH_DEALS = () => dispatch => {
    authedRequest.get(`/api/deals`)
        .then(res => {
            if (res && res.data) {
                dispatch(SET_DEALS(res.data));
            }
        })
}

export const FILTER_DEALS = (name, dealStage, assignedTo, createdOn, closedOn, contacts) => async (dispatch, getState) => {
    const res = await authedRequest.get(`/api/deals`);
    const deals = res.data;

    if (name === null) {
        name = '';
    }

    const filteredDeals = deals.filter(deal => {
        let matched = true;
    
        matched = matched && deal.name.includes(name);
        if (dealStage) {
            matched = matched && deal.dealStage === dealStage;
        }
    
        if (assignedTo && assignedTo.length > 0) {
            matched = matched && assignedTo.includes(deal.assignedTo);
        }
    
        if (createdOn) {
            matched = matched && new Date(deal.createdAt).getTime() > createdOn.toDate().getTime();
        }
        if (closedOn && deal.closeDate) {
            matched = matched && new Date(deal.closeDate).getTime() < closedOn.toDate().getTime();
        }
        if (contacts && contacts.length > 0) {
            matched = matched && contacts.includes(deal.contact);
        }
    
        return matched;
    });
    
    dispatch(SET_DEALS(filteredDeals));
}


export const CREATE_CONTACT = (contact) => dispatch => {
    authedRequest.post(`/api/contacts`, contact)
    
    .then(() => {
        message.success('Create successfully!');
        dispatch(REFRESH_CONTACTS());
    })
}

export const UPDATE_CONTACT = (contact, contactId) => dispatch => {
    const {name, email, phone, country, assignedTo, lifeCycleStage} = contact;
    authedRequest.put(`/api/contacts/${contactId}`, {
        name,
        email,
        phone,
        country,
        assignedTo,
        lifeCycleStage
    }).then(() => {
        dispatch(REFRESH_CONTACTS());
    });
}

export const homeReducer = homeSlice.reducer;
