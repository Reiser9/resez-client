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
            state.notifiesLocal = state.notifiesLocal.concat(action.payload);
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
                notifies: [...currentNotifies, ...action.payload?.notifies]
            };
        },
        readNotifyById: (state, action) => {
            const index = state.notifies?.notifies?.findIndex(obj => obj.id === action.payload?.notify?.id);

            if(index !== -1){
                state.notifies?.notifies?.splice(index, 1, action.payload?.notify);
            }
        },
        deleteNotifyById: (state, action) => {
            state.notifies.notifies = state.notifies?.notifies?.filter(item => item.id != action.payload?.notify?.id);
            state.notifies.totalCount--;
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
    deleteNotifyById,
    setDataNotify
} = notifySlice.actions;

export default notifySlice.reducer;
