const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    standardDateRange: [],
    formattedDateRange: [],
    selectedRoom: '',
    quickSold: [],
    quickSoldFormattedDate: [],
    quickSoldSelectedRadio: '',
    quickSoldFormattedDateCopy: [],
    updateBulkProperty: '',
    formattedDateUpdateProp: [],
    formattedDateUpdatePropCopy: [],
    selectedRoomUpdateProperty: '',
    selectedRadioUpdateProp: '',
    quickSoldFlag: '',
    updatePropArray: [],
    updateRoomArray: [],
    formattedDateUpdateRoom: [],
    selectedRoomUpdateRooms: '',
    valueTotalRoom: '',

    selectedRoomUpdateRate: '',
    formattedDateUpdateRate: [],
    value3HourRate: '',
    value6HourRate: '',
    value12HourRate: '',
    valueBaseRate: '',
    valueChildRate: '',
    valueExtraPersonRate: '',
    updateRateArray: [],

    checkPricePerGuest: '',
};

const rateandinventorySlice = createSlice({
    name: "rateandinventory",
    initialState,
    reducers: {

        handleFormattedDateRange: (state, action) => {
            
            state.formattedDateRange = action.payload
        },

        handleStandardDateRange: (state, action) => {
            
            state.standardDateRange = action.payload
        },

        handleSelectedRoom :  (state, action) => {
            
            state.selectedRoom = action.payload
        },

        handleQuickSold :  (state, action) => {
            
            state.quickSold = action.payload
        },

        handleQuickSoldFormattedDate :  (state, action) => {
            
            state.quickSoldFormattedDate = action.payload
        },

        handleQuickSoldFormattedDateCopy : (state, action) => {
            
            state.quickSoldFormattedDateCopy = action.payload
        },

        handleQuickSoldSelectedRadio :  (state, action) => {
            
            state.quickSoldSelectedRadio = action.payload
        },

        removeQuickSoldFormattedDate : (state, action) => {
            
            state.quickSoldFormattedDate = action.payload
        },

        handleUpdateBulkProperty: (state, action) => {
            
            state.updateBulkProperty = action.payload
        },

        handleFormattedDateUpdateProp: (state, action) => {
            
            state.formattedDateUpdateProp = action.payload
        },

        handleFormattedDateUpdatePropCopy: (state, action) => {
            
            state.formattedDateUpdatePropCopy = action.payload
        },

        handleSelectedRoomUpdateProperty: (state, action) => {
            
            state.selectedRoomUpdateProperty = action.payload
        },

        handleSelectedRadioUpdateProp: (state, action) => {
            
            state.selectedRadioUpdateProp = action.payload
        },

        handleQuickSoldFlag: (state, action) => {
            
            state.quickSoldFlag = action.payload
        },

        handleUpdatePropArray: (state, action) => {
            
            state.updatePropArray = action.payload
        },

        handleUpdateRoomArray: (state, action) => {
            
            state.updateRoomArray = action.payload
        },

        handleFormattedDateUpdateRoom: (state, action) => {
            
            state.formattedDateUpdateRoom = action.payload
        },

        handleSelectedRoomUpdateRoom: (state, action) => {
                    
                    state.selectedRoomUpdateRooms = action.payload
                },
                
        handleValueUpdateRoom: (state, action) => {
                    
                    state.valueTotalRoom = action.payload
                },


    
                handleFormattedDateUpdateRate: (state, action) => {
                    
                    state.selectedRoomUpdateRate = action.payload
                },

                handleSelectedRoomUpdateRate: (state, action) => {
                    
                    state.formattedDateUpdateRate = action.payload
                },

                handleValue3HourRate: (state, action) => {
                    
                    state.value3HourRate = action.payload
                },

                handleValue6HourRate: (state, action) => {
                    
                    state.value6HourRate = action.payload
                },

                handleValue12HourRate: (state, action) => {
                    
                    state.value12HourRate = action.payload
                },

                handleValueBaseRate: (state, action) => {
                    
                    state.valueBaseRate = action.payload
                },

                handleValueChildRate: (state, action) => {
                    
                    state.valueChildRate = action.payload
                },

                handleValueExtraPersonRate: (state, action) => {
                    
                    state.valueExtraPersonRate = action.payload
                },

                handleUpdateRateArray: (state, action) => {
                    
                    state.updateRateArray = action.payload
                },

                handleCheckPricePerGuest: (state, action) => {
                    
                    state.checkPricePerGuest = action.payload
                },


    },
});

export const {handleStandardDateRange, handleFormattedDateRange, handleSelectedRoom, handleQuickSold, handleQuickSoldFormattedDate ,handleQuickSoldSelectedRadio, removeQuickSoldFormattedDate, handleQuickSoldFormattedDateCopy, handleUpdateBulkProperty, handleFormattedDateUpdateProp, handleFormattedDateUpdatePropCopy, handleSelectedRoomUpdateProperty, handleSelectedRadioUpdateProp, handleQuickSoldFlag, handleUpdatePropArray, handleUpdateRoomArray, handleFormattedDateUpdateRoom,
    handleSelectedRoomUpdateRoom,
    handleValueUpdateRoom,
    
    handleFormattedDateUpdateRate,
    handleSelectedRoomUpdateRate,
    handleValue3HourRate,
    handleValue6HourRate,
    handleValue12HourRate,
    handleValueBaseRate,
    handleValueChildRate,
    handleValueExtraPersonRate,
    handleUpdateRateArray,

    handleCheckPricePerGuest} = rateandinventorySlice.actions;
export default rateandinventorySlice.reducer
