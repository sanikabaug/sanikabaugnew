const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    selectedChecks: '',
};

const selectedChecksSlice = createSlice({
    name: "checks",
    initialState,
    reducers: {

        handleSelectedChecks: (state, action) => {
            
            state.selectedChecks = action.payload
        },

    },
});

export const {handleSelectedChecks} = selectedChecksSlice.actions;
export default selectedChecksSlice.reducer
