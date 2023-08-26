import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICharacter, ICharacterState} from "../types";

const initialState: ICharacterState = {
    character: [],
    error: "",
    isLoading: false
}

export const characterSlice = createSlice({
    name: "character",
    initialState,
    reducers: {
        getCharacterFetch: (state) => {
            state.isLoading = true;
        },
        getCharacterSuccess: (state, action: PayloadAction<ICharacter[]>) => {
            state.character = action.payload;
            state.isLoading = false;
        },
        getCharacterFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
})

export const {getCharacterFetch, getCharacterSuccess, getCharacterFailure} = characterSlice.actions;

export default characterSlice.reducer;