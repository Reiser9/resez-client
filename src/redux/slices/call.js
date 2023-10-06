import {createSlice} from '@reduxjs/toolkit';

import {CALL_STATUSES} from '../../consts/CALL_STATUSES';

const initialState = {
    callInfo: {},
    callStatus: CALL_STATUSES.DEFAULT,
    localStream: null
};

export const callSlice = createSlice({
    name: 'call',
    initialState,
    reducers: {
        setCallInfo: (state, action) => {
            state.callInfo = action.payload;
        },
        setCallStatus: (state, action) => {
            state.callStatus = action.payload;
        },
        setLocalStream: (state, action) => {
            state.localStream = action.payload;
        },
        setDataCall: () => initialState
    }
});

export const {
    setCallInfo,
    setCallStatus,
    setLocalStream,
    setDataCall
} = callSlice.actions;

export default callSlice.reducer;
