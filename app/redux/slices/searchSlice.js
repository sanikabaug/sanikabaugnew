const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    selectedPosition: {},
    pinnedLoc: '',
    pinnedCoords: [],
    ageSelect: [],
    newAgeSelect: [],
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {

        handleSetSelectPosition: (state, action) => {
            
            state.selectedPosition = action.payload
        },

        pinnedLocation :  (state, action) => {
            
            state.pinnedLoc = action.payload
        },

        pinnedCoordinates : (state, action) => {
            
            state.pinnedCoords = action.payload
        },

        handleAgeSelect : (state, action) => {
            
            state.ageSelect = action.payload
        },

        handleNewAgeSelect : (state, action) => {
            
            state.newAgeSelect = action.payload
        },
    },
});

export const {handleSetSelectPosition, pinnedLocation, pinnedCoordinates, handleAgeSelect, handleNewAgeSelect} = searchSlice.actions;
export default searchSlice.reducer
