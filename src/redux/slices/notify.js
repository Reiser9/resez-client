import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    notifiesLocal: [],
    notifiesIsLoading: false,
    notifies: {},
    unreadCount: 0
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
        changeUnreadCount: (state, action) => {
            state.unreadCount = action.payload;
        },
        decrementUnreadCount: (state) => {
            state.unreadCount--;
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
    changeUnreadCount,
    decrementUnreadCount,
    setDataNotify
} = notifySlice.actions;

export default notifySlice.reducer;
