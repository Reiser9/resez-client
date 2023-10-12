import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    notifiesLocal: [],
    notifiesIsLoading: false,
    notifies: {}
};

export const notifySlice = createSlice({
    name: 'notify',
    initialState,
    reducers: {
        setNotifiesIsLoading: (state, action) => {
            state.notifiesIsLoading = action.payload;
        },
        addNotify: (state, action) => {
            state.notifiesLocal = [...state.notifiesLocal, action.payload];
        },
        removeNotify: (state, action) => {
            state.notifiesLocal = state.notifiesLocal.filter(item => item.id !== action.payload);
        },
        initNotifies: (state, action) => {
            state.notifies = action.payload;
        },
        setNotifies: (state, action) => {
            const currentNotifies = state.notifies.notifies;
            
            state.notifies = {
                ...action.payload,
                notifies: currentNotifies ? [...currentNotifies, ...action.payload.notifies] : [...action.payload.notifies]
            };
        },
        readNotifyById: (state, action) => {
            const index = state.notifies?.notifies?.findIndex(obj => obj.id === action.payload?.id);

            if(index !== -1){
                state.notifies?.notifies?.splice(index, 1, action.payload);
            }
        },
        addNotifyInStart: (state, action) => {
            const currentNotifies = state.notifies?.notifies;
            
            if(!currentNotifies){
                return;
            }

            state.notifies = {
                ...state.notifies,
                notifies: [action.payload, ...state.notifies.notifies]
            };
        },
        setDataNotify: () => initialState
    }
});

export const {
    setNotifiesIsLoading,
    addNotify,
    removeNotify,
    initNotifies,
    setNotifies,
    readNotifyById,
    addNotifyInStart,
    setDataNotify
} = notifySlice.actions;

export default notifySlice.reducer;
