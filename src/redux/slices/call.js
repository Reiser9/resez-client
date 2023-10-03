import {createSlice} from '@reduxjs/toolkit';

import {CALL_STATUSES} from '../../consts/CALL_STATUSES';

const initialState = {
    callInfo: {},
    callStatus: CALL_STATUSES.DEFAULT,
    ringtonIsPlaying: false
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
        setRingtonIsPlaying: (state, action) => {
            state.ringtonIsPlaying = action.payload;
        },
        setDataCall: () => initialState
    }
});

export const {
    setCallInfo,
    setCallStatus,
    setRingtonIsPlaying,
    setDataCall
} = callSlice.actions;

export default callSlice.reducer;
