import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    testsIsLoading: false,
    tests: {},
    test: {},
    testsRecommendedIsLoading: false,
    testsRecommended: {}
};

export const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        setTestsIsLoading: (state, action) => {
            state.testsIsLoading = action.payload
        },
        setTestsRecommendedIsLoading: (state, action) => {
            state.testsRecommendedIsLoading = action.payload
        },
        initTests: (state, action) => {
            state.tests = action.payload
        },
        setTests: (state, action) => {
            const currentTests = state.tests.tests;

            state.tests = {
                ...action.payload,
                tests: currentTests ? [...currentTests, ...action.payload.tests] : [...action.payload.tests]
            };
        },
        initTestsRecommended: (state, action) => {
            state.testsRecommended = action.payload
        },
        setTestsRecommended: (state, action) => {
            const currentTests = state.testsRecommended.tests;

            state.testsRecommended = {
                ...action.payload,
                tests: currentTests ? [...currentTests, ...action.payload.tests] : [...action.payload.tests]
            };
        },
        addNewTest: (state, action) => {
            const currentTests = state.tests.tests;

            if(!currentTests){
                return;
            }

            state.tests = {
                ...state.tests,
                tests: [action.payload, ...currentTests],
                totalCount: state.tests.totalCount + 1
            };
        },
        deleteTest: (state, action) => {
            state.tests.tests = state.tests?.tests?.filter(item => item.id !== action.payload.id);
            state.tests.totalCount--;
        },
        initTest: (state, action) => {
            state.test = action.payload;
        },
        setDataTests: () => initialState
    }
});

export const {
    setTestsIsLoading,
    setTestsRecommendedIsLoading,
    initTests,
    setTests,
    initTestsRecommended,
    setTestsRecommended,
    addNewTest,
    deleteTest,
    initTest,
    setDataTests
} = testSlice.actions;

export default testSlice.reducer;