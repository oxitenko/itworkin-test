import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ILocation, ILocationState} from "../types";

const initialState: ILocationState = {
    location: [],
    error: "",
    isLoading: false
}

export const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        getLocationFetch: (state) => {
            state.isLoading = true;
        },
        getLocationSuccess: (state, action: PayloadAction<ILocation[]>) => {
            state.location = action.payload;
            state.isLoading = false;
        },
        getLocationFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
})

export const {getLocationFetch, getLocationSuccess, getLocationFailure} = locationSlice.actions;

export default locationSlice.reducer;