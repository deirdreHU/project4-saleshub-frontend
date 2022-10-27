import {createSlice} from "@reduxjs/toolkit";
import {authedRequest} from "../../http";
import {message} from "antd";

const Actions = {
    SET_CONTACT: 'SET_CONTACT',
    SET_CONTACTS: 'SET_CONTACTS',
    SET_QUERY: 'SET_QUERY'
}

export const homeSlice = createSlice({

    name: 'home',

    initialState: {
        contact: null,
        keyword: '',
        assignedTo: [],
        lifeCycleStage: [],
        contacts: []
    },

    reducers: {
        [Actions.SET_CONTACT]: (state, action) => {
            state.contact = action.payload;
        },
        [Actions.SET_QUERY]: (state, action) => {
            const { key, value } = action.payload;
            state[key] = value;
        },
        [Actions.SET_CONTACTS]: (state, action) => {
            state.contacts = action.payload;
        }
    }

})

export const { SET_CONTACTS, SET_QUERY,SET_CONTACT } = homeSlice.actions;

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
